import { DrawerItem } from "@react-navigation/drawer";
import { StyleSheet } from "react-native";
import {
    MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useTranslation } from "react-i18next";
export default function PrimaryDrawerItems() {

    const { t } = useTranslation();

    return (
        <>
            <DrawerItem
                icon={({ size, color }) => (
                    <MaterialIcons name="account-circle" size={size} color={color} />
                )}
                label={t("drawerContent.profile")}
                labelStyle={[
                    styles.navItemLabel,
                    {
                        textAlign: 'left'
                    }
                ]}
                style={{ backgroundColor: Colors.whitePrimary }}
                onPress={() => {
                    router.push("/(stack)/profile");
                }} />

            <DrawerItem
                icon={({ size, color }) => (
                    <MaterialIcons name="people" size={size} color={color} />
                )}
                label={t("drawerContent.people")}
                labelStyle={[
                    styles.navItemLabel,
                    {
                        textAlign: 'left'
                    }
                ]}
                style={{ backgroundColor: Colors.whitePrimary }}
                onPress={() => {
                }} />

            <DrawerItem
                icon={({ size, color }) => (
                    <MaterialIcons name="event" size={size} color={color} />
                )}
                label={t("drawerContent.events")}
                labelStyle={[
                    styles.navItemLabel,
                    {
                        textAlign: 'left'
                    }
                ]}
                style={{ backgroundColor: Colors.whitePrimary }}
                onPress={() => {
                }} />

            <DrawerItem
                icon={({ size, color }) => (
                    <MaterialIcons name="settings" size={size} color={color} />
                )}
                label={t("drawerContent.settings")}
                labelStyle={[
                    styles.navItemLabel,
                    {
                        textAlign: 'left'
                    }
                ]}
                style={{ backgroundColor: Colors.whitePrimary }}
                onPress={() => {
                    router.push("/(stack)/settings");
                }} />

            <DrawerItem
                icon={({ size, color }) => (
                    <MaterialIcons name="feedback" size={size} color={color} />
                )}
                label={t("drawerContent.feedback")}
                labelStyle={[
                    styles.navItemLabel,
                    {
                        textAlign: 'left'
                    }
                ]}
                style={{ backgroundColor: Colors.whitePrimary }}
                onPress={() => {
                }} />

            <DrawerItem
                icon={({ size, color }) => (
                    <MaterialIcons name="help" size={size} color={color} />
                )}
                label={t("drawerContent.help")}
                labelStyle={[
                    styles.navItemLabel,
                    {
                        textAlign: 'left'
                    }
                ]}
                style={{ backgroundColor: Colors.whitePrimary }}
                onPress={() => {
                }} />
        </>
    )
}
// SecondaryDrawerItems


const styles = StyleSheet.create({
    navItemLabel: {
        fontSize: 14,
    }
});