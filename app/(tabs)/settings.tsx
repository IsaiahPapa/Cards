import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Switch,
    GestureResponderEvent,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { Icon } from "@expo/vector-icons/build/createIconSet";

const SettingItem = ({
    icon,
    title,
    onPress,
    value,
    toggle,
}: {
    icon: any;
    title: string;
    onPress(): void;
    value?: boolean;
    toggle?: boolean;
}) => (
    <TouchableOpacity className="p-4 flex-row items-center" onPress={onPress}>
        <View className="w-8">{icon}</View>
        <Text className="dark:text-white text-black text-lg flex-1 ml-3">
            {title}
        </Text>
        {toggle && (
            <Switch
                value={value}
                onValueChange={onPress}
                // trackColor={{ false: "#767577", true: "#81b0ff" }}
                // thumbColor={value ? "#f5dd4b" : "#f4f3f4"}
            />
        )}
    </TouchableOpacity>
);

const Divider = () => (
    <View
        style={{ height: 1 }}
        className="w-full self-center bg-neutral-300 dark:bg-neutral-600"
    />
);

const SectionTitle = ({ title }: { title: string }) => (
    <Text className="text-lg font-semibold text-gray-500 dark:text-gray-400 mt-6 mb-2 px-4">
        {title}
    </Text>
);

const SettingsMenu = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [darkModeEnabled, setDarkModeEnabled] = useState(false);

    return (
        <ScrollView className="flex-1 bg-white dark:bg-black">
            <View className="mt-20 mx-4">
                <Text className="text-4xl font-bold dark:text-white text-black mb-8">
                    Settings
                </Text>

                <SectionTitle title="Account" />
                <View className="bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                    <SettingItem
                        icon={
                            <FontAwesome
                                name="user"
                                size={20}
                                className="text-blue-500"
                            />
                        }
                        title="Profile"
                        onPress={() => {
                            /* Navigate to Profile */
                        }}
                    />
                    <Divider />
                    <SettingItem
                        icon={
                            <FontAwesome
                                name="lock"
                                size={20}
                                className="text-green-500"
                            />
                        }
                        title="Privacy"
                        onPress={() => {
                            /* Navigate to Privacy */
                        }}
                    />
                </View>

                <SectionTitle title="Preferences" />
                <View className="bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                    <SettingItem
                        icon={
                            <FontAwesome
                                name="bell"
                                size={20}
                                className="text-yellow-500"
                            />
                        }
                        title="Notifications"
                        value={notificationsEnabled}
                        onPress={() =>
                            setNotificationsEnabled(!notificationsEnabled)
                        }
                        toggle
                    />
                    <Divider />
                    <SettingItem
                        icon={
                            <FontAwesome
                                name="moon-o"
                                size={20}
                                color={"#6c5ce7"}
                            />
                        }
                        title="Dark Mode"
                        value={darkModeEnabled}
                        onPress={() => setDarkModeEnabled(!darkModeEnabled)}
                        toggle
                    />
                </View>

                <SectionTitle title="Support" />
                <View className="bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                    <SettingItem
                        icon={
                            <FontAwesome
                                name="question-circle"
                                size={20}
                            />
                        }
                        title="Help Center"
                        onPress={() => {
                            /* Navigate to Help Center */
                        }}
                    />
                    <Divider />
                    <SettingItem
                        icon={
                            <FontAwesome
                                name="envelope"
                                size={20}
                                color={"fill"}
                            />
                        }
                        title="Contact Us"
                        onPress={() => {
                            /* Navigate to Contact Us */
                        }}
                    />
                </View>

                <TouchableOpacity
                    className="mt-8 p-4 bg-red-500 rounded-lg"
                    onPress={() => {
                        /* Handle logout */
                    }}
                >
                    <Text className="text-white text-center text-lg font-semibold">
                        Log Out
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default SettingsMenu;
