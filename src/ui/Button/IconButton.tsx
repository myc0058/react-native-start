import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacityProps,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { colors } from '@/design/colors';
import { radius } from '@/design/radius';
import { shadows } from '@/design/shadows';

export type IconButtonVariant = 'primary' | 'secondary' | 'ghost';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  disabled?: boolean;
  haptic?: boolean;
}

export function IconButton({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  haptic = true,
  style,
  onPress,
  ...props
}: IconButtonProps) {
  const handlePress = (event: any) => {
    if (haptic && !disabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress?.(event);
  };

  const containerStyle: StyleProp<ViewStyle> = [
    styles.base,
    styles[`${size}Container` as 'smContainer' | 'mdContainer' | 'lgContainer'],
    variant === 'primary' && styles.primaryContainer,
    variant === 'secondary' && styles.secondaryContainer,
    variant === 'ghost' && styles.ghostContainer,
    disabled && styles.disabled,
    style,
  ];

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
      {...props}
    >
      {children}
    </TouchableOpacity>
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
    width: 32,
    height: 32,
  },
  mdContainer: {
    width: 40,
    height: 40,
  },
  lgContainer: {
    width: 48,
    height: 48,
  },

  // Variants
  primaryContainer: {
    backgroundColor: colors.primary[400],
    ...shadows.sm,
  },
  secondaryContainer: {
    backgroundColor: colors.background.tertiary,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  ghostContainer: {
    backgroundColor: 'transparent',
  },

  disabled: {
    opacity: 0.5,
  },
});
