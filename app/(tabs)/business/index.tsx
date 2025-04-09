import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { useRouter } from 'expo-router';
import { CalendarDays, History, PlusCircle, Settings, Users } from 'lucide-react-native';

const BusinessDashboardScreen = () => {
  const { colors } = useThemeStyles();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>Welcome, Business Owner 👋</Text>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Today's Queue</Text>
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.tokenLabel, { color: colors.subtext }]}>Current Token</Text>
          <Text style={[styles.tokenNumber, { color: colors.accent }]}>A12</Text>

          <Text style={[styles.tokenLabel, { color: colors.subtext }]}>Next Token</Text>
          <Text style={[styles.tokenNumber, { color: colors.text }]}>A13</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Actions</Text>
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.card }]}
            onPress={() => router.push('/business/add-service')}
          >
            <PlusCircle color={colors.accent} size={28} />
            <Text style={[styles.actionLabel, { color: colors.text }]}>Add Service</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.card }]}
            onPress={() => router.push('/business/manage-staff')}
          >
            <Users color={colors.accent} size={28} />
            <Text style={[styles.actionLabel, { color: colors.text }]}>Manage Staff</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.card }]}
            onPress={() => router.push('/business/settings')}
          >
            <Settings color={colors.accent} size={28} />
            <Text style={[styles.actionLabel, { color: colors.text }]}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={[styles.historyButton, { backgroundColor: colors.card }]}
          onPress={() => router.push('/business/history')}
        >
          <History size={24} color={colors.accent} />
          <Text style={[styles.historyText, { color: colors.accent }]}>View Appointment History</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default BusinessDashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 12,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  tokenLabel: {
    fontSize: 16,
    marginTop: 8,
  },
  tokenNumber: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 8,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 16,
    borderRadius: 12,
  },
  historyText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
