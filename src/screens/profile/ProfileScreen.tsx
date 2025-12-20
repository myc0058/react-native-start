import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/design/colors';
import { spacing } from '@/design/spacing';
import { radius } from '@/design/radius';
import { typography } from '@/design/typography';
import { Button } from '@/ui/Button/Button';
import { useAuth } from '@/hooks/useAuth';
import { useProfileNavigation } from '@/navigation/hooks';
import { useWishlist } from '@/hooks/useWishlist';

export function ProfileScreen() {
  const navigation = useProfileNavigation();
  const { user, logout } = useAuth();
  const { itemCount } = useWishlist();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.name?.[0]?.toUpperCase() || '?'}</Text>
        </View>
        <View>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <TouchableOpacity
          style={styles.row}
          onPress={() => navigation.getParent()?.navigate('Orders')}
        >
          <Ionicons name="cube-outline" size={20} color={colors.text.primary} />
          <Text style={styles.rowText}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => navigation.navigate('Wishlist')}
        >
          <Ionicons name="heart-outline" size={20} color={colors.text.primary} />
          <Text style={styles.rowText}>Wishlist ({itemCount})</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Addresses')}>
          <Ionicons name="location-outline" size={20} color={colors.text.primary} />
          <Text style={styles.rowText}>Addresses</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings-outline" size={20} color={colors.text.primary} />
          <Text style={styles.rowText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('EditProfile')}>
          <Ionicons name="create-outline" size={20} color={colors.text.primary} />
          <Text style={styles.rowText}>Edit profile</Text>
        </TouchableOpacity>
      </View>

      <Button variant="outline" fullWidth onPress={logout}>
        Log out
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    padding: spacing.lg,
    gap: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: radius.full,
    backgroundColor: colors.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    ...typography.heading.h4,
    color: colors.text.primary,
  },
  name: {
    ...typography.heading.h4,
    color: colors.text.primary,
  },
  email: {
    color: colors.text.secondary,
  },
  card: {
    backgroundColor: colors.background.secondary,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.light,
    padding: spacing.md,
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  rowText: {
    color: colors.text.primary,
    fontSize: typography.fontSize.md,
  },
});
