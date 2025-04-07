import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { mockDB } from '@/data/mock';
import { stores } from '@/core-stores';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { observer } from 'mobx-react-lite';

    const RegisterScreen = observer(() => {
  const router = useRouter();
  const { isBusinessOwner } = stores;
  const { colors, isDark } = useThemeStyles();

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
      if (!formData.fullName || !formData.email || !formData.password) {
        setError('Please fill in all required fields');
        return;
      }

      if (
        isBusinessOwner &&
        (!formData.businessName || !formData.businessType || !formData.pincode)
      ) {
        setError('Please fill in all business details');
        return;
      }

      const newUser = mockDB.createUser({
        fullName: formData.fullName,
        email: formData.email,
        isBusinessOwner,
        pincode: formData.pincode,
      });

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
          imageUrl:
            'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1200',
          description: '',
          services: [],
        });
      }

      // router.replace(isBusinessOwner ? '/business-dashboard/' : '/');
    } catch (err) {
      setError('An error occurred during registration');
      console.error(err);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <ArrowLeft size={24} color={colors.accent} />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.accent }]}>
          Create Account
        </Text>
        <Text style={[styles.subtitle, { color: colors.subtext }]}>
          {isBusinessOwner ? 'Register your business' : 'Join as a customer'}
        </Text>
      </View>

      {error ? (
        <Text style={[styles.errorText, {
          backgroundColor: isDark ? '#7f1d1d' : '#fee2e2',
          color: isDark ? '#fca5a5' : '#dc2626',
        }]}>
          {error}
        </Text>
      ) : null}

      <View style={styles.form}>
        {[
          { label: 'Full Name', key: 'fullName', placeholder: 'Enter your full name' },
          { label: 'Email', key: 'email', placeholder: 'Enter your email', keyboardType: 'email-address' },
          { label: 'Password', key: 'password', placeholder: 'Choose a password', secureTextEntry: true },
          { label: 'PINCODE', key: 'pincode', placeholder: 'Enter your PINCODE', keyboardType: 'number-pad' },
          ...(isBusinessOwner
            ? [
                { label: 'Business Name', key: 'businessName', placeholder: 'Enter your business name' },
                { label: 'Business Type', key: 'businessType', placeholder: 'barbershop or clinic' },
              ]
            : []),
        ].map((field) => (
          <View style={styles.inputGroup} key={field.key}>
            <Text style={[styles.label, { color: colors.text }]}>{field.label}</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.card,
                  color: colors.text,
                  borderColor: colors.border,
                },
              ]}
              placeholder={field.placeholder}
              placeholderTextColor={colors.subtext}
              value={formData[field.key as keyof typeof formData]}
              onChangeText={(text) =>
                setFormData({ ...formData, [field.key]: text })
              }
              keyboardType={field.keyboardType}
              secureTextEntry={field.secureTextEntry}
              autoCapitalize="none"
            />
          </View>
        ))}

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.accent }]}
          onPress={handleRegister}
        >
          <Text style={[styles.buttonText, { color: '#fff' }]}>
            Create Account
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
});
export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 16,
    padding: 12,
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
  },
  input: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
  },
});
