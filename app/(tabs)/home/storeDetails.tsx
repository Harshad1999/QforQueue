import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { stores } from '@/core-stores';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { observer } from 'mobx-react-lite';

const StoreDetails = observer(() => {
  const { shopStore } = stores;
  const { colors, isDark } = useThemeStyles();
  const itemdata = shopStore.shopData;

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
      <Image source={{ uri: itemdata.imageUrl }} style={styles.image} />
      <View style={styles.statusContainer}></View>

      <Text style={[styles.name, { color: colors.text }]}>{itemdata.name}</Text>
      <Text style={[styles.description, { color: colors.subtext }]}>{itemdata.description}</Text>

      <Text
        style={{
          fontSize: 16,
          fontWeight: '600',
          color: itemdata.status === 'open' ? 'green' : 'red',
          marginBottom: 8,
        }}
      >
        {itemdata.status === 'open' ? 'Online' : 'Offline'}
      </Text>

      <Text style={[styles.label, { color: colors.text }]}>Address:</Text>
      <Text style={[styles.text, { color: colors.subtext }]}>{itemdata.address}</Text>

      <Text style={[styles.label, { color: colors.text }]}>Operating Hours:</Text>
      <Text style={[styles.text, { color: colors.subtext }]}>
        {itemdata.operatingHours?.open} - {itemdata.operatingHours?.close}
      </Text>

      <Text style={[styles.label, { color: colors.text }]}>Services:</Text>
      {itemdata.services?.map((service, index) => (
        <Text key={index} style={[styles.text, { color: colors.subtext }]}>
          - {service}
        </Text>
      ))}

      <Text style={[styles.label, { color: colors.text }]}>Rating:</Text>
      <Text style={[styles.text, { color: colors.subtext }]}>
        {itemdata.rating} ({itemdata.totalRatings} ratings)
      </Text>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
});

export default StoreDetails;
