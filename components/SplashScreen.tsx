import React, { useEffect } from "react";
import { View, Text } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useCardStore } from "@/utils/useCardsStore";

export default function App() {
    // Ensure the splash screen stays visible while cards are loading
    useEffect(() => {
        async function loadResources() {
            try {
                SplashScreen.preventAutoHideAsync(); // Keep the splash screen visible
                useCardStore.getState().loadCards(); // Load cards from MMKV
                await new Promise((resolve) => setTimeout(resolve, 500));
            } catch (e) {
                console.warn(e);
            } finally {
                SplashScreen.hideAsync(); // Hide splash screen once cards are loaded
            }
        }

        loadResources();
    }, []);

    return (
        <View className="justify-center items-center">
            <Text>Loading Cards...</Text>
            {/* Your main app content goes here */}
        </View>
    );
}
