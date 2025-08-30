import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { Provider as PaperProvider, Text } from 'react-native-paper';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // ← ВРЕМЕННО ОТКЛЮЧЕНО: для демонстрации

// Импорты компонентов
import { BottomNavigation, ModalManager } from './src/components/ui';
import { SettingsScreen } from './src/screens/PostLogin/SettingsScreen';
import { GeneralSettingsScreen } from './src/screens/PostLogin/GeneralSettingsScreen';
import { theme } from './src/theme/theme';
import { HabitsScreen } from './src/screens/PostLogin/HabitsScreen';
import { StatsScreen } from './src/screens/PostLogin/StatsScreen';
import { AnalyticsScreen } from './src/screens/PostLogin/AnalyticsScreen';
import { ProfileScreen } from './src/screens/PostLogin/ProfileScreen';
import { GroupsScreen } from './src/screens/PostLogin/GroupsScreen';
import { HabitDetailScreen } from './src/screens/PostLogin/HabitDetailScreen';

// Импорты контекста и хуков
import { AppProvider, useApp } from './src/context';
import { useAppLogic } from './src/hooks/useAppLogic';

// Типы для темы
type ThemeProps = { isDark: boolean; setIsDark: (v: boolean) => void };

function AppContentWithTheme({ isDark, setIsDark }: ThemeProps) {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  // ← ДОБАВЛЕНО: состояние для настроек
  const [settings, setSettings] = useState({
    highlightCurrentDay: true, // по умолчанию включено
    weekStartsOn: 'monday', // ← ДОБАВЛЕНО: день начала недели
    showBottomPanel: true, // ← ДОБАВЛЕНО: показывать нижнюю панель
  });

  // ← ДОБАВЛЕНО: функции для работы с настройками
  const loadSettings = async () => {
    try {
      // ВРЕМЕННО: используем localStorage для веб-версии
      if (typeof window !== 'undefined' && window.localStorage) {
        const savedSettings = window.localStorage.getItem('habitTrackerSettings');
        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings);
          setSettings({
            highlightCurrentDay: parsedSettings.highlightCurrentDay ?? true,
            weekStartsOn: parsedSettings.weekStartsOn ?? 'monday',
            showBottomPanel: parsedSettings.showBottomPanel ?? true,
          });
        }
      }
      // TODO: заменить на AsyncStorage для мобильной версии
      // const savedSettings = await AsyncStorage.getItem('habitTrackerSettings');
      // if (savedSettings) {
      //   setSettings(JSON.parse(savedSettings));
      // }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveSettings = async (newSettings: { highlightCurrentDay: boolean; weekStartsOn?: string; showBottomPanel?: boolean }) => {
    try {
      // ВРЕМЕННО: используем localStorage для веб-версии
      if (typeof window !== 'undefined' && window.localStorage) {
        const settingsToSave = {
          highlightCurrentDay: newSettings.highlightCurrentDay,
          weekStartsOn: newSettings.weekStartsOn ?? settings.weekStartsOn,
          showBottomPanel: newSettings.showBottomPanel ?? settings.showBottomPanel,
        };
        window.localStorage.setItem('habitTrackerSettings', JSON.stringify(settingsToSave));
      }
      // TODO: заменить на AsyncStorage для мобильной версии
      // await AsyncStorage.setItem('habitTrackerSettings', JSON.stringify(newSettings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  // Используем контекст
  const { responsive, navigation, habits, auth } = useApp();

  // Используем наш новый хук для всей логики
  const {
    // Состояние
    showAddModal,
    showAddGroupModal,
    showEditModal,
    selectedHabit,
    showHabitDetail,
    groups,
    expandedGroups,
    groupHabits,
    userStats,
    analytics,

    // Сеттеры
    setShowAddModal,
    setShowAddGroupModal,
    setShowEditModal,
    setSelectedHabit,
    setShowHabitDetail,

    // Обработчики
    handleHabitToggle,
    handleHabitPress,
    handleCalendarDayToggle,
    handleAddHabit,
    handleEditHabit,
    handleEditHabitSave,
    handleOpenAddModal,
    handleAddGroup,
    toggleGroupExpansion,

    // Функции загрузки
    loadGroups,
    loadUserStats,
    loadAnalytics,
  } = useAppLogic();

  // ← ДОБАВЛЕНО: загрузка настроек при запуске
  useEffect(() => {
    loadSettings();
  }, []);

  // Проверка аутентификации после загрузки шрифтов
  useEffect(() => {
    if (!fontsLoaded) return;
    checkAuth();
  }, [fontsLoaded]);

  const checkAuth = async () => {
    await auth.checkAuth();
    if (auth.isLoggedIn) {
      await habits.loadHabits();
      await loadGroups();
    } else {
      await handleLogin();
    }
  };

  const handleLogin = async () => {
    try {
      await auth.loginWithDemo();
      await habits.loadHabits();
      await loadGroups();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (!fontsLoaded || auth.loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.success} />
        <Text style={styles.loadingText}>Загрузка...</Text>
      </View>
    );
  }

  // Функция для рендеринга экранов
  const renderScreen = () => {
    // Детальная страница привычки
    if (showHabitDetail && selectedHabit) {
      return (
        <HabitDetailScreen
          habit={selectedHabit}
          onBack={() => setShowHabitDetail(false)}
          onEditHabit={handleEditHabit}
          onCalendarDayToggle={handleCalendarDayToggle}
          highlightCurrentDay={settings.highlightCurrentDay} // ← ДОБАВЛЕНО: передаем настройку
          weekStartsOn={settings.weekStartsOn} // ← ДОБАВЛЕНО: передаем настройку дня недели
        />
      );
    }



    switch (navigation.currentScreen) {
      case 'settings':
        return (
          <SettingsScreen
            onClose={() => navigation.goBack()}
            isDark={isDark}
            onToggleTheme={() => setIsDark(!isDark)}
            onNavigateToGeneralSettings={() => {
              console.log('Navigating to General Settings...');
              navigation.goToGeneralSettings();
            }}
          />
        );
      
      case 'generalSettings':
        console.log('Rendering GeneralSettingsScreen');
        return (
          <GeneralSettingsScreen
            onBack={() => navigation.goBack()}
            onSettingsChange={async (newSettings) => {
              const updatedSettings = {
                ...settings,
                ...newSettings,
              };
              setSettings(updatedSettings);
              await saveSettings(updatedSettings); // ← ДОБАВЛЕНО: сохраняем настройки
            }}
            currentSettings={settings} // ← ДОБАВЛЕНО: передаем текущие настройки
          />
        );
      
            case 'habits':
        return (
          <HabitsScreen
            habits={habits.habits}
            isTablet={responsive.isTablet}
            onHabitPress={handleHabitPress}
            onHabitToggle={handleHabitToggle}
            onSettingsPress={() => navigation.goToSettings()}
            onOpenAddModal={handleOpenAddModal}
            highlightCurrentDay={settings.highlightCurrentDay} // ← ДОБАВЛЕНО: передаем настройку
            weekStartsOn={settings.weekStartsOn} // ← ДОБАВЛЕНО: передаем настройку дня недели
            showBottomPanel={settings.showBottomPanel} // ← ДОБАВЛЕНО: передаем настройку панели
          />
        );
        
        // Отладочное логирование (закомментировано)
        // console.log('App: передаем weekStartsOn =', settings.weekStartsOn);
      
      case 'stats':
        return (
          <StatsScreen
            userStats={userStats}
            loadUserStats={loadUserStats}
          />
        );
      
      case 'analytics':
        return (
          <AnalyticsScreen />
        );
      
      case 'profile':
        return (
          <ProfileScreen
            onLogout={() => {
              auth.logout();
            }}
          />
        );
      
      case 'groups':
        return (
          <GroupsScreen
            groups={groups}
            expandedGroups={expandedGroups}
            groupHabits={groupHabits}
            onToggleGroupExpansion={toggleGroupExpansion}
            onOpenAddGroupModal={() => setShowAddGroupModal(true)}
            onLoadGroups={loadGroups}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Основной контент */}
      {renderScreen()}

      <StatusBar style="auto" />

      {/* Нижняя навигация */}
      <BottomNavigation
        currentScreen={navigation.currentScreen}
        onNavigate={navigation.navigateTo}
        isTablet={responsive.isTablet}
        showHabitDetail={showHabitDetail}
      />

      {/* Модальные окна */}
      <ModalManager
        showAddModal={showAddModal}
        showEditModal={showEditModal}
        showAddGroupModal={showAddGroupModal}
        onCloseAddModal={() => setShowAddModal(false)}
        onCloseEditModal={() => setShowEditModal(false)}
        onCloseAddGroupModal={() => setShowAddGroupModal(false)}
        onSaveHabit={handleAddHabit}
        onSaveEditHabit={handleEditHabitSave}
        onSaveGroup={handleAddGroup}
        groups={groups}
        selectedHabit={selectedHabit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background, // ← ВОЗВРАЩЕНО: темный фон
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background, // ← ВОЗВРАЩЕНО: темный фон
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: theme.colors.text.primary,
  },
});

export default function App() {
  const [isDark, setIsDark] = useState(true);

  return (
    <PaperProvider>
      <AppProvider>
        <AppContentWithTheme isDark={isDark} setIsDark={setIsDark} />
      </AppProvider>
    </PaperProvider>
  );
}
