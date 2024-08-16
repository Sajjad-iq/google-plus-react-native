import React from 'react';
import { View, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useHeader } from '@/context/HeaderContext';

export default function NotificationsScreen() {
    const { setHeaderTitle } = useHeader();

    useFocusEffect(
        React.useCallback(() => {
            setHeaderTitle('Notifications');
        }, [setHeaderTitle])
    );

    return (
        <View>
            <Text>Notifications Screen</Text>
        </View>
    );
}
