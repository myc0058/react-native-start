import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import { HomeStack, ShopStack, CartStack, OrdersStack, ProfileStack } from './stacks';
import { colors } from '@/design/colors';
import { useCartStore } from '@/stores';

// Tab Icon component
interface TabIconProps {
  name: string;
  focused: boolean;
  badge?: number;
}

function TabIcon({ name, focused, badge }: TabIconProps) {
  const icons: Record<string, string> = {
    Home: '🏠',
    Shop: '🛍️',
    Cart: '🛒',
    Orders: '📦',
    Profile: '👤',
  };

  return (
    <View style={styles.iconContainer}>
      <Text style={[styles.icon, focused && styles.iconFocused]}>
        {icons[name]}
      </Text>
      {badge !== undefined && badge > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {badge > 99 ? '99+' : badge}
          </Text>
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
          tabBarLabel: '홈',
          tabBarIcon: ({ focused }) => <TabIcon name="Home" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Shop"
        component={ShopStack}
        options={{
          tabBarLabel: '쇼핑',
          tabBarIcon: ({ focused }) => <TabIcon name="Shop" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartStack}
        options={{
          tabBarLabel: '장바구니',
          tabBarIcon: ({ focused }) => (
            <TabIcon name="Cart" focused={focused} badge={cartItemCount} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersStack}
        options={{
          tabBarLabel: '주문',
          tabBarIcon: ({ focused }) => <TabIcon name="Orders" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: '마이',
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
