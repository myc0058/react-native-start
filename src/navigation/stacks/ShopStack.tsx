import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ShopStackParamList } from '../types';
import { colors } from '@/design/colors';
import { typography } from '@/design/typography';
import { ProductListScreen, ProductDetailScreen, SearchScreen } from '@/screens';

const Stack = createNativeStackNavigator<ShopStackParamList>();

export function ShopStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background.secondary,
        },
        headerTitleStyle: {
          ...typography.heading.h4,
          color: colors.text.primary,
        },
        headerTintColor: colors.primary[400],
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.background.primary },
      }}
    >
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{ headerTitle: 'Shop' }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ headerTitle: '' }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerTitle: 'Search',
          animation: 'fade',
        }}
      />
    </Stack.Navigator>
  );
}
