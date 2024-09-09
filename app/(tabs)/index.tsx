import AddCardModal from "@/components/AddCardModal";
import SelectCard from "@/components/AddCardModal/SelectCard";
import Card, { CardType } from "@/components/Card";
import { FontAwesome } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Modal, TextInput, Button } from "react-native";

//https://www.npmjs.com/package/react-native-wallet-manager

export default function LandingPage() {
    // Extended mock data with additional fields for branding
    const { colorScheme } = useColorScheme();
    const [modalVisible, setModalVisible] = useState(false);

    const cards: CardType[] = [
        {
            title: "Sam's Club",
            imageUri: "https://1000logos.net/wp-content/uploads/2021/09/Sams-Club-Logo-2006.png",
            color: "#5c9831",
            isKnownBrand: true,
            type: "org.iso.Code39",
            number: "0123456",
        },
        {
            title: "Insurance Card",
            imageUri: null,
            color: "#d4e5f6",
            isKnownBrand: false,
            type: "org.iso.Code39",
            number: "0123456",
        },
    ];

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
                        onPress={() => setModalVisible(true)}
                    >
                        <FontAwesome name="plus" color={"black"} size={16} />
                    </TouchableOpacity>
                </View>
                <View className="flex-1 flex-row flex-wrap justify-center">
                    {cards.map((card) => (
                        <Card
                            key={card.title}
                            title={card.title}
                            imageUri={card.imageUri}
                            color={card.color}
                            isKnownBrand={card.isKnownBrand}
                            type={card.type}
                            number={card.number}
                        />
                    ))}
                </View>
            </ScrollView>
            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
                presentationStyle="pageSheet"
            >
                <AddCardModal
                    onSuccess={() => {
                        setModalVisible(false);
                    }}
                />
            </Modal>
        </>
    );
}
