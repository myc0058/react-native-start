import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { colors } from '@/design/colors';
import { spacing } from '@/design/spacing';
import { radius } from '@/design/radius';
import { typography } from '@/design/typography';

export function SettingsScreen() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Push notifications</Text>
          <Switch value={pushEnabled} onValueChange={setPushEnabled} />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Email updates</Text>
          <Switch value={emailEnabled} onValueChange={setEmailEnabled} />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>SMS alerts</Text>
          <Switch value={smsEnabled} onValueChange={setSmsEnabled} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    padding: spacing.lg,
    gap: spacing.md,
  },
  title: {
    ...typography.heading.h4,
    color: colors.text.primary,
  },
  card: {
    backgroundColor: colors.background.secondary,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.light,
    padding: spacing.md,
    gap: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    color: colors.text.primary,
    fontSize: typography.fontSize.md,
  },
});
