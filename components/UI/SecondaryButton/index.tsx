import { Text, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';

interface Props extends TouchableOpacityProps {
    title?: string;
}

export function SecondaryButton({ title = 'POST', ...rest }: Props) {
    return (
        <TouchableOpacity
            style={[styles.postButton, rest.style]}
            {...rest}
        >
            {rest.children}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    postButton: {
        flex: 0,
        backgroundColor: Colors.bluePrimary,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
