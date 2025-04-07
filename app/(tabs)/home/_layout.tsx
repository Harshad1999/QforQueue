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
          name="storeDetails"
          options={{
            headerShown: true,
            header: () => (
              <CustomHeader
                title="Store Details"
                LeftIcon={() => <IconSymbol name="arrow-back" size={24} color={colors.icon} />}
                onLeftPress={() => router.back()}
              />
            ),
          }}
        />
      </Stack>
    </View>
  );
});
export default RootLayout
