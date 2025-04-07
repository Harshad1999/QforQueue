import { stores } from '@/core-stores';

export function useThemeStyles() {
  const isDark = stores.themeStore.theme === 'dark';

  return {
    isDark,
    colors: {
      background: isDark ? '#0B0F19' : '#ffffff',
      text: isDark ? '#E5E7EB' : '#11181C',
      subtext: isDark ? '#9CA3AF' : '#666',
      border: isDark ? '#374151' : '#e1e3e6',
      card: isDark ? '#1F2937' : '#F9FAFB',
      accent: isDark ? '#60A5FA' : '#1a73e8',
      icon: isDark ? '#9BA1A6' : '#687076',
      tabIconDefault: isDark ? '#9BA1A6' : '#687076',
      tabIconSelected: isDark ? '#fff' : '#0a7ea4',
      error: '#dc2626',
      errorBackground: '#fee2e2',
      googleBorder: '#999',
      googleText: '#000',
    },
  };
}
