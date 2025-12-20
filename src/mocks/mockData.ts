import { Product, Review } from '@/types/product.types';
import { Order, OrderStatus, OrderTracking } from '@/types/order.types';
import { Coupon } from '@/types/cart.types';
import { UserProfile } from '@/types/user.types';

export const mockUser: UserProfile = {
  id: 'user-1',
  email: 'demo@shop.com',
  name: 'Demo User',
  phone: '010-1234-5678',
  avatar: undefined,
  role: 'customer',
  createdAt: new Date().toISOString(),
  addresses: [
    {
      id: 'addr-1',
      name: 'Demo User',
      phone: '010-1234-5678',
      street: '123 Demo Street',
      city: 'Seoul',
      state: 'Seoul',
      zipCode: '04524',
      country: 'Korea',
      isDefault: true,
    },
  ],
  wishlist: [],
  orderCount: 2,
  points: 1200,
  verified: true,
};

export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Airy Knit Sweater',
    description: 'Lightweight knit sweater perfect for transitional weather.',
    price: 49000,
    originalPrice: 69000,
    discountPercentage: 29,
    images: ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'],
    category: { id: '2', name: 'Fashion', slug: 'fashion' },
    brand: 'Softly',
    stock: 20,
    rating: 4.6,
    reviewCount: 124,
    colors: [
      { name: 'Ivory', hex: '#f8f4ec' },
      { name: 'Mocha', hex: '#b89c7d' },
    ],
    sizes: [
      { name: 'S', value: 's' },
      { name: 'M', value: 'm' },
      { name: 'L', value: 'l' },
    ],
    tags: ['new', 'knit'],
    isFeatured: true,
    isNew: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-2',
    name: 'Minimal Leather Backpack',
    description: 'Clean silhouette with ample space for daily carry.',
    price: 99000,
    images: ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'],
    category: { id: '2', name: 'Fashion', slug: 'fashion' },
    brand: 'Form & Function',
    stock: 8,
    rating: 4.8,
    reviewCount: 87,
    colors: [
      { name: 'Black', hex: '#0f1115' },
      { name: 'Sand', hex: '#d3c7b4' },
    ],
    sizes: [{ name: 'One Size', value: 'onesize' }],
    tags: ['bag', 'leather'],
    isFeatured: true,
    isNew: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-3',
    name: 'Wireless Earbuds Pro',
    description: 'Active noise cancellation with 24h battery life.',
    price: 149000,
    originalPrice: 179000,
    discountPercentage: 17,
    images: ['https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80'],
    category: { id: '1', name: 'Electronics', slug: 'electronics' },
    brand: 'Sonic',
    stock: 42,
    rating: 4.7,
    reviewCount: 310,
    colors: [
      { name: 'White', hex: '#f7f7f7' },
      { name: 'Midnight', hex: '#0f1115' },
    ],
    sizes: [{ name: 'Standard', value: 'std' }],
    tags: ['audio', 'wireless'],
    isFeatured: true,
    isNew: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const mockReviews: Record<string, Review[]> = {
  'prod-1': [
    {
      id: 'rev-1',
      productId: 'prod-1',
      userId: 'user-2',
      userName: 'Jane',
      rating: 5,
      comment: 'Very soft and comfy. Fits true to size.',
      helpful: 4,
      createdAt: new Date().toISOString(),
    },
  ],
  'prod-3': [
    {
      id: 'rev-2',
      productId: 'prod-3',
      userId: 'user-3',
      userName: 'Alex',
      rating: 4.5,
      comment: 'Great ANC for commute, battery is solid.',
      helpful: 10,
      createdAt: new Date().toISOString(),
    },
  ],
};

export const mockOrders: Order[] = [
  {
    id: 'order-1',
    orderNumber: '20241201-001',
    status: 'processing',
    items: [
      {
        id: 'order-item-1',
        product: mockProducts[0],
        quantity: 1,
        price: mockProducts[0].price,
        total: mockProducts[0].price,
      },
    ],
    shippingAddress: mockUser.addresses[0],
    billingAddress: mockUser.addresses[0],
    paymentMethod: { id: 'pm-1', type: 'card', brand: 'Visa', last4: '4242' },
    subtotal: mockProducts[0].price,
    shipping: 0,
    tax: 0,
    discount: 0,
    total: mockProducts[0].price,
    trackingNumber: 'TRACK123',
    estimatedDelivery: '2025-01-05',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const mockOrderTracking: OrderTracking = {
  orderId: 'order-1',
  status: 'processing' as OrderStatus,
  history: [
    {
      status: 'processing',
      message: 'Order is being prepared.',
      timestamp: new Date().toISOString(),
    },
  ],
};

export const mockCoupons: Coupon[] = [
  { code: 'WELCOME10', discountType: 'percentage', discountValue: 10 },
  { code: 'SHIPFREE', discountType: 'fixed', discountValue: 3000 },
];
