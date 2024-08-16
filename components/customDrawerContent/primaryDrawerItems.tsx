import { DrawerItem } from "@react-navigation/drawer";
import { StyleSheet } from "react-native";
import {
    MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
export default function PrimaryDrawerItems() {
    return (
        <>
            <DrawerItem
                icon={({ size, color }) => (
                    <MaterialIcons name="account-circle" size={size} color={color} />
                )}
                label={"Profile"}
                labelStyle={[
                    styles.navItemLabel,
                ]}
                style={{ backgroundColor: "#fff" }}
                onPress={() => {
                    router.push("/(stack)/profile");
                }} />

            <DrawerItem
                icon={({ size, color }) => (
                    <MaterialIcons name="people" size={size} color={color} />
                )}
                label={"People"}
                labelStyle={[
                    styles.navItemLabel,
                ]}
                style={{ backgroundColor: "#fff" }}
                onPress={() => {
                    router.push("/(stack)/people");
                }} />

            <DrawerItem
                icon={({ size, color }) => (
                    <MaterialIcons name="event" size={size} color={color} />
                )}
                label={"Events"}
                labelStyle={[
                    styles.navItemLabel,
                ]}
                style={{ backgroundColor: "#fff" }}
                onPress={() => {
                    router.push("/(stack)/events");
                }} />

            <DrawerItem
                icon={({ size, color }) => (
                    <MaterialIcons name="settings" size={size} color={color} />
                )}
                label={"Settings"}
                labelStyle={[
                    styles.navItemLabel,
                ]}
                style={{ backgroundColor: "#fff" }}
                onPress={() => {
                    router.push("/(stack)/settings");
                }} />

            <DrawerItem
                icon={({ size, color }) => (
                    <MaterialIcons name="feedback" size={size} color={color} />
                )}
                label={"Send Feedback"}
                labelStyle={[
                    styles.navItemLabel,
                ]}
                style={{ backgroundColor: "#fff" }}
                onPress={() => {
                    router.push("/(stack)/feedback");
                }} />

            <DrawerItem
                icon={({ size, color }) => (
                    <MaterialIcons name="help" size={size} color={color} />
                )}
                label={"Help"}
                labelStyle={[
                    styles.navItemLabel,
                ]}
                style={{ backgroundColor: "#fff" }}
                onPress={() => {
                    router.push("/(stack)/help");
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