import { FontAwesome } from "@expo/vector-icons";
import { CameraView, CameraType, useCameraPermissions, BarcodeScanningResult } from "expo-camera";
import { useEffect, useState } from "react";
import { Button, GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { SlideInRight } from "react-native-reanimated";

/**
 * https://www.dynamsoft.com/codepool/expo-barcode-scanner.html
 * Could do something like this later on for better ux
 */

const BackButton = ({ onBack }: { onBack: (event: GestureResponderEvent) => void }) => {
    return (
        <TouchableOpacity onPress={onBack} className="p-2 rounded-md bg-neutral-800">
            <Text className="text-center" style={{ color: "white" }}>
                Back to List
            </Text>
        </TouchableOpacity>
    );
};

export default function ScanCardPage({
    onBack,
    onCardScanned,
}: {
    onBack: (event: GestureResponderEvent) => void;
    onCardScanned: (barcode: BarcodeScanningResult) => void;
}) {
    const [permission, requestPermission] = useCameraPermissions();

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
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function handleBarcodeScanned(barcode: BarcodeScanningResult) {
        console.log(`Barcode scanned`, barcode);
        onCardScanned(barcode);
    }

    return (
        <Animated.View entering={SlideInRight.duration(200)} style={styles.container}>
            <View className="h-12 w-full bg-black justify-center">
                <TouchableOpacity onPress={onBack} className="absolute m-2 pl-6 p-2 z-10">
                    <FontAwesome name="chevron-left" size={16} color={"white"} />
                </TouchableOpacity>
                <Text className="text-center text-white text-xl font-bold">Scan</Text>
            </View>

            <CameraView onBarcodeScanned={handleBarcodeScanned} style={styles.camera} facing={"back"}>
                <View className="mt-32">
                    <Text className="text-center text-white">Scan your card's barcode</Text>
                </View>
                <View style={styles.scanArea} />
            </CameraView>
        </Animated.View>
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
