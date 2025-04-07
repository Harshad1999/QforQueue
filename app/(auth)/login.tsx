
import { Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import { ArrowLeft } from 'lucide-react-native';
import { stores } from '@/core-stores';
import { observer } from 'mobx-react-lite';
import { runInAction } from 'mobx';


const Login = observer(() => {
  const router = useRouter();

  const { isBusinessOwner } = stores
  const [openOTPModal, setOpenOTPModal] = useState(false)
  const [formData, setFormData] = useState({
    username: 'aaaaaaaa',
    password: '1111111',
    isBusinessOwner: isBusinessOwner,
    countryCode: '+91',
    mobileNumber: '',
    otp: null as string | null
  });
  useEffect(() => {
    if (formData.username || formData.password) {
      setFormData((prev) => ({ ...prev, mobileNumber: '' }));
    }
    if (formData.mobileNumber) {
      setFormData((prev) => ({ ...prev, username: '', password: '' }));
    }
  }, [formData.username, formData.password, formData.mobileNumber]);

  const [error, setError] = useState('');

  const handleLogin = () => {
    const { username, password, mobileNumber } = formData;

    // Check if either username/password or mobile number is provided
    if ((!username.trim() || !password.trim()) && !mobileNumber.trim()) {
      setError('Please provide either Username and Password or Mobile Number');
      return;
    }

    // Validate username and password if provided
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

    // Validate mobile number if provided
    if (mobileNumber.trim() && formData.otp === null) {
      if (!/^\d+$/.test(mobileNumber)) {
        setError('Mobile Number must contain only digits');
        return;
      }
      if (mobileNumber.length < 10 || mobileNumber.length > 15) {
        setError('Mobile Number must be between 10 and 15 digits');
        return;
      }
      setOpenOTPModal(true)
      return
    }
    stores.setIsLoggedIn(true);
    setError(''); // Clear any previous errors
    router.push('/(tabs)/home');
  }

  const OR = () => {
    return (
      <View style={{
        alignItems: 'center',
      }}>
        <Text style={{ color: "#999" }}>
          - - - - - OR - - - - -
        </Text>
      </View>
    )
  }

  return (


    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <ArrowLeft size={24} color="#1a73e8" />
      </TouchableOpacity>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={require('../../assets/images/react-logo.png')}
          style={{ width: 100, height: 100, marginBottom: 20 }}
          accessibilityLabel="logo"
        />
      </View>
      <View style={styles.header}>
        <Text style={styles.title}>{isBusinessOwner ? 'Business Login' : 'Customer Login'}</Text>
        <Text style={styles.subtitle}>
          {isBusinessOwner ? 'Register your business' : 'Join as a customer'}
        </Text>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.form}>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor="#999"
            value={formData.username}
            onChangeText={(text) => setFormData({ ...formData, username: text })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            placeholderTextColor="#999"
            secureTextEntry
            autoCapitalize="none"
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
          />
        </View>
        <OR />

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mobile Number</Text>
          <View style={styles.mobileView}>
            <TextInput
              //this will be configured is other countries will interact with the app
              style={[styles.input, { flex: 1, maxWidth: 80 }]}
              value={formData.countryCode}
            />
            <TextInput
              style={[styles.input, { flex: 3 }]}
              placeholder="Enter Mobile Number"
              placeholderTextColor="#999"
              keyboardType="number-pad"
              value={formData.mobileNumber}
              onChangeText={(text) => setFormData({ ...formData, mobileNumber: text })}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => alert('Forgot Password?')}>
            <Text style={{ color: '#007BFF', fontSize: 14, marginBottom: 20 }}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { router.push('/register') }}>
            <Text style={{ color: '#007BFF', fontSize: 14 }}>Don't have an account? Sign Up</Text>
          </TouchableOpacity>
        </View>

        <OR />
        <TouchableOpacity
          style={[styles.button, styles.googleButton]}
          onPress={() => alert('Sign in with Google')}
        >
          <Image
            source={require('../../assets/images/google-logo.png')}
            style={{ width: 20, height: 20, marginRight: 8 }}
            accessibilityLabel="Google logo"
          />
          <Text style={[styles.buttonText, { color: '#000' }]}>Sign in with Google</Text>
        </TouchableOpacity>

      </View>
      {openOTPModal && <Modal
        visible={openOTPModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setOpenOTPModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.otpContainer}>
            <Text style={styles.label}>Enter OTP</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              placeholderTextColor="#999"
              keyboardType="number-pad"
              maxLength={6}
              onChangeText={(text) => setFormData({ ...formData, otp: text })}
            />
            <Text style={{ color: "#999" }}>
              OTP will be sent to your mobile number
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <TouchableOpacity
                style={[styles.button, { marginTop: 8 }]}
                onPress={() => alert('Verify OTP')}
              >
                <Text style={styles.buttonText}>Verify OTP</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { marginTop: 8 }]}
                onPress={() => setOpenOTPModal(false)}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>}
    </ScrollView>


  )
});

export default Login

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
    alignSelf: 'center'
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: '#666',
    alignSelf: 'center'

  },
  mobileView: {
    flexDirection: 'row', alignItems: 'center', gap: 8
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
  googleButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#999',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
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
    backgroundColor: '#fff',
    marginTop: 20,
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
});