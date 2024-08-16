import { Drawer } from "expo-router/drawer";
import { CustomDrawerContent } from "@/components/customDrawerContent";
import { TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useHeader } from "@/context/HeaderContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function DrawerComponent() {
    const navigation = useNavigation();
    const { headerTitle } = useHeader();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                screenOptions={{

                    headerStyle: {
                        backgroundColor: '#d32f2f',
                    },
                    headerTintColor: '#FFFFFF',
                    headerTitleStyle: {
                        color: '#FFFFFF',
                    },
                    headerTitleAlign: 'left',
                    headerTitle: headerTitle,
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                            <Icon
                                name="menu"
                                size={28}
                                color="#FFFFFF"
                                style={{ marginLeft: 16, marginRight: 20 }}
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
