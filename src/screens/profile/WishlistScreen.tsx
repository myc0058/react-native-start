import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { colors } from '@/design/colors';
import { spacing } from '@/design/spacing';
import { useWishlist } from '@/hooks/useWishlist';
import { useProfileNavigation } from '@/navigation/hooks';
import { ProductCard } from '../components/ProductCard';
import { EmptyState } from '../components/EmptyState';

export function WishlistScreen() {
  const navigation = useProfileNavigation();
  const { items, toggleWishlist, isInWishlist } = useWishlist();

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <EmptyState
          title="No items in wishlist"
          description="Tap the heart on a product to save it."
          actionLabel="Browse"
          onActionPress={() => navigation.getParent()?.navigate('Shop')}
        />
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={items}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      renderItem={({ item }) => (
        <View style={styles.gridItem}>
          <ProductCard
            product={item}
            onPress={() =>
              navigation
                .getParent()
                ?.navigate('Shop', { screen: 'ProductDetail', params: { productId: item.id } })
            }
            onToggleWishlist={() => toggleWishlist(item)}
            isWishlisted={isInWishlist(item.id)}
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  row: {
    gap: spacing.lg,
  },
  gridItem: {
    flex: 1,
  },
});
