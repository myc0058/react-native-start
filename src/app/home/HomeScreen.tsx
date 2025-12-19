import { colors } from "@/design/colors";
import { radius } from "@/design/radius";
import { spacing } from "@/design/spacing";
import { AppHeader } from "@/ui/AppHeader";
import { GlassCard } from "@/ui/GlassCard";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

function Chip({ label, selected }: { label: string; selected?: boolean }) {
  return (
    <LinearGradient
      colors={selected ? [colors.gradA, colors.gradB] : ["rgba(255,255,255,0.10)", "rgba(255,255,255,0.10)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        borderRadius: radius.pill,
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderWidth: selected ? 0 : 1,
        borderColor: selected ? "transparent" : colors.glassStroke,
      }}
    >
      <Text style={{ color: colors.textPrimary, opacity: selected ? 1 : 0.86, fontSize: 13, fontWeight: "600" }}>
        {label}
      </Text>
    </LinearGradient>
  );
}

function BannerCard({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <LinearGradient
      colors={[colors.gradC, colors.gradD]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        width: 312,
        height: 160,
        borderRadius: radius.xl,
        overflow: "hidden",
        marginRight: spacing.md,
      }}
    >
      <View style={{ flex: 1, padding: spacing.lg, justifyContent: "flex-end" }}>
        <Text style={{ color: colors.textPrimary, opacity: 0.92, fontSize: 13 }}>{subtitle}</Text>
        <Text style={{ color: colors.textPrimary, fontSize: 20, fontWeight: "800", marginTop: spacing.sm }}>
          {title}
        </Text>
      </View>
    </LinearGradient>
  );
}

function ActionCard({ title, desc }: { title: string; desc: string }) {
  return (
    <GlassCard style={{ flex: 1, padding: spacing.lg, borderRadius: radius.xl }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
        <LinearGradient
          colors={[colors.gradA, colors.gradB]}
          style={{ width: 28, height: 28, borderRadius: 10 }}
        />
        <Text style={{ color: colors.textPrimary, fontSize: 15, fontWeight: "700" }}>{title}</Text>
      </View>
      <Text style={{ marginTop: spacing.sm, color: colors.textSecondary, fontSize: 13 }}>{desc}</Text>
    </GlassCard>
  );
}

export function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg0 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: spacing.xxl }} showsVerticalScrollIndicator={false}>
        <AppHeader />

        <View style={{ paddingHorizontal: spacing.lg, marginTop: -spacing.lg }}>
          {/* SearchBar */}
          <GlassCard style={{ borderRadius: radius.md, padding: spacing.md }}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
                <View style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: "rgba(255,255,255,0.70)" }} />
                <Text style={{ color: colors.textSecondary, fontSize: 15 }}>Search</Text>
              </View>
              <View style={{ width: 18, height: 18, borderRadius: 6, backgroundColor: "rgba(255,255,255,0.70)" }} />
            </View>
          </GlassCard>

          {/* Chips */}
          <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.lg }}>
            <Chip label="For you" />
            <Chip label="Trending" selected />
            <Chip label="Nearby" />
          </View>

          {/* Banner carousel */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: spacing.xl }}>
            <BannerCard subtitle="Today’s Boost" title={"Complete 3 actions\nGet a reward"} />
            <BannerCard subtitle="New Drop" title={"Glass UI Kit\nNow available"} />
          </ScrollView>

          {/* Quick actions */}
          <View style={{ marginTop: spacing.xl, gap: spacing.md }}>
            <View style={{ flexDirection: "row", gap: spacing.md }}>
              <ActionCard title="Market" desc="Deals & picks" />
              <ActionCard title="Booking" desc="Reserve fast" />
            </View>
            <View style={{ flexDirection: "row", gap: spacing.md }}>
              <ActionCard title="Community" desc="Hot posts" />
              <ActionCard title="Stats" desc="Trends" />
            </View>
          </View>

          {/* Trending preview */}
          <View style={{ marginTop: spacing.xl }}>
            <Text style={{ color: colors.textPrimary, fontSize: 18, fontWeight: "800", marginBottom: spacing.md }}>
              Trending
            </Text>

            <GlassCard style={{ padding: spacing.lg, borderRadius: radius.xl }}>
              <Text style={{ color: colors.textPrimary, fontSize: 15, fontWeight: "700" }}>
                Trending story headline
              </Text>
              <Text style={{ color: colors.textSecondary, fontSize: 13, marginTop: spacing.sm }}>
                Preview text goes here…
              </Text>
            </GlassCard>

            <View style={{ flexDirection: "row", gap: spacing.md, marginTop: spacing.md }}>
              <GlassCard style={{ flex: 1, padding: spacing.lg, borderRadius: radius.xl }}>
                <Text style={{ color: colors.textPrimary, fontSize: 15, fontWeight: "700" }}>Short headline</Text>
                <Text style={{ color: colors.textSecondary, fontSize: 13, marginTop: spacing.sm }}>Preview…</Text>
              </GlassCard>

              <GlassCard style={{ flex: 1, padding: spacing.lg, borderRadius: radius.xl }}>
                <Text style={{ color: colors.textPrimary, fontSize: 15, fontWeight: "700" }}>Short headline</Text>
                <Text style={{ color: colors.textSecondary, fontSize: 13, marginTop: spacing.sm }}>Preview…</Text>
              </GlassCard>
            </View>

            <Pressable style={{ marginTop: spacing.lg, alignSelf: "flex-start" }}>
              <Text style={{ color: colors.textPrimary, opacity: 0.9, fontWeight: "700" }}>See more →</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
