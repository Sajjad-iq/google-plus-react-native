import React from 'react';
import { Tabs } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View } from 'react-native'; // Import View for styling
import { useHeader } from '@/context/HeaderContext';
import { useTranslation } from 'react-i18next';

export default function TabLayout() {

  const { headerColor } = useHeader();
  const { t } = useTranslation();

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: headerColor, headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('home.title'),
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="home" color={color} />
        }}
      />

      <Tabs.Screen
        name="(collections)"
        options={{
          title: t('Collections.title'),
          tabBarIcon: ({ color }) => (
            <View style={{ transform: [{ rotate: '45deg' }] }}>
              <Ionicons size={20} name="grid" color={color} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="(communities)"
        options={{
          title: t('Communities.title'),
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="google-circles-communities" color={color} />
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          title: t('Notifications.title'),
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="notifications" color={color} />
        }}
      />
    </Tabs>
  );
}
