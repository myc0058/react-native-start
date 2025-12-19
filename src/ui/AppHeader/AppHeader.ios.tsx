import { colors } from "@/design/colors";
import { spacing } from "@/design/spacing";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, Text, View } from "react-native";

export function AppHeader() {
  return (
    <LinearGradient colors={[colors.gradA, colors.gradB]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      <View style={{ paddingTop: spacing.xxl, paddingHorizontal: spacing.lg, paddingBottom: spacing.xl }}>
        <View style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between" }}>
          <View>
            <Text style={{ color: colors.textSecondary, fontSize: 13 }}>Welcome back</Text>
            <Text style={{ color: colors.textPrimary, fontSize: 28, fontWeight: "800" }}>Good afternoon</Text>
          </View>

          <Pressable style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.85)" }}>
            <View
              style={{
                position: "absolute",
                right: -2,
                top: -2,
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: colors.danger,
              }}
            />
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}
