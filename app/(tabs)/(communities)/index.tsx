import { CreateCard } from '@/components/shared/CreateCard';
import { Colors } from '@/constants/Colors';
import { useHeader } from '@/context/HeaderContext';
import { useFocusEffect } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

export default function RECOMMENDED() {
    const { setHeaderTitle, setHeaderColor } = useHeader();

    useFocusEffect(
        React.useCallback(() => {
            setHeaderTitle('Communities');
            setHeaderColor(Colors.greenPrimary);
        }, [setHeaderTitle, setHeaderColor])
    );


    return (
        <View style={{ flex: 1, padding: 10 }}>
            <CreateCard ><Text style={{ color: "gray", fontWeight: 'bold', fontSize: 16, marginTop: 20 }}>Create a Communitie</Text></CreateCard>
        </View>
    ); // communities
}


