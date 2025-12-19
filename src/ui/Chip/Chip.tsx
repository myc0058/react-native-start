import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import * as Haptics from 'expo-haptics';
import { colors } from '@/design/colors';
import { radius } from '@/design/radius';
import { spacing } from '@/design/spacing';
import { typography } from '@/design/typography';

export interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  leftIcon?: React.ReactNode;
}

export function Chip({ label, selected = false, onPress, disabled = false, style, leftIcon }: ChipProps) {
  const handlePress = () => {
    if (!disabled && onPress) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onPress();
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        selected && styles.selectedContainer,
        disabled && styles.disabled,
        style,
      ]}
      onPress={handlePress}
      disabled={disabled || !onPress}
      activeOpacity={0.7}
    >
      {leftIcon}
      <Text style={[styles.text, selected && styles.selectedText]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.background.tertiary,
    borderWidth: 1,
    borderColor: colors.border.light,
    gap: spacing.xs,
  },
  selectedContainer: {
    backgroundColor: colors.primary[400],
    borderColor: colors.primary[400],
  },
  text: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.secondary,
  },
  selectedText: {
    color: colors.text.primary,
  },
  disabled: {
    opacity: 0.5,
  },
});
