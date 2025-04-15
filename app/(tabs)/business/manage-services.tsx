import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'expo-router';

type Service = {
  id: number;
  name: string;
  description?: string;
  duration: string;
  price: string;
};

const ManageServicesScreen = observer(() => {
  const { colors } = useThemeStyles();
  const router = useRouter();

  const [services, setServices] = useState<Service[]>([
    { id: 1, name: 'Haircut', duration: '30', price: '150' },
    { id: 2, name: 'Shave', duration: '15', price: '50' },
    { id: 3, name: 'Haircut', duration: '30', price: '150' },
    { id: 4, name: 'Shave', duration: '15', price: '50' },
    { id: 5, name: 'Haircut', duration: '30', price: '150' },
    { id: 6, name: 'Shave', duration: '15', price: '50' },
    { id: 7, name: 'Haircut', duration: '30', price: '150' },
    { id: 8, name: 'Shave', duration: '15', price: '50' },
    { id: 9, name: 'Shave', duration: '15', price: '50' },
    { id: 10, name: 'Haircut', duration: '30', price: '150' },
    { id: 11, name: 'Shave', duration: '15', price: '50' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Omit<Service, 'id'> & { id?: number }>({
    name: '',
    description: '',
    duration: '',
    price: '',
  });

  const handleDelete = (id: number) => {
    Alert.alert('Delete Service', 'Are you sure you want to delete this service?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setServices(prev => prev.filter(service => service.id !== id)),
      },
    ]);
  };

  const handleEdit = (service: Service) => {
    setFormData(service);
    setShowForm(true);
  };

  const handleAddOrUpdate = () => {
    const { name, description, duration, price, id } = formData;

    if (!name || !duration || !price) {
      Alert.alert('Missing fields', 'Please fill out all required fields.');
      return;
    }

    if (id !== undefined) {
      setServices(prev =>
        prev.map(service =>
          service.id === id ? { ...service, name, description, duration, price } : service
        )
      );
    } else {
      const newService: Service = {
        id: Date.now(),
        name,
        description,
        duration,
        price,
      };
      setServices(prev => [...prev, newService]);
    }

    Alert.alert('Success', `Service ${id !== undefined ? 'updated' : 'added'} successfully!`);
    setShowForm(false);
    setFormData({ name: '', description: '', duration: '', price: '' });
  };

  const renderService = ({ item }: { item: Service }) => (
    <View style={[styles.serviceCard, { backgroundColor: colors.card }]}>
      <View>
        <Text style={[styles.serviceName, { color: colors.text }]}>{item.name}</Text>
        <Text style={[styles.subtext, { color: colors.subtext }]}>
          Duration: {item.duration} mins | ₹{item.price}
        </Text>
        {!!item.description && (
          <Text style={[styles.subtext, { color: colors.subtext }]}>{item.description}</Text>
        )}
      </View>
      <View style={styles.actions}>
        <IconSymbol name="pencil" size={20} color={colors.accent} onPress={() => handleEdit(item)} />
        <IconSymbol
          name="trash"
          size={20}
          color="red"
          style={{ marginLeft: 12 }}
          onPress={() => handleDelete(item.id)}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        {/* Sticky Header */}
        <View style={[styles.headerContainer, { backgroundColor: colors.background }]}>
          <View style={styles.header}>
            <IconSymbol name="arrow-back" size={24} color={colors.icon} onPress={() => router.back()} />
            <Text style={[styles.headerTitle, { color: colors.text }]}>Manage Services</Text>
          </View>
        </View>

        {/* Scrollable List */}
        <FlatList
          data={services}
          renderItem={renderService}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          ListFooterComponent={<View style={{ height: 100 }} />}
        />

        {/* Floating Add Button */}
        <TouchableOpacity
          onPress={() => setShowForm(true)}
          style={[styles.floatingButton, { backgroundColor: colors.accent }]}
        >
          <Text style={styles.floatingButtonText}>+ Add Service</Text>
        </TouchableOpacity>

        {/* Modal */}
        <Modal visible={showForm} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={[styles.card, { backgroundColor: colors.card, shadowColor: colors.text }]}>
              <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                <Text style={[styles.modalTitle, { color: colors.text }]}> 
                  {formData.id !== undefined ? 'Edit Service' : 'Add New Service'}
                </Text>

                <TextInput
                  style={[styles.input, { color: colors.text, borderColor: colors.border }]}
                  placeholder="Service Name *"
                  placeholderTextColor={colors.subtext}
                  value={formData.name}
                  onChangeText={text => setFormData({ ...formData, name: text })}
                />

                <TextInput
                  style={[styles.input, styles.textArea, { color: colors.text, borderColor: colors.border }]}
                  placeholder="Description"
                  placeholderTextColor={colors.subtext}
                  multiline
                  numberOfLines={4}
                  value={formData.description}
                  onChangeText={text => setFormData({ ...formData, description: text })}
                />

                <TextInput
                  style={[styles.input, { color: colors.text, borderColor: colors.border }]}
                  placeholder="Duration (in minutes) *"
                  placeholderTextColor={colors.subtext}
                  keyboardType="numeric"
                  value={formData.duration}
                  onChangeText={text => setFormData({ ...formData, duration: text })}
                />

                <TextInput
                  style={[styles.input, { color: colors.text, borderColor: colors.border }]}
                  placeholder="Price (₹) *"
                  placeholderTextColor={colors.subtext}
                  keyboardType="numeric"
                  value={formData.price}
                  onChangeText={text => setFormData({ ...formData, price: text })}
                />

                <TouchableOpacity
                  style={[styles.button, { backgroundColor: colors.accent }]}
                  onPress={handleAddOrUpdate}
                >
                  <Text style={styles.buttonText}>
                    {formData.id !== undefined ? 'Update Service' : 'Add Service'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, { backgroundColor: colors.border, marginTop: 8 }]}
                  onPress={() => {
                    setShowForm(false);
                    setFormData({ name: '', description: '', duration: '', price: '' });
                  }}
                >
                  <Text style={[styles.buttonText, { color: colors.text }]}>Cancel</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
});

export default ManageServicesScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  headerContainer: {
    paddingTop: 16,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginLeft: 12,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },
  serviceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
  },
  subtext: {
    fontSize: 14,
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  input: {
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
