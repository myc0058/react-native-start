import { colors } from "@/design/colors";
import { radius } from "@/design/radius";
import { BlurView } from "expo-blur";
import React from "react";
import { Platform, StyleProp, View, ViewStyle } from "react-native";

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  intensity?: number; // iOS에서만 blur 체감 큼
};

export function GlassCard({ children, style, intensity = 24 }: Props) {
  const baseStyle: ViewStyle = {
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.glassStroke,
    backgroundColor: colors.glassFill,
    overflow: "hidden",
  };

  // iOS: blur + 오버레이 / Android: blur 체감이 약하니 반투명+stroke 위주
  if (Platform.OS === "ios") {
    return (
      <BlurView intensity={intensity} tint="dark" style={[baseStyle, style]}>
        <View style={{ flex: 1 }}>{children}</View>
      </BlurView>
    );
  }

  return <View style={[baseStyle, style]}>{children}</View>;
}
