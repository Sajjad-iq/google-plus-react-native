import { Text, StyleSheet, Pressable, PressableProps, ViewStyle } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';

interface Props extends PressableProps {
    title?: string;
}

export function PrimaryButton({ title = 'POST', style, ...rest }: Props) {
    return (
        <Pressable
            style={(state) =>
                typeof style === 'function'
                    ? [styles.postButton, style(state)]
                    : [styles.postButton, style]
            }
            {...rest}
        >
            <Text style={styles.postButtonText}>{title}</Text>
        </Pressable>
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
