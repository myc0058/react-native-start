import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { colors } from '@/design/colors';
import { spacing } from '@/design/spacing';
import { radius } from '@/design/radius';
import { typography } from '@/design/typography';
import { TextInput } from '@/ui/Input/TextInput';
import { Button } from '@/ui/Button/Button';
import { UsersService } from '@/services/users.service';
import { Address } from '@/types/order.types';
import { EmptyState } from '../components/EmptyState';

const EMPTY_FORM: Omit<Address, 'id'> = {
  name: '',
  phone: '',
  street: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'Korea',
};

export function AddressesScreen() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [form, setForm] = useState<Omit<Address, 'id'>>(EMPTY_FORM);
  const [isLoading, setIsLoading] = useState(false);

  const loadAddresses = async () => {
    setIsLoading(true);
    try {
      const data = await UsersService.getAddresses();
      setAddresses(data);
    } catch (error) {
      // ignore load error for now
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  const handleChange = (key: keyof Omit<Address, 'id'>, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleAdd = async () => {
    const hasEmpty = ['name', 'phone', 'street', 'city', 'zipCode'].some((key) => !(form as any)[key]);
    if (hasEmpty) {
      Alert.alert('Please fill all required fields');
      return;
    }

    setIsLoading(true);
    try {
      const created = await UsersService.addAddress(form);
      setAddresses((prev) => [...prev, created]);
      setForm(EMPTY_FORM);
    } catch {
      Alert.alert('Failed to add address');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    setIsLoading(true);
    try {
      await UsersService.deleteAddress(id);
      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    } catch {
      Alert.alert('Failed to delete address');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Saved addresses</Text>
      {addresses.length === 0 && !isLoading ? (
        <EmptyState title="No addresses" description="Add a shipping address to reuse it." />
      ) : (
        addresses.map((addr) => (
          <View key={addr.id} style={styles.card}>
            <Text style={styles.name}>{addr.name}</Text>
            <Text style={styles.meta}>{addr.phone}</Text>
            <Text style={styles.meta}>{addr.street}</Text>
            <Text style={styles.meta}>
              {addr.city}, {addr.state} {addr.zipCode}
            </Text>
            <Text style={styles.meta}>{addr.country}</Text>
            <TouchableOpacity onPress={() => handleDelete(addr.id)}>
              <Text style={styles.delete}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))
      )}

      <Text style={styles.title}>Add new</Text>
      <View style={styles.form}>
        <TextInput label="Name" value={form.name} onChangeText={(v) => handleChange('name', v)} />
        <TextInput
          label="Phone"
          keyboardType="phone-pad"
          value={form.phone}
          onChangeText={(v) => handleChange('phone', v)}
        />
        <TextInput
          label="Street"
          value={form.street}
          onChangeText={(v) => handleChange('street', v)}
        />
        <TextInput label="City" value={form.city} onChangeText={(v) => handleChange('city', v)} />
        <TextInput
          label="State"
          value={form.state}
          onChangeText={(v) => handleChange('state', v)}
        />
        <TextInput
          label="Zip code"
          keyboardType="number-pad"
          value={form.zipCode}
          onChangeText={(v) => handleChange('zipCode', v)}
        />
        <TextInput label="Country" value={form.country} editable={false} />
      </View>

      <Button fullWidth gradient loading={isLoading} onPress={handleAdd}>
        Save address
      </Button>
    </ScrollView>
  );
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
  title: {
    ...typography.heading.h5,
    color: colors.text.primary,
  },
  card: {
    backgroundColor: colors.background.secondary,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.light,
    padding: spacing.md,
    gap: spacing.xs,
  },
  name: {
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
  },
  meta: {
    color: colors.text.secondary,
    fontSize: typography.fontSize.sm,
  },
  delete: {
    color: colors.error.main,
    fontSize: typography.fontSize.sm,
  },
  form: {
    gap: spacing.sm,
  },
});
