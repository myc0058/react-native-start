import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '@/design/colors';
import { radius } from '@/design/radius';
import { spacing } from '@/design/spacing';
import { typography } from '@/design/typography';

export type BadgeVariant = 'primary' | 'success' | 'error' | 'warning' | 'neutral';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  children: string | number;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  style?: ViewStyle;
}

export function Badge({ children, variant = 'primary', size = 'md', dot = false, style }: BadgeProps) {
  if (dot) {
    return <View style={[styles.dot, styles[`${variant}Dot`], style]} />;
  }

  return (
    <View style={[styles.base, styles[`${size}Container`], styles[`${variant}Container`], style]}>
      <Text style={[styles.text, styles[`${size}Text`], styles[`${variant}Text`]]}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.full,
  },

  // Sizes
  smContainer: {
    minWidth: 18,
    height: 18,
    paddingHorizontal: spacing.xs,
  },
  mdContainer: {
    minWidth: 24,
    height: 24,
    paddingHorizontal: spacing.sm,
  },

  smText: {
    fontSize: 10,
    fontWeight: typography.fontWeight.semibold,
  },
  mdText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
  },

  text: {
    color: colors.text.primary,
  },

  // Variants
  primaryContainer: {
    backgroundColor: colors.primary[400],
  },
  successContainer: {
    backgroundColor: colors.success.main,
  },
  errorContainer: {
    backgroundColor: colors.error.main,
  },
  warningContainer: {
    backgroundColor: colors.warning.main,
  },
  neutralContainer: {
    backgroundColor: colors.neutral[600],
  },

  primaryText: {
    color: colors.text.primary,
  },
  successText: {
    color: colors.text.primary,
  },
  errorText: {
    color: colors.text.primary,
  },
  warningText: {
    color: colors.text.inverse,
  },
  neutralText: {
    color: colors.text.primary,
  },

  // Dot variant
  dot: {
    width: 8,
    height: 8,
    borderRadius: radius.full,
  },
  primaryDot: {
    backgroundColor: colors.primary[400],
  },
  successDot: {
    backgroundColor: colors.success.main,
  },
  errorDot: {
    backgroundColor: colors.error.main,
  },
  warningDot: {
    backgroundColor: colors.warning.main,
  },
  neutralDot: {
    backgroundColor: colors.neutral[600],
  },
});
