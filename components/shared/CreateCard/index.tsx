import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacityProps } from 'react-native-gesture-handler';

interface Props extends TouchableOpacityProps {
}

export function CreateCard(props: Props) {
    return (
        <TouchableOpacity style={styles.card} {...props}>
            <MaterialIcons name="add-circle-outline" size={50} color="gray" />
            {props.children}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '50%', // Use percentage for width
        height: 235,
        backgroundColor: Colors.whitePrimary, // Background color to make the shadow visible
        shadowColor: 'rgba(149, 157, 165, 1)', // Equivalent to the color in the CSS shadow
        shadowOffset: { width: 0, height: 8 }, // The offset to match the CSS shadow
        shadowOpacity: 0.2, // Opacity to match the CSS shadow
        shadowRadius: 24, // Blur radius to match the CSS shadow
        elevation: 12, // Elevation for Android to create a shadow effect similar to the blur
        justifyContent: 'center',
        alignItems: 'center',
    },
});
