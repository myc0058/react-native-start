import { useState, useCallback } from 'react';
import { OrdersService } from '@/services/orders.service';
import { Order, CreateOrderData, OrderTracking } from '@/types/order.types';

interface UseOrdersReturn {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
  refresh: () => Promise<void>;
}

export function useOrders(): UseOrdersReturn {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await OrdersService.getOrders();
      setOrders(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : '주문 목록을 불러오는데 실패했습니다.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    await fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    isLoading,
    error,
    fetchOrders,
    refresh,
  };
}

interface UseOrderDetailReturn {
  order: Order | null;
  tracking: OrderTracking | null;
  isLoading: boolean;
  error: string | null;
  fetchOrder: (id: string) => Promise<void>;
  fetchTracking: (id: string) => Promise<void>;
  cancelOrder: (id: string) => Promise<boolean>;
}

export function useOrderDetail(): UseOrderDetailReturn {
  const [order, setOrder] = useState<Order | null>(null);
  const [tracking, setTracking] = useState<OrderTracking | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrder = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await OrdersService.getOrderById(id);
      setOrder(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : '주문 정보를 불러오는데 실패했습니다.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchTracking = useCallback(async (id: string) => {
    try {
      const data = await OrdersService.getOrderTracking(id);
      setTracking(data);
    } catch {
      // Silently fail for tracking
    }
  }, []);

  const cancelOrder = useCallback(async (id: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const updated = await OrdersService.cancelOrder(id);
      setOrder(updated);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : '주문 취소에 실패했습니다.';
      setError(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    order,
    tracking,
    isLoading,
    error,
    fetchOrder,
    fetchTracking,
    cancelOrder,
  };
}

interface UseCreateOrderReturn {
  isLoading: boolean;
  error: string | null;
  createOrder: (data: CreateOrderData) => Promise<Order | null>;
}

export function useCreateOrder(): UseCreateOrderReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrder = useCallback(async (data: CreateOrderData): Promise<Order | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const order = await OrdersService.createOrder(data);
      return order;
    } catch (err) {
      const message = err instanceof Error ? err.message : '주문 생성에 실패했습니다.';
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    createOrder,
  };
}
