import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from './types';
import { colors } from '@/design/colors';

// Placeholder screens - replace with actual screens
import { View, Text, StyleSheet } from 'react-native';

const LoginScreen = () => (
  <View style={styles.placeholder}>
    <Text style={styles.text}>Login Screen</Text>
  </View>
);

const RegisterScreen = () => (
  <View style={styles.placeholder}>
    <Text style={styles.text}>Register Screen</Text>
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

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background.primary },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}
