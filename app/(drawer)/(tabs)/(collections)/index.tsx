import { CreateCard } from '@/components/UI/CreateCard';
import { Colors } from '@/constants/Colors';
import { useHeader } from '@/context/GlobalContext';
import { useFocusEffect } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Text } from 'react-native';

export default function FEATURED() {
    const { setHeaderTitle } = useHeader();
    const { t } = useTranslation();

    useFocusEffect(
        React.useCallback(() => {
            setHeaderTitle(t('Collections.title'));
        }, [setHeaderTitle])
    );

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <CreateCard ><Text style={{ color: "gray", fontWeight: 'bold', fontSize: 16, marginTop: 20 }}>{t("Collections.createCollection")}</Text></CreateCard>
        </View>
    ); // communities
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
});
