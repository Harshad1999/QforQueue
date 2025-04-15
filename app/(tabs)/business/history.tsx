import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';

import { useThemeStyles } from '@/hooks/useThemeStyles';
import { observer } from 'mobx-react-lite';
import { router } from 'expo-router';

const FILTERS = ['Weekly', 'Monthly', 'Yearly'];

const mockHistoryData = [
  { id: '1', token: 'A101', customer: 'John Doe', service: 'Haircut', date: '2025-04-01', status: 'Completed' },
  { id: '2', token: 'A102', customer: 'Jane Smith', service: 'Nail Treatment', date: '2025-04-01', status: 'Cancelled' },
  { id: '3', token: 'A103', customer: 'Mark Johnson', service: 'Shave', date: '2025-04-02', status: 'Completed' },
  { id: '4', token: 'A104', customer: 'Emily Brown', service: 'Hair Color', date: '2025-04-03', status: 'No Show' },
  { id: '5', token: 'A105', customer: 'Chris Green', service: 'Facial', date: '2025-04-03', status: 'Completed' },
  { id: '6', token: 'A106', customer: 'Sarah Lee', service: 'Massage', date: '2025-04-04', status: 'Completed' },
];

const HistoryScreen = observer(() => {
  const { colors } = useThemeStyles();
  const [selectedFilter, setSelectedFilter] = useState('Weekly');

  const filteredData = mockHistoryData; // Replace with real filtering logic

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.scrollContainer}>
        <View style={styles.header}>
          <IconSymbol name="arrow-back" size={24} color={colors.icon} onPress={() => router.back()} />
          <Text style={[styles.headerTitle, { color: colors.text }]}>History</Text>
        </View>


        <View style={styles.filterRow}>
          {FILTERS.map((filter) => (
            <TouchableOpacity
              key={filter}
              onPress={() => setSelectedFilter(filter)}
              style={[
                styles.filterButton,
                {
                  backgroundColor:
                    selectedFilter === filter ? colors.accent : colors.card,
                },
              ]}
            >
              <Text
                style={{
                  color: selectedFilter === filter ? '#fff' : colors.text,
                  fontWeight: '600',
                }}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 16 }}
          renderItem={({ item }) => (
            <View
              style={[
                styles.card,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  shadowColor: colors.text,
                },
              ]}
            >
              <Text style={[styles.tokenText, { color: colors.accent }]}>
                Token: {item.token}
              </Text>
              <Text style={[styles.infoText, { color: colors.text }]}>
                Customer: {item.customer}
              </Text>
              <Text style={[styles.infoText, { color: colors.text }]}>
                Service: {item.service}
              </Text>
              <Text style={[styles.infoText, { color: colors.subtext }]}>
                Date: {item.date}
              </Text>
              <Text style={[styles.statusText, { color: colors.subtext }]}>
                Status: {item.status}
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   padding: 16,
  //   paddingTop:48
  // },
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 48,
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginLeft: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  card: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tokenText: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 2,
  },
  statusText: {
    fontSize: 14,
    marginTop: 6,
    fontStyle: 'italic',
  },
});

export default HistoryScreen;
