import HomeScreen from "@/app/home/HomeScreen";
import { colors } from "@/design/colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

const Tab = createBottomTabNavigator();

function Placeholder({ title }: { title: string }) {
  return null; // 나중에 채우자
}

export function RootTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.bg1,
          borderTopColor: "rgba(255,255,255,0.10)",
        },
        tabBarActiveTintColor: colors.textPrimary,
        tabBarInactiveTintColor: "rgba(255,255,255,0.55)",
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Feed" children={() => <Placeholder title="Feed" />} />
      <Tab.Screen name="Market" children={() => <Placeholder title="Market" />} />
      <Tab.Screen name="Stats" children={() => <Placeholder title="Stats" />} />
      <Tab.Screen name="Settings" children={() => <Placeholder title="Settings" />} />
    </Tab.Navigator>
  );
}
