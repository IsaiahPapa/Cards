import { useCardStore } from "@/utils/useCardsStore";
import React, { useMemo, useState } from "react";
import { Modal, TextInput, View, Text, TouchableOpacity } from "react-native";

interface NoteModalProps {
    id: string;
    isVisible: boolean;
    onClose: () => void;
}

const EditCardModal: React.FC<NoteModalProps> = ({
    id,
    isVisible,
    onClose,
}) => {
    const { getCard, editCard } = useCardStore();
    const card = getCard(String(id));

    if (!card) return;
    return (
        <Modal
            visible={isVisible}
            onRequestClose={onClose}
            animationType="slide"
            presentationStyle="formSheet"
        >
            <View className="flex-1 items-center p-4 bg-white dark:bg-neutral-800 h-24">
                <View className="rounded-lg p-4 w-full max-w-lg">
                    <Text
                        className={`text-2xl font-bold dark:text-white text-black`}
                    >
                        Name
                    </Text>
                    <Text className={`text-xl mb-4 dark:text-white text-black`}>
                        How you want to identify your card
                    </Text>
                    <TextInput
                        value={card.title}
                        onChangeText={(title) => {
                            editCard(id, { title });
                        }}
                        className="p-4 rounded-xl text-lg mb-8 text-black dark:text-white bg-neutral-100 dark:bg-neutral-700"
                        placeholder="Walgreens..."
                        editable
                    />

                    <Text
                        className={`text-2xl font-bold dark:text-white text-black`}
                    >
                        Barcode Number
                    </Text>
                    <Text className={`text-xl mb-4 dark:text-white text-black`}>
                        The actual barcode
                    </Text>
                    <TextInput
                        value={card.number}
                        onChangeText={(title) => {
                            editCard(id, { title });
                        }}
                        className="p-4 rounded-xl text-lg mb-4 text-black dark:text-white bg-neutral-100 dark:bg-neutral-700"
                        placeholder="Walgreens..."
                        editable
                    />

                    <TouchableOpacity
                        className="bg-blue-500 p-3 rounded-xl mt-4"
                        onPress={onClose}
                    >
                        <Text className="text-white text-center text-xl">
                            Done
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default EditCardModal;
