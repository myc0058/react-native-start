import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { colors } from '@/design/colors';
import { spacing } from '@/design/spacing';
import { typography } from '@/design/typography';
import { TextInput } from '@/ui/Input/TextInput';
import { Chip } from '@/ui/Chip/Chip';
import { Button } from '@/ui/Button/Button';
import { useCart } from '@/hooks/useCart';
import { useCartNavigation } from '@/navigation/hooks';
import { useCreateOrder } from '@/hooks/useOrders';
import { PaymentType } from '@/types/order.types';

const PAYMENT_OPTIONS: PaymentType[] = ['card', 'bank', 'mobile', 'cash'];

export function CheckoutScreen() {
  const navigation = useCartNavigation();
  const { items, coupon, subtotal, discount, shipping, tax, total, clearCart } = useCart();
  const { createOrder, isLoading } = useCreateOrder();

  const [address, setAddress] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Korea',
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentType>('card');

  const summary = useMemo(
    () => [
      { label: 'Subtotal', value: subtotal },
      { label: 'Discount', value: -discount },
      { label: 'Shipping', value: shipping },
      { label: 'Tax', value: tax },
      { label: 'Total', value: total, isTotal: true },
    ],
    [discount, shipping, subtotal, tax, total]
  );

  const handleChange = (key: keyof typeof address, value: string) => {
    setAddress((prev) => ({ ...prev, [key]: value }));
  };

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      Alert.alert('Cart is empty');
      return;
    }

    const hasEmptyField = ['name', 'phone', 'street', 'city', 'zipCode'].some(
      (key) => !(address as any)[key]
    );
    if (hasEmptyField) {
      Alert.alert('Please fill shipping details');
      return;
    }

    const order = await createOrder({
      items: items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
      })),
      shippingAddress: address,
      billingAddress: address,
      paymentMethod,
      couponCode: coupon?.code,
    });

    if (order) {
      clearCart();
      navigation.replace('OrderConfirm', { orderId: order.id });
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Shipping</Text>
      <View style={styles.form}>
        <TextInput label="Name" value={address.name} onChangeText={(v) => handleChange('name', v)} />
        <TextInput
          label="Phone"
          keyboardType="phone-pad"
          value={address.phone}
          onChangeText={(v) => handleChange('phone', v)}
        />
        <TextInput
          label="Street"
          value={address.street}
          onChangeText={(v) => handleChange('street', v)}
        />
        <TextInput
          label="City"
          value={address.city}
          onChangeText={(v) => handleChange('city', v)}
        />
        <TextInput
          label="State"
          value={address.state}
          onChangeText={(v) => handleChange('state', v)}
        />
        <TextInput
          label="Zip Code"
          keyboardType="number-pad"
          value={address.zipCode}
          onChangeText={(v) => handleChange('zipCode', v)}
        />
        <TextInput label="Country" value={address.country} editable={false} />
      </View>

      <Text style={styles.title}>Payment</Text>
      <View style={styles.optionsRow}>
        {PAYMENT_OPTIONS.map((option) => (
          <Chip
            key={option}
            label={option.toUpperCase()}
            selected={paymentMethod === option}
            onPress={() => setPaymentMethod(option)}
          />
        ))}
      </View>

      <View style={styles.summary}>
        <Text style={styles.title}>Summary</Text>
        {summary.map((item) => (
          <View style={styles.row} key={item.label}>
            <Text style={[styles.label, item.isTotal && styles.totalLabel]}>{item.label}</Text>
            <Text style={[styles.value, item.isTotal && styles.totalValue]}>
              {formatCurrency(item.value)}
            </Text>
          </View>
        ))}
      </View>

      <Button gradient fullWidth loading={isLoading} onPress={handlePlaceOrder}>
        Place Order
      </Button>
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
  title: {
    ...typography.heading.h5,
    color: colors.text.primary,
  },
  form: {
    gap: spacing.sm,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  summary: {
    gap: spacing.xs,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border.light,
  },
  row: {
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
  totalLabel: {
    ...typography.heading.h5,
  },
  totalValue: {
    ...typography.heading.h5,
  },
});
