import { Text, StyleSheet, Pressable, PressableProps, ViewStyle } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';

interface Props extends PressableProps {
    title?: string;
}

export function SecondaryButton({ title = 'POST', style, ...rest }: Props) {
    return (
        <Pressable
            style={(state) =>
                typeof style === 'function'
                    ? [styles.postButton, style(state)]
                    : [styles.postButton, style]
            }
            {...rest}
        >
            {rest.children}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    postButton: {
        backgroundColor: Colors.bluePrimary,
        borderRadius: 2,
    }
});
