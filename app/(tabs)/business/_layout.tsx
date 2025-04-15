import React from 'react';
import { Platform, View } from 'react-native';
import { Stack, router } from 'expo-router';
import CustomHeader from '@/components/CustomHeader';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { observer } from 'mobx-react-lite';

  const RootLayout = observer(() => {
  
  const isWeb = Platform.OS === 'web';
  const { colors } = useThemeStyles();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, paddingBottom: process.env.EXPO_OS === 'ios' ? 80 : 0 }}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="history"
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="manage-services"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="manage-staff"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </View>
  );
});
export default RootLayout
