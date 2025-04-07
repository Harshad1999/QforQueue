import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { observer } from 'mobx-react-lite';

const MyBookingsScreen = observer(() => {
  const { colors, isDark } = useThemeStyles();

  const currentBooking = {
    id: 'CB12345',
    shopName: 'Royal Barbershop',
    category: 'Barber',
    tokenNumber: 12,
    ongoingTokenNumber: 10, // NEW: current token being served
    estimatedTime: '15 mins',
    status: 'Active',
    time: '04 Apr 2025, 3:30 PM',
  };

  const historyBookings = [
    {
      id: 'H001',
      shopName: 'Shiny Car Wash',
      category: 'Car Wash',
      tokenNumber: 5,
      status: 'Completed',
      time: '01 Apr 2025, 10:00 AM',
    },
    {
      id: 'H002',
      shopName: 'City Clinic',
      category: 'Clinic',
      tokenNumber: 8,
      status: 'Completed',
      time: '29 Mar 2025, 1:00 PM',
    },
    {
      id: 'H003',
      shopName: 'Royal Barbershop',
      category: 'Barber',
      tokenNumber: 10,
      status: 'Completed',
      time: '25 Mar 2025, 5:30 PM',
    },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Barber':
        return (
          <MaterialCommunityIcons
            name="scissors-cutting"
            size={20}
            color={colors.accent}
          />
        );
      case 'Clinic':
        return (
          <MaterialCommunityIcons
            name="hospital-box-outline"
            size={20}
            color={colors.accent}
          />
        );
      case 'Car Wash':
        return (
          <MaterialCommunityIcons
            name="car-wash"
            size={20}
            color={colors.accent}
          />
        );
      default:
        return null;
    }
  };

  const renderBookingCard = (
    booking: typeof currentBooking | typeof historyBookings[0]
  ) => (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <View style={styles.cardHeader}>
        <View style={styles.iconTitle}>
          {getCategoryIcon(booking.category)}
          <Text style={[styles.shopName, { color: colors.text }]}>
            {booking.shopName}
          </Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                booking.status === 'Active'
                  ? isDark
                    ? '#14532d'
                    : '#D1F5E0'
                  : colors.border,
            },
          ]}
        >
          <Text
            style={{
              color:
                booking.status === 'Active'
                  ? colors.accent
                  : colors.subtext,
              fontSize: 12,
              fontWeight: '500',
            }}
          >
            {booking.status}
          </Text>
        </View>
      </View>

      {booking.status === 'Active' ? (
        <View style={styles.tokenRow}>
          <View
            style={[styles.tokenBox, { backgroundColor: colors.accent + '22' }]}
          >
            <Text style={styles.tokenLabel}>Your Token</Text>
            <Text style={[styles.tokenNumber, { color: colors.accent }]}>
              #{booking.tokenNumber}
            </Text>
          </View>
          <View
            style={[
              styles.tokenBox,
              {
                backgroundColor: isDark ? '#1E293B' : '#E0E7FF',
              },
            ]}
          >
            <Text style={styles.tokenLabel}>Now Serving</Text>
            <Text
              style={[
                styles.tokenNumber,
                { color: isDark ? '#93C5FD' : '#1D4ED8' },
              ]}
            >
              #{booking.ongoingTokenNumber}
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.infoRow}>
          <Ionicons
            name="ticket-outline"
            size={16}
            color={colors.icon}
            style={styles.icon}
          />
          <Text style={[styles.detailText, { color: colors.subtext }]}>
            Token #{booking.tokenNumber}
          </Text>
        </View>
      )}

      <View style={styles.infoRow}>
        <Ionicons
          name="calendar-outline"
          size={16}
          color={colors.icon}
          style={styles.icon}
        />
        <Text style={[styles.detailText, { color: colors.subtext }]}>
          {booking.time}
        </Text>
      </View>

      {booking.estimatedTime && (
        <View style={styles.infoRow}>
          <Ionicons
            name="time-outline"
            size={16}
            color={colors.icon}
            style={styles.icon}
          />
          <Text style={[styles.detailText, { color: colors.subtext }]}>
            Est. Wait: {booking.estimatedTime}
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {currentBooking ? (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.accent }]}>
              🟢 Current Booking
            </Text>
            {renderBookingCard(currentBooking)}
          </View>
        ) : (
          <Text style={[styles.noBookingText, { color: colors.subtext }]}>
            No active bookings
          </Text>
        )}

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.accent }]}>
            📜 Booking History
          </Text>
          {historyBookings.map((item) => (
            <View key={item.id}>{renderBookingCard(item)}</View>
          ))}
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
});

export default MyBookingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  scrollContent: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  card: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: Platform.OS === 'android' ? 2 : 0,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  shopName: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  icon: {
    marginRight: 6,
  },
  detailText: {
    fontSize: 14,
  },
  noBookingText: {
    textAlign: 'center',
    marginTop: 60,
    fontSize: 16,
  },
  tokenRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 10,
  },
  tokenBox: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tokenLabel: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 4,
    opacity: 0.7,
  },
  tokenNumber: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});
