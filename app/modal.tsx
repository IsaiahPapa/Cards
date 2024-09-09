import { StatusBar } from 'expo-status-bar';
import { Platform, View, Text} from 'react-native';


export default function ModalScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-lg font-bold">Modal</Text>
      <View className="bg-gray-200 dark:bg-white dark:bg-opacity-10 h-px w-4/5 my-7.5" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
