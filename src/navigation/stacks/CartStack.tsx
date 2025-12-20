import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartStackParamList } from '../types';
import { colors } from '@/design/colors';
import { typography } from '@/design/typography';
import { CartScreen, CheckoutScreen, OrderConfirmScreen } from '@/screens';

const Stack = createNativeStackNavigator<CartStackParamList>();

export function CartStack() {
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
        name="CartScreen"
        component={CartScreen}
        options={{ headerTitle: 'Cart' }}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{ headerTitle: 'Checkout' }}
      />
      <Stack.Screen
        name="OrderConfirm"
        component={OrderConfirmScreen}
        options={{
          headerTitle: 'Order Confirmation',
          headerBackVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
