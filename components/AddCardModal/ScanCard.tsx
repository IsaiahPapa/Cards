import { FontAwesome } from "@expo/vector-icons";
import {
    CameraView,
    CameraType,
    useCameraPermissions,
    BarcodeScanningResult,
} from "expo-camera";
import { useEffect, useState } from "react";
import {
    Button,
    GestureResponderEvent,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Animated, { SlideInRight } from "react-native-reanimated";
import { useIsDarkMode } from "../Themed";

/**
 * https://www.dynamsoft.com/codepool/expo-barcode-scanner.html
 * Could do something like this later on for better ux
 */

const BackButton = ({
    onBack,
}: {
    onBack: (event: GestureResponderEvent) => void;
}) => {
    return (
        <TouchableOpacity
            onPress={onBack}
            className="p-2 rounded-md bg-neutral-800"
        >
            <Text className="text-center" style={{ color: "white" }}>
                Back to List
            </Text>
        </TouchableOpacity>
    );
};

export default function ScanCardPage({
    onBack,
    onCardScanned,
    onEnterManually,
}: {
    onBack: (event: GestureResponderEvent) => void;
    onCardScanned: (barcode: BarcodeScanningResult) => void;
    onEnterManually(): void;
}) {
    const [permission, requestPermission] = useCameraPermissions();
    const isDarkMode = useIsDarkMode();

    useEffect(() => {
        if (permission?.granted) return;
        //Request permission on mount
        requestPermission();
    }, []);

    if (!permission) {
        // Camera permissions are still loading.
        return (
            <View>
                <Text style={styles.message}>Loading camera...</Text>
            </View>
        );
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <BackButton onBack={onBack} />
                <Text style={styles.message}>
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function handleBarcodeScanned(barcode: BarcodeScanningResult) {
        console.log(`Barcode scanned`, barcode);
        onCardScanned(barcode);
    }

    return (
        <View
            style={styles.container}
        >
            <View className="h-12 w-full dark:bg-black justify-center">
                <TouchableOpacity
                    onPress={onBack}
                    className="absolute m-2 pl-6 p-2 z-10"
                >
                    <FontAwesome
                        name="chevron-left"
                        size={16}
                        color={isDarkMode ? "white" : "black"}
                    />
                </TouchableOpacity>
                <Text className="text-center dark:text-white text-xl font-bold">
                    Scan
                </Text>
            </View>

            <CameraView
                onBarcodeScanned={handleBarcodeScanned}
                style={styles.camera}
                facing={"back"}
                // className="flex-1 items-center justify-center"
            >
                <View className="w-full h-full flex items-center justify-center gap-8">
                    <Text className="text-center text-white text-xl">
                        Scan your card's barcode
                    </Text>

                    <View className="border-2 h-40 w-3/4 self-center border-white rounded-xl" />
                    <Text className="text-center text-white text-xl opacity-50">
                        or
                    </Text>
                    <TouchableOpacity onPress={onEnterManually} className="rounded-full bg-white w-3/4 p-4">
                        <Text className="text-center text-black">
                            Enter your card manually
                        </Text>
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        width: "100%",
    },
    message: {
        textAlign: "center",
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "transparent",
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: "flex-end",
        alignItems: "center",
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
    },
    scanArea: {
        position: "absolute",
        left: "10%",
        right: "10%",
        top: "40%",
        bottom: "40%",
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 12,
    },
});
