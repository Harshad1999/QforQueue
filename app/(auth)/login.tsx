import {
  Image, Modal, ScrollView, StyleSheet, Text, TextInput,
  TouchableOpacity, View
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { stores } from '@/core-stores';
import { observer } from 'mobx-react-lite';
import { useThemeStyles } from '@/hooks/useThemeStyles';

const Login = observer(() => {
  const router = useRouter();
  const { isBusinessOwner } = stores;
  const { colors } = useThemeStyles();

  const [openOTPModal, setOpenOTPModal] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: 'aaaaaaaa',
    password: '1111111',
    isBusinessOwner,
    countryCode: '+91',
    mobileNumber: '',
    otp: null as string | null,
  });

  useEffect(() => {
    if (formData.username || formData.password) {
      setFormData(prev => ({ ...prev, mobileNumber: '' }));
    }
    if (formData.mobileNumber) {
      setFormData(prev => ({ ...prev, username: '', password: '' }));
    }
  }, [formData.username, formData.password, formData.mobileNumber]);

  const handleLogin = () => {
    const { username, password, mobileNumber } = formData;

    if ((!username.trim() || !password.trim()) && !mobileNumber.trim()) {
      setError('Please provide either Username and Password or Mobile Number');
      return;
    }

    if (username.trim() && password.trim()) {
      if (username.length < 3) {
        setError('Username must be at least 3 characters long');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }
    }

    if (mobileNumber.trim() && formData.otp === null) {
      if (!/^\d+$/.test(mobileNumber)) {
        setError('Mobile Number must contain only digits');
        return;
      }
      if (mobileNumber.length < 10 || mobileNumber.length > 15) {
        setError('Mobile Number must be between 10 and 15 digits');
        return;
      }
      setOpenOTPModal(true);
      return;
    }

    stores.setIsLoggedIn(true);
    setError('');
    router.push('/(tabs)/home');
  };

  const OR = () => (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ color: colors.subtext }}>- - - - - OR - - - - -</Text>
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <ArrowLeft size={24} color={colors.accent} />
      </TouchableOpacity>

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={require('../../assets/images/react-logo.png')}
          style={{ width: 100, height: 100, marginBottom: 20 }}
        />
      </View>

      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.accent }]}>{isBusinessOwner ? 'Business Login' : 'Customer Login'}</Text>
        <Text style={[styles.subtitle, { color: colors.subtext }]}>
          {isBusinessOwner ? 'Register your business' : 'Join as a customer'}
        </Text>
      </View>

      {error ? (
        <Text style={[styles.errorText, {
          color: colors.error,
          backgroundColor: colors.errorBackground,
        }]}>{error}</Text>
      ) : null}

      <View style={styles.form}>
        {/* Username */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Username</Text>
          <TextInput
            style={[styles.input, { borderColor: colors.border, backgroundColor: colors.background, color: colors.text }]}
            placeholder="Enter your full name"
            placeholderTextColor={colors.subtext}
            value={formData.username}
            onChangeText={(text) => setFormData({ ...formData, username: text })}
          />
        </View>

        {/* Password */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Password</Text>
          <TextInput
            style={[styles.input, { borderColor: colors.border, backgroundColor: colors.background, color: colors.text }]}
            placeholder="Enter password"
            placeholderTextColor={colors.subtext}
            secureTextEntry
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
          />
        </View>

        <OR />

        {/* Mobile Number */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Mobile Number</Text>
          <View style={styles.mobileView}>
            <TextInput
              style={[styles.input, { flex: 1, maxWidth: 80, borderColor: colors.border, backgroundColor: colors.background, color: colors.text }]}
              value={formData.countryCode}
            />
            <TextInput
              style={[styles.input, { flex: 3, borderColor: colors.border, backgroundColor: colors.background, color: colors.text }]}
              placeholder="Enter Mobile Number"
              placeholderTextColor={colors.subtext}
              keyboardType="number-pad"
              value={formData.mobileNumber}
              onChangeText={(text) => setFormData({ ...formData, mobileNumber: text })}
            />
          </View>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.accent }]} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Footer Links */}
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => alert('Forgot Password?')}>
            <Text style={{ color: colors.accent, fontSize: 14, marginBottom: 20 }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/register')}>
            <Text style={{ color: colors.accent, fontSize: 14 }}>
              Don't have an account? Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        <OR />

        {/* Google Button */}
        <TouchableOpacity style={[styles.button, {
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: colors.googleBorder,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }]} onPress={() => alert('Sign in with Google')}>
          <Image source={require('../../assets/images/google-logo.png')} style={{ width: 20, height: 20, marginRight: 8 }} />
          <Text style={[styles.buttonText, { color: colors.googleText }]}>Sign in with Google</Text>
        </TouchableOpacity>
      </View>

      {/* OTP Modal */}
      {openOTPModal && (
        <Modal visible={openOTPModal} transparent animationType="slide" onRequestClose={() => setOpenOTPModal(false)}>
          <View style={styles.modalOverlay}>
            <View style={[styles.otpContainer, {
              backgroundColor: colors.background,
              borderColor: colors.border
            }]}>
              <Text style={[styles.label, { color: colors.text }]}>Enter OTP</Text>
              <TextInput
                style={[styles.input, { borderColor: colors.border, backgroundColor: colors.background, color: colors.text }]}
                placeholder="Enter OTP"
                placeholderTextColor={colors.subtext}
                keyboardType="number-pad"
                maxLength={6}
                onChangeText={(text) => setFormData({ ...formData, otp: text })}
              />
              <Text style={{ color: colors.subtext }}>OTP will be sent to your mobile number</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <TouchableOpacity style={[styles.button, { backgroundColor: colors.accent }]} onPress={() => alert('Verify OTP')}>
                  <Text style={styles.buttonText}>Verify OTP</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: colors.accent }]} onPress={() => setOpenOTPModal(false)}>
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
});

export default Login;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
  backButton: { marginTop: 20, marginBottom: 20 },
  header: { marginBottom: 32 },
  title: { fontFamily: 'Inter-Bold', fontSize: 32, marginBottom: 8, alignSelf: 'center' },
  subtitle: { fontFamily: 'Inter-Regular', fontSize: 18, alignSelf: 'center' },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
  },
  form: { gap: 20 },
  inputGroup: { gap: 8 },
  label: { fontFamily: 'Inter-Medium', fontSize: 16 },
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
    color: '#fff',
  },
  otpContainer: {
    height: 250,
    width: 300,
    justifyContent: 'space-evenly',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  mobileView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
