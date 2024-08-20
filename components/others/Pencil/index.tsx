import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors';

export function Pencil() {
    return (
        <TouchableOpacity style={styles.button}>
            <MaterialCommunityIcons name="pencil" size={26} color="white" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        position: "absolute",
        top: "80%",
        zIndex: 10,
        right: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.redPrimary,
        width: 60,
        height: 60,
        borderRadius: 30,
    }
});