import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  RootStackParamList,
  HomeStackParamList,
  ShopStackParamList,
  CartStackParamList,
  OrdersStackParamList,
  ProfileStackParamList,
} from './types';

// Root navigation
export type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export const useRootNavigation = () => useNavigation<RootNavigationProp>();

// Home stack
export type HomeNavigationProp = NativeStackNavigationProp<HomeStackParamList>;
export const useHomeNavigation = () => useNavigation<HomeNavigationProp>();
export const useHomeRoute = <T extends keyof HomeStackParamList>() =>
  useRoute<RouteProp<HomeStackParamList, T>>();

// Shop stack
export type ShopNavigationProp = NativeStackNavigationProp<ShopStackParamList>;
export const useShopNavigation = () => useNavigation<ShopNavigationProp>();
export const useShopRoute = <T extends keyof ShopStackParamList>() =>
  useRoute<RouteProp<ShopStackParamList, T>>();

// Cart stack
export type CartNavigationProp = NativeStackNavigationProp<CartStackParamList>;
export const useCartNavigation = () => useNavigation<CartNavigationProp>();
export const useCartRoute = <T extends keyof CartStackParamList>() =>
  useRoute<RouteProp<CartStackParamList, T>>();

// Orders stack
export type OrdersNavigationProp = NativeStackNavigationProp<OrdersStackParamList>;
export const useOrdersNavigation = () => useNavigation<OrdersNavigationProp>();
export const useOrdersRoute = <T extends keyof OrdersStackParamList>() =>
  useRoute<RouteProp<OrdersStackParamList, T>>();

// Profile stack
export type ProfileNavigationProp = NativeStackNavigationProp<ProfileStackParamList>;
export const useProfileNavigation = () => useNavigation<ProfileNavigationProp>();
export const useProfileRoute = <T extends keyof ProfileStackParamList>() =>
  useRoute<RouteProp<ProfileStackParamList, T>>();
