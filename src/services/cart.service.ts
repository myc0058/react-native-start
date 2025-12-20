import apiClient from './api/client';
import { API_ENDPOINTS } from './api/endpoints';
import { Cart, Coupon } from '@/types/cart.types';
import { ApiResponse } from '@/types/api.types';

/**
 * Cart Service
 */

export class CartService {
  static async validateCoupon(code: string): Promise<Coupon> {
    const response = await apiClient.post<ApiResponse<Coupon>>(
      `${API_ENDPOINTS.CART.GET}/coupon`,
      { code }
    );
    return response.data.data;
  }

  static async getCart(): Promise<Cart> {
    const response = await apiClient.get<ApiResponse<Cart>>(API_ENDPOINTS.CART.GET);
    return response.data.data;
  }

  static async addToCart(
    productId: string,
    quantity: number,
    options?: { color?: string; size?: string }
  ): Promise<Cart> {
    const response = await apiClient.post<ApiResponse<Cart>>(API_ENDPOINTS.CART.ADD, {
      productId,
      quantity,
      ...options,
    });
    return response.data.data;
  }

  static async updateCartItem(itemId: string, quantity: number): Promise<Cart> {
    const response = await apiClient.patch<ApiResponse<Cart>>(
      API_ENDPOINTS.CART.UPDATE(itemId),
      { quantity }
    );
    return response.data.data;
  }

  static async removeFromCart(itemId: string): Promise<Cart> {
    const response = await apiClient.delete<ApiResponse<Cart>>(
      API_ENDPOINTS.CART.REMOVE(itemId)
    );
    return response.data.data;
  }

  static async clearCart(): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.CART.CLEAR);
  }
}
