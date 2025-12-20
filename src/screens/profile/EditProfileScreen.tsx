import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { colors } from '@/design/colors';
import { spacing } from '@/design/spacing';
import { typography } from '@/design/typography';
import { TextInput } from '@/ui/Input/TextInput';
import { Button } from '@/ui/Button/Button';
import { useAuth } from '@/hooks/useAuth';
import { UsersService } from '@/services/users.service';
import { useAuthStore } from '@/stores';

export function EditProfileScreen() {
  const { user } = useAuth();
  const setUser = useAuthStore((state) => state.setUser);
  const [name, setName] = useState(user?.name ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updated = await UsersService.updateProfile({ name, phone });
      setUser(updated);
      Alert.alert('Profile updated');
    } catch (error) {
      Alert.alert('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit profile</Text>
      <View style={styles.form}>
        <TextInput label="Name" value={name} onChangeText={setName} />
        <TextInput label="Phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      </View>
      <Button fullWidth gradient loading={isSaving} onPress={handleSave}>
        Save changes
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    padding: spacing.lg,
    gap: spacing.lg,
  },
  title: {
    ...typography.heading.h4,
    color: colors.text.primary,
  },
  form: {
    gap: spacing.sm,
  },
});
