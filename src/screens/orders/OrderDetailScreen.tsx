import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Image } from 'expo-image';
import { colors } from '@/design/colors';
import { spacing } from '@/design/spacing';
import { radius } from '@/design/radius';
import { typography } from '@/design/typography';
import { useOrdersNavigation, useOrdersRoute } from '@/navigation/hooks';
import { useOrderDetail } from '@/hooks/useOrders';
import { Button } from '@/ui/Button/Button';
import { EmptyState } from '../components/EmptyState';

export function OrderDetailScreen() {
  const route = useOrdersRoute<'OrderDetail'>();
  const navigation = useOrdersNavigation();
  const { order, tracking, isLoading, fetchOrder, fetchTracking, cancelOrder } = useOrderDetail();

  useEffect(() => {
    fetchOrder(route.params.orderId);
    fetchTracking(route.params.orderId);
  }, [fetchOrder, fetchTracking, route.params.orderId]);

  const handleCancel = async () => {
    if (!order) return;
    const confirmed = await new Promise<boolean>((resolve) => {
      Alert.alert('Cancel order', 'Do you want to cancel this order?', [
        { text: 'No', style: 'cancel', onPress: () => resolve(false) },
        { text: 'Yes', style: 'destructive', onPress: () => resolve(true) },
      ]);
    });
    if (confirmed) {
      await cancelOrder(order.id);
    }
  };

  if (!order && !isLoading) {
    return <EmptyState title="Order not found" actionLabel="Back" onActionPress={() => navigation.goBack()} />;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.rowBetween}>
        <View>
          <Text style={styles.title}>Order #{order?.orderNumber}</Text>
          <Text style={styles.meta}>{order?.status.toUpperCase()}</Text>
        </View>
        <Button size="sm" variant="outline" onPress={() => navigation.goBack()}>
          Back
        </Button>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Items</Text>
        {order?.items.map((item) => (
          <View style={styles.itemRow} key={item.id}>
            <Image source={{ uri: item.product.images?.[0] }} style={styles.thumb} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.product.name}</Text>
              <Text style={styles.meta}>
                {item.selectedColor ? `${item.selectedColor} • ` : ''}
                {item.selectedSize || ''}
              </Text>
              <Text style={styles.meta}>Qty {item.quantity}</Text>
            </View>
            <Text style={styles.value}>{formatCurrency(item.total)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Summary</Text>
        <View style={styles.rowBetween}>
          <Text style={styles.label}>Subtotal</Text>
          <Text style={styles.value}>{formatCurrency(order?.subtotal || 0)}</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.label}>Shipping</Text>
          <Text style={styles.value}>{formatCurrency(order?.shipping || 0)}</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.label}>Tax</Text>
          <Text style={styles.value}>{formatCurrency(order?.tax || 0)}</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.total}>Total</Text>
          <Text style={styles.total}>{formatCurrency(order?.total || 0)}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shipping Address</Text>
        <Text style={styles.meta}>{order?.shippingAddress.name}</Text>
        <Text style={styles.meta}>{order?.shippingAddress.phone}</Text>
        <Text style={styles.meta}>
          {order?.shippingAddress.street}, {order?.shippingAddress.city}
        </Text>
        <Text style={styles.meta}>
          {order?.shippingAddress.state} {order?.shippingAddress.zipCode}
        </Text>
        <Text style={styles.meta}>{order?.shippingAddress.country}</Text>
      </View>

      {tracking ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tracking</Text>
          {tracking.history.map((event) => (
            <View style={styles.trackRow} key={event.timestamp}>
              <View style={styles.trackDot} />
              <View style={styles.trackInfo}>
                <Text style={styles.itemName}>{event.status.toUpperCase()}</Text>
                <Text style={styles.meta}>{event.message}</Text>
                <Text style={styles.meta}>{new Date(event.timestamp).toLocaleString()}</Text>
              </View>
            </View>
          ))}
        </View>
      ) : null}

      <View style={styles.actions}>
        <Button variant="secondary" onPress={() => navigation.navigate('OrderHistory')}>
          Back to list
        </Button>
        <Button variant="outline" onPress={handleCancel}>
          Cancel order
        </Button>
      </View>
    </ScrollView>
  );
}

function formatCurrency(value: number): string {
  return `₩${value.toLocaleString()}`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing['3xl'],
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    ...typography.heading.h4,
    color: colors.text.primary,
  },
  meta: {
    color: colors.text.secondary,
    fontSize: typography.fontSize.sm,
  },
  section: {
    backgroundColor: colors.background.secondary,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.light,
    padding: spacing.md,
    gap: spacing.sm,
  },
  sectionTitle: {
    ...typography.heading.h5,
    color: colors.text.primary,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: radius.md,
    backgroundColor: colors.background.tertiary,
  },
  itemInfo: {
    flex: 1,
    gap: spacing.xs,
  },
  itemName: {
    color: colors.text.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  label: {
    color: colors.text.secondary,
  },
  value: {
    color: colors.text.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  total: {
    ...typography.heading.h5,
    color: colors.text.primary,
  },
  trackRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  trackDot: {
    width: 10,
    height: 10,
    borderRadius: radius.full,
    backgroundColor: colors.primary[400],
    marginTop: spacing.xs,
  },
  trackInfo: {
    flex: 1,
    gap: spacing.xs,
  },
  actions: {
    gap: spacing.sm,
  },
});
