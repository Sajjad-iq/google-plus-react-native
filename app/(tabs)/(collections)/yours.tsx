import React from 'react';
import { View, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useHeader } from '@/context/HeaderContext';
import { CreateCard } from '@/components/shared/CreateCard';
import { Colors } from '@/constants/Colors';
import { useTranslation } from 'react-i18next';

export default function Yours() {
    const { setHeaderTitle, setHeaderColor } = useHeader();
    const { t } = useTranslation();

    useFocusEffect(
        React.useCallback(() => {
            setHeaderTitle(t('Collections.title'));
            setHeaderColor(Colors.bluePrimary);
        }, [setHeaderTitle])
    );

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <CreateCard ><Text style={{ color: "gray", fontWeight: 'bold', fontSize: 16, marginTop: 20 }}>{t("Collections.createCollection")}</Text></CreateCard>
        </View>
    ); // communiti
}
