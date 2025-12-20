import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartStackParamList } from '../types';
import { colors } from '@/design/colors';
import { typography } from '@/design/typography';

// Placeholder screens - replace with actual screens
import { View, Text, StyleSheet } from 'react-native';

const CartScreen = () => (
  <View style={styles.placeholder}>
    <Text style={styles.text}>Cart Screen</Text>
  </View>
);

const CheckoutScreen = () => (
  <View style={styles.placeholder}>
    <Text style={styles.text}>Checkout Screen</Text>
  </View>
);

const OrderConfirmScreen = () => (
  <View style={styles.placeholder}>
    <Text style={styles.text}>Order Confirm Screen</Text>
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
        options={{ headerTitle: '장바구니' }}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{ headerTitle: '결제' }}
      />
      <Stack.Screen
        name="OrderConfirm"
        component={OrderConfirmScreen}
        options={{
          headerTitle: '주문 완료',
          headerBackVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
