import type { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import type {
    MaterialTopTabNavigationOptions,
    MaterialTopTabNavigationEventMap,
} from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useHeader } from '@/context/GlobalContext';
import { useTranslation } from 'react-i18next';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
    MaterialTopTabNavigationOptions,
    typeof Navigator,
    TabNavigationState<ParamListBase>,
    MaterialTopTabNavigationEventMap
>(Navigator);

export default function TabLayout() {
    const { headerColor } = useHeader();
    const { t } = useTranslation();

    return (
        <MaterialTopTabs
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: Colors.redPrimary,
                    shadowOpacity: 0, // Remove shadow on iOS
                    elevation: 0,     // Remove shadow on Android
                    borderBottomWidth: 0, // Ensure no bottom border
                },
                tabBarIndicatorStyle: { backgroundColor: Colors.whitePrimary }, // Active tab indicator
                tabBarActiveTintColor: Colors.whitePrimary, // Set active text color
                tabBarInactiveTintColor: Colors.grayPrimary, // Set inactive text color
                tabBarLabelStyle: { fontSize: 12 }, // Set font size of tab labels
            }}>
            <MaterialTopTabs.Screen name="index" options={{ title: t("Communities.recommended") }} />
            <MaterialTopTabs.Screen name="member" options={{ title: t("Communities.member") }} />
            <MaterialTopTabs.Screen name="yours" options={{ title: t("Communities.yours") }} />
        </MaterialTopTabs>
    );
}
