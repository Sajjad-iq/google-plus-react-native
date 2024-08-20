import { Stack } from "expo-router";
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from "@/constants/Colors";

export default function ScreensLayout() {
  const navigation = useNavigation();

  return (
    <Stack screenOptions={{
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={28} color={Colors.whitePrimary} />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: Colors.redPrimary, // Customize as needed
      },
      headerTintColor: Colors.whitePrimary,  // Customize as needed
    }}>
      <Stack.Screen
        name="events"
        options={{ headerShown: true }}
      />
      <Stack.Screen name="feedback" options={{ headerShown: true }} />
      <Stack.Screen name="help" options={{ headerShown: true }} />
      <Stack.Screen name="people" options={{ headerShown: true }} />
      <Stack.Screen name="profile" options={{ headerShown: true }} />
      <Stack.Screen name="settings" options={{ headerShown: true }} />
      <Stack.Screen name="postView" options={{ headerTitle: '' }} />
    </Stack>
  );
}
