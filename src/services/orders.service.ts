import apiClient from './api/client';
import { API_ENDPOINTS } from './api/endpoints';
import { Order, CreateOrderData, OrderTracking } from '@/types/order.types';
import { ApiResponse } from '@/types/api.types';
import { USE_MOCK_API } from '@/constants/config';
import { mockOrders, mockOrderTracking } from '@/mocks/mockData';

/**
 * Orders Service
 */

export class OrdersService {
  static async getOrders(): Promise<Order[]> {
    if (USE_MOCK_API) {
      return mockOrders;
    }

    const response = await apiClient.get<ApiResponse<Order[]>>(
      API_ENDPOINTS.ORDERS.LIST
    );
    return response.data.data;
  }

  static async createOrder(data: CreateOrderData): Promise<Order> {
    if (USE_MOCK_API) {
      const newOrder: Order = {
        id: `order-${Date.now()}`,
        orderNumber: `MOCK-${Date.now()}`,
        status: 'processing',
        items: data.items.map((item, idx) => ({
          id: `order-item-${idx}`,
          product: mockOrders[0].items[0].product,
          quantity: item.quantity,
          price: mockOrders[0].items[0].product.price,
          total: mockOrders[0].items[0].product.price * item.quantity,
          selectedColor: item.selectedColor,
          selectedSize: item.selectedSize,
        })),
        shippingAddress: data.shippingAddress,
        billingAddress: data.billingAddress,
        paymentMethod: { type: data.paymentMethod },
        subtotal: mockOrders[0].items[0].product.price,
        shipping: 0,
        tax: 0,
        discount: 0,
        total: mockOrders[0].items[0].product.price,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mockOrders.unshift(newOrder);
      return newOrder;
    }

    const response = await apiClient.post<ApiResponse<Order>>(
      API_ENDPOINTS.ORDERS.CREATE,
      data
    );
    return response.data.data;
  }

  static async getOrderById(id: string): Promise<Order> {
    if (USE_MOCK_API) {
      const order = mockOrders.find((o) => o.id === id);
      if (!order) throw new Error('Order not found');
      return order;
    }

    const response = await apiClient.get<ApiResponse<Order>>(
      API_ENDPOINTS.ORDERS.DETAIL(id)
    );
    return response.data.data;
  }

  static async cancelOrder(id: string): Promise<Order> {
    if (USE_MOCK_API) {
      const order = mockOrders.find((o) => o.id === id);
      if (!order) throw new Error('Order not found');
      order.status = 'cancelled';
      order.updatedAt = new Date().toISOString();
      return order;
    }

    const response = await apiClient.post<ApiResponse<Order>>(
      API_ENDPOINTS.ORDERS.CANCEL(id)
    );
    return response.data.data;
  }

  static async getOrderTracking(id: string): Promise<OrderTracking> {
    if (USE_MOCK_API) {
      return mockOrderTracking;
    }

    const response = await apiClient.get<ApiResponse<OrderTracking>>(
      API_ENDPOINTS.ORDERS.TRACKING(id)
    );
    return response.data.data;
  }
}
