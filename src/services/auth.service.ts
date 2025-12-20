import apiClient from './api/client';
import { API_ENDPOINTS } from './api/endpoints';
import { LoginData, RegisterData, AuthResponse, User } from '@/types/user.types';
import { ApiResponse } from '@/types/api.types';
import { USE_MOCK_API } from '@/constants/config';
import { mockUser } from '@/mocks/mockData';

/**
 * Authentication Service
 */

export class AuthService {
  static async login(data: LoginData): Promise<AuthResponse> {
    if (USE_MOCK_API) {
      return {
        user: { ...mockUser, email: data.email },
        tokens: { accessToken: 'mock-access-token', refreshToken: 'mock-refresh-token' },
      };
    }

    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.AUTH.LOGIN,
      data
    );
    return response.data.data;
  }

  static async register(data: RegisterData): Promise<AuthResponse> {
    if (USE_MOCK_API) {
      return {
        user: { ...mockUser, email: data.email, name: data.name },
        tokens: { accessToken: 'mock-access-token', refreshToken: 'mock-refresh-token' },
      };
    }

    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    );
    return response.data.data;
  }

  static async logout(): Promise<void> {
    if (USE_MOCK_API) return;
    await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  }

  static async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    if (USE_MOCK_API) {
      return { accessToken: 'mock-access-token' };
    }

    const response = await apiClient.post<ApiResponse<{ accessToken: string }>>(
      API_ENDPOINTS.AUTH.REFRESH,
      { refreshToken }
    );
    return response.data.data;
  }

  static async getMe(): Promise<User> {
    if (USE_MOCK_API) {
      return mockUser;
    }

    const response = await apiClient.get<ApiResponse<User>>(API_ENDPOINTS.AUTH.ME);
    return response.data.data;
  }
}
