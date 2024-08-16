import React from 'react';
import { View, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useHeader } from '@/context/HeaderContext';

export default function HomeScreen() {
    const { setHeaderTitle } = useHeader();

    useFocusEffect(
        React.useCallback(() => {
            setHeaderTitle('Home');
        }, [setHeaderTitle])
    );

    return (
        <View>
            <Text>Home Screen</Text>
        </View>
    );
}
