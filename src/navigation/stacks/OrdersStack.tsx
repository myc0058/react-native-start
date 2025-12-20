import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OrdersStackParamList } from '../types';
import { colors } from '@/design/colors';
import { typography } from '@/design/typography';
import { OrderHistoryScreen, OrderDetailScreen } from '@/screens';

const Stack = createNativeStackNavigator<OrdersStackParamList>();

export function OrdersStack() {
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
        name="OrderHistory"
        component={OrderHistoryScreen}
        options={{ headerTitle: 'Orders' }}
      />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetailScreen}
        options={{ headerTitle: 'Order Detail' }}
      />
    </Stack.Navigator>
  );
}
