import React from 'react';
import { View, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useHeader } from '@/context/GlobalContext';
import { CreateCard } from '@/components/UI/CreateCard';
import { Colors } from '@/constants/Colors';
import { useTranslation } from 'react-i18next';

export default function yours() {
    const { setHeaderTitle } = useHeader();
    const { t } = useTranslation();

    useFocusEffect(
        React.useCallback(() => {
            setHeaderTitle(t("Communities.title"));
        }, [setHeaderTitle])
    );


    return (
        <View style={{ flex: 1, padding: 10 }}>
            <CreateCard ><Text style={{ color: "gray", fontWeight: 'bold', fontSize: 16, marginTop: 20 }}>{t('Communities.createCommunity')}</Text></CreateCard>
        </View>
    ); // communitie
}
