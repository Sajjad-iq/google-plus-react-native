import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Avatar } from '@/components/UI/avatar';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

export function WhatsNew() {
    return (
        <View style={styles.Wrapper}>
            <View style={styles.textWrapper} >
                <Avatar size={'Medium'} />
                <Text style={styles.text}>What's new with you?</Text>
            </View>

            <TouchableOpacity style={styles.button}>
                <MaterialIcons name="camera-alt" size={25} color={'gray'} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    Wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: Colors.whitePrimary
    },
    textWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    text: {
        fontSize: 14,
        color: Colors.grayX2,
        fontWeight: "500"
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.grayPrimary,
        width: 42,
        height: 42,
        borderRadius: 30
    }
});
