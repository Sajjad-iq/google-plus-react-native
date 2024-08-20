import React from 'react';
import { Tabs } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View } from 'react-native'; // Import View for styling
import { Colors } from '@/constants/Colors';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: Colors.redPrimary, headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="home" color={color} />
        }}
      />

      <Tabs.Screen
        name="collections"
        options={{
          title: 'Collections',
          tabBarIcon: ({ color }) => (
            <View style={{ transform: [{ rotate: '45deg' }] }}>
              <Ionicons size={20} name="grid" color={color} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="communities"
        options={{
          title: 'Communities',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="google-circles-communities" color={color} />
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="notifications" color={color} />
        }}
      />
    </Tabs>
  );
}
