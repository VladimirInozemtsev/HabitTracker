// Конфигурация навигации
export const navigationConfig = {
  // Основные экраны приложения
  screens: {
    habits: 'habits',
    stats: 'stats',
    analytics: 'analytics',
    groups: 'groups',
    profile: 'profile',
    settings: 'settings',
    habitDetail: 'habitDetail',
  },
  
  // Параметры навигации
  params: {
    habitDetail: {
      habitId: 'habitId',
    },
    groupDetail: {
      groupId: 'groupId',
    },
  },
  
  // Настройки нижней навигации
  bottomTabs: {
    habits: {
      name: 'Привычки',
      icon: 'target',
      screen: 'habits',
    },
    stats: {
      name: 'Статистика',
      icon: 'chart-bar',
      screen: 'stats',
    },
    analytics: {
      name: 'Аналитика',
      icon: 'chart-line',
      screen: 'analytics',
    },
    groups: {
      name: 'Группы',
      icon: 'folder',
      screen: 'groups',
    },
    profile: {
      name: 'Профиль',
      icon: 'account',
      screen: 'profile',
    },
  },
  
  // Настройки анимаций
  animations: {
    default: {
      duration: 300,
      easing: 'easeInOut',
    },
    fast: {
      duration: 200,
      easing: 'easeInOut',
    },
    slow: {
      duration: 500,
      easing: 'easeInOut',
    },
  },
  
  // Настройки жестов
  gestures: {
    enabled: true,
    swipeEnabled: true,
    swipeDirection: 'horizontal',
  },
};

// Типы для навигации
export type NavigationConfig = typeof navigationConfig;
export type ScreenNames = typeof navigationConfig.screens;
export type BottomTabConfig = typeof navigationConfig.bottomTabs;
