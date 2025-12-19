import { NavigatorScreenParams } from '@react-navigation/native';

/**
 * Navigation Types
 */

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Shop: NavigatorScreenParams<ShopStackParamList>;
  Cart: NavigatorScreenParams<CartStackParamList>;
  Orders: NavigatorScreenParams<OrdersStackParamList>;
  Profile: NavigatorScreenParams<ProfileStackParamList>;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  ProductDetail: { productId: string };
  Category: { categoryId: string; categoryName: string };
};

export type ShopStackParamList = {
  ProductList: { categoryId?: string; query?: string };
  ProductDetail: { productId: string };
  Search: undefined;
};

export type CartStackParamList = {
  CartScreen: undefined;
  Checkout: undefined;
  OrderConfirm: { orderId: string };
};

export type OrdersStackParamList = {
  OrderHistory: undefined;
  OrderDetail: { orderId: string };
};

export type ProfileStackParamList = {
  ProfileScreen: undefined;
  Settings: undefined;
  EditProfile: undefined;
  Addresses: undefined;
  Wishlist: undefined;
};
