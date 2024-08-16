import React from 'react';
import { View, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useHeader } from '@/context/HeaderContext';

export default function CommunitiesScreen() {
    const { setHeaderTitle } = useHeader();

    useFocusEffect(
        React.useCallback(() => {
            setHeaderTitle('Communities');
        }, [setHeaderTitle])
    );

    return (
        <View>
            <Text>Communities Screen</Text>
        </View>
    );
}
