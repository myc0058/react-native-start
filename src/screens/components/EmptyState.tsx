import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '@/ui/Button/Button';
import { colors } from '@/design/colors';
import { spacing } from '@/design/spacing';
import { typography } from '@/design/typography';

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onActionPress?: () => void;
}

export function EmptyState({ title, description, actionLabel, onActionPress }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {description ? <Text style={styles.description}>{description}</Text> : null}
      {actionLabel && onActionPress ? (
        <View style={styles.buttonWrapper}>
          <Button variant="primary" size="md" onPress={onActionPress}>
            {actionLabel}
          </Button>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...typography.heading.h5,
    color: colors.text.primary,
    textAlign: 'center',
  },
  description: {
    marginTop: spacing.sm,
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  buttonWrapper: {
    marginTop: spacing.lg,
  },
});
