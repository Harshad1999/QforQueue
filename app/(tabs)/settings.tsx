import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Platform,
  ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons, Feather } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import { stores } from '@/core-stores';
import { useThemeStyles } from '@/hooks/useThemeStyles';

const SettingsScreen = observer(() => {
  const [radius, setRadius] = useState(300); // in meters
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { colors, isDark } = useThemeStyles();

  const handleToggleTheme = () => {
    stores.themeStore.setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Search Radius */}
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <View style={styles.cardHeader}>
          <Ionicons name="location-outline" size={20} color={colors.primary} />
          <Text style={[styles.cardTitle, { color: colors.text }]}>Search Radius</Text>
        </View>
        <Text style={[styles.label, { color: colors.text }]}>
          Nearby Radius: {radius} meters
        </Text>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={100}
          maximumValue={1000}
          step={100}
          value={radius}
          onValueChange={(value) => setRadius(value)}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.border}
          thumbTintColor={Platform.OS === 'android' ? colors.primary : undefined}
        />
      </View>

      {/* Notifications */}
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <View style={styles.cardHeader}>
          <Ionicons name="notifications-outline" size={20} color={colors.success} />
          <Text style={[styles.cardTitle, { color: colors.text }]}>Notifications</Text>
        </View>
        <View style={styles.toggleRow}>
          <Text style={[styles.label, { color: colors.text }]}>
            Enable Push Notifications
          </Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: colors.border, true: colors.success }}
            thumbColor={Platform.OS === 'android' ? colors.background : undefined}
          />
        </View>
      </View>

      {/* Appearance - Theme Toggle */}
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <View style={styles.cardHeader}>
          <Ionicons name="moon-outline" size={20} color={colors.accent} />
          <Text style={[styles.cardTitle, { color: colors.text }]}>Appearance</Text>
        </View>
        <View style={styles.toggleRow}>
          <Text style={[styles.label, { color: colors.text }]}>Dark Mode</Text>
          <Switch
            value={isDark}
            onValueChange={handleToggleTheme}
            trackColor={{ false: colors.border, true: colors.accent }}
            thumbColor={Platform.OS === 'android' ? colors.background : undefined}
          />
        </View>
      </View>

      {/* Account Section */}
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <View style={styles.cardHeader}>
          <Feather name="user" size={20} color={colors.primary} />
          <Text style={[styles.cardTitle, { color: colors.text }]}>Account</Text>
        </View>
        <Text style={[styles.label, { color: colors.text }]}>
          Manage your account settings
        </Text>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
});

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
  },
  card: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: Platform.OS === 'android' ? 2 : 0,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  label: {
    fontSize: 14,
    marginBottom: 12,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
