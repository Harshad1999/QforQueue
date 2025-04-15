// This file is a fallback for using MaterialIcons on Android and web.

import Ionicons from '@expo/vector-icons/Ionicons';
import { SymbolWeight } from 'expo-symbols';
import React from 'react';
import { OpaqueColorValue, StyleProp, TextStyle } from 'react-native';

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  onPress
}: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
  onPress?: ()=>void
}) {
  return <Ionicons color={color} size={size} name={name} style={style} onPress={onPress}/>;
}
