import { CreateCard } from '@/components/UI/CreateCard';
import { Colors } from '@/constants/Colors';
import { useHeader } from '@/context/GlobalContext';
import { useFocusEffect } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native';

export default function Member() {
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
