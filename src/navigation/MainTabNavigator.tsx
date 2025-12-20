import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MainTabParamList } from './types';
import { HomeStack, ShopStack, CartStack, OrdersStack, ProfileStack } from './stacks';
import { colors } from '@/design/colors';
import { useCartStore } from '@/stores';

// Tab Icon component
interface TabIconProps {
  name: keyof MainTabParamList;
  focused: boolean;
  badge?: number;
}

function TabIcon({ name, focused, badge }: TabIconProps) {
  const iconNames: Record<keyof MainTabParamList, keyof typeof Ionicons.glyphMap> = {
    Home: 'home',
    Shop: 'bag-handle',
    Cart: 'cart',
    Orders: 'cube',
    Profile: 'person',
  };

  return (
    <View style={styles.iconContainer}>
      <Ionicons
        name={iconNames[name]}
        size={22}
        color={focused ? colors.primary[400] : colors.text.tertiary}
      />
      {badge !== undefined && badge > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge > 99 ? '99+' : badge}</Text>
        </View>
      )}
    </View>
  );
}

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabNavigator() {
  const cartItemCount = useCartStore((state) => state.items.length);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.primary[400],
        tabBarInactiveTintColor: colors.text.tertiary,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon name="Home" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Shop"
        component={ShopStack}
        options={{
          tabBarLabel: 'Shop',
          tabBarIcon: ({ focused }) => <TabIcon name="Shop" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartStack}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ focused }) => (
            <TabIcon name="Cart" focused={focused} badge={cartItemCount} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersStack}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({ focused }) => <TabIcon name="Orders" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => <TabIcon name="Profile" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.background.secondary,
    borderTopColor: colors.border.light,
    borderTopWidth: 1,
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 22,
    opacity: 0.6,
  },
  iconFocused: {
    opacity: 1,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -10,
    backgroundColor: colors.error.main,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: colors.text.primary,
    fontSize: 10,
    fontWeight: '700',
  },
});
