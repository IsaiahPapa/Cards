import AddCardModal from "@/components/AddCardModal";
import SelectCard from "@/components/AddCardModal/SelectCard";
import Card, { CardType } from "@/components/Card";
import { useCardStore } from "@/utils/useCardsStore";
import { FontAwesome } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    Modal,
    TextInput,
    Button,
} from "react-native";

//https://www.npmjs.com/package/react-native-wallet-manager

export default function LandingPage() {
    // Extended mock data with additional fields for branding
    const { colorScheme } = useColorScheme();
    // const [modalVisible, setModalVisible] = useState(false);
    const [modal, setModal] = useState("");
    const { cards, reset } = useCardStore();

    useEffect(() => {
        useCardStore.getState().loadCards(); // Load cards from MMKV
    }, []);

    return (
        <>
            <ScrollView className="px-8 mt-24">
                <View className="flex flex-row justify-between">
                    <Text
                        className={`text-4xl font-bold mb-4 ${
                            colorScheme === "dark" ? "text-white" : "text-black"
                        }`}
                    >
                        Your Cards
                    </Text>
                    <TouchableOpacity
                        className="bg-white w-10 h-10 rounded-full items-center justify-center"
                        onPress={() => setModal("addCard")}
                    >
                        <FontAwesome name="plus" color={"black"} size={16} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    className="bg-white w-full h-10 rounded-full items-center justify-center my-4"
                    onPress={() => reset()}
                >
                    <Text
                        className={`${
                            colorScheme === "dark" ? "text-white" : "text-black"
                        }`}
                    >
                        Reset
                    </Text>
                </TouchableOpacity>
                <View className="flex-1 flex-row flex-wrap justify-center">
                    {cards.map((card) => (
                        <Card
                            onPress={() => {
                                router.push({
                                    pathname: `/cards/[id]`,
                                    params: { id: card.id },
                                });
                            }}
                            id={card.id}
                            title={card.title}
                            imageUri={card.imageUri}
                            color={card.color}
                            isKnownBrand={card.isKnownBrand}
                            type={card.type}
                            number={card.number}
                        />
                    ))}
                </View>
                {cards.length === 0 && (
                    <View className="flex gap-4 w-full h-48 items-center justify-center border-neutral-600 border-2 rounded-2xl">
                        <Text
                            className={`text-xl font-semibold ${
                                colorScheme === "dark"
                                    ? "text-white"
                                    : "text-black"
                            }`}
                        >
                            Add a card!
                        </Text>
                    </View>
                )}
            </ScrollView>
            <Modal
                animationType="slide"
                visible={modal === "addCard"}
                onRequestClose={() => setModal("")}
                presentationStyle="pageSheet"
            >
                <AddCardModal
                    onSuccess={() => {
                        setModal("");
                    }}
                />
            </Modal>
        </>
    );
}
