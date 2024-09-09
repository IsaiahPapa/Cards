import { BarcodeScanningResult } from "expo-camera";
import { Image, Text, View } from "react-native";

export type CardType = {
    title: string;
    color: string;
    imageUri: string | null;
    isKnownBrand: boolean;

    type: string;
    number: string;
};

const LogoOrCode = ({
    title,
    isKnownBrand,
    imageUri,
}: {
    title: CardType["title"];
    isKnownBrand: CardType["isKnownBrand"];
    imageUri: CardType["imageUri"];
}) => {
    title = String(title ?? "");
    if (isKnownBrand && imageUri) {
        return <Image source={{ uri: imageUri }} className="h-20 aspect-square" />;
    } else {
        let code = "";
        if (title.length < 2) {
            code = "XX";
        } else {
            // @ts-ignore: Object is possibly 'null'.
            code = title
                .match(/\b(\w)/g)
                .join("")
                .slice(0, 4)
                .toUpperCase(); // Extracts initials and limits to 4 chars
        }

        return <Text className="text-4xl text-center text-white my-4">{code}</Text>;
    }
};

const Card: React.FC<CardType> = (card) => {
    return (
        <View
            style={{
                backgroundColor: card.color,
            }}
            className={`m-2 rounded-lg shadow-md overflow-hidden w-full h-48 items-center justify-center`}
        >
            <View className="items-center justify-center">
                <LogoOrCode isKnownBrand={card.isKnownBrand} title={card.title} imageUri={card.imageUri} />
            </View>
            <View className="pb-2 absolute bottom-0">
                <Text className="text-lg text-white text-center">{card.title}</Text>
            </View>
        </View>
    );
};

export default Card;
