import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../types';
import { colors } from '@/design/colors';
import { typography } from '@/design/typography';

// Placeholder screens - replace with actual screens
import { View, Text, StyleSheet } from 'react-native';

const ProfileScreen = () => (
  <View style={styles.placeholder}>
    <Text style={styles.text}>Profile Screen</Text>
  </View>
);

const SettingsScreen = () => (
  <View style={styles.placeholder}>
    <Text style={styles.text}>Settings Screen</Text>
  </View>
);

const EditProfileScreen = () => (
  <View style={styles.placeholder}>
    <Text style={styles.text}>Edit Profile Screen</Text>
  </View>
);

const AddressesScreen = () => (
  <View style={styles.placeholder}>
    <Text style={styles.text}>Addresses Screen</Text>
  </View>
);

const WishlistScreen = () => (
  <View style={styles.placeholder}>
    <Text style={styles.text}>Wishlist Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
  },
  text: {
    fontSize: 18,
    color: colors.text.secondary,
  },
});

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
        options={{ headerTitle: '마이페이지' }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerTitle: '설정' }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ headerTitle: '프로필 수정' }}
      />
      <Stack.Screen
        name="Addresses"
        component={AddressesScreen}
        options={{ headerTitle: '배송지 관리' }}
      />
      <Stack.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{ headerTitle: '위시리스트' }}
      />
    </Stack.Navigator>
  );
}
