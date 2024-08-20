import React from 'react';
import { Image, Text } from 'react-native';
import { DrawerItem } from '@react-navigation/drawer';
import { StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Import your custom icons
const googlePhotosIcon = require('@/assets/images/photos.png'); // Replace with your actual icon path social.png
const hangoutsIcon = require('@/assets/images/social.png'); // Replace with your actual icon path 
const googleIcon = require('@/assets/images/google.png'); // Replace with your actual icon path 

export default function SecondaryDrawerItems() {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.title}>Google apps</Text>
            <DrawerItem
                icon={({ size }) => (
                    <Image
                        source={googlePhotosIcon}
                        style={[styles.icon, { width: size, height: size }]} // Set icon size
                    />
                )}
                label={"Google Photos"}
                labelStyle={styles.navItemLabel}
                style={{ backgroundColor: "#fff" }}
                onPress={() => {
                }} />

            <DrawerItem
                icon={({ size }) => (
                    <Image
                        source={hangoutsIcon} // Use a different icon if needed
                        style={[styles.icon, { width: size, height: size }]} // Set icon size
                    />
                )}
                label={"Hangouts"}
                labelStyle={styles.navItemLabel}
                style={{ backgroundColor: "#fff" }}
                onPress={() => {
                }} />

            <DrawerItem
                icon={({ size }) => (
                    <Image
                        source={googleIcon} // Use a different icon if needed
                        style={[styles.icon, { width: size, height: size }]} // Set icon size
                    />
                )}
                label={"Google Search"}
                labelStyle={styles.navItemLabel}
                style={{ backgroundColor: "#fff" }}
                onPress={() => {
                }} />

            <DrawerItem
                icon={({ size, color }) => (
                    <MaterialIcons name="my-location" size={size} color={color} />
                )}
                label={"Locations"}
                labelStyle={[
                    styles.navItemLabel,
                ]}
                style={{ backgroundColor: "#fff" }}
                onPress={() => {
                }} />

        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: 'rgba(0, 0, 0, 0.15)',
        borderStyle: 'solid',
        flexDirection: 'column',
        marginTop: 10,
        paddingTop: 10,
    },
    navItemLabel: {
        fontSize: 14,
    },
    icon: {
        resizeMode: 'contain', // Ensures the icon scales correctly
    },
    title: {
        fontSize: 14,
        color: 'rgba(0, 0, 0, 0.40)',
        marginTop: 10,
        marginBottom: 15,
        marginLeft: 20,
    }
});
