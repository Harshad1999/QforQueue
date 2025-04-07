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

const screenWidth = Dimensions.get('window').width;

const MyBookingsScreen = () => {
  const currentBooking = {
    id: 'CB12345',
    shopName: 'Royal Barbershop',
    category: 'Barber',
    tokenNumber: 12,
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
        return <MaterialCommunityIcons name="scissors-cutting" size={20} color="#007AFF" />;
      case 'Clinic':
        return <MaterialCommunityIcons name="hospital-box-outline" size={20} color="#00C896" />;
      case 'Car Wash':
        return <MaterialCommunityIcons name="car-wash" size={20} color="#FFA500" />;
      default:
        return null;
    }
  };

  const renderBookingCard = (booking: typeof currentBooking | typeof historyBookings[0]) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.iconTitle}>
          {getCategoryIcon(booking.category)}
          <Text style={styles.shopName}>{booking.shopName}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                booking.status === 'Active'
                  ? '#D1F5E0'
                  : '#ECECEC',
            },
          ]}
        >
          <Text
            style={{
              color:
                booking.status === 'Active'
                  ? '#00C896'
                  : '#666',
              fontSize: 12,
              fontWeight: '500',
            }}
          >
            {booking.status}
          </Text>
        </View>
      </View>
      <Text style={styles.detailText}>
        <MaterialCommunityIcons name="ticket-confirmation-outline" size={16} /> Token #{booking.tokenNumber}
      </Text>
      <Text style={styles.detailText}>
        <Ionicons name="calendar-outline" size={16} /> {booking.time}
      </Text>
      {booking.estimatedTime && (
        <Text style={styles.detailText}>
          <Ionicons name="time-outline" size={16} /> Est. Wait: {booking.estimatedTime}
        </Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {currentBooking ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🟢 Current Booking</Text>
            {renderBookingCard(currentBooking)}
          </View>
        ) : (
          <Text style={styles.noBookingText}>No active bookings</Text>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📜 Booking History</Text>
          {historyBookings.map((item) => (
            <View key={item.id}>{renderBookingCard(item)}</View>
          ))}
        </View>
        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
};

export default MyBookingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingTop:30
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
    color: '#1E293B',
  },
  card: {
    backgroundColor: '#FFFFFF',
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
    marginBottom: 8,
  },
  iconTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  shopName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  detailText: {
    fontSize: 14,
    color: '#374151',
    marginTop: 4,
  },
  noBookingText: {
    textAlign: 'center',
    marginTop: 60,
    color: '#999',
    fontSize: 16,
  },
});
