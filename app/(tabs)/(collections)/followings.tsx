import { CreateCard } from '@/components/shared/CreateCard';
import { Colors } from '@/constants/Colors';
import { useHeader } from '@/context/HeaderContext';
import { useFocusEffect } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Screen2() {
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
