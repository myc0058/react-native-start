import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../types';
import { colors } from '@/design/colors';
import { typography } from '@/design/typography';

// Placeholder screens - replace with actual screens
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = () => (
  <View style={styles.placeholder}>
    <Text style={styles.text}>Home Screen</Text>
  </View>
);

const ProductDetailScreen = () => (
  <View style={styles.placeholder}>
    <Text style={styles.text}>Product Detail Screen</Text>
  </View>
);

const CategoryScreen = () => (
  <View style={styles.placeholder}>
    <Text style={styles.text}>Category Screen</Text>
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

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeStack() {
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
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ headerTitle: '' }}
      />
      <Stack.Screen
        name="Category"
        component={CategoryScreen}
        options={({ route }) => ({
          headerTitle: route.params.categoryName,
        })}
      />
    </Stack.Navigator>
  );
}
