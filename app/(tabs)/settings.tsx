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

const SettingsScreen = () => {
  const [radius, setRadius] = useState(300); // in meters
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <ScrollView style={styles.container}>
      {/* Search Radius */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="location-outline" size={20} color="#4F46E5" />
          <Text style={styles.cardTitle}>Search Radius</Text>
        </View>
        <Text style={styles.label}>Nearby Radius: {radius} meters</Text>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={100}
          maximumValue={1000}
          step={100}
          value={radius}
          onValueChange={(value) => setRadius(value)}
          minimumTrackTintColor="#4F46E5"
          maximumTrackTintColor="#ccc"
          thumbTintColor={Platform.OS === 'android' ? '#4F46E5' : undefined}
        />
      </View>

      {/* Notifications */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="notifications-outline" size={20} color="#10B981" />
          <Text style={styles.cardTitle}>Notifications</Text>
        </View>
        <View style={styles.toggleRow}>
          <Text style={styles.label}>Enable Push Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#ccc', true: '#10B981' }}
            thumbColor={Platform.OS === 'android' ? '#fff' : undefined}
          />
        </View>
      </View>

      {/* Account Section */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Feather name="user" size={20} color="#6366F1" />
          <Text style={styles.cardTitle}>Account</Text>
        </View>
        <Text style={styles.label}>Manage your account settings</Text>
        {/* You can add Logout, Change Password etc. here */}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
    paddingTop:30
  },
  card: {
    backgroundColor: '#fff',
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
    color: '#111827',
  },
  label: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 12,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
