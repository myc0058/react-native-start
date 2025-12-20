import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { colors } from '@/design/colors';
import { spacing } from '@/design/spacing';
import { useProducts } from '@/hooks/useProducts';
import { useHomeRoute, useHomeNavigation } from '@/navigation/hooks';
import { ProductCard } from '../components/ProductCard';
import { EmptyState } from '../components/EmptyState';

export function CategoryScreen() {
  const route = useHomeRoute<'Category'>();
  const navigation = useHomeNavigation();
  const { products, isLoading, fetchProducts, refresh, loadMore, hasMore } = useProducts({
    categoryId: route.params.categoryId || undefined,
  });

  useEffect(() => {
    fetchProducts({ categoryId: route.params.categoryId || undefined });
  }, [fetchProducts, route.params.categoryId]);

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={products}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      onEndReachedThreshold={0.4}
      onEndReached={() => hasMore && loadMore()}
      renderItem={({ item }) => (
        <View style={styles.gridItem}>
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
          />
        </View>
      )}
      refreshing={isLoading}
      onRefresh={refresh}
      ListEmptyComponent={
        !isLoading ? (
          <EmptyState
            title="No products in this category"
            actionLabel="Reload"
            onActionPress={() => fetchProducts({ categoryId: route.params.categoryId })}
          />
        ) : null
      }
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
    paddingBottom: spacing['2xl'],
    gap: spacing.lg,
  },
  row: {
    gap: spacing.lg,
  },
  gridItem: {
    flex: 1,
  },
});
