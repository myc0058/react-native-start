import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/design/colors';
import { spacing } from '@/design/spacing';
import { typography } from '@/design/typography';
import { CATEGORIES } from '@/constants/categories';
import { useFeaturedProducts, useProducts } from '@/hooks/useProducts';
import { useHomeNavigation } from '@/navigation/hooks';
import { ProductCard } from '../components/ProductCard';
import { SectionHeader } from '../components/SectionHeader';
import { EmptyState } from '../components/EmptyState';

export function HomeScreen() {
  const navigation = useHomeNavigation();
  const { featuredProducts, isLoading: featuredLoading } = useFeaturedProducts();
  const {
    products,
    isLoading,
    fetchProducts,
    refresh,
  } = useProducts({ sort: 'popular' });

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const renderFeatured = () => (
    <FlatList
      data={featuredProducts}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{ width: spacing.md }} />}
      contentContainerStyle={styles.horizontalList}
      renderItem={({ item }) => (
        <View style={{ width: 260 }}>
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
          />
        </View>
      )}
      ListEmptyComponent={
        !featuredLoading ? (
          <EmptyState title="No featured products yet" />
        ) : null
      }
    />
  );

  const renderCategories = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.categories}
    >
      {CATEGORIES.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={styles.categoryChip}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('Category', {
              categoryId: category.id,
              categoryName: category.name,
            })
          }
        >
          <Text style={styles.categoryIcon}>◎</Text>
          <Text style={styles.categoryText}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <LinearGradient
          colors={colors.gradients.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <View style={styles.heroText}>
            <Text style={styles.heroTitle}>Find your next favorite</Text>
            <Text style={styles.heroSubtitle}>
              Discover curated picks and exclusive drops every day.
            </Text>
            <TouchableOpacity
              style={styles.heroButton}
              onPress={() =>
                navigation.navigate('Category', { categoryId: '', categoryName: 'All' })
              }
            >
              <Text style={styles.heroButtonText}>Browse</Text>
              <Ionicons name="arrow-forward" size={16} color={colors.text.primary} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>

      <SectionHeader title="Categories" />
      {renderCategories()}

      <SectionHeader title="Featured" />
      {renderFeatured()}

      <SectionHeader title="Trending" actionLabel="See all" onPressAction={() => navigation.navigate('Category', { categoryId: '', categoryName: 'All' })} />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        scrollEnabled={false}
        contentContainerStyle={styles.grid}
        refreshControl={undefined}
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
            <EmptyState title="No products found" onActionPress={refresh} actionLabel="Reload" />
          ) : null
        }
      />
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
    paddingBottom: spacing['2xl'],
    gap: spacing.xl,
  },
  hero: {
    width: '100%',
  },
  heroCard: {
    padding: spacing.xl,
    borderRadius: spacing.lg,
  },
  heroText: {
    gap: spacing.sm,
  },
  heroTitle: {
    ...typography.heading.h3,
    color: colors.text.primary,
  },
  heroSubtitle: {
    color: colors.text.primary,
    opacity: 0.85,
    fontSize: typography.fontSize.md,
  },
  heroButton: {
    marginTop: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.background.secondary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: spacing.lg,
  },
  heroButtonText: {
    color: colors.text.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  categories: {
    gap: spacing.sm,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border.light,
    marginRight: spacing.sm,
    gap: spacing.xs,
  },
  categoryIcon: {
    color: colors.text.secondary,
    fontSize: typography.fontSize.md,
  },
  categoryText: {
    color: colors.text.primary,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
  horizontalList: {
    paddingRight: spacing.lg,
  },
  grid: {
    gap: spacing.lg,
  },
  gridRow: {
    gap: spacing.lg,
  },
  gridItem: {
    flex: 1,
  },
});
