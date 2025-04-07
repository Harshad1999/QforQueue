import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { mockDB } from '@/data/mock';
import { stores } from '@/core-stores';

export default function RegisterScreen() {
  const router = useRouter();
const{isBusinessOwner} = stores
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    pincode: '',
    businessName: '',
    businessType: '',
  });
  const [error, setError] = useState('');

  const handleRegister = () => {
    try {
      // Basic validation
      if (!formData.fullName || !formData.email || !formData.password) {
        setError('Please fill in all required fields');
        return;
      }

      if (isBusinessOwner && (!formData.businessName || !formData.businessType || !formData.pincode)) {
        setError('Please fill in all business details');
        return;
      }

      // Create user
      const newUser = mockDB.createUser({
        fullName: formData.fullName,
        email: formData.email,
        isBusinessOwner: isBusinessOwner ,
        pincode: formData.pincode,
      });

      // If owner, create business
      if (isBusinessOwner) {
        mockDB.createBusiness({
          ownerId: newUser.id,
          name: formData.businessName,
          type: formData.businessType as 'barbershop' | 'clinic',
          pincode: formData.pincode,
          operatingHours: {
            open: '09:00',
            close: '18:00',
          },
          address: '',
          status: 'open',
          imageUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1200',
          description: '',
          services: [],
        });
      }

      // Navigate to appropriate screen
      // router.replace(isOwner ? '/business-dashboard/' : '/');
    } catch (err) {
      setError('An error occurred during registration');
      console.error(err);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <ArrowLeft size={24} color="#1a73e8" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          {isBusinessOwner ? 'Register your business' : 'Join as a customer'}
        </Text>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor="#999"
            value={formData.fullName}
            onChangeText={(text) => setFormData({ ...formData, fullName: text })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Choose a password"
            placeholderTextColor="#999"
            secureTextEntry
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>PINCODE</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your PINCODE"
            placeholderTextColor="#999"
            keyboardType="number-pad"
            value={formData.pincode}
            onChangeText={(text) => setFormData({ ...formData, pincode: text })}
          />
        </View>

        {isBusinessOwner && (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Business Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your business name"
                placeholderTextColor="#999"
                value={formData.businessName}
                onChangeText={(text) => setFormData({ ...formData, businessName: text })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Business Type</Text>
              <TextInput
                style={styles.input}
                placeholder="barbershop or clinic"
                placeholderTextColor="#999"
                value={formData.businessType}
                onChangeText={(text) => setFormData({ ...formData, businessType: text })}
              />
            </View>
          </>
        )}

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  backButton: {
    marginTop: 20,
    marginBottom: 20,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#1a73e8',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: '#666',
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#dc2626',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#fee2e2',
    borderRadius: 8,
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#333',
  },
  input: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e1e3e6',
  },
  button: {
    backgroundColor: '#1a73e8',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#fff',
  },
});