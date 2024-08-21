import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export function CreatePostFooter() {
    return (
        <View style={styles.footerView}>
            <View style={{ flexDirection: 'row', gap: 30 }}>
                <TouchableOpacity >
                    <MaterialIcons name="camera-alt" size={24} color={'gray'} />
                </TouchableOpacity>
                <TouchableOpacity >
                    <MaterialIcons name="link" size={24} color={'gray'} />
                </TouchableOpacity>
                <TouchableOpacity >
                    <MaterialIcons name="analytics" size={24} color={'gray'} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity >
                <MaterialCommunityIcons name="dots-vertical" size={24} color={'gray'} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    footerView: {
        backgroundColor: Platform.OS === 'ios' ? Colors.whitePrimary : Colors.grayPrimary,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopColor: Colors.grayX3,
        borderTopWidth: Platform.OS === 'ios' ? 1 : 0,
    },
}); //PrimaryButton