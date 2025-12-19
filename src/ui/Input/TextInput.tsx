import React, { useState } from 'react';
import {
  TextInput as RNTextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import { colors } from '@/design/colors';
import { radius } from '@/design/radius';
import { spacing } from '@/design/spacing';
import { typography } from '@/design/typography';

export interface TextInputProps extends RNTextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function TextInput({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  style,
  ...props
}: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          error && styles.inputContainerError,
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

        <RNTextInput
          style={[styles.input, style]}
          placeholderTextColor={colors.text.tertiary}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
      {!error && helperText && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.tertiary,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.light,
    paddingHorizontal: spacing.lg,
    minHeight: 48,
  },
  inputContainerFocused: {
    borderColor: colors.primary[400],
  },
  inputContainerError: {
    borderColor: colors.error.main,
  },
  input: {
    flex: 1,
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
    paddingVertical: spacing.md,
  },
  leftIcon: {
    marginRight: spacing.sm,
  },
  rightIcon: {
    marginLeft: spacing.sm,
  },
  errorText: {
    fontSize: typography.fontSize.xs,
    color: colors.error.main,
    marginTop: spacing.xs,
    marginLeft: spacing.xs,
  },
  helperText: {
    fontSize: typography.fontSize.xs,
    color: colors.text.tertiary,
    marginTop: spacing.xs,
    marginLeft: spacing.xs,
  },
});
