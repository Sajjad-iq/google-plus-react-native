import React from 'react';
import { View, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useHeader } from '@/context/HeaderContext';
import { CreateCard } from '@/components/shared/CreateCard';
import { Colors } from '@/constants/Colors';

export default function Screen3() {
    const { setHeaderTitle, setHeaderColor } = useHeader();

    useFocusEffect(
        React.useCallback(() => {
            setHeaderTitle('Collections');
            setHeaderColor(Colors.bluePrimary);
        }, [setHeaderTitle])
    );

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <CreateCard ><Text style={{ color: "gray", fontWeight: 'bold', fontSize: 16, marginTop: 20 }}>Create a Collection</Text></CreateCard>
        </View>
    ); // communities
}
