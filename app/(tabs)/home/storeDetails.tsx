import { stores } from '@/core-stores';
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

// const mockStoreData = {
//     id: 1,
//     name: 'The Coffee Shop',
//     description: 'A cozy place to enjoy your favorite coffee and snacks.',
//     address: '123 Main Street, Cityville',
//     image: 'https://via.placeholder.com/150',
//     openingHours: '8:00 AM - 8:00 PM',
//     contact: '123-456-7890',
// };

// const itemdata = {
//     "address": "123 Fashion Street, Mumbai",
//     "createdAt": "2025-03-26T05:15:57.026Z",
//     "description": "Premium grooming services with expert barbers",
//     "id": "0.6014168192904475",
//     "imageUrl": "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1200",
//     "name": "StyleHub Barbershop",
//     "operatingHours": {
//       "close": "20:00",
//       "open": "09:00"
//     },
//     "ownerId": "0.8376946178952778",
//     "pincode": "400001",
//     "rating": 4.7,
//     "services": [
//       "Haircut",
//       "Beard Trim",
//       "Hot Towel Shave",
//       "Hair Styling"
//     ],
//     "status": "open",
//     "totalRatings": 342,
//     "type": "barbershop"
//   }

const StoreDetails = () => {
    const{shopStore}=stores
    const itemdata=shopStore.shopData
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={{ uri: itemdata.imageUrl }} style={styles.image} />
            <View style={styles.statusContainer}>
               
            </View>
            <Text style={styles.name}>{itemdata.name}</Text>
            <Text style={styles.description}>{itemdata.description}</Text>
                <Text style={{
                     fontSize: 16,
                     color:itemdata.status === 'open'?'green':'red',
                }}>
                    {itemdata.status === 'open' ? 'Online' : 'Offline'}
                </Text>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.text}>{itemdata.address}</Text>
            <Text style={styles.label}>Operating Hours:</Text>
            <Text style={styles.text}>
                {itemdata.operatingHours?.open} - {itemdata.operatingHours?.close}
            </Text>
            <Text style={styles.label}>Services:</Text>
            {itemdata.services?.map((service, index) => (
                <Text key={index} style={styles.text}>
                    - {service}
                </Text>
            ))}
            <Text style={styles.label}>Rating:</Text>
            <Text style={styles.text}>
                {itemdata.rating} ({itemdata.totalRatings} ratings)
            </Text>

            <Text style={styles.label}>Address:</Text>
            <Text style={styles.text}>{itemdata.address}</Text>
            <Text style={styles.label}>Operating Hours:</Text>
            <Text style={styles.text}>
                {itemdata.operatingHours?.open} - {itemdata.operatingHours?.close}
            </Text>
            <Text style={styles.label}>Services:</Text>
            {itemdata.services?.map((service, index) => (
                <Text key={index} style={styles.text}>
                    - {service}
                </Text>
            ))}
            <Text style={styles.label}>Rating:</Text>
            <Text style={styles.text}>
                {itemdata.rating} ({itemdata.totalRatings} ratings)
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
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
        color: '#666',
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 16,
    },
    text: {
        fontSize: 16,
        color: '#333',
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    statusIcon: {
        width: 24,
        height: 24,
        marginRight: 8,
    },
});

export default StoreDetails;