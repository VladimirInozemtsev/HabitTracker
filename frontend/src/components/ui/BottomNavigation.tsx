import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { createNavigationStyles } from '../../theme/styles/navigationStyles';
import { Screen } from '../../hooks/useNavigation';
import { useApp } from '../../context/AppContext';

interface NavigationItem {
  id: Screen;
  icon: string;
  label: string;
}

interface BottomNavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  isTablet: boolean;
  showHabitDetail: boolean;
}

const navigationItems: NavigationItem[] = [
  { id: 'habits', icon: 'target', label: 'Привычки' },
  { id: 'stats', icon: 'chart-bar', label: 'Статистика' },
  { id: 'analytics', icon: 'chart-line', label: 'Аналитика' },
  { id: 'groups', icon: 'folder', label: 'Группы' },
  { id: 'profile', icon: 'account', label: 'Профиль' },
];

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentScreen,
  onNavigate,
  isTablet,
  showHabitDetail,
}) => {
  // Получаем тему из контекста
  const { theme } = useApp();
  
  // Создаем стили с текущей темой
  const navigationStyles = createNavigationStyles(theme);

  // Скрываем навигацию в детальном экране
  if (showHabitDetail) {
    return null;
  }

  return (
    <View style={[
      navigationStyles.bottomNavigation,
      isTablet && navigationStyles.bottomNavigationTablet
    ]}>
      {navigationItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[
            navigationStyles.navItem,
            currentScreen === item.id && navigationStyles.navItemActive,
            isTablet && navigationStyles.navItemTablet
          ]}
          onPress={() => onNavigate(item.id)}
        >
          <IconButton
            icon={item.icon}
            iconColor={currentScreen === item.id ? theme.colors.navigation.active : theme.colors.navigation.inactive}
            size={24}
            style={navigationStyles.navIconButton}
          />
          <Text style={[
            navigationStyles.navText, 
            currentScreen === item.id && navigationStyles.navTextActive
          ]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
