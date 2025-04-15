import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { useRouter } from 'expo-router';
import {
  History,
  PlusCircle,
  Settings,
  Users,
} from 'lucide-react-native';
import { dashboardData as mockData } from '@/data/mock';

const initialTokens = [
  { id: 1, token: 'A10', name: 'Alice', age: 29, gender: 'Female' },
  { id: 2, token: 'A11', name: 'Bob', age: 34, gender: 'Male' },
  { id: 3, token: 'A12', name: 'Charlie', age: 41, gender: 'Male' },
  { id: 4, token: 'A13', name: 'David', age: 26, gender: 'Male' },
  { id: 5, token: 'A14', name: 'Emma', age: 22, gender: 'Female' },
];

const BusinessDashboardScreen = () => {
  const { colors } = useThemeStyles();
  const router = useRouter();

  const [isOnline, setIsOnline] = useState(true);
  const [onBreak, setOnBreak] = useState(false);
  const [tokens, setTokens] = useState(mockData.tokens);
  const [currentToken, setCurrentToken] = useState(mockData.tokens[0]?.token || '-');
  const [nextToken, setNextToken] = useState(mockData.tokens[1]?.token || '-');

  const callNext = () => {
    if (tokens.length === 0) return;
    const updatedTokens = [...tokens];
    updatedTokens.shift();
    setTokens(updatedTokens);
    setCurrentToken(updatedTokens[0]?.token || '-');
    setNextToken(updatedTokens[1]?.token || '-');
  };

  const renderTokenItem = ({ item }: { item: typeof initialTokens[0] }) => (
    <View style={[styles.tokenItem, { backgroundColor: colors.card }]}>
      <View style={styles.tokenLeft}>
        <View style={[styles.badge, { backgroundColor: colors.accent }]}>
          <Text style={styles.badgeText}>{item.token}</Text>
        </View>
        <View>
          <Text style={[styles.tokenName, { color: colors.text }]}>{item.name}</Text>
          <Text style={[styles.tokenInfo, { color: colors.subtext }]}>{item.age} yrs • {item.gender}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={tokens}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}
      ListHeaderComponent={
        <>
          <Text style={[styles.header, { color: colors.text }]}>Welcome, Business Owner 👋</Text>

          {/* Queue Overview */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Today's Queue</Text>
            <View style={[styles.card, { backgroundColor: colors.card }]}>
              <Text style={[styles.tokenLabel, { color: colors.subtext }]}>Current Token</Text>
              <Text style={[styles.tokenNumber, { color: colors.accent }]}>{currentToken}</Text>

              <Text style={[styles.tokenLabel, { color: colors.subtext }]}>Next Token</Text>
              <Text style={[styles.tokenNumber, { color: colors.text }]}>{nextToken}</Text>

              <TouchableOpacity style={[styles.callNextButton, { backgroundColor: colors.accent }]} onPress={callNext}>
                <Text style={styles.callNextText}>Call Next</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Switches */}
          <View style={styles.switchRow}>
            <View style={styles.switchContainer}>
              <Text style={[styles.switchLabel, { color: colors.text }]}>Online</Text>
              <Switch value={isOnline} onValueChange={setIsOnline} />
            </View>
            <View style={styles.switchContainer}>
              <Text style={[styles.switchLabel, { color: colors.text }]}>Break</Text>
              <Switch value={onBreak} onValueChange={setOnBreak} />
            </View>
          </View>

          {/* Actions */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Actions</Text>
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={[styles.actionButtonCard, { backgroundColor: colors.card }]}
                onPress={() => router.push('/business/manage-services')}
              >
                <PlusCircle color={colors.accent} size={28} />
                <Text style={[styles.actionLabel, { color: colors.text }]}>Manage Services</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButtonCard, { backgroundColor: colors.card }]}
                onPress={() => router.push('/business/manage-staff')}
              >
                <Users color={colors.accent} size={28} />
                <Text style={[styles.actionLabel, { color: colors.text }]}>Manage Staff</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButtonCard, { backgroundColor: colors.card }]}
                onPress={() => router.push('/(tabs)/settings')}
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

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Token List</Text>
          </View>
        </>
      }
      renderItem={renderTokenItem}
    />
  );
};

export default BusinessDashboardScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
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
  callNextButton: {
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  callNextText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButtonCard: {
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
  tokenItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
  },
  tokenLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  badge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  tokenName: {
    fontSize: 16,
    fontWeight: '500',
  },
  tokenInfo: {
    fontSize: 13,
  },
});