import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { router } from 'expo-router';

type StaffMember = {
  id: number;
  name: string;
  role: string;
};

const initialStaff: StaffMember[] = [
  { id: 1, name: 'Ravi Kumar', role: 'Barber' },
  { id: 2, name: 'Suman Verma', role: 'Receptionist' },
  { id: 3, name: 'Amit Joshi', role: 'Hair Stylist' },
  { id: 4, name: 'Ravi Kumar', role: 'Barber' },
  { id: 5, name: 'Suman Verma', role: 'Receptionist' },
  { id: 6, name: 'Amit Joshi', role: 'Hair Stylist' },
  { id: 7, name: 'Ravi Kumar', role: 'Barber' },
  { id: 8, name: 'Suman Verma', role: 'Receptionist' },
  { id: 9, name: 'Amit Joshi', role: 'Hair Stylist' },
];

const ManageStaffScreen = () => {
  const { colors } = useThemeStyles();
  const [staffList, setStaffList] = useState<StaffMember[]>(initialStaff);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', role: '' });
  const [editId, setEditId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to remove this staff member?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setStaffList(prev => prev.filter(staff => staff.id !== id)),
      },
    ]);
  };

  const handleEdit = (member: StaffMember) => {
    setEditId(member.id);
    setFormData({ name: member.name, role: member.role });
    setShowForm(true);
  };

  const handleFormSubmit = () => {
    if (!formData.name || !formData.role) {
      Alert.alert('Please fill in both name and role.');
      return;
    }

    if (editId !== null) {
      setStaffList(prev =>
        prev.map(staff =>
          staff.id === editId ? { ...staff, name: formData.name, role: formData.role } : staff
        )
      );
    } else {
      const newStaff: StaffMember = {
        id: Date.now(),
        name: formData.name,
        role: formData.role,
      };
      setStaffList(prev => [newStaff, ...prev]);
    }

    setFormData({ name: '', role: '' });
    setEditId(null);
    setShowForm(false);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.wrapper}>
          {/* Header fixed at top */}
          <View style={styles.header}>
            <IconSymbol
              name="arrow-back"
              size={24}
              color={colors.icon}
              onPress={() => router.back()}
              style={styles.backIcon}
            />
            <Text style={[styles.title, { color: colors.text }]}>Manage Staff</Text>
          </View>

          {/* Scrollable List */}
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {staffList.map(member => (
              <View key={member.id} style={[styles.staffCard, { backgroundColor: colors.card }]}>
                <View>
                  <Text style={[styles.name, { color: colors.text }]}>{member.name}</Text>
                  <Text style={[styles.role, { color: colors.subtext }]}>{member.role}</Text>
                </View>
                <View style={styles.actions}>
                  <IconSymbol
                    name="pencil"
                    size={22}
                    color={colors.accent}
                    onPress={() => handleEdit(member)}
                  />
                  <IconSymbol
                    name="trash"
                    size={22}
                    color="red"
                    onPress={() => handleDelete(member.id)}
                    style={{ marginLeft: 12 }}
                  />
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Sticky Add Button */}
          <View style={[styles.footer, { backgroundColor: colors.background }]}>
            <TouchableOpacity
              onPress={() => {
                setEditId(null);
                setFormData({ name: '', role: '' });
                setShowForm(true);
              }}
              style={[styles.addButton, { backgroundColor: colors.accent }]}
            >
              <Text style={styles.addButtonText}>+ Add Staff</Text>
            </TouchableOpacity>
          </View>

          {/* Modal Form */}
          <Modal visible={showForm} transparent animationType="slide">
            <View style={styles.modalOverlay}>
              <View style={[styles.modalContainer, { backgroundColor: colors.card }]}>
                <Text style={[styles.modalTitle, { color: colors.text }]}>
                  {editId !== null ? 'Edit Staff' : 'Add Staff'}
                </Text>
                <TextInput
                  placeholder="Name"
                  placeholderTextColor={colors.subtext}
                  style={[styles.input, { color: colors.text, borderColor: colors.border }]}
                  value={formData.name}
                  onChangeText={text => setFormData({ ...formData, name: text })}
                />
                <TextInput
                  placeholder="Role"
                  placeholderTextColor={colors.subtext}
                  style={[styles.input, { color: colors.text, borderColor: colors.border }]}
                  value={formData.role}
                  onChangeText={text => setFormData({ ...formData, role: text })}
                />

                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={[styles.modalButton, { backgroundColor: colors.accent }]}
                    onPress={handleFormSubmit}
                  >
                    <Text style={styles.modalButtonText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                    onPress={() => setShowForm(false)}
                  >
                    <Text style={[styles.modalButtonText, { color: '#333' }]}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ManageStaffScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
    // borderBottomWidth: StyleSheet.hairlineWidth,
  },
  backIcon: {
    marginRight: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  staffCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  name: {
    fontSize: 17,
    fontWeight: '600',
  },
  role: {
    fontSize: 14,
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  addButton: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    borderRadius: 20,
    padding: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
