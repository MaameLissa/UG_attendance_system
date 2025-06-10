import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './HomeScreen'; // Your BiometricAttendanceOverview.js
import CalendarScreen from './CalendarScreen';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#2979f7',
        tabBarInactiveTintColor: '#b0b0b0',
        tabBarLabelStyle: { fontWeight: '700', fontSize: 12, marginBottom: 4 },
        tabBarStyle: {
          height: 64,
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 14,
        },
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'HomeTab')
            return <MaterialCommunityIcons name="home-variant-outline" size={size} color={color} />;
          if (route.name === 'Calendar')
            return <MaterialCommunityIcons name="calendar-month-outline" size={size} color={color} />;
          if (route.name === 'ProfileTab')
            return <MaterialCommunityIcons name="account-circle-outline" size={size} color={color} />;
          if (route.name === 'SettingsTab')
            return <MaterialCommunityIcons name="cog-outline" size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ title: "Home" }} />
      <Tab.Screen name="Calendar" component={CalendarScreen} options={{ title: "Calendar" }} /> 
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ title: "Profile" }} />
      <Tab.Screen name="SettingsTab" component={SettingsScreen} options={{ title: "Settings" }} />
    </Tab.Navigator>
  );
}