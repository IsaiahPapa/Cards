import { BlurView } from "expo-blur";
import { useRef } from "react";
import { Image, Pressable, PressableProps, Text, View } from "react-native";
type CardLocation = {
    latitude: number;
    longitude: number;
};

interface Photo {
    id: string; // Unique identifier for the photo
    uri: string; // Local or remote URI for the photo
    type: "local" | "remote"; // Whether it's stored locally or remotely
    createdAt: Date; // When the photo was taken or added
    syncedToCloud?: boolean; // Boolean flag for whether it’s synced to iCloud (optional)
}

export type CardType = {
    id: string;
    title: string;
    color: string;
    imageUri: string | null;
    isKnownBrand: boolean;
    type: string;
    number: string;
    notes: string;
    locations: CardLocation[];
    photos: Photo[];
};

export const LogoOrCode = ({
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
        return (
            <Image source={{ uri: imageUri }} className="h-20 w-full aspect-[1.6]" />
        );
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

        return (
            <Text className="text-4xl text-center text-white my-4">{code}</Text>
        );
    }
};

interface CardProps extends Omit<CardType, "id">, PressableProps {}

const Card: React.FC<CardProps> = ({
    title,
    color,
    isKnownBrand,
    imageUri,
    ...pressableProps
}) => {

    return (
        <Pressable

            {...pressableProps}
            style={{
                backgroundColor: color,
            }}
            className={`rounded-xl shadow-md overflow-hidden w-full h-48 aspect-[1.6] items-center justify-center`}
        >
            {isKnownBrand && imageUri ? (
                <Image
                    source={{ uri: imageUri }}
                    className="h-full w-full absolute top-0 left-0"
                />
            ) : (
                <View className="items-center justify-center">
                    <LogoOrCode
                        isKnownBrand={isKnownBrand}
                        title={title}
                        imageUri={imageUri}
                    />
                </View>
            )}
            <View
                className="mb-2 absolute bottom-0"
                style={{
                    borderRadius: 99,
                    overflow: "hidden",
                }}
            >
                <BlurView
                    tint="default"
                    className="flex-row py-3 px-8 gap-4 items-center"
                >
                    <Text className="text-black font-semibold text-xl">{title}</Text>
                </BlurView>
            </View>
        </Pressable>
    );
};

export default Card;
