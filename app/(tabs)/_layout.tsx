import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2c3e50',
        tabBarStyle: {
          backgroundColor: '#ecf0f1',
          height: 65,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarStyle: { display: 'none' }, // cache la tabBar ici
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="signalement"
        options={{
          title: 'Signalement',
          tabBarIcon: ({ color }) => (
            <Ionicons name="alert-circle" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="zones"
        options={{
          title: 'Zones à risque',
          tabBarIcon: ({ color }) => (
            <Ionicons name="map" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
