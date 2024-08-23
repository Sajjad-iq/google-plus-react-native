import { CreateCard } from '@/components/shared/CreateCard';
import { Colors } from '@/constants/Colors';
import { useHeader } from '@/context/HeaderContext';
import { useFocusEffect } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native';

export default function Followings() {
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
