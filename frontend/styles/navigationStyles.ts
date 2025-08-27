import { StyleSheet } from 'react-native';
import { colors } from './baseStyles';

export const navigationStyles = StyleSheet.create({
  // Стили для нижней навигации
  bottomNavigation: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a', // Темный фон для навигации
    borderTopWidth: 1,
    borderTopColor: '#333333',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  bottomNavigationTablet: {
    marginBottom: 3,
    backgroundColor: '#000000', // Black background for tablets
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navItemActive: {
    backgroundColor: '#333333',
    borderRadius: 8,
  },
  navItemTablet: {
    backgroundColor: '#000000', // Black background for tablet nav items
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
    color: '#cccccc',
  },
  navIconActive: {
    color: '#ffffff',
  },
  navIconButton: {
    margin: 0,
    padding: 0,
  },
  navText: {
    fontSize: 12,
    color: '#cccccc',
  },
  navTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
