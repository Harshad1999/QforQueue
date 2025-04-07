import { View, Text, StyleSheet, TouchableOpacity, Switch, Platform } from 'react-native';
import { router } from 'expo-router';
import { Store, CircleUser as UserCircle2 } from 'lucide-react-native';
import { stores } from '@/core-stores';
import { observer } from 'mobx-react-lite';
import { useThemeStyles } from '@/hooks/useThemeStyles';

const AuthScreen = observer(() => {
  const { colors, isDark } = useThemeStyles();

  const handleToggleTheme = () => {
    stores.themeStore.setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Toggle Theme */}
      <View style={styles.toggleRow}>
        <Text style={[styles.toggleLabel, { color: colors.text }]}>Dark Mode</Text>
        <Switch
          value={isDark}
          onValueChange={handleToggleTheme}
          trackColor={{ false: '#ccc', true: '#4F46E5' }}
          thumbColor={Platform.OS === 'android' ? '#fff' : undefined}
        />
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.accent }]}>Welcome!</Text>
        <Text style={[styles.title, { color: colors.accent }]}>Queue Management</Text>
        <Text style={[styles.subtitle, { color: colors.subtext }]}>Choose your user type</Text>
      </View>

      {/* User Type Options */}
      <View style={styles.options}>
        <TouchableOpacity
          style={[styles.option, {
            backgroundColor: colors.card,
            borderColor: colors.border,
          }]}
          onPress={() => {
            stores.setIsBusinessOwner(true);
            router.push('/login');
          }}
        >
          <Store size={48} color={colors.accent} />
          <Text style={[styles.optionTitle, { color: colors.accent }]}>Business Owner</Text>
          <Text style={[styles.optionDescription, { color: colors.subtext }]}>Register your local service</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, {
            backgroundColor: colors.card,
            borderColor: colors.border,
          }]}
          onPress={() => {
            stores.setIsBusinessOwner(false);
            router.push('/login');
          }}
        >
          <UserCircle2 size={48} color={colors.accent} />
          <Text style={[styles.optionTitle, { color: colors.accent }]}>Customer</Text>
          <Text style={[styles.optionDescription, { color: colors.subtext }]}>Book appointments and join queues</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 12,
  },
  toggleLabel: {
    fontSize: 16,
    marginRight: 8,
  },
  header: {
    marginTop: 30,
    marginBottom: 40,
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
  options: {
    flex: 1,
    gap: 20,
  },
  option: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
  },
  optionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  optionDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
});
