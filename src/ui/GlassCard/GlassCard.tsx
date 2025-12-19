import React from 'react';
import { StyleSheet, View, ViewProps, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors } from '@/design/colors';
import { radius } from '@/design/radius';
import { shadows } from '@/design/shadows';

export interface GlassCardProps extends ViewProps {
  children: React.ReactNode;
  intensity?: number;
  borderRadius?: keyof typeof radius;
  shadow?: keyof typeof shadows;
  borderColor?: string;
  borderWidth?: number;
}

export function GlassCard({
  children,
  intensity = 20,
  borderRadius: borderRadiusKey = 'xl',
  shadow: shadowKey = 'md',
  borderColor = colors.border.light,
  borderWidth = 1,
  style,
  ...props
}: GlassCardProps) {
  const containerStyle = [
    styles.container,
    {
      borderRadius: radius[borderRadiusKey],
      borderColor,
      borderWidth,
      ...shadows[shadowKey],
    },
    style,
  ];

  if (Platform.OS === 'ios') {
    return (
      <BlurView intensity={intensity} tint="dark" style={containerStyle} {...props}>
        <View style={styles.content}>{children}</View>
      </BlurView>
    );
  }

  // Android fallback
  return (
    <View style={[containerStyle, styles.androidFallback]} {...props}>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  content: {
    flex: 1,
  },
  androidFallback: {
    backgroundColor: colors.background.card,
  },
});
