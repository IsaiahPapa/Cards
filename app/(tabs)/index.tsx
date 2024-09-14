import AddCardModal from "@/components/AddCardModal";
import Card from "@/components/Card";
import { useIsDarkMode } from "@/components/Themed";
import { useCardStore } from "@/utils/useCardsStore";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal } from "react-native";
import Svg, { Path } from "react-native-svg";

//https://www.npmjs.com/package/react-native-wallet-manager

const DebugButtons = () => {
    const { reset } = useCardStore();
    const isDev = useMemo(() => {
        return process.env.NODE_ENV === "development";
    }, []);

    if (!isDev) return <></>;

    return (
        <View
            className="flex flex-col gap-2 rounded-xl mb-8 p-4"
            style={{ backgroundColor: "#59b5f7" }}
        >
            <Text className={`text-xl font-bold text-white`}>
                Debug Buttons
            </Text>
            <View className="flex flex-row gap-4">
                <TouchableOpacity
                    className="bg-white w-full h-10 rounded-full items-center justify-center"
                    onPress={() => reset()}
                >
                    <Text className={`text-black`}>Reset Cards</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const NoCardsAddCardButton = ({ onAdd }: { onAdd(): void }) => {

    const isDarkMode = useIsDarkMode();
    return (
        <>
            <TouchableOpacity
                onPress={onAdd}
                className="flex gap-4 w-full h-48 items-center justify-center border-dashed bg-neutral-200 border-neutral-600 dark:bg-neutral-900 dark:border-neutral-600 border-2 rounded-2xl"
            >
                <Svg
                    viewBox="0 0 448 512"
                    width="48"
                    height="48"
                    fill={isDarkMode ? "white" : "black"}
                >
                    <Path d="M248 72c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 160L40 232c-13.3 0-24 10.7-24 24s10.7 24 24 24l160 0 0 160c0 13.3 10.7 24 24 24s24-10.7 24-24l0-160 160 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-160 0 0-160z" />
                </Svg>

                <Text
                    className={`text-xl font-semibold dark:text-white text-black opa`}
                >
                    Add new card
                </Text>
            </TouchableOpacity>
            <Text
                className={`text-lg dark:text-white text-black text-center mt-8 opacity-50`}
            >
                Tap the card above to add your first card
            </Text>
        </>
    );
};

export default function LandingPage() {
    const [modal, setModal] = useState("");
    const { cards } = useCardStore();

    useEffect(() => {
        useCardStore.getState().loadCards(); // Load cards from MMKV
    }, []);

    return (
        <>
            <ScrollView className="px-8 mt-24">
                <View className="flex flex-row justify-between">
                    <Text
                        className={`text-4xl font-bold mb-4 dark:text-white text-black`}
                    >
                        Cards
                    </Text>
                    <TouchableOpacity
                        className="bg-white w-10 h-10 rounded-full items-center justify-center"
                        onPress={() => setModal("addCard")}
                    >
                        <FontAwesome name="plus" color={"black"} size={16} />
                    </TouchableOpacity>
                </View>

                <DebugButtons />
                <View className="flex-1 flex-row flex-wrap justify-center">
                    {cards.map((card) => (
                        <Card
                            onPress={() => {
                                router.push({
                                    pathname: `/cards/[id]`,
                                    params: { id: card.id },
                                });
                            }}
                            key={card.id}
                            id={card.id}
                            title={card.title}
                            imageUri={card.imageUri}
                            color={card.color}
                            isKnownBrand={card.isKnownBrand}
                            type={card.type}
                            number={card.number}
                            notes={card.notes}
                            locations={card.locations}
                            photos={card.photos}
                        />
                    ))}
                </View>
                {cards.length === 0 && (
                    <NoCardsAddCardButton
                        onAdd={() => {
                            setModal("addCard");
                        }}
                    />
                )}
            </ScrollView>
            <Modal
                animationType="slide"
                visible={modal === "addCard"}
                onRequestClose={() => setModal("")}
                presentationStyle="formSheet"
            >
                <AddCardModal
                    onSuccess={() => {
                        setModal("");
                    }}
                    onClose={()=>{
                        setModal("")
                    }}
                />
            </Modal>
        </>
    );
}
