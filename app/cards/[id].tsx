import { useLocalSearchParams } from "expo-router";

import { Text, View } from "react-native";

export default function Page() {
    const { id } = useLocalSearchParams();
    return (
        <View className="mt-24 mx-4">
            <Text>Card Id: {id}</Text>
        </View>
    );
}
