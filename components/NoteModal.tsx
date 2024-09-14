import { useCardStore } from "@/utils/useCardsStore";
import React, { useEffect, useMemo, useState } from "react";
import { Modal, TextInput, View, Text, TouchableOpacity } from "react-native";

interface NoteModalProps {
    id: string;
    isVisible: boolean;
    onClose: () => void;
}

const NoteModal: React.FC<NoteModalProps> = ({
    id = "",
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
            // transparent={true}
            animationType="slide"
            presentationStyle="formSheet"
        >
            <View className="flex-1 items-center p-4 h-24 bg-white dark:bg-neutral-800">
                <View className="rounded-lg p-4 w-full max-w-lg">
                    <Text
                        className={`text-2xl font-bold dark:text-white text-black`}
                    >
                        Card Notes
                    </Text>
                    <Text className={`text-xl mb-4 dark:text-white text-black`}>
                        Save tidbits of info about your card
                    </Text>
                    <TextInput
                        value={card.notes}
                        onChangeText={(notes) => {
                            editCard(id, { notes });
                        }}
                        className="p-4  rounded-xl text-lg min-h-32 text-black dark:text-white bg-neutral-100 dark:bg-neutral-700"
                        placeholder="Type your note here..."
                        multiline
                        editable
                        numberOfLines={6}
                    />

                    <TouchableOpacity
                        className="bg-blue-500 p-3 rounded-xl mt-4"
                        onPress={onClose}
                    >
                        <Text className="text-white text-center text-xl">
                            Done
                        </Text>
                    </TouchableOpacity>
                    {/* 
                    <TouchableOpacity
                        className="border-2 border-neutral-300 p-3 rounded-xl mt-4"
                        onPress={onClose}
                    >
                        <Text className="text-black text-center text-xl">
                            Close
                        </Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        </Modal>
    );
};

export default NoteModal;
