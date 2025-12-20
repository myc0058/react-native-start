import React, { useEffect, useMemo, useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { colors } from '@/design/colors';
import { spacing } from '@/design/spacing';
import { typography } from '@/design/typography';
import { useProducts } from '@/hooks/useProducts';
import { useShopNavigation, useShopRoute } from '@/navigation/hooks';
import { ProductCard } from '../components/ProductCard';
import { SectionHeader } from '../components/SectionHeader';
import { EmptyState } from '../components/EmptyState';
import { Chip } from '@/ui/Chip/Chip';

const SORT_OPTIONS = [
  { label: 'Popular', value: 'popular' },
  { label: 'Latest', value: 'latest' },
  { label: 'Price ↑', value: 'price-asc' },
  { label: 'Price ↓', value: 'price-desc' },
  { label: 'Rating', value: 'rating' },
];

export function ProductListScreen() {
  const route = useShopRoute<'ProductList'>();
  const navigation = useShopNavigation();
  const [sortBy, setSortBy] = useState<string>('popular');

  const initialParams = useMemo(
    () => ({
      categoryId: route.params?.categoryId,
      search: route.params?.query,
      sort: sortBy,
    }),
    [route.params?.categoryId, route.params?.query, sortBy]
  );

  const {
    products,
    isLoading,
    fetchProducts,
    refresh,
    loadMore,
    hasMore,
  } = useProducts(initialParams);

  useEffect(() => {
    fetchProducts(initialParams);
  }, [fetchProducts, initialParams]);

  const headerTitle = route.params?.query
    ? `Results for "${route.params.query}"`
    : route.params?.categoryId
    ? 'Category'
    : 'All Products';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{headerTitle}</Text>
        <View style={styles.sortRow}>
          {SORT_OPTIONS.map((option) => (
            <Chip
              key={option.value}
              label={option.label}
              selected={sortBy === option.value}
              onPress={() => setSortBy(option.value)}
            />
          ))}
        </View>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        onEndReachedThreshold={0.3}
        onEndReached={() => hasMore && loadMore()}
        refreshing={isLoading}
        onRefresh={refresh}
        renderItem={({ item }) => (
          <View style={styles.gridItem}>
            <ProductCard
              product={item}
              onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
            />
          </View>
        )}
        ListEmptyComponent={
          !isLoading ? (
            <EmptyState
              title="No products found"
              description="Try adjusting filters or search."
              actionLabel="Reload"
              onActionPress={() => fetchProducts(initialParams)}
            />
          ) : null
        }
        ListHeaderComponent={<SectionHeader title="Shop" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
    gap: spacing.sm,
  },
  title: {
    ...typography.heading.h4,
    color: colors.text.primary,
  },
  sortRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
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
