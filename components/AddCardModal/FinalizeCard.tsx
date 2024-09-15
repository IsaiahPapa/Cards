import { useState } from "react";
import {
    TextInput,
    View,
    Text,
    TouchableOpacity,
    GestureResponderEvent,
} from "react-native";
import ColorPicker from "../ColorPicker";
import Card, { CardType } from "../Card";
import Animated, { SlideInRight, SlideOutRight } from "react-native-reanimated";
import { FontAwesome } from "@expo/vector-icons";
import { RequireAtLeastOne } from "@/utils/types";

import { z } from "zod";

const validateCode39 = (value: string) => {
    const code39Regex = /^[A-Z0-9\-\.\$\+\/% ]+$/;
    return code39Regex.test(value);
};

const cardSchema = z.object({
    title: z.string().min(1, "Card name is required"),
    number: z
        .string()
        .min(1, "Barcode number is required")
        .max(20, "Barcode number is too long") // You can adjust the max length as needed
        .refine(
            validateCode39,
            "Invalid Code 39 barcode (only A-Z, 0-9, -, ., $, /, +, % are allowed)"
        ),

    color: z.string().optional(),
});

const FinalizeCard: React.FC<{
    card: CardType;
    onClose: (event: GestureResponderEvent) => void;
    onDone(): void;
    onBack(): void;
    onCardUpdate: (updates: RequireAtLeastOne<CardType>) => void;
}> = ({ card, onCardUpdate, onClose, onBack, onDone }) => {
    const [formErrors, setFormErrors] = useState<{
        title?: string;
        number?: string;
    }>({});

    const handleSave = () => {
        // Validate form data with Zod
        const result = cardSchema.safeParse(card);

        if (!result.success) {
            const errors = result.error.format();
            // Set errors to display on the form
            setFormErrors({
                title: errors.title?._errors[0],
                number: errors.number?._errors[0],
            });
        } else {
            // If valid, clear errors and trigger the onDone and onCardUpdate functions
            setFormErrors({});
            onDone();
        }
    };
    // TOOD: Add Validation to forms.
    return (
        <View className="flex-1 dark:bg-black p-4 w-full">
            <View className="flex flex-row justify-between mb-8 mt-4 items-center">
                <TouchableOpacity
                    onPress={onBack}
                    className="bg-neutral-200 dark:bg-neutral-800 rounded-full w-12 h-12 items-center justify-center self-end"
                >
                    <FontAwesome name="chevron-left" size={16} color={"#777"} />
                </TouchableOpacity>
                <Text className="text-4xl font-bold text-center dark:text-white">
                    Create Card
                </Text>
                <TouchableOpacity
                    onPress={onClose}
                    className="bg-neutral-200 dark:bg-neutral-800 rounded-full w-12 h-12 items-center justify-center self-end"
                >
                    <FontAwesome name="close" size={16} color={"#777"} />
                </TouchableOpacity>
            </View>
            <View className="w-full mb-4 items-center">
                <Card
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
            </View>
            <Text className="text-xl font-semibold mb-4 dark:text-white">
                Card Name
            </Text>
            {formErrors.title && (
                <Text className="text-red-500">{formErrors.title}</Text>
            )}

            <TextInput
                className="bg-neutral-100 dark:bg-neutral-900 p-3 text-lg rounded-md mb-8 dark:text-white"
                placeholder="e.g. Walmart"
                value={card.title}
                onChangeText={(title) => {
                    onCardUpdate({ title });
                }}
            />

            <Text className="text-xl font-semibold mb-4 dark:text-white">
                Number
            </Text>
            {formErrors.number && (
                <Text className="text-red-500">{formErrors.number}</Text>
            )}

            <TextInput
                className="bg-neutral-100 dark:bg-neutral-900 p-3 text-lg rounded-md mb-8 dark:text-white"
                placeholder="Barcode Number"
                value={card.number}
                onChangeText={(number) => {
                    onCardUpdate({ number });
                }}
            />

            {!card.isKnownBrand && (
                <>
                    <Text className="text-xl font-semibold mb-4 dark:text-white">
                        Color
                    </Text>
                    <ColorPicker
                        onColorPress={(color) => onCardUpdate({ color })}
                    />
                </>
            )}
            <TouchableOpacity
                className="bg-blue-500 p-3 rounded-xl mt-4"
                onPress={handleSave}
            >
                <Text className="text-white text-center font-bold text-lg">
                    Save Card
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default FinalizeCard;
