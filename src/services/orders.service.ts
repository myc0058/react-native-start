import apiClient from './api/client';
import { API_ENDPOINTS } from './api/endpoints';
import { Order, CreateOrderData, OrderTracking } from '@/types/order.types';
import { ApiResponse } from '@/types/api.types';

/**
 * Orders Service
 */

export class OrdersService {
  static async getOrders(): Promise<Order[]> {
    const response = await apiClient.get<ApiResponse<Order[]>>(
      API_ENDPOINTS.ORDERS.LIST
    );
    return response.data.data;
  }

  static async createOrder(data: CreateOrderData): Promise<Order> {
    const response = await apiClient.post<ApiResponse<Order>>(
      API_ENDPOINTS.ORDERS.CREATE,
      data
    );
    return response.data.data;
  }

  static async getOrderById(id: string): Promise<Order> {
    const response = await apiClient.get<ApiResponse<Order>>(
      API_ENDPOINTS.ORDERS.DETAIL(id)
    );
    return response.data.data;
  }

  static async cancelOrder(id: string): Promise<Order> {
    const response = await apiClient.post<ApiResponse<Order>>(
      API_ENDPOINTS.ORDERS.CANCEL(id)
    );
    return response.data.data;
  }

  static async getOrderTracking(id: string): Promise<OrderTracking> {
    const response = await apiClient.get<ApiResponse<OrderTracking>>(
      API_ENDPOINTS.ORDERS.TRACKING(id)
    );
    return response.data.data;
  }
}
