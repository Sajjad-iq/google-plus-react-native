import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '@/constants/Colors';
import { Avatar } from '@/components/UI/avatar';
import { MaterialIcons } from '@expo/vector-icons';

export function AddComment() {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.wrapper}>
            <View style={styles.inputRow}>
                <Avatar size={'Small'} />
                <TextInput
                    style={styles.textArea}
                    placeholder="Add a comment"
                    placeholderTextColor={Colors.grayX2}
                    multiline={true}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />

                {!isFocused && (
                    <TouchableOpacity style={styles.postButton}>
                        <Text style={styles.postButtonText}>POST</Text>
                    </TouchableOpacity>
                )}
            </View>

            {isFocused && (
                <View style={styles.actionsRow}>
                    <View style={styles.iconsRow}>
                        <TouchableOpacity style={styles.iconButton}>
                            <MaterialIcons name="camera-alt" size={25} color={'gray'} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton}>
                            <MaterialIcons name="link" size={25} color={'gray'} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.postButton}>
                        <Text style={styles.postButtonText}>POST</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: Colors.whitePrimary,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderTopColor: Colors.grayX3,
        borderTopWidth: 1,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    textArea: {
        flex: 1,
        backgroundColor: Colors.whitePrimary,
        borderRadius: 5,
        marginLeft: 15,
        color: Colors.text,
        fontSize: 16,
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    actionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
    },
    iconsRow: {
        flexDirection: 'row',
        gap: 25,
    },
    iconButton: {
    },
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
});
