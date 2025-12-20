import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../types';
import { colors } from '@/design/colors';
import { typography } from '@/design/typography';
import {
  ProfileScreen,
  SettingsScreen,
  EditProfileScreen,
  AddressesScreen,
  WishlistScreen,
} from '@/screens';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background.secondary,
        },
        headerTitleStyle: {
          ...typography.heading.h4,
          color: colors.text.primary,
        },
        headerTintColor: colors.primary[400],
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.background.primary },
      }}
    >
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerTitle: 'Profile' }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerTitle: 'Settings' }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ headerTitle: 'Edit Profile' }}
      />
      <Stack.Screen
        name="Addresses"
        component={AddressesScreen}
        options={{ headerTitle: 'Addresses' }}
      />
      <Stack.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{ headerTitle: 'Wishlist' }}
      />
    </Stack.Navigator>
  );
}
