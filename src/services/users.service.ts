import apiClient from './api/client';
import { API_ENDPOINTS } from './api/endpoints';
import { UserProfile, UpdateProfileData, ChangePasswordData } from '@/types/user.types';
import { Address } from '@/types/order.types';
import { ApiResponse } from '@/types/api.types';

/**
 * User Service
 */

export class UsersService {
  static async getProfile(): Promise<UserProfile> {
    const response = await apiClient.get<ApiResponse<UserProfile>>(
      API_ENDPOINTS.USER.PROFILE
    );
    return response.data.data;
  }

  static async updateProfile(data: UpdateProfileData): Promise<UserProfile> {
    const response = await apiClient.patch<ApiResponse<UserProfile>>(
      API_ENDPOINTS.USER.UPDATE_PROFILE,
      data
    );
    return response.data.data;
  }

  static async getAddresses(): Promise<Address[]> {
    const response = await apiClient.get<ApiResponse<Address[]>>(
      API_ENDPOINTS.USER.ADDRESSES
    );
    return response.data.data;
  }

  static async addAddress(address: Omit<Address, 'id'>): Promise<Address> {
    const response = await apiClient.post<ApiResponse<Address>>(
      API_ENDPOINTS.USER.ADD_ADDRESS,
      address
    );
    return response.data.data;
  }

  static async updateAddress(id: string, address: Partial<Address>): Promise<Address> {
    const response = await apiClient.patch<ApiResponse<Address>>(
      API_ENDPOINTS.USER.UPDATE_ADDRESS(id),
      address
    );
    return response.data.data;
  }

  static async deleteAddress(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.USER.DELETE_ADDRESS(id));
  }

  static async getWishlist(): Promise<string[]> {
    const response = await apiClient.get<ApiResponse<string[]>>(
      API_ENDPOINTS.USER.WISHLIST
    );
    return response.data.data;
  }

  static async toggleWishlist(productId: string): Promise<string[]> {
    const response = await apiClient.post<ApiResponse<string[]>>(
      API_ENDPOINTS.USER.TOGGLE_WISHLIST(productId)
    );
    return response.data.data;
  }

  static async changePassword(data: ChangePasswordData): Promise<void> {
    await apiClient.post(API_ENDPOINTS.USER.CHANGE_PASSWORD, data);
  }
}
