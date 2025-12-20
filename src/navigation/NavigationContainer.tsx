import React from 'react';
import { NavigationContainer as RNNavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './RootNavigator';

// Navigation theme
const navigationTheme = {
  dark: false,
  colors: {
    primary: '#6366F1',
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#111827',
    border: '#E5E7EB',
    notification: '#EF4444',
  },
  fonts: {
    regular: {
      fontFamily: 'System',
      fontWeight: '400' as const,
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500' as const,
    },
    bold: {
      fontFamily: 'System',
      fontWeight: '700' as const,
    },
    heavy: {
      fontFamily: 'System',
      fontWeight: '800' as const,
    },
  },
};

export function NavigationContainer() {
  return (
    <RNNavigationContainer theme={navigationTheme}>
      <RootNavigator />
    </RNNavigationContainer>
  );
}
