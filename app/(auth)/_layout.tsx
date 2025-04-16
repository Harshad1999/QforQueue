import React, { useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import 'react-native-reanimated';
import { observer } from 'mobx-react-lite';

import { stores } from '@/core-stores'; // <-- use MobX store

// Prevent splash from auto-hiding before fonts load
SplashScreen.preventAutoHideAsync();

const AuthLayout = observer(() => {
  const [loaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const theme = stores.themeStore.theme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <ThemeProvider value={theme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style={stores.themeStore.theme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
});

export default AuthLayout;
