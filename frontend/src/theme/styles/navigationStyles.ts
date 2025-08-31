import { StyleSheet } from 'react-native';

export const createNavigationStyles = (theme: any) => StyleSheet.create({
  // Стили для нижней навигации
  bottomNavigation: {
    flexDirection: 'row',
    backgroundColor: theme.colors.navigation.background,
    borderTopWidth: 1,
    borderTopColor: theme.colors.navigation.border,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  bottomNavigationTablet: {
    marginBottom: 3,
    backgroundColor: theme.colors.navigation.background,
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
    backgroundColor: theme.colors.navigation.background,
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
    color: theme.colors.navigation.inactive,
  },
  navIconActive: {
    color: theme.colors.navigation.active,
  },
  navIconButton: {
    margin: 0,
    padding: 0,
  },
  navText: {
    fontSize: 12,
    color: theme.colors.navigation.inactive,
  },
  navTextActive: {
    color: theme.colors.navigation.active,
    fontWeight: 'bold',
  },
});
