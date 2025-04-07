
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';
import { Store, CircleUser as UserCircle2 } from 'lucide-react-native';
import { stores } from '@/core-stores';

export default function AuthScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Welcome!</Text>
                <Text style={styles.title}>Queue Management</Text>
                <Text style={styles.subtitle}>Choose your user type</Text>
            </View>

            <View style={styles.options}>
                {/* <Link href="/register" asChild> */}
                <TouchableOpacity style={styles.option} onPress={() => {
                    stores.setIsBusinessOwner(true);
                    router.push('/login');
                }}>
                    <Store size={48} color="#1a73e8" />
                    <Text style={styles.optionTitle}>Business Owner</Text>
                    <Text style={styles.optionDescription}>Register your local sevice</Text>
                </TouchableOpacity>
                {/* </Link> */}

                {/* <Link href="/register" asChild> */}
                <TouchableOpacity style={styles.option} onPress={() => {
                    stores.setIsBusinessOwner(false)
                    router.push('/login');
                }}>
                    <UserCircle2 size={48} color="#1a73e8" />
                    <Text style={styles.optionTitle}>Customer</Text>
                    <Text style={styles.optionDescription}>Book appointments and join queues</Text>
                </TouchableOpacity>
                {/* </Link> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        marginTop: 60,
        marginBottom: 40,
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
    options: {
        flex: 1,
        gap: 20,
    },
    option: {
        padding: 24,
        borderRadius: 16,
        backgroundColor: '#f8f9fa',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e1e3e6',
    },
    optionTitle: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 20,
        color: '#1a73e8',
        marginTop: 16,
        marginBottom: 8,
    },
    optionDescription: {
        fontFamily: 'Inter-Regular',
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
});