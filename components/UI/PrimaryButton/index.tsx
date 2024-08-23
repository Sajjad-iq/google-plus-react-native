import { Text, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';

interface Props extends TouchableOpacityProps {
    title?: string;
}

export function PrimaryButton({ title = 'POST', ...rest }: Props) {
    return (
        <TouchableOpacity
            style={[styles.postButton, rest.style]}
            {...rest}
        >
            <Text style={styles.postButtonText}>{title}</Text>
        </TouchableOpacity>
    );
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
});
