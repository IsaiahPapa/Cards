import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";

// List of pastel colors
const pastelColors = [
    "#AEC6CF", // Light Blue
    "#FFB3BA", // Light Pink
    "#FFDFBA", // Peach
    // "#FFFFBA", // Light Yellow
    "#B4E4B4", // Light Green
    "#B39EB5", // Light Lavender
    "#CFCFC4", // Light Grey
    "#FFCCCB", // Soft Red
    // "#F4C2C2", // Pastel Coral
    "#D4B0FF"  // Light Purple
  ];
  

const ColorPicker = ({ onColorPress }: { onColorPress: (color: string) => void }) => {
    return (
        <View className={`flex flex-wrap flex-row justify-center gap-2`}>
            {pastelColors.map((color, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => onColorPress(color)}
                    style={[{ backgroundColor: color }]}
                    className="w-12 h-12 rounded-lg border-black"
                />
            ))}
        </View>
    );
};

export default ColorPicker;
