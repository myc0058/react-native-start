import apiClient from './api/client';
import { API_ENDPOINTS } from './api/endpoints';
import { UserProfile, UpdateProfileData, ChangePasswordData } from '@/types/user.types';
import { Address } from '@/types/order.types';
import { ApiResponse } from '@/types/api.types';
import { USE_MOCK_API } from '@/constants/config';
import { mockUser } from '@/mocks/mockData';

/**
 * User Service
 */

export class UsersService {
  static async getProfile(): Promise<UserProfile> {
    if (USE_MOCK_API) {
      return mockUser;
    }

    const response = await apiClient.get<ApiResponse<UserProfile>>(
      API_ENDPOINTS.USER.PROFILE
    );
    return response.data.data;
  }

  static async updateProfile(data: UpdateProfileData): Promise<UserProfile> {
    if (USE_MOCK_API) {
      Object.assign(mockUser, data);
      return mockUser;
    }

    const response = await apiClient.patch<ApiResponse<UserProfile>>(
      API_ENDPOINTS.USER.UPDATE_PROFILE,
      data
    );
    return response.data.data;
  }

  static async getAddresses(): Promise<Address[]> {
    if (USE_MOCK_API) {
      return mockUser.addresses;
    }

    const response = await apiClient.get<ApiResponse<Address[]>>(
      API_ENDPOINTS.USER.ADDRESSES
    );
    return response.data.data;
  }

  static async addAddress(address: Omit<Address, 'id'>): Promise<Address> {
    if (USE_MOCK_API) {
      const newAddr: Address = { ...address, id: `addr-${Date.now()}` };
      mockUser.addresses.push(newAddr);
      return newAddr;
    }

    const response = await apiClient.post<ApiResponse<Address>>(
      API_ENDPOINTS.USER.ADD_ADDRESS,
      address
    );
    return response.data.data;
  }

  static async updateAddress(id: string, address: Partial<Address>): Promise<Address> {
    if (USE_MOCK_API) {
      const target = mockUser.addresses.find((a) => a.id === id);
      if (!target) {
        throw new Error('Address not found');
      }
      Object.assign(target, address);
      return target;
    }

    const response = await apiClient.patch<ApiResponse<Address>>(
      API_ENDPOINTS.USER.UPDATE_ADDRESS(id),
      address
    );
    return response.data.data;
  }

  static async deleteAddress(id: string): Promise<void> {
    if (USE_MOCK_API) {
      mockUser.addresses = mockUser.addresses.filter((a) => a.id !== id);
      return;
    }

    await apiClient.delete(API_ENDPOINTS.USER.DELETE_ADDRESS(id));
  }

  static async getWishlist(): Promise<string[]> {
    if (USE_MOCK_API) {
      return mockUser.wishlist;
    }

    const response = await apiClient.get<ApiResponse<string[]>>(
      API_ENDPOINTS.USER.WISHLIST
    );
    return response.data.data;
  }

  static async toggleWishlist(productId: string): Promise<string[]> {
    if (USE_MOCK_API) {
      const exists = mockUser.wishlist.includes(productId);
      mockUser.wishlist = exists
        ? mockUser.wishlist.filter((id) => id !== productId)
        : [...mockUser.wishlist, productId];
      return mockUser.wishlist;
    }

    const response = await apiClient.post<ApiResponse<string[]>>(
      API_ENDPOINTS.USER.TOGGLE_WISHLIST(productId)
    );
    return response.data.data;
  }

  static async changePassword(data: ChangePasswordData): Promise<void> {
    if (USE_MOCK_API) return;
    await apiClient.post(API_ENDPOINTS.USER.CHANGE_PASSWORD, data);
  }
}
