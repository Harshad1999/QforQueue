import { router, Stack, useNavigation } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';
import CustomHeader from '@/components/CustomHeader';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function RootLayout() {
  const isWeb = Platform.OS === "web"; // Detect if running on web


  return (
    <View style={{ flex: 1, paddingBottom: process.env.EXPO_OS === 'ios' ? 80 : 0 }}>
      <Stack
        // screenOptions={{
        //   header: ({ route }) => (
        //     <CustomHeader
        //       title={route.name === 'index' ? 'Home' : 'Store Details'}
        //       LeftIcon={() => <IconSymbol name="arrow-back" size={24} color="black" />}
        //       RightIcon={() => <IconSymbol name="search" size={24} color="black" />}
        //       onLeftPress={() => router.back()}
        //       onRightPress={() => console.log('Search pressed')}
        //     />
        //   ),
        // }}
      >
        <Stack.Screen name="index" options={{ headerShown: false  }}
       />
        <Stack.Screen name="storeDetails" options={{ headerShown: true ,
           header:() => (
            <CustomHeader
              title={'Store Details'}
              LeftIcon={() => <IconSymbol name="arrow-back" size={24} color="black" />}
              // RightIcon={() => <IconSymbol name="search" size={24} color="black" />}
              // onRightPress={() => console.log('Search pressed')}
            />
          ),
        }} />
      </Stack>
    </View>
  );
}
