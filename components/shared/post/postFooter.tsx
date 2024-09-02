import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

export function PostFooter() {


    return (
        <View style={[styles.container, {
            flexDirection: "row"
        }]}>
            <View style={styles.buttonWrapper} >
                <TouchableOpacity style={styles.button}>
                    <MaterialIcons name="exposure-plus-1" size={24} color={'gray'} />
                </TouchableOpacity>
                <Text style={styles.counterLabel}>1</Text>
            </View>

            <View style={{ flexDirection: "row", gap: 20 }}>
                <View style={styles.buttonWrapper} >
                    <TouchableOpacity style={styles.button}>
                        <MaterialIcons name="comment" size={20} color={'gray'} />
                    </TouchableOpacity>
                    <Text style={styles.counterLabel}>1</Text>
                </View>

                <View style={styles.buttonWrapper} >
                    <TouchableOpacity style={styles.button}>
                        <MaterialIcons name="share" size={20} color={'gray'} />
                    </TouchableOpacity>
                    <Text style={styles.counterLabel}>1</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingVertical: 15,
        paddingHorizontal: 20,
        width: '100%',
    },
    buttonWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    counterLabel: {
        color: Colors.grayX2
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.grayPrimary,
        width: 35,
        height: 35,
        borderRadius: 20
    }
});
