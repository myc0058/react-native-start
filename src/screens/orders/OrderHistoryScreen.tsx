import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { colors } from '@/design/colors';
import { spacing } from '@/design/spacing';
import { radius } from '@/design/radius';
import { typography } from '@/design/typography';
import { useOrders } from '@/hooks/useOrders';
import { useOrdersNavigation } from '@/navigation/hooks';
import { EmptyState } from '../components/EmptyState';

export function OrderHistoryScreen() {
  const navigation = useOrdersNavigation();
  const { orders, isLoading, fetchOrders, refresh } = useOrders();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={orders}
      keyExtractor={(item) => item.id}
      refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refresh} />}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.orderNumber}>#{item.orderNumber}</Text>
            <View style={styles.status}>
              <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
            </View>
          </View>
          <Text style={styles.meta}>{item.items.length} items</Text>
          <Text style={styles.total}>{formatCurrency(item.total)}</Text>
          <Text style={styles.meta}>{new Date(item.createdAt).toDateString()}</Text>
          <Text
            style={styles.link}
            onPress={() => navigation.navigate('OrderDetail', { orderId: item.id })}
          >
            View details
          </Text>
        </View>
      )}
      ListEmptyComponent={
        !isLoading ? (
          <EmptyState
            title="No orders yet"
            description="Place your first order to see it here."
          />
        ) : null
      }
    />
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
  },
  card: {
    padding: spacing.md,
    backgroundColor: colors.background.secondary,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.light,
    gap: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderNumber: {
    ...typography.heading.h5,
    color: colors.text.primary,
  },
  status: {
    backgroundColor: colors.background.tertiary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  statusText: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
    fontWeight: typography.fontWeight.semibold,
  },
  meta: {
    color: colors.text.secondary,
    fontSize: typography.fontSize.sm,
  },
  total: {
    color: colors.text.primary,
    fontWeight: typography.fontWeight.semibold,
    fontSize: typography.fontSize.lg,
  },
  link: {
    color: colors.primary[400],
    fontWeight: typography.fontWeight.semibold,
    marginTop: spacing.xs,
  },
});
