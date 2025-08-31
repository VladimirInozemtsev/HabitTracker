import { useState, useCallback } from 'react';

// Типы для навигации
export type Screen = 'habits' | 'stats' | 'analytics' | 'profile' | 'groups' | 'settings' | 'generalSettings' | 'archive';

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
    console.log('goBack called, previousScreen:', previousScreen, 'currentScreen:', currentScreen);
    if (previousScreen) {
      setCurrentScreen(previousScreen);
      setPreviousScreen(null);
      console.log('Going back to:', previousScreen);
    } else {
      console.log('No previous screen, going to habits');
      setCurrentScreen('habits');
    }
  }, [previousScreen, currentScreen]);

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

  // Переход на настройки
  const goToSettings = useCallback(() => {
    setPreviousScreen(currentScreen);
    setCurrentScreen('settings');
  }, [currentScreen]);

  // Переход на основные настройки
  const goToGeneralSettings = useCallback(() => {
    console.log('goToGeneralSettings called, currentScreen:', currentScreen);
    setPreviousScreen(currentScreen);
    setCurrentScreen('generalSettings');
    console.log('Navigated to generalSettings, previousScreen set to:', currentScreen);
  }, [currentScreen]);

  // Переход на архив
  const goToArchive = useCallback(() => {
    console.log('goToArchive called, currentScreen:', currentScreen);
    setPreviousScreen(currentScreen);
    setCurrentScreen('archive');
    console.log('Navigated to archive, previousScreen set to:', currentScreen);
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
    goToSettings,
    goToGeneralSettings,
    goToArchive,
  };
};
