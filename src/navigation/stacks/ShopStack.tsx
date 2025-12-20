import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ShopStackParamList } from '../types';
import { colors } from '@/design/colors';
import { typography } from '@/design/typography';

// Placeholder screens - replace with actual screens
import { View, Text, StyleSheet } from 'react-native';

const ProductListScreen = () => (
  <View style={styles.placeholder}>
    <Text style={styles.text}>Product List Screen</Text>
  </View>
);

const ProductDetailScreen = () => (
  <View style={styles.placeholder}>
    <Text style={styles.text}>Product Detail Screen</Text>
  </View>
);

const SearchScreen = () => (
  <View style={styles.placeholder}>
    <Text style={styles.text}>Search Screen</Text>
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

const Stack = createNativeStackNavigator<ShopStackParamList>();

export function ShopStack() {
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
        name="ProductList"
        component={ProductListScreen}
        options={{ headerTitle: '쇼핑' }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ headerTitle: '' }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerTitle: '검색',
          animation: 'fade',
        }}
      />
    </Stack.Navigator>
  );
}
