import React from 'react';
import { View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useHeader } from '@/context/HeaderContext';
import Post from '@/components/shared/post';
import { WhatsNew } from '@/components/others/whatsNew';
import { Pencil } from '@/components/others/Pencil';

export default function HomeScreen() {
    const { setHeaderTitle } = useHeader();

    useFocusEffect(
        React.useCallback(() => {
            setHeaderTitle('Home');
        }, [setHeaderTitle])
    );

    return (
        <View>
            <Pencil />
            <ScrollView contentContainerStyle={{ gap: 10, paddingVertical: 5 }}>
                <WhatsNew />
                <Post />
                <Post />
                <Post />
                <Post />
            </ScrollView>
        </View>

    );
}
