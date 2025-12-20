import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/design/colors';
import { spacing } from '@/design/spacing';
import { radius } from '@/design/radius';
import { typography } from '@/design/typography';
import { Button } from '@/ui/Button/Button';
import { Chip } from '@/ui/Chip/Chip';
import { GlassCard } from '@/ui/GlassCard/GlassCard';
import { useProductDetail } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { HomeStackParamList, ShopStackParamList } from '@/navigation/types';
import { EmptyState } from '../components/EmptyState';

type ProductDetailRoute =
  | RouteProp<HomeStackParamList, 'ProductDetail'>
  | RouteProp<ShopStackParamList, 'ProductDetail'>;

export function ProductDetailScreen() {
  const route = useRoute<ProductDetailRoute>();
  const { productId } = route.params;
  const { product, reviews, isLoading, fetchProduct, fetchReviews } = useProductDetail();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();

  useEffect(() => {
    fetchProduct(productId);
    fetchReviews(productId);
  }, [fetchProduct, fetchReviews, productId]);

  const hasDiscount = useMemo(
    () => product?.originalPrice && product.originalPrice > product.price,
    [product]
  );

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, 1, { color: selectedColor, size: selectedSize });
  };

  const handleToggleWishlist = () => {
    if (!product) return;
    toggleWishlist(product);
  };

  if (isLoading && !product) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary[400]} />
      </View>
    );
  }

  if (!product) {
    return (
      <EmptyState
        title="Product not found"
        description="This item is unavailable right now."
        actionLabel="Go back"
      />
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: product.images?.[0] }} style={styles.image} contentFit="cover" />
        <TouchableOpacity style={styles.wishlist} onPress={handleToggleWishlist}>
          <Ionicons
            name={isInWishlist(product.id) ? 'heart' : 'heart-outline'}
            size={18}
            color={isInWishlist(product.id) ? colors.error.main : colors.text.primary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.title}>{product.name}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatCurrency(product.price)}</Text>
          {hasDiscount ? (
            <Text style={styles.originalPrice}>{formatCurrency(product.originalPrice!)}</Text>
          ) : null}
        </View>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={14} color={colors.primary[400]} />
          <Text style={styles.rating}>{product.rating.toFixed(1)}</Text>
          <Text style={styles.reviewCount}>({product.reviewCount} reviews)</Text>
        </View>
      </View>

      {product.colors && product.colors.length > 0 ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Color</Text>
          <View style={styles.optionsRow}>
            {product.colors.map((color) => (
              <Chip
                key={color.name}
                label={color.name}
                selected={selectedColor === color.name}
                onPress={() => setSelectedColor(color.name)}
                style={{ backgroundColor: selectedColor === color.name ? color.hex : undefined }}
              />
            ))}
          </View>
        </View>
      ) : null}

      {product.sizes && product.sizes.length > 0 ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Size</Text>
          <View style={styles.optionsRow}>
            {product.sizes.map((size) => (
              <Chip
                key={size.value}
                label={size.name}
                selected={selectedSize === size.value}
                onPress={() => setSelectedSize(size.value)}
              />
            ))}
          </View>
        </View>
      ) : null}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>

      {product.specifications ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Specs</Text>
          <View style={styles.specs}>
            {Object.entries(product.specifications).map(([key, value]) => (
              <GlassCard key={key} style={styles.specCard}>
                <Text style={styles.specKey}>{key}</Text>
                <Text style={styles.specValue}>{value}</Text>
              </GlassCard>
            ))}
          </View>
        </View>
      ) : null}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reviews</Text>
        {reviews.length === 0 ? (
          <Text style={styles.muted}>No reviews yet</Text>
        ) : (
          reviews.map((review) => (
            <GlassCard key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewAuthor}>{review.userName}</Text>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={14} color={colors.primary[400]} />
                  <Text style={styles.rating}>{review.rating.toFixed(1)}</Text>
                </View>
              </View>
              <Text style={styles.reviewText}>{review.comment}</Text>
            </GlassCard>
          ))
        )}
      </View>

      <View style={styles.ctaBar}>
        <View>
          <Text style={styles.muted}>Price</Text>
          <Text style={styles.price}>{formatCurrency(product.price)}</Text>
        </View>
        <Button fullWidth gradient onPress={handleAddToCart}>
          Add to Cart
        </Button>
      </View>
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
    paddingBottom: spacing['3xl'],
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.primary,
  },
  imageWrapper: {
    height: 340,
    backgroundColor: colors.background.tertiary,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  wishlist: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.lg,
    backgroundColor: colors.background.secondary,
    borderRadius: radius.full,
    padding: spacing.sm,
  },
  header: {
    padding: spacing.lg,
    gap: spacing.xs,
  },
  brand: {
    color: colors.text.secondary,
    fontSize: typography.fontSize.sm,
    textTransform: 'uppercase',
  },
  title: {
    ...typography.heading.h4,
    color: colors.text.primary,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  price: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  originalPrice: {
    color: colors.text.tertiary,
    textDecorationLine: 'line-through',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  rating: {
    color: colors.text.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  reviewCount: {
    color: colors.text.secondary,
    fontSize: typography.fontSize.sm,
  },
  section: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  sectionTitle: {
    ...typography.heading.h5,
    color: colors.text.primary,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  description: {
    color: colors.text.secondary,
    lineHeight: 20,
  },
  specs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  specCard: {
    padding: spacing.md,
    borderRadius: radius.lg,
    minWidth: 140,
  },
  specKey: {
    color: colors.text.secondary,
    fontSize: typography.fontSize.sm,
    marginBottom: spacing.xs,
  },
  specValue: {
    color: colors.text.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  reviewCard: {
    padding: spacing.md,
    borderRadius: radius.lg,
    gap: spacing.xs,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewAuthor: {
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
  },
  reviewText: {
    color: colors.text.secondary,
    lineHeight: 20,
  },
  muted: {
    color: colors.text.secondary,
    fontSize: typography.fontSize.sm,
  },
  ctaBar: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderColor: colors.border.light,
    backgroundColor: colors.background.primary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
});
