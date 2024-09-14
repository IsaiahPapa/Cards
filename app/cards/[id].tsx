import Card, { LogoOrCode } from "@/components/Card";
import { useCardStore } from "@/utils/useCardsStore";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import Barcode from "@kichiyaki/react-native-barcode-generator";
import {
    Dimensions,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { BlurView } from "expo-blur";
import NoteModal from "@/components/NoteModal";
import EditCardModal from "@/components/EditCardModal";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function Page() {
    const [userLocation, setUserLocation] = useState<null | {
        latitude: number;
        longitude: number;
    }>(null);
    const [isNotesOpen, setNotesOpen] = useState(false);
    const [isEditOpen, setEditOpen] = useState(false);
    const { id } = useLocalSearchParams();
    const { getCard } = useCardStore();

    const card = getCard(String(id));
    
    useEffect(() => {
        // Simulating getting user's location
        // In a real app, you'd use Geolocation API
        setUserLocation({
            latitude: 42.9634,
            longitude: -85.6681,
        });
    }, []);

    if (!card) {
        return (
            <View className="mt-24 mx-4">
                <Text>Unable to find card! {id}</Text>
            </View>
        );
    }
    return (
        <>
            <ScrollView>
                <View className="mt-20 mx-4">
                    <View className="flex flex-row justify-between items-center mb-4">
                        <Text
                            className={`text-4xl font-bold dark:text-white text-black`}
                        >
                            Your Card
                        </Text>
                        <TouchableOpacity
                            className="bg-white w-10 h-10 rounded-full items-center justify-center"
                            onPress={() => setEditOpen(true)}
                        >
                            <FontAwesome
                                name="pencil"
                                color={"black"}
                                size={16}
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        className="rounded-xl p-4 mt-4"
                        style={{ backgroundColor: card.color }}
                    >
                        <LogoOrCode
                            isKnownBrand={card.isKnownBrand}
                            title={card.title}
                            imageUri={card.imageUri}
                        />
                        <Text className="text-lg text-white text-center">
                            {card.title}
                        </Text>
                        <View className="bg-white rounded-lg p-4 mt-8">
                            <Barcode
                                value={card.number}
                                width={2}
                                height={100}
                            />
                            <Text className="text-xl font-bold text-black text-center mt-4">
                                {card.number}
                            </Text>
                        </View>
                    </View>
                    <View className="mt-4 space-y-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg">
                        <TouchableOpacity
                            onPress={() => {
                                setNotesOpen(true);
                            }}
                            className="p-4 flex-row items-center"
                        >
                            <Text className="dark:text-white text-lg flex-1">
                                Notes
                            </Text>
                            <Text className="dark:text-white text-lg opacity-50">
                                <FontAwesome size={14} name="chevron-right" />
                            </Text>
                        </TouchableOpacity>
                        <View
                            style={{ height: 1 }}
                            className="w-full self-center bg-neutral-300 dark:bg-neutral-600"
                        ></View>
                        <TouchableOpacity className="p-4 rounded-lg flex-row items-center">
                            <Text className="dark:text-white text-lg flex-1">
                                Pictures
                            </Text>

                            <Text className="dark:text-white text-lg opacity-50">
                                <FontAwesome size={14} name="chevron-right" />
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {userLocation && (
                        <View className="mt-4 h-48 rounded-lg overflow-hidden">
                            <View className="absolute z-10 w-full h-full items-center justify-center">
                                <View
                                    style={{
                                        borderRadius: 99,
                                        overflow: "hidden",
                                    }}
                                >
                                    <BlurView
                                        tint="extraLight"
                                        className="flex-row py-4 px-8 gap-4 items-center"
                                    >
                                        <FontAwesome
                                            name="clock-o"
                                            size={20}
                                            color="black"
                                        />
                                        <Text className="text-black text-xl">
                                            Coming Soon
                                        </Text>
                                    </BlurView>
                                </View>
                            </View>

                            <MapView
                                style={{ flex: 1 }}
                                initialRegion={{
                                    ...userLocation,
                                    latitudeDelta: LATITUDE_DELTA,
                                    longitudeDelta: LONGITUDE_DELTA,
                                }}
                            >
                                <Marker
                                    coordinate={userLocation}
                                    title="You are here"
                                    pinColor="blue"
                                />
                            </MapView>
                        </View>
                    )}
                </View>
            </ScrollView>
            <NoteModal
                id={card.id}
                isVisible={isNotesOpen}
                onClose={() => setNotesOpen(false)}
            />
            <EditCardModal
                id={card.id}
                isVisible={isEditOpen}
                onClose={() => setEditOpen(false)}
            />
        </>
    );
}
