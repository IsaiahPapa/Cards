import { useState } from "react";
import { TextInput, View, Text, TouchableOpacity, GestureResponderEvent } from "react-native";
import ColorPicker from "../ColorPicker";
import Card, { CardType } from "../Card";
import Animated, { SlideInRight, SlideOutRight } from "react-native-reanimated";
import { FontAwesome } from "@expo/vector-icons";

const FinalizeCard: React.FC<{
    card: CardType;
    onBack: (event: GestureResponderEvent) => void;
    onFinalize: (card: CardType) => void;
}> = ({ card, onBack, onFinalize }) => {
    const [barcodeNumber, setBarcodeNumber] = useState(card.number);
    const [cardName, setCardName] = useState(card.title);
    const [selectedColor, setSelectedColor] = useState("#AEC6CF");

    return (
        <Animated.View
            entering={SlideInRight.duration(300).springify().damping(50)}
            exiting={SlideOutRight.duration(300).springify().damping(50)}
            className="flex-1 bg-black p-4 w-full"
        >
            <TouchableOpacity
                onPress={onBack}
                className="bg-neutral-800 rounded-full w-12 h-12 items-center justify-center self-end"
            >
                <FontAwesome name="close" size={16} color={"#777"} />
            </TouchableOpacity>
            <Text className="text-4xl font-bold my-8 text-center text-white">Create Card</Text>
            <View className="w-full mb-4">
                <Card
                    title={cardName ?? ""}
                    imageUri={card.imageUri}
                    color={selectedColor}
                    isKnownBrand={card.isKnownBrand}
                    type={card.type}
                    number={card.number}
                    notes={card.notes}
                    locations={card.locations}
                    photos={card.photos}
                />
            </View>

            <Text className="text-xl font-semibold mb-4 text-white">Number</Text>
            <TextInput
                className="bg-neutral-900 p-3 text-lg rounded-md mb-8 text-white"
                placeholder="Barcode Number"
                value={barcodeNumber}
                onChangeText={setBarcodeNumber}
            />
            <Text className="text-xl font-semibold mb-4 text-white">Title</Text>
            <TextInput
                className="bg-neutral-900 p-3 text-lg rounded-md mb-8 text-white"
                placeholder="Card Name (e.g., Walmart)"
                value={cardName}
                onChangeText={setCardName}
            />
            {!card.isKnownBrand && (
                <>
                    <Text className="text-xl font-semibold mb-4 text-white">Color</Text>
                    <ColorPicker onColorPress={(color) => setSelectedColor(color)} />
                </>
            )}
            <TouchableOpacity
                className="bg-blue-500 p-3 rounded-xl mt-4"
                onPress={() => {
                    // Here you would typically save the data
                    console.log({ barcodeNumber, cardName, selectedColor });
                    // Reset form
                    onFinalize({
                        ...card,
                        title: cardName,
                        color: selectedColor,
                        number: barcodeNumber,
                    });
                }}
            >
                <Text className="text-white text-center font-bold text-lg">Save Card</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default FinalizeCard;
