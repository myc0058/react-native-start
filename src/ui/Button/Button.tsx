import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { colors } from '@/design/colors';
import { radius } from '@/design/radius';
import { spacing } from '@/design/spacing';
import { typography } from '@/design/typography';
import { shadows } from '@/design/shadows';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends TouchableOpacityProps {
  children: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  gradient?: boolean;
  haptic?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  gradient = false,
  haptic = true,
  leftIcon,
  rightIcon,
  style,
  onPress,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const handlePress = (event: any) => {
    if (haptic && !isDisabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress?.(event);
  };

  const containerStyle: ViewStyle[] = [
    styles.base,
    styles[`${size}Container`],
    fullWidth && styles.fullWidth,
    variant === 'outline' && styles.outlineContainer,
    variant === 'ghost' && styles.ghostContainer,
    isDisabled && styles.disabled,
    style,
  ];

  const textStyle: TextStyle[] = [
    styles.text,
    styles[`${size}Text`],
    variant === 'secondary' && styles.secondaryText,
    variant === 'outline' && styles.outlineText,
    variant === 'ghost' && styles.ghostText,
    isDisabled && styles.disabledText,
  ];

  const content = (
    <>
      {loading && <ActivityIndicator color={getSpinnerColor(variant)} style={styles.spinner} />}
      {!loading && leftIcon && <>{leftIcon}</>}
      <Text style={textStyle} numberOfLines={1}>
        {children}
      </Text>
      {!loading && rightIcon && <>{rightIcon}</>}
    </>
  );

  if (gradient && variant === 'primary' && !isDisabled) {
    return (
      <TouchableOpacity
        onPress={handlePress}
        disabled={isDisabled}
        activeOpacity={0.8}
        {...props}
      >
        <LinearGradient
          colors={colors.gradients.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[containerStyle, styles.primaryContainer]}
        >
          {content}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[
        containerStyle,
        variant === 'primary' && !gradient && styles.primaryContainer,
        variant === 'secondary' && styles.secondaryContainer,
      ]}
      onPress={handlePress}
      disabled={isDisabled}
      activeOpacity={0.8}
      {...props}
    >
      {content}
    </TouchableOpacity>
  );
}

function getSpinnerColor(variant: ButtonVariant): string {
  switch (variant) {
    case 'primary':
      return colors.text.primary;
    case 'secondary':
      return colors.text.inverse;
    case 'outline':
    case 'ghost':
      return colors.primary[400];
    default:
      return colors.text.primary;
  }
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.lg,
    gap: spacing.sm,
  },

  // Sizes
  smContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    minHeight: 36,
  },
  mdContainer: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    minHeight: 48,
  },
  lgContainer: {
    paddingHorizontal: spacing['2xl'],
    paddingVertical: spacing.lg,
    minHeight: 56,
  },

  // Text sizes
  smText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
  mdText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
  },
  lgText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
  },

  text: {
    color: colors.text.primary,
  },

  // Variants
  primaryContainer: {
    backgroundColor: colors.primary[400],
    ...shadows.md,
  },
  secondaryContainer: {
    backgroundColor: colors.background.tertiary,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  outlineContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary[400],
  },
  ghostContainer: {
    backgroundColor: 'transparent',
  },

  secondaryText: {
    color: colors.text.primary,
  },
  outlineText: {
    color: colors.primary[400],
  },
  ghostText: {
    color: colors.primary[400],
  },

  // States
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    color: colors.text.disabled,
  },

  fullWidth: {
    width: '100%',
  },

  spinner: {
    marginRight: spacing.xs,
  },
});
