import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { observer } from 'mobx-react-lite';

import 'react-native-reanimated';

import { stores } from '@/core-stores';
import { LightNavigationTheme, DarkNavigationTheme } from '@/theme/navigationTheme';

// Prevent splash from hiding before loading is done
SplashScreen.preventAutoHideAsync();

const RootLayout = observer(() => {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  const isDark = stores.themeStore.theme === 'dark';
  const navigationTheme = isDark ? DarkNavigationTheme : LightNavigationTheme;

  return (
    <ThemeProvider value={navigationTheme}>
       <SafeAreaView style={{ flex: 1, backgroundColor: navigationTheme.colors.background }}>
    <StatusBar
      style={isDark ? 'light' : 'dark'}
      backgroundColor={navigationTheme.colors.background}
    />

        <Stack>
          {stores.isLoggedin === false ? (
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          ) : (
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          )
          }
          <Stack.Screen name="+not-found" />
        </Stack>
      </SafeAreaView>
    </ThemeProvider>
  );
});

export default RootLayout;
