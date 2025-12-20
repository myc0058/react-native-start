import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/design/colors';
import { spacing } from '@/design/spacing';
import { typography } from '@/design/typography';
import { Button } from '@/ui/Button/Button';
import { useCartNavigation, useCartRoute } from '@/navigation/hooks';

export function OrderConfirmScreen() {
  const route = useCartRoute<'OrderConfirm'>();
  const navigation = useCartNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Ionicons name="checkmark-circle" size={64} color={colors.primary[400]} />
        <Text style={styles.title}>Order placed</Text>
        <Text style={styles.subtitle}>Order ID: {route.params.orderId}</Text>
      </View>

      <View style={styles.actions}>
        <Button variant="secondary" fullWidth onPress={() => navigation.popToTop()}>
          Continue shopping
        </Button>
        <Button
          fullWidth
          gradient
          onPress={() =>
            navigation.getParent()?.navigate('Orders', {
              screen: 'OrderHistory',
            })
          }
        >
          View orders
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.primary,
    padding: spacing.xl,
    gap: spacing['2xl'],
  },
  card: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    ...typography.heading.h4,
    color: colors.text.primary,
  },
  subtitle: {
    color: colors.text.secondary,
  },
  actions: {
    width: '100%',
    gap: spacing.sm,
  },
});
