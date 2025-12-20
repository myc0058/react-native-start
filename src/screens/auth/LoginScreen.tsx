import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@/design/colors';
import { spacing } from '@/design/spacing';
import { typography } from '@/design/typography';
import { Button } from '@/ui/Button/Button';
import { TextInput } from '@/ui/Input/TextInput';
import { useAuth } from '@/hooks/useAuth';
import { AuthStackParamList } from '@/navigation/types';

export function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) return;
    await login({ email, password });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Log in to continue shopping</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          label="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.gap} />
        <TextInput
          label="Password"
          secureTextEntry
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <View style={styles.actions}>
          <Button fullWidth loading={isLoading} onPress={handleLogin}>
            Log In
          </Button>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>No account yet?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    padding: spacing.xl,
    justifyContent: 'center',
  },
  header: {
    marginBottom: spacing['2xl'],
  },
  title: {
    ...typography.heading.h3,
    color: colors.text.primary,
  },
  subtitle: {
    marginTop: spacing.sm,
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
  },
  form: {
    gap: spacing.sm,
  },
  gap: {
    height: spacing.md,
  },
  actions: {
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  footer: {
    marginTop: spacing['2xl'],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  footerText: {
    color: colors.text.secondary,
  },
  link: {
    color: colors.primary[400],
    fontWeight: typography.fontWeight.semibold,
  },
  error: {
    marginTop: spacing.xs,
    color: colors.error.main,
    fontSize: typography.fontSize.sm,
  },
});
