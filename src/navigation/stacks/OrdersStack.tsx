import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OrdersStackParamList } from '../types';
import { colors } from '@/design/colors';
import { typography } from '@/design/typography';

// Placeholder screens - replace with actual screens
import { View, Text, StyleSheet } from 'react-native';

const OrderHistoryScreen = () => (
  <View style={styles.placeholder}>
    <Text style={styles.text}>Order History Screen</Text>
  </View>
);

const OrderDetailScreen = () => (
  <View style={styles.placeholder}>
    <Text style={styles.text}>Order Detail Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
  },
  text: {
    fontSize: 18,
    color: colors.text.secondary,
  },
});

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
        options={{ headerTitle: '주문 내역' }}
      />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetailScreen}
        options={{ headerTitle: '주문 상세' }}
      />
    </Stack.Navigator>
  );
}
