import { StyleSheet } from 'react-native';
import { theme } from '../theme';

export const navigationStyles = StyleSheet.create({
  // Стили для нижней навигации
  bottomNavigation: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface, // Темный фон для навигации
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  bottomNavigationTablet: {
    marginBottom: 3,
    backgroundColor: theme.colors.background, // Черный фон для планшетов
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navItemActive: {
    backgroundColor: theme.colors.divider,
    borderRadius: 8,
  },
  navItemTablet: {
    backgroundColor: theme.colors.background, // Черный фон для элементов навигации планшетов
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
    color: theme.colors.text.secondary,
  },
  navIconActive: {
    color: theme.colors.text.primary,
  },
  navIconButton: {
    margin: 0,
    padding: 0,
  },
  navText: {
    fontSize: 12,
    color: theme.colors.text.secondary,
  },
  navTextActive: {
    color: theme.colors.text.primary,
    fontWeight: 'bold',
  },
});
