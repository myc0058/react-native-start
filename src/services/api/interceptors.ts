import { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { Storage, storageKeys } from '@/utils/storage';
import { ApiError } from '@/types/api.types';

/**
 * Setup Axios Interceptors
 */

export function setupInterceptors(client: AxiosInstance): void {
  // Request Interceptor
  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Add auth token to requests
      const token = Storage.getString(storageKeys.AUTH_TOKEN);

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  client.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      // Handle 401 Unauthorized
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Attempt to refresh token
          const refreshToken = Storage.getString(storageKeys.REFRESH_TOKEN);

          if (refreshToken) {
            const response = await client.post('/auth/refresh', {
              refreshToken,
            });

            const { accessToken } = response.data;

            // Save new token
            Storage.setString(storageKeys.AUTH_TOKEN, accessToken);

            // Retry original request with new token
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            }

            return client(originalRequest);
          }
        } catch (refreshError) {
          // Refresh failed, clear auth data
          Storage.delete(storageKeys.AUTH_TOKEN);
          Storage.delete(storageKeys.REFRESH_TOKEN);
          Storage.delete(storageKeys.USER_DATA);

          // Redirect to login (handled by auth store)
          return Promise.reject(refreshError);
        }
      }

      // Transform error to ApiError format
      const apiError: ApiError = {
        code: error.code || 'UNKNOWN_ERROR',
        message: error.message || 'An unexpected error occurred',
        statusCode: error.response?.status,
        details: error.response?.data?.details,
      };

      return Promise.reject(apiError);
    }
  );
}
