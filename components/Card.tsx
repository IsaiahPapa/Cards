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
            <Image source={{ uri: imageUri }} className="h-20 aspect-square" />
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
            className={`rounded-lg shadow-md overflow-hidden w-full h-48 items-center justify-center`}
        >
            <View className="items-center justify-center">
                <LogoOrCode
                    isKnownBrand={isKnownBrand}
                    title={title}
                    imageUri={imageUri}
                />
            </View>
            <View className="pb-2 absolute bottom-0">
                <Text className="text-lg text-white text-center">{title}</Text>
            </View>
        </Pressable>
    );
};

export default Card;
