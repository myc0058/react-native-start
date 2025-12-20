export { NavigationContainer } from './NavigationContainer';
export { RootNavigator } from './RootNavigator';
export { AuthNavigator } from './AuthNavigator';
export { MainTabNavigator } from './MainTabNavigator';

// Types
export type {
  RootStackParamList,
  AuthStackParamList,
  MainTabParamList,
  HomeStackParamList,
  ShopStackParamList,
  CartStackParamList,
  OrdersStackParamList,
  ProfileStackParamList,
} from './types';

// Navigation hooks
export {
  useRootNavigation,
  useHomeNavigation,
  useHomeRoute,
  useShopNavigation,
  useShopRoute,
  useCartNavigation,
  useCartRoute,
  useOrdersNavigation,
  useOrdersRoute,
  useProfileNavigation,
  useProfileRoute,
} from './hooks';

export type {
  RootNavigationProp,
  HomeNavigationProp,
  ShopNavigationProp,
  CartNavigationProp,
  OrdersNavigationProp,
  ProfileNavigationProp,
} from './hooks';
