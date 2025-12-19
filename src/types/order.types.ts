import { Product } from './product.types';

/**
 * Order Types
 */

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: PaymentMethod;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  trackingNumber?: string;
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
  price: number;
  total: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Address {
  id?: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
}

export interface PaymentMethod {
  id?: string;
  type: PaymentType;
  last4?: string;
  brand?: string;
  cardholderName?: string;
  expiryMonth?: string;
  expiryYear?: string;
  isDefault?: boolean;
}

export type PaymentType = 'card' | 'bank' | 'mobile' | 'cash';

export interface CreateOrderData {
  items: Array<{
    productId: string;
    quantity: number;
    selectedColor?: string;
    selectedSize?: string;
  }>;
  shippingAddress: Omit<Address, 'id'>;
  billingAddress: Omit<Address, 'id'>;
  paymentMethod: PaymentType;
  couponCode?: string;
}

export interface OrderTracking {
  orderId: string;
  status: OrderStatus;
  history: OrderStatusHistory[];
}

export interface OrderStatusHistory {
  status: OrderStatus;
  message: string;
  location?: string;
  timestamp: string;
}
