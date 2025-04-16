import { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, RefreshControl, Platform, BackHandler } from 'react-native';
import { mockDB } from '@/data/mock';
import { Star, Clock, MapPin } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { stores } from '@/core-stores';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { observer } from 'mobx-react-lite';

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

const HomeScreen = observer(() => {
  
  const router = useRouter();
  const { shopStore } = stores;
  const { colors, isDark } = useThemeStyles();

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

 

  const renderBusinessCard = ({ item }: { item: Business }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card }]}
      onPress={() => {
        shopStore.updateShopData(item);
        router.push('/(tabs)/home/storeDetails');
      }}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={[styles.businessName, { color: colors.text }]}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Star size={16} color={colors.accent} fill={colors.accent} />
            <Text style={[styles.rating, { color: colors.text }]}>{item.rating.toFixed(1)}</Text>
            <Text style={[styles.totalRatings, { color: colors.subtext }]}>({item.totalRatings})</Text>
          </View>
        </View>

        <Text style={[styles.description, { color: colors.subtext }]} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.infoContainer}>
          <View style={styles.info}>
            <Clock size={16} color={colors.icon} />
            <Text style={[styles.infoText, { color: colors.subtext }]}>
              {item.operatingHours.open} - {item.operatingHours.close}
            </Text>
          </View>
          <View style={styles.info}>
            <MapPin size={16} color={colors.icon} />
            <Text style={[styles.infoText, { color: colors.subtext }]}>{item.address}</Text>
          </View>
        </View>

        <View style={styles.servicesContainer}>
          {item.services.slice(0, 3).map((service, index) => (
            <View key={index} style={[styles.serviceTag, { backgroundColor: isDark ? '#1e3a8a' : '#e0f2fe' }]}>
              <Text style={[styles.serviceText, { color: colors.accent }]}>{service}</Text>
            </View>
          ))}
          {item.services.length > 3 && (
            <View style={[styles.serviceTag, { backgroundColor: isDark ? '#1e3a8a' : '#e0f2fe' }]}>
              <Text style={[styles.serviceText, { color: colors.accent }]}>+{item.services.length - 3}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.accent }]}>Nearby Services</Text>
        <Text style={[styles.subtitle, { color: colors.subtext }]}>Find services in {pincode}</Text>
      </View>

      <View style={[styles.filterContainer, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        {['all', 'barbershop', 'clinic', 'carwash'].map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.filterButton,
              selectedType === type && { backgroundColor: colors.accent },
            ]}
            onPress={() => setSelectedType(type as any)}
          >
            <Text
              style={[
                styles.filterText,
                selectedType === type && { color: '#fff' },
              ]}
            >
              {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={businesses}
        renderItem={renderBusinessCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        numColumns={Platform.OS === 'web' ? 2 : 1}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
});
export default HomeScreen

// Keep the style values that don’t need theme dynamic (layout, spacing)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: process.env.EXPO_OS === 'ios' ? 80 : 0,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#f8f9fa',
  },
  filterText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#666',
  },
  list: {
    padding: 16,
    gap: 16,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: Platform.OS === 'web' ? '49%' : '100%',
    marginBottom: 16,
    marginRight: '1%',
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
  },
  totalRatings: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
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
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  serviceTag: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  serviceText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
});
