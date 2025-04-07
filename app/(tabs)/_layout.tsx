import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { observer } from 'mobx-react-lite';
import { stores } from '@/core-stores';

const TabLayout = observer(() => {
  const { colors } = useThemeStyles();
  const isIos = process.env.EXPO_OS === 'ios';
  const isBusiness = stores.isBusinessOwner;
  console.log('isBusiness',isBusiness)

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        headerTitleAlign: 'center',
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarActiveTintColor: colors.tabIconSelected,
        tabBarInactiveTintColor: colors.tabIconDefault,
        tabBarStyle: Platform.select({
          ios: { position: 'absolute' },
          default: { backgroundColor: colors.background },
        }),
      }}
    >
      {/* Customer-only tabs */}
      {!isBusiness && (
        <>
          <Tabs.Screen
            name="home"
            options={{
              title: 'Home',
              tabBarIcon: ({ color }) => (
                <IconSymbol size={28} name={isIos ? 'house' : 'home'} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="my-appointments"
            options={{
              title: 'My Bookings',
              tabBarIcon: ({ color }) => (
                <IconSymbol size={28} name="ticket" color={color} />
              ),
            }}
          />
        </>
      )}

      {/* Business-only tab */}
      {isBusiness && (
        <Tabs.Screen
          name="business"
          options={{
            title: 'Business',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="storefront" color={color} />
            ),
          }}
        />
      )}

      {/* Shared tabs */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Setting',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="settings" color={color} />
          ),
        }}
      />
    </Tabs>
  );
});

export default TabLayout;
