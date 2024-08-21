import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors';
import { Avatar } from '@/components/UI/avatar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PrimaryButton } from '@/components/UI/PrimaryButton';

export function CratePostHeader() {
    return (
        <View style={{
            flexDirection: 'row', justifyContent: 'space-between', gap: 15, padding: 20,
        }}>
            <Avatar size={"Medium"} />
            <View style={{ flexDirection: 'column', gap: 5, flex: 1 }}>
                <Text style={styles.arthurName} >KILUA ZOLDYK</Text>
                <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                    <MaterialCommunityIcons name="earth" size={24} color={Colors.bluePrimary} />
                    <Text style={{ color: Colors.bluePrimary, fontWeight: '500' }}>Public</Text>
                </View>
            </View>
            <PrimaryButton title={"POST"} />
        </View>
    )
}

const styles = StyleSheet.create({
    postButton: {
        backgroundColor: 'transparent',
        paddingVertical: 8,
        borderRadius: 5,
    },
    postButtonText: {
        color: Colors.bluePrimary,
        fontSize: 16,
        fontWeight: '600',
    },
    arthurName: {
        fontWeight: 'bold',
    },
}); //PrimaryButton
