import { Address } from './order.types';

/**
 * User Types
 */

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  createdAt: string;
}

export type UserRole = 'customer' | 'admin';

export interface UserProfile extends User {
  addresses: Address[];
  wishlist: string[]; // product IDs
  orderCount: number;
  points: number;
  verified: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

export interface UpdateProfileData {
  name?: string;
  phone?: string;
  avatar?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}
