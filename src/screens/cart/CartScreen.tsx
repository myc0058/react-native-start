import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { colors } from '@/design/colors';
import { spacing } from '@/design/spacing';
import { radius } from '@/design/radius';
import { typography } from '@/design/typography';
import { Button } from '@/ui/Button/Button';
import { TextInput } from '@/ui/Input/TextInput';
import { useCart } from '@/hooks/useCart';
import { useCartNavigation } from '@/navigation/hooks';
import { QuantitySelector } from '../components/QuantitySelector';
import { EmptyState } from '../components/EmptyState';

export function CartScreen() {
  const navigation = useCartNavigation();
  const {
    items,
    coupon,
    subtotal,
    discount,
    shipping,
    tax,
    total,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyCoupon,
    isLoading,
  } = useCart();
  const [couponCode, setCouponCode] = useState('');

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    await applyCoupon(couponCode.trim());
    setCouponCode('');
  };

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <EmptyState
          title="Your cart is empty"
          description="Add items to checkout faster."
          actionLabel="Browse products"
          onActionPress={() => navigation.getParent()?.navigate('Shop')}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.row}>
              <Image source={{ uri: item.product.images?.[0] }} style={styles.thumb} />
              <View style={styles.info}>
                <Text style={styles.title}>{item.product.name}</Text>
                <Text style={styles.meta}>
                  {item.selectedColor ? `${item.selectedColor} • ` : ''}
                  {item.selectedSize || ''}
                </Text>
                <Text style={styles.price}>{formatCurrency(item.product.price)}</Text>
                <View style={styles.controls}>
                  <QuantitySelector
                    value={item.quantity}
                    onChange={(value) => updateQuantity(item.id, value)}
                  />
                  <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                    <Text style={styles.remove}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      />

      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Order Summary</Text>

        <View style={styles.rowBetween}>
          <Text style={styles.label}>Subtotal</Text>
          <Text style={styles.value}>{formatCurrency(subtotal)}</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.label}>Discount</Text>
          <Text style={styles.value}>-{formatCurrency(discount)}</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.label}>Shipping</Text>
          <Text style={styles.value}>{formatCurrency(shipping)}</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.label}>Tax</Text>
          <Text style={styles.value}>{formatCurrency(tax)}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.rowBetween}>
          <Text style={styles.total}>Total</Text>
          <Text style={styles.total}>{formatCurrency(total)}</Text>
        </View>

        <View style={styles.couponRow}>
          <TextInput
            placeholder="Coupon code"
            value={couponCode}
            onChangeText={setCouponCode}
            autoCapitalize="characters"
            style={styles.couponInput}
          />
          <Button size="sm" onPress={handleApplyCoupon} loading={isLoading}>
            Apply
          </Button>
        </View>
        {coupon ? <Text style={styles.applied}>Applied: {coupon.code}</Text> : null}

        <View style={styles.actions}>
          <Button variant="secondary" onPress={clearCart}>
            Clear cart
          </Button>
          <Button gradient onPress={() => navigation.navigate('Checkout')}>
            Checkout
          </Button>
        </View>
      </View>
    </View>
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
  listContent: {
    padding: spacing.lg,
    paddingBottom: spacing.sm,
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.background.secondary,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  thumb: {
    width: 90,
    height: 90,
    borderRadius: radius.md,
    backgroundColor: colors.background.tertiary,
  },
  info: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
  },
  meta: {
    color: colors.text.secondary,
    fontSize: typography.fontSize.sm,
  },
  price: {
    color: colors.text.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  remove: {
    color: colors.error.main,
    fontSize: typography.fontSize.sm,
  },
  summary: {
    padding: spacing.lg,
    gap: spacing.sm,
    borderTopWidth: 1,
    borderColor: colors.border.light,
    backgroundColor: colors.background.secondary,
  },
  summaryTitle: {
    ...typography.heading.h5,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: colors.text.secondary,
  },
  value: {
    color: colors.text.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border.light,
    marginVertical: spacing.sm,
  },
  total: {
    ...typography.heading.h5,
    color: colors.text.primary,
  },
  couponRow: {
    marginTop: spacing.sm,
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'center',
  },
  couponInput: {
    flex: 1,
  },
  applied: {
    marginTop: spacing.xs,
    color: colors.text.secondary,
    fontSize: typography.fontSize.sm,
  },
  actions: {
    marginTop: spacing.md,
    gap: spacing.sm,
  },
});
