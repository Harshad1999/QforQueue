import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { observer } from 'mobx-react-lite';
import { stores } from '@/core-stores';
import { router } from 'expo-router';


const ProfileScreen = observer(() => {
  const { isBusinessOwner } = stores;
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    mobile: '+91 9876543210',
    photoUrl:
      'https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    location: 'Bangalore, India',
    joined: 'Jan 2023',
    appointments: 24,
  });

  const { colors, isDark } = useThemeStyles();

  const handleChange = (key: keyof typeof user, value: string) => {
    setUser((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <View style={[styles.wrapper, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Image source={{ uri: user.photoUrl }} style={styles.avatar} />
          <View style={styles.userInfo}>
            {editMode ? (
              <TextInput
                style={[styles.inputName, { color: colors.text, borderColor: colors.border }]}
                value={user.name}
                onChangeText={(text) => handleChange('name', text)}
              />
            ) : (
              <Text style={[styles.name, { color: colors.text }]}>{user.name}</Text>
            )}
            <Text style={[styles.location, { color: colors.subtext }]}>
              <Ionicons name="location-outline" size={14} color={colors.icon} /> {user.location}
            </Text>
          </View>
          <TouchableOpacity onPress={() => setEditMode(!editMode)}>
            <Feather name={editMode ? 'check' : 'edit'} size={20} color={colors.accent} />
          </TouchableOpacity>
        </View>

        {/* Contact Info */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Contact Info</Text>
          <View style={styles.infoRow}>
            <MaterialIcons name="email" size={20} color={colors.icon} />
            {editMode ? (
              <TextInput
                style={[styles.input, { color: colors.text, borderColor: colors.border }]}
                value={user.email}
                onChangeText={(text) => handleChange('email', text)}
                keyboardType="email-address"
              />
            ) : (
              <Text style={[styles.infoText, { color: colors.text }]}>{user.email}</Text>
            )}
          </View>
          <View style={styles.infoRow}>
            <Feather name="phone" size={20} color={colors.icon} />
            {editMode ? (
              <TextInput
                style={[styles.input, { color: colors.text, borderColor: colors.border }]}
                value={user.mobile}
                onChangeText={(text) => handleChange('mobile', text)}
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={[styles.infoText, { color: colors.text }]}>{user.mobile}</Text>
            )}
          </View>
        </View>

        <View style={[styles.statsCard, { backgroundColor: isDark ? '#1E293B' : '#E0F2FE' }]}>
              <Text style={[styles.statsTitle, { color: colors.text }]}>{isBusinessOwner?"Appointments Handled":"Appointments Handled"}</Text>
              <Text style={[styles.statsNumber, { color: colors.accent }]}>
                {user.appointments}
              </Text>
              <Text style={[styles.statsSubtitle, { color: colors.subtext }]}>
                Since {user.joined}
              </Text>
            </View>
        {/* Business Owner Only */}
        {isBusinessOwner && (
          <>
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Business Details</Text>
              <View style={styles.prefItem}>
                <Text style={[styles.prefLabel, { color: colors.text }]}>Business Name</Text>
                <Text style={[styles.prefValue, { color: colors.subtext }]}>Sample Salon</Text>
              </View>
              <View style={styles.prefItem}>
                <Text style={[styles.prefLabel, { color: colors.text }]}>Category</Text>
                <Text style={[styles.prefValue, { color: colors.subtext }]}>Hair & Beauty</Text>
              </View>
              <View style={styles.prefItem}>
                <Text style={[styles.prefLabel, { color: colors.text }]}>Status</Text>
                <Text style={[styles.prefValue, { color: 'green' }]}>Active</Text>
              </View>
            </View>
          </>
        )}

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>App Preferences</Text>
          <View style={styles.prefItem}>
            <Text style={[styles.prefLabel, { color: colors.text }]}>Notification</Text>
            <Text style={[styles.prefValue, { color: colors.subtext }]}>Enabled</Text>
          </View>
          <View style={styles.prefItem}>
            <Text style={[styles.prefLabel, { color: colors.text }]}>Language</Text>
            <Text style={[styles.prefValue, { color: colors.subtext }]}>English</Text>
          </View>
          <View style={styles.prefItem}>
            <Text style={[styles.prefLabel, { color: colors.text }]}>App Theme</Text>
            <Text style={[styles.prefValue, { color: colors.subtext }]}>
              {isDark ? 'Dark' : 'Light'}
            </Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Logout */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: '#FF3B30' }]}
          onPress={() => {stores.setIsLoggedIn(false)
            router.push('/(auth)');
          }}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default ProfileScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 30,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
  },
  inputName: {
    fontSize: 20,
    fontWeight: '600',
    borderBottomWidth: 1,
  },
  location: {
    fontSize: 14,
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 15,
  },
  input: {
    marginLeft: 8,
    fontSize: 15,
    borderBottomWidth: 1,
    flex: 1,
  },
  statsCard: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  statsTitle: {
    fontSize: 16,
  },
  statsNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 6,
  },
  statsSubtitle: {
    fontSize: 13,
  },
  prefItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  prefLabel: {
    fontSize: 15,
  },
  prefValue: {
    fontSize: 15,
  },
  logoutContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  logoutButton: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
