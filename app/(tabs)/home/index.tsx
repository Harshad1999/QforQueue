import { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, RefreshControl, Platform, BackHandler } from 'react-native';
import { mockDB } from '@/data/mock';
import { Star, Clock, MapPin } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { stores } from '@/core-stores';

// Define the type for a business object
interface Business {
  id: string;
  name: string;
  imageUrl: string;
  rating: number;
  totalRatings: number;
  description: string;
  operatingHours: { open: string; close: string };
  address: string;
  services: string[];
}

export default function HomeScreen() {
  const router = useRouter();
  const { shopStore } = stores;

  const [refreshing, setRefreshing] = useState(false);
  const [selectedType, setSelectedType] = useState<'all' | 'barbershop' | 'clinic' | 'carwash'>('all');

  const pincode = '400001';
  const businesses = selectedType === 'all'
    ? mockDB.getBusinessesByPincode(pincode)
    : mockDB.getBusinessesByTypeAndPincode(selectedType, pincode);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Disable hardware back button on Android for this screen
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // Returning true prevents the default back button behavior (navigating back)
      return true;
    });

    // Cleanup the listener when the component unmounts
    return () => backHandler.remove();
  }, []);
  const renderBusinessCard = ({ item }: { item: Business }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        shopStore.updateShopData(item);
        router.push('/(tabs)/home/storeDetails');
      }}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.businessName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Star size={16} color="#f59e0b" fill="#f59e0b" />
            <Text style={styles.rating}>{item.rating.toFixed(1)}</Text>
            <Text style={styles.totalRatings}>({item.totalRatings})</Text>
          </View>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.infoContainer}>
          <View style={styles.info}>
            <Clock size={16} color="#666" />
            <Text style={styles.infoText}>
              {item.operatingHours.open} - {item.operatingHours.close}
            </Text>
          </View>
          <View style={styles.info}>
            <MapPin size={16} color="#666" />
            <Text style={styles.infoText}>{item.address}</Text>
          </View>
        </View>

        <View style={styles.servicesContainer}>
          {item.services.slice(0, 3).map((service, index) => (
            <View key={index} style={styles.serviceTag}>
              <Text style={styles.serviceText}>{service}</Text>
            </View>
          ))}
          {item.services.length > 3 && (
            <View style={styles.serviceTag}>
              <Text style={styles.serviceText}>+{item.services.length - 3}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nearby Services</Text>
        <Text style={styles.subtitle}>Find services in {pincode}</Text>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, selectedType === 'all' && styles.filterButtonActive]}
          onPress={() => setSelectedType('all')}
        >
          <Text style={[styles.filterText, selectedType === 'all' && styles.filterTextActive]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedType === 'barbershop' && styles.filterButtonActive]}
          onPress={() => setSelectedType('barbershop')}
        >
          <Text style={[styles.filterText, selectedType === 'barbershop' && styles.filterTextActive]}>
            Barbershops
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedType === 'clinic' && styles.filterButtonActive]}
          onPress={() => setSelectedType('clinic')}
        >
          <Text style={[styles.filterText, selectedType === 'clinic' && styles.filterTextActive]}>
            Clinics
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedType === 'carwash' && styles.filterButtonActive]}
          onPress={() => setSelectedType('carwash')}
        >
          <Text style={[styles.filterText, selectedType === 'carwash' && styles.filterTextActive]}>
            Car wash
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={businesses}
        renderItem={renderBusinessCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        numColumns={Platform.OS === 'web' ? 2 : 1} // Use 2 columns for web, 1 for mobile
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingBottom: process.env.EXPO_OS === 'ios' ? 80 : 0,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e3e6',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#1a73e8',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666',
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e3e6',
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#f8f9fa',
  },
  filterButtonActive: {
    backgroundColor: '#1a73e8',
  },
  filterText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#666',
  },
  filterTextActive: {
    color: '#fff',
  },
  list: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: Platform.OS === 'web' ? '49%' : '100%', // 50% width for web
    marginBottom: 16,
    marginRight:'1%'
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  businessName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1a1a1a',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1a1a1a',
  },
  totalRatings: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  infoContainer: {
    gap: 8,
    marginBottom: 12,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  serviceTag: {
    backgroundColor: '#f0f9ff',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  serviceText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#1a73e8',
  },
});
