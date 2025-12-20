import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { colors } from '@/design/colors';
import { spacing } from '@/design/spacing';
import { typography } from '@/design/typography';
import { SearchInput } from '@/ui/Input/SearchInput';
import { Chip } from '@/ui/Chip/Chip';
import { useSearch } from '@/hooks/useSearch';
import { useShopNavigation } from '@/navigation/hooks';
import { ProductCard } from '../components/ProductCard';
import { EmptyState } from '../components/EmptyState';

export function SearchScreen() {
  const navigation = useShopNavigation();
  const {
    query,
    setQuery,
    results,
    isLoading,
    recentSearches,
    clearSearch,
    clearRecentSearches,
  } = useSearch(400);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchInput value={query} onChangeText={setQuery} onClear={clearSearch} />
        <View style={styles.recentRow}>
          <Text style={styles.recentTitle}>Recent</Text>
          <TouchableOpacity onPress={clearRecentSearches}>
            <Text style={styles.clear}>Clear</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.recentChips}>
          {recentSearches.length === 0 ? (
            <Text style={styles.muted}>No recent searches</Text>
          ) : (
            recentSearches.map((item) => (
              <Chip key={item} label={item} onPress={() => setQuery(item)} />
            ))
          )}
        </View>
      </View>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.content}
        refreshing={isLoading}
        onRefresh={() => setQuery(query)}
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
              title="Search for products"
              description="Try typing at least two characters."
            />
          ) : null
        }
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
    padding: spacing.lg,
    gap: spacing.sm,
  },
  recentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recentTitle: {
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
  },
  clear: {
    color: colors.primary[400],
    fontSize: typography.fontSize.sm,
  },
  recentChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  muted: {
    color: colors.text.secondary,
  },
  content: {
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
