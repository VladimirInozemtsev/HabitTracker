import { useState, useCallback } from 'react';

// Типы для навигации
export type Screen = 'habits' | 'stats' | 'analytics' | 'profile' | 'groups';

export const useNavigation = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('habits');
  const [previousScreen, setPreviousScreen] = useState<Screen | null>(null);

  // Переход на экран
  const navigateTo = useCallback((screen: Screen) => {
    setPreviousScreen(currentScreen);
    setCurrentScreen(screen);
  }, [currentScreen]);

  // Возврат на предыдущий экран
  const goBack = useCallback(() => {
    if (previousScreen) {
      setCurrentScreen(previousScreen);
      setPreviousScreen(null);
    }
  }, [previousScreen]);

  // Переход на главный экран
  const goToHome = useCallback(() => {
    setPreviousScreen(currentScreen);
    setCurrentScreen('habits');
  }, [currentScreen]);

  // Переход на статистику
  const goToStats = useCallback(() => {
    setPreviousScreen(currentScreen);
    setCurrentScreen('stats');
  }, [currentScreen]);

  // Переход на аналитику
  const goToAnalytics = useCallback(() => {
    setPreviousScreen(currentScreen);
    setCurrentScreen('analytics');
  }, [currentScreen]);

  // Переход на профиль
  const goToProfile = useCallback(() => {
    setPreviousScreen(currentScreen);
    setCurrentScreen('profile');
  }, [currentScreen]);

  // Переход на группы
  const goToGroups = useCallback(() => {
    setPreviousScreen(currentScreen);
    setCurrentScreen('groups');
  }, [currentScreen]);

  return {
    currentScreen,
    previousScreen,
    navigateTo,
    goBack,
    goToHome,
    goToStats,
    goToAnalytics,
    goToProfile,
    goToGroups,
  };
};
