import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import {
  Provider as PaperProvider,
  Text,
  IconButton,
} from 'react-native-paper';
import { api, Habit } from './services/api';

// Импорты компонентов
import { CreateHabitModal } from './components/CreateHabitModal';
import { AddGroupModal } from './components/AddGroupModal';
import { SettingsScreen } from './components/SettingsScreen';
import { colors, navigationStyles } from './styles';
import { HabitsScreen } from './screens/HabitsScreen';
import { StatsScreen } from './screens/StatsScreen';
import { AnalyticsScreen } from './screens/AnalyticsScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { GroupsScreen } from './screens/GroupsScreen';
import { HabitDetailScreen } from './screens/HabitDetailScreen';

// Импорты контекста
import { AppProvider, useApp } from './context';

// Типы для темы
type ThemeProps = { isDark: boolean; setIsDark: (v: boolean) => void };

function AppContentWithTheme({ isDark, setIsDark }: ThemeProps) {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  // Аутентификация теперь управляется через контекст
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Используем responsive, navigation, habits и auth из контекста
  const { responsive, navigation, habits, auth } = useApp();

  // Навигация теперь управляется через контекст
  const [userStats, setUserStats] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [groups, setGroups] = useState<any[]>([]);
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Состояние для детальной страницы привычки
  const [selectedHabit, setSelectedHabit] = useState<any>(null);
  const [showHabitDetail, setShowHabitDetail] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [groupHabits, setGroupHabits] = useState<{[key: string]: any[]}>({});

  // Автоматически обновляем selectedHabit при изменении habits
  useEffect(() => {
    if (selectedHabit && habits.habits.length > 0) {
      const updatedHabit = habits.habits.find(h => h.id === selectedHabit.id);
      if (updatedHabit) {
        setSelectedHabit(updatedHabit);
      }
    }
  }, [habits.habits]);

  // Responsive теперь управляется через контекст

  // Функция для загрузки групп (перемещаем выше checkAuth)
  const loadGroups = async () => {
    try {
      const data = await api.getGroups();
      // Проверяем структуру данных (может быть пагинированный ответ)
      let groupsData;
      if (data && Array.isArray(data)) {
        groupsData = data;
      } else if (data && typeof data === 'object' && 'results' in data && Array.isArray((data as any).results)) {
        groupsData = (data as any).results;
      } else {
        groupsData = [];
      }
      
      setGroups(groupsData);
      
      // Загружаем привычки для всех групп сразу
      for (const group of groupsData) {
        await loadGroupHabits(group.id);
      }
    } catch (error) {
      console.error('Load groups error:', error);
    }
  };

  // Функция для загрузки привычек группы
  const loadGroupHabits = async (groupId: string) => {
    try {
      const data: any = await api.getHabitsByGroup(groupId);
      // Обрабатываем пагинированный ответ
      const habits = data.results || data;
      setGroupHabits(prev => ({
        ...prev,
        [groupId]: habits
      }));
    } catch (error) {
      console.error('Load group habits error:', error);
    }
  };

  // Проверка аутентификации после загрузки шрифтов
  useEffect(() => {
    if (!fontsLoaded) return;
    checkAuth();
  }, [fontsLoaded]);

  const checkAuth = async () => {
    await auth.checkAuth();
    if (auth.isLoggedIn) {
      await habits.loadHabits();
      await loadGroups(); // Загружаем группы при входе
    } else {
      // Автоматический вход с демо-данными
      await handleLogin();
    }
  };

  const handleLogin = async () => {
    try {
      await auth.loginWithDemo();
      await habits.loadHabits();
      await loadGroups(); // Загружаем группы при входе
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Ошибка', 'Не удалось войти в систему');
    }
  };

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' }}>
        <ActivityIndicator size="large" color="#00FFFF" />
      </View>
    );
  }

  // Загрузка привычек теперь управляется через контекст

  const handleHabitToggle = async (habitId: string) => {
    try {
      const response = await api.markHabitComplete(habitId);
      
      // Если привычка уже была выполнена сегодня
      if (response.completed_today) {
        // Показываем уведомление
        Alert.alert('Информация', response.message);
      }
      
      // ВСЕГДА перезагружаем привычки чтобы обновить UI
      await habits.loadHabits();
    } catch (error) {
      console.error('Toggle habit error:', error);
      Alert.alert('Ошибка', 'Не удалось отметить привычку');
    }
  };

  if (!fontsLoaded || auth.loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Загрузка...</Text>
      </View>
    );
  }

  const handleHabitPress = (habit: any) => {
    setSelectedHabit(habit);
    setShowHabitDetail(true);
  };

  const handleCalendarDayToggle = async (date: string) => {
    if (!selectedHabit) return;
    
    try {
      // Проверяем, была ли привычка выполнена в этот день
      const isCompleted = selectedHabit.logs?.some((log: any) => 
        log.date === date && log.status === 'completed'
      );
      
      if (isCompleted) {
        // Если уже выполнена - убираем выполнение
        await api.unmarkHabitCompleteForDate(selectedHabit.id, date);
      } else {
        // Если не выполнена - отмечаем как выполненную на конкретную дату
        await api.markHabitCompleteForDate(selectedHabit.id, date);
      }
      
      // Перезагружаем привычки - selectedHabit обновится автоматически через useEffect
      await habits.loadHabits();
    } catch (error) {
      console.error('Calendar day toggle error:', error);
      Alert.alert('Ошибка', 'Не удалось изменить статус привычки');
    }
  };

  const handleAddHabit = async (habitData: any) => {
    try {
      // Добавляем базовые поля
      const data = {
        ...habitData,
        habit_type: 'boolean',
        frequency: 'daily'
      };
      
      await habits.addHabit(data);
      
      // Перезагружаем группы
      await loadGroups();
      
      Alert.alert('Успех', 'Привычка добавлена!');
    } catch (error) {
      console.error('Add habit error:', error);
      Alert.alert('Ошибка', 'Не удалось добавить привычку');
    }
  };

  const handleEditHabit = (habit: any) => {
    // Открываем модальное окно редактирования
    setSelectedHabit(habit);
    setShowEditModal(true);
  };

  const handleEditHabitSave = async (habitData: any) => {
    try {
      if (!selectedHabit?.id) {
        Alert.alert('Ошибка', 'Привычка не найдена');
        return;
      }

      await habits.updateHabit(selectedHabit.id, habitData);
      
      Alert.alert('Успех', `Привычка "${habitData.name}" обновлена!`);
    } catch (error) {
      console.error('Edit habit error:', error);
      Alert.alert('Ошибка', 'Не удалось обновить привычку');
    }
  };

  // Загружаем группы при открытии модального окна
  const handleOpenAddModal = async () => {
    setShowAddModal(true);
    // Загружаем группы, если их еще нет
    if (groups.length === 0) {
      await loadGroups();
    }
  };

  // Обработчик для открытия настроек
  const handleSettingsPress = () => {
    setShowSettings(true);
  };

  // Функции загрузки данных для разных экранов
  const loadUserStats = async () => {
    try {
      const stats = await api.getUserStats();
      setUserStats(stats);
    } catch (error) {
      console.error('Load stats error:', error);
    }
  };

  const loadAnalytics = async () => {
    try {
      const data = await api.getAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error('Load analytics error:', error);
    }
  };

  const handleAddGroup = async (groupData: { name: string; description: string; color: string }) => {
    try {
      await api.createGroup(groupData);
      
      // Перезагружаем группы
      await loadGroups();
      
      Alert.alert('Успех', 'Группа добавлена!');
    } catch (error) {
      console.error('Add group error:', error);
      Alert.alert('Ошибка', 'Не удалось добавить группу');
    }
  };

  // Функция для переключения раскрытия группы
  const toggleGroupExpansion = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
      // Загружаем привычки группы при первом раскрытии
      if (!groupHabits[groupId]) {
        loadGroupHabits(groupId);
      }
    }
    setExpandedGroups(newExpanded);
  };

  // Функция для рендеринга экранов
  const renderScreen = () => {
    // Страница настроек
    if (showSettings) {
      return (
        <SettingsScreen
          onClose={() => setShowSettings(false)}
          isDark={isDark}
          onToggleTheme={() => setIsDark(!isDark)}
        />
      );
    }

    // Детальная страница привычки
    if (showHabitDetail && selectedHabit) {
      return (
        <HabitDetailScreen
          habit={selectedHabit}
          onBack={() => setShowHabitDetail(false)}
          onEditHabit={handleEditHabit}
          onCalendarDayToggle={handleCalendarDayToggle}
        />
      );
    }

    switch (navigation.currentScreen) {
      case 'habits':
                 return (
           <HabitsScreen
             habits={habits.habits}
             isTablet={responsive.isTablet}
             onHabitPress={handleHabitPress}
             onSettingsPress={handleSettingsPress}
             onOpenAddModal={handleOpenAddModal}
           />
         );
      
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

             {/* Нижняя навигация - скрываем в детальном экране */}
       {!showHabitDetail && (
         <View style={[
           navigationStyles.bottomNavigation,
           responsive.isTablet && navigationStyles.bottomNavigationTablet
         ]}>
          <TouchableOpacity
                                      style={[
               navigationStyles.navItem,
               navigation.currentScreen === 'habits' && navigationStyles.navItemActive,
               responsive.isTablet && navigationStyles.navItemTablet
             ]}
             onPress={() => navigation.navigateTo('habits')}
          >
                         <IconButton
               icon="target"
               iconColor={navigation.currentScreen === 'habits' ? '#ffffff' : '#666666'}
               size={24}
               style={navigationStyles.navIconButton}
             />
             <Text style={[navigationStyles.navText, navigation.currentScreen === 'habits' && navigationStyles.navTextActive]}>Привычки</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
                         style={[
               navigationStyles.navItem,
               navigation.currentScreen === 'stats' && navigationStyles.navItemActive,
               responsive.isTablet && navigationStyles.navItemTablet
             ]}
             onPress={() => navigation.navigateTo('stats')}
          >
                         <IconButton
               icon="chart-bar"
               iconColor={navigation.currentScreen === 'stats' ? '#ffffff' : '#666666'}
               size={24}
               style={navigationStyles.navIconButton}
             />
             <Text style={[navigationStyles.navText, navigation.currentScreen === 'stats' && navigationStyles.navTextActive]}>Статистика</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              navigationStyles.navItem,
                             navigation.currentScreen === 'analytics' && navigationStyles.navItemActive,
              responsive.isTablet && navigationStyles.navItemTablet
            ]}
                         onPress={() => navigation.navigateTo('analytics')}
          >
            <IconButton
              icon="chart-line"
                             iconColor={navigation.currentScreen === 'analytics' ? '#ffffff' : '#666666'}
              size={24}
              style={navigationStyles.navIconButton}
            />
                         <Text style={[navigationStyles.navText, navigation.currentScreen === 'analytics' && navigationStyles.navTextActive]}>Аналитика</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              navigationStyles.navItem,
                             navigation.currentScreen === 'groups' && navigationStyles.navItemActive,
              responsive.isTablet && navigationStyles.navItemTablet
            ]}
                         onPress={() => navigation.navigateTo('groups')}
          >
            <IconButton
              icon="folder"
                             iconColor={navigation.currentScreen === 'groups' ? '#ffffff' : '#666666'}
              size={24}
              style={navigationStyles.navIconButton}
            />
                         <Text style={[navigationStyles.navText, navigation.currentScreen === 'groups' && navigationStyles.navTextActive]}>Группы</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              navigationStyles.navItem,
                             navigation.currentScreen === 'profile' && navigationStyles.navItemActive,
              responsive.isTablet && navigationStyles.navItemTablet
            ]}
                         onPress={() => navigation.navigateTo('profile')}
          >
            <IconButton
              icon="account"
                             iconColor={navigation.currentScreen === 'profile' ? '#ffffff' : '#666666'}
              size={24}
              style={navigationStyles.navIconButton}
            />
                         <Text style={[navigationStyles.navText, navigation.currentScreen === 'profile' && navigationStyles.navTextActive]}>Профиль</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Модальные окна */}
      <CreateHabitModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddHabit}
        groups={groups}
      />

      <CreateHabitModal
        visible={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleEditHabitSave}
        groups={groups}
        editMode={true}
        habitData={selectedHabit}
      />

      <AddGroupModal
        visible={showAddGroupModal}
        onClose={() => setShowAddGroupModal(false)}
        onSave={handleAddGroup}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.text.primary,
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
