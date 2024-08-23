import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useLayoutDirection } from '@/context/GlobalContext';

export function PostFooter() {

    const { currentLayoutDirection } = useLayoutDirection()
    const flexDirection = currentLayoutDirection == 'rtl' ? 'row-reverse' : 'row'

    return (
        <View style={[styles.container, { flexDirection: flexDirection }]}>
            <View style={styles.buttonWrapper} >
                <TouchableOpacity style={styles.button}>
                    <MaterialIcons name="exposure-plus-1" size={24} color={'gray'} />
                </TouchableOpacity>
                <Text style={styles.counterLabel}>1</Text>
            </View>

            <View style={{ flexDirection: flexDirection, gap: 20 }}>
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
