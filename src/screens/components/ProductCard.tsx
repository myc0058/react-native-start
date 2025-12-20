import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '@/types/product.types';
import { colors } from '@/design/colors';
import { spacing } from '@/design/spacing';
import { radius } from '@/design/radius';
import { typography } from '@/design/typography';
import { GlassCard } from '@/ui/GlassCard/GlassCard';

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
  onAddToCart?: () => void;
  onToggleWishlist?: () => void;
  isWishlisted?: boolean;
}

export function ProductCard({
  product,
  onPress,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}: ProductCardProps) {
  const hasDiscount =
    typeof product.originalPrice === 'number' && product.originalPrice > product.price;

  const handleAddToCart = (event: any) => {
    event.stopPropagation();
    onAddToCart?.();
  };

  const handleToggleWishlist = (event: any) => {
    event.stopPropagation();
    onToggleWishlist?.();
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.container}>
      <GlassCard style={styles.card}>
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: product.images?.[0] }}
            style={styles.image}
            contentFit="cover"
          />
          {product.isNew ? <Text style={styles.badge}>NEW</Text> : null}
          {onToggleWishlist ? (
            <TouchableOpacity style={styles.wishlist} onPress={handleToggleWishlist}>
              <Ionicons
                name={isWishlisted ? 'heart' : 'heart-outline'}
                size={18}
                color={isWishlisted ? colors.error.main : colors.text.secondary}
              />
            </TouchableOpacity>
          ) : null}
        </View>

        <Text numberOfLines={2} style={styles.name}>
          {product.name}
        </Text>
        <Text numberOfLines={1} style={styles.meta}>
          {product.brand} • {product.category.name}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatCurrency(product.price)}</Text>
          {hasDiscount && (
            <Text style={styles.originalPrice}>{formatCurrency(product.originalPrice!)}</Text>
          )}
        </View>

        <View style={styles.footer}>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={14} color={colors.primary[400]} />
            <Text style={styles.rating}>{product.rating.toFixed(1)}</Text>
            <Text style={styles.reviewCount}>({product.reviewCount})</Text>
          </View>

          {onAddToCart ? (
            <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
              <Ionicons name="cart" size={16} color={colors.text.primary} />
            </TouchableOpacity>
          ) : null}
        </View>
      </GlassCard>
    </TouchableOpacity>
  );
}

function formatCurrency(value: number): string {
  return `₩${value.toLocaleString()}`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  imageWrapper: {
    height: 160,
    borderRadius: radius.lg,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: colors.background.tertiary,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.primary[400],
    color: colors.text.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.full,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
  },
  wishlist: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: colors.background.secondary,
    borderRadius: radius.full,
    padding: spacing.xs,
  },
  name: {
    ...typography.body.lg,
    color: colors.text.primary,
  },
  meta: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  price: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
  },
  originalPrice: {
    fontSize: typography.fontSize.sm,
    color: colors.text.tertiary,
    textDecorationLine: 'line-through',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  rating: {
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  reviewCount: {
    fontSize: typography.fontSize.xs,
    color: colors.text.tertiary,
  },
  cartButton: {
    backgroundColor: colors.background.secondary,
    borderRadius: radius.full,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
});
