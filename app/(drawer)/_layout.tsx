import { Drawer } from "expo-router/drawer";
import { TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useHeader } from '@/context/GlobalContext';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors";
import { DrawerContent } from "@/components/others/DrawerContent";
import { router } from "expo-router";

export default function DrawerLayout() {
  const navigation = useNavigation();
  const { headerTitle } = useHeader();

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'transparent' }}>
      <Drawer
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.redPrimary,
            elevation: 0, // Remove shadow on Android
            shadowOpacity: 0, // Remove shadow on iOS
            borderBottomWidth: 0, // Ensure no border at the bottom
          },
          headerTintColor: Colors.whitePrimary,
          title: headerTitle,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <Icon
                name="menu"
                size={28}
                color={Colors.whitePrimary}
                style={{ marginLeft: 16, marginRight: 20 }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push("/(stack)/search")}>
              <Icon
                name="search"
                size={26}
                color={Colors.whitePrimary}
                style={{ marginRight: 16 }}
              />
            </TouchableOpacity>
          ),
        }}
      >
        <Drawer.Screen name="(tabs)" options={{ headerShown: true }} />
        <Drawer.Screen name="(stack)" options={{ headerShown: false }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}
