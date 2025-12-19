import React from 'react';
import { View, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '@/design/colors';

export type SpinnerSize = 'small' | 'large';

export interface SpinnerProps {
  size?: SpinnerSize;
  color?: string;
  style?: ViewStyle;
  fullScreen?: boolean;
}

export function Spinner({ size = 'large', color = colors.primary[400], style, fullScreen = false }: SpinnerProps) {
  if (fullScreen) {
    return (
      <View style={[styles.fullScreen, style]}>
        <ActivityIndicator size={size} color={color} />
      </View>
    );
  }

  return <ActivityIndicator size={size} color={color} style={style} />;
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.primary,
  },
});
