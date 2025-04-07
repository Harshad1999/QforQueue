import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';

export default function ProfileScreen() {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    mobile: '+91 9876543210',
    photoUrl: 'https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    location: 'Bangalore, India',
    joined: 'Jan 2023',
    appointments: 24,
  });

  const handleChange = (key: keyof typeof user, value: string) => {
    setUser((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Image source={{ uri: user.photoUrl }} style={styles.avatar} />
          <View style={styles.userInfo}>
            {editMode ? (
              <TextInput
                style={styles.inputName}
                value={user.name}
                onChangeText={(text) => handleChange('name', text)}
              />
            ) : (
              <Text style={styles.name}>{user.name}</Text>
            )}
            <Text style={styles.location}>
              <Ionicons name="location-outline" size={14} /> {user.location}
            </Text>
          </View>
          <TouchableOpacity onPress={() => setEditMode(!editMode)}>
            <Feather name={editMode ? 'check' : 'edit'} size={20} color="#007AFF" />
          </TouchableOpacity>
        </View>

        {/* Contact Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Info</Text>
          <View style={styles.infoRow}>
            <MaterialIcons name="email" size={20} color="#555" />
            {editMode ? (
              <TextInput
                style={styles.input}
                value={user.email}
                onChangeText={(text) => handleChange('email', text)}
                keyboardType="email-address"
              />
            ) : (
              <Text style={styles.infoText}>{user.email}</Text>
            )}
          </View>
          <View style={styles.infoRow}>
            <Feather name="phone" size={20} color="#555" />
            {editMode ? (
              <TextInput
                style={styles.input}
                value={user.mobile}
                onChangeText={(text) => handleChange('mobile', text)}
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={styles.infoText}>{user.mobile}</Text>
            )}
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Appointments Booked</Text>
          <Text style={styles.statsNumber}>{user.appointments}</Text>
          <Text style={styles.statsSubtitle}>Since {user.joined}</Text>
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Preferences</Text>
          <View style={styles.prefItem}>
            <Text style={styles.prefLabel}>Notification</Text>
            <Text style={styles.prefValue}>Enabled</Text>
          </View>
          <View style={styles.prefItem}>
            <Text style={styles.prefLabel}>Language</Text>
            <Text style={styles.prefValue}>English</Text>
          </View>
          <View style={styles.prefItem}>
            <Text style={styles.prefLabel}>App Theme</Text>
            <Text style={styles.prefValue}>Light</Text>
          </View>
        </View>

        {/* Spacer */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Logout */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={() => console.log('Logging out')}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:30,
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
    borderColor: '#ccc',
  },
  location: {
    fontSize: 14,
    color: '#666',
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
    color: '#333',
  },
  input: {
    marginLeft: 8,
    fontSize: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flex: 1,
  },
  statsCard: {
    backgroundColor: '#f0f9ff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  statsTitle: {
    fontSize: 16,
    color: '#333',
  },
  statsNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
    marginVertical: 6,
  },
  statsSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  prefItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  prefLabel: {
    fontSize: 15,
    color: '#444',
  },
  prefValue: {
    fontSize: 15,
    color: '#888',
  },
  logoutContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
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
