import React from "react";

import { Tabs } from "expo-router";

import "../../global.css";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { FontAwesome } from "@expo/vector-icons";

// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>["name"];
    color: string;
}) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                // Disable the static render of the header on web
                // to prevent a hydration error in React Navigation v6.
                // headerShown: useClientOnlyValue(false, true),
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Cards",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="id-card" color={color} size={24} />
                    ),
                }}
            />
            <Tabs.Screen
                name="two"
                options={{
                    title: "Tab Two",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="code" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="juice"
                options={{
                    title: "Juice",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="briefcase" color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
