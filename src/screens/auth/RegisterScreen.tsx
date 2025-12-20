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

export function RegisterScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const { register, isLoading, error } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password) return;
    await register({ name, email, password });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to start shopping</Text>
      </View>

      <View style={styles.form}>
        <TextInput label="Name" value={name} onChangeText={setName} />
        <View style={styles.gap} />
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
          <Button fullWidth loading={isLoading} onPress={handleRegister}>
            Sign Up
          </Button>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Log In</Text>
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
