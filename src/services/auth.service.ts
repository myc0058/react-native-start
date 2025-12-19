import apiClient from './api/client';
import { API_ENDPOINTS } from './api/endpoints';
import { LoginData, RegisterData, AuthResponse, User } from '@/types/user.types';
import { ApiResponse } from '@/types/api.types';

/**
 * Authentication Service
 */

export class AuthService {
  static async login(data: LoginData): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.AUTH.LOGIN,
      data
    );
    return response.data.data;
  }

  static async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    );
    return response.data.data;
  }

  static async logout(): Promise<void> {
    await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  }

  static async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    const response = await apiClient.post<ApiResponse<{ accessToken: string }>>(
      API_ENDPOINTS.AUTH.REFRESH,
      { refreshToken }
    );
    return response.data.data;
  }

  static async getMe(): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>(API_ENDPOINTS.AUTH.ME);
    return response.data.data;
  }
}
