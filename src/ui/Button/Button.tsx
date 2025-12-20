import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  StyleProp,
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

  const containerStyles: StyleProp<ViewStyle> = [
    viewStyles.base,
    viewStyles[`${size}Container` as 'smContainer' | 'mdContainer' | 'lgContainer'],
    fullWidth && viewStyles.fullWidth,
    variant === 'outline' && viewStyles.outlineContainer,
    variant === 'ghost' && viewStyles.ghostContainer,
    isDisabled && viewStyles.disabled,
    style,
  ];

  const textStyles: StyleProp<TextStyle> = [
    textStyleSheet.text,
    textStyleSheet[`${size}Text` as 'smText' | 'mdText' | 'lgText'],
    variant === 'secondary' && textStyleSheet.secondaryText,
    variant === 'outline' && textStyleSheet.outlineText,
    variant === 'ghost' && textStyleSheet.ghostText,
    isDisabled && textStyleSheet.disabledText,
  ];

  const content = (
    <>
      {loading && <ActivityIndicator color={getSpinnerColor(variant)} style={viewStyles.spinner} />}
      {!loading && leftIcon && <>{leftIcon}</>}
      <Text style={textStyles} numberOfLines={1}>
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
          style={[containerStyles, viewStyles.primaryContainer]}
        >
          {content}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[
        containerStyles,
        variant === 'primary' && !gradient && viewStyles.primaryContainer,
        variant === 'secondary' && viewStyles.secondaryContainer,
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

const viewStyles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.lg,
    gap: spacing.sm,
  },
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
  disabled: {
    opacity: 0.5,
  },
  fullWidth: {
    width: '100%',
  },
  spinner: {
    marginRight: spacing.xs,
  },
});

const textStyleSheet = StyleSheet.create({
  text: {
    color: colors.text.primary,
  },
  smText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold as TextStyle['fontWeight'],
  },
  mdText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold as TextStyle['fontWeight'],
  },
  lgText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold as TextStyle['fontWeight'],
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
  disabledText: {
    color: colors.text.disabled,
  },
});

// Keep for backward compatibility
const styles = { ...viewStyles, ...textStyleSheet };
