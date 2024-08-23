import { CreateCard } from '@/components/shared/CreateCard';
import { Colors } from '@/constants/Colors';
import { useHeader } from '@/context/GlobalContext';
import { useFocusEffect } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';

export default function RECOMMENDED() {
    const { setHeaderTitle, setHeaderColor } = useHeader();
    const { t } = useTranslation();

    useFocusEffect(
        React.useCallback(() => {
            setHeaderTitle(t("Communities.title"));
            setHeaderColor(Colors.greenPrimary);
        }, [setHeaderTitle, setHeaderColor])
    );


    return (
        <View style={{ flex: 1, padding: 10 }}>
            <CreateCard ><Text style={{ color: "gray", fontWeight: 'bold', fontSize: 16, marginTop: 20 }}>{t('Communities.createCommunity')}</Text></CreateCard>
        </View>
    ); // communities
}


