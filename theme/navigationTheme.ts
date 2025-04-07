import { Theme } from '@react-navigation/native';

export const LightNavigationTheme: Theme = {
    dark: false,
    colors: {
        primary: '#4F46E5',
        background: '#F9FAFB',
        card: '#FFFFFF',
        text: '#111827',
        border: '#E5E7EB',
        notification: '#10B981',
    },
    fonts: {
        regular: {
            fontFamily: '',
            fontWeight: 'normal'
        },
        medium: {
            fontFamily: '',
            fontWeight: 'normal'
        },
        bold: {
            fontFamily: '',
            fontWeight: 'normal'
        },
        heavy: {
            fontFamily: '',
            fontWeight: 'normal'
        }
    }
};

export const DarkNavigationTheme: Theme = {
    dark: true,
    colors: {
        primary: '#818CF8',
        background: '#0F172A',
        card: '#1E293B',
        text: '#F1F5F9',
        border: '#334155',
        notification: '#34D399',
    },
    fonts: {
        regular: {
            fontFamily: '',
            fontWeight: 'normal'
        },
        medium: {
            fontFamily: '',
            fontWeight: 'normal'
        },
        bold: {
            fontFamily: '',
            fontWeight: 'normal'
        },
        heavy: {
            fontFamily: '',
            fontWeight: 'normal'
        }
    }
};
