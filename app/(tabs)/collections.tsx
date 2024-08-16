import React from 'react';
import { View, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useHeader } from '@/context/HeaderContext';

export default function CollectionsScreen() {
    const { setHeaderTitle } = useHeader();

    useFocusEffect(
        React.useCallback(() => {
            setHeaderTitle('Collections');
        }, [setHeaderTitle])
    );

    return (
        <View>
            <Text>Collections Screen</Text>
        </View>
    ); // communities
}
