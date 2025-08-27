import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView, Alert, ActivityIndicator, Modal, TouchableOpacity, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import {
  Provider as PaperProvider,
  Text,
  Button,
  Card,
  TextInput,
  FAB,
  BottomNavigation,
  Surface,
  Divider,
  Chip,
  Portal,
  Dialog,
  List,
  Avatar,
  Badge,
  useTheme,
  Appbar,
  IconButton,
} from 'react-native-paper';
import { api, Habit, isAuthenticated } from './services/api';
import { HabitGrid } from './components/HabitGrid';
import { HabitCalendar } from './components/HabitCalendar';
import { CreateHabitModal } from './components/CreateHabitModal';
import { SettingsScreen } from './components/SettingsScreen';
import { getHabitColor } from './constants/colors';
import { SERIES_GOALS } from './constants/goals';
import { colors } from './constants/appStyles';

// Функция для создания приглушенного цвета
const getMutedColor = (color: string): string => {
  // Добавляем прозрачность к основному цвету (60 = 37.5% непрозрачности)
  return `${color}60`;
};

// Типы для навигации
type Screen = 'habits' | 'stats' | 'analytics' | 'profile' | 'groups';

function AppContent() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Responsive state
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const isTablet = screenWidth <= 991;
  const isMobile = screenWidth <= 640;

  const [currentScreen, setCurrentScreen] = useState<Screen>('habits');
  const [userStats, setUserStats] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [groups, setGroups] = useState<any[]>([]);
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [newGroupColor, setNewGroupColor] = useState('#4CAF50');
  
  // Состояние для детальной страницы привычки
  const [selectedHabit, setSelectedHabit] = useState<any>(null);
  const [showHabitDetail, setShowHabitDetail] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [groupHabits, setGroupHabits] = useState<{[key: string]: any[]}>({});

    // Автоматически обновляем selectedHabit при изменении habits
  useEffect(() => {
    if (selectedHabit && habits.length > 0) {
      const updatedHabit = habits.find(h => h.id === selectedHabit.id);
      if (updatedHabit) {
        setSelectedHabit(updatedHabit);
      }
    }
  }, [habits]);

  // Responsive dimensions listener
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({window}) => {
      setScreenWidth(window.width);
    });

    return () => subscription?.remove();
  }, []);

  // Проверка аутентификации при загрузке
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    if (isAuthenticated()) {
      setIsLoggedIn(true);
      await loadHabits();
      await loadGroups(); // Загружаем группы при входе
    } else {
      // Автоматический вход с демо-данными
      await handleLogin();
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      await api.login('demo', 'demo12345');
      setIsLoggedIn(true);
      await loadHabits();
      await loadGroups(); // Загружаем группы при входе
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Ошибка', 'Не удалось войти в систему');
    } finally {
      setLoading(false);
    }
  };

  const loadHabits = async () => {
    try {
      setLoading(true);
      const data = await api.getHabits();
      console.log('API Response:', data); // Отладочный лог
      
      // Проверяем структуру данных
      if (data && Array.isArray(data)) {
        setHabits([...data]); // Принудительно создаем новый массив
      } else if (data && typeof data === 'object' && 'results' in data && Array.isArray((data as any).results)) {
        // Если данные в формате пагинации
        setHabits([...(data as any).results]); // Принудительно создаем новый массив
      } else {
        console.error('Unexpected data format:', data);
        setHabits([]);
      }
    } catch (error) {
      console.error('Load habits error:', error);
      Alert.alert('Ошибка', 'Не удалось загрузить привычки');
      setHabits([]);
    } finally {
      setLoading(false);
    }
  };

  const handleHabitToggle = async (habitId: string) => {
    try {
      const response = await api.markHabitComplete(habitId);
      
      // Если привычка уже была выполнена сегодня
      if (response.completed_today) {
        // Показываем уведомление
        Alert.alert('Информация', response.message);
      }
      
      // ВСЕГДА перезагружаем привычки чтобы обновить UI
      await loadHabits();
    } catch (error) {
      console.error('Toggle habit error:', error);
      Alert.alert('Ошибка', 'Не удалось отметить привычку');
    }
  };

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
      await loadHabits();
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
      
      await api.createHabit(data);
      
      // Перезагружаем привычки и группы
      await loadHabits();
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

      await api.updateHabit(selectedHabit.id, habitData);
      
      // Перезагружаем привычки - selectedHabit обновится автоматически через useEffect
      await loadHabits();
      
      Alert.alert('Успех', `Привычка "${habitData.name}" обновлена!`);
      setShowEditModal(false);
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

  const handleAddGroup = async () => {
    if (!newGroupName.trim()) {
      Alert.alert('Ошибка', 'Введите название группы');
      return;
    }

    try {
      await api.createGroup({
        name: newGroupName.trim(),
        description: newGroupDescription.trim(),
        color: newGroupColor,
      });
      
      // Очищаем форму
      setNewGroupName('');
      setNewGroupDescription('');
      setNewGroupColor('#4CAF50');
      setShowAddGroupModal(false);
      
      // Перезагружаем группы
      await loadGroups();
      
      Alert.alert('Успех', 'Группа добавлена!');
    } catch (error) {
      console.error('Add group error:', error);
      Alert.alert('Ошибка', 'Не удалось добавить группу');
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
          styles={styles}
        />
      );
    }

    // Детальная страница привычки
    if (showHabitDetail && selectedHabit) {
      return (
        <View style={styles.container}>
          <Appbar.Header style={styles.appbar}>
            <Appbar.BackAction 
              onPress={() => setShowHabitDetail(false)} 
              iconColor="#ffffff"
            />
            <Appbar.Content title={selectedHabit.name} />
          </Appbar.Header>
          
          <ScrollView style={styles.content}>
            <View style={styles.habitDetailContainer}>
              <Card style={styles.habitDetailCard}>
                <Card.Content>
                  <Text variant="titleLarge" style={styles.habitDetailName}>
                    {selectedHabit.name}
                  </Text>
                  <Text variant="bodyMedium" style={styles.habitDetailDescription}>
                    {selectedHabit.description}
                  </Text>
                  

                  
                  {/* Сетка активности (7×25) */}
                  <HabitGrid
                    habitId={selectedHabit.id}
                    color={selectedHabit.color || getHabitColor(selectedHabit.id)}
                    completions={selectedHabit.logs || []}
                    weeks={25} // показываем 25 недель для детального просмотра
                    showLegend={false}
                  />
                  
                  {/* Панель действий */}
                  {/* Функция для подсчета текущего стрика */}
                  {(() => {
                    const calculateCurrentStreak = () => {
                      console.log('=== App Streak Debug ===');
                      console.log('selectedHabit.logs:', selectedHabit.logs);
                      
                      if (!selectedHabit.logs || selectedHabit.logs.length === 0) {
                        console.log('No logs found, returning 0');
                        return 0;
                      }
                      
                      const completedDates = selectedHabit.logs
                        .filter((log: any) => log.status === 'completed')
                        .map((log: any) => log.date)
                        .sort((a: string, b: string) => b.localeCompare(a));
                      
                      console.log('completedDates:', completedDates);
                      
                      if (completedDates.length === 0) {
                        console.log('No completed dates found, returning 0');
                        return 0;
                      }
                      
                      // Начинаем с последнего выполненного дня
                      const lastCompletedDate = completedDates[0]; // Самая новая дата
                      console.log('lastCompletedDate:', lastCompletedDate);
                      
                      let streak = 0;
                      let currentDate = new Date(lastCompletedDate);
                      
                      while (true) {
                        const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
                        
                        console.log('Checking date:', dateString, 'completedDates.includes:', completedDates.includes(dateString));
                        
                        if (completedDates.includes(dateString)) {
                          streak++;
                          currentDate.setDate(currentDate.getDate() - 1);
                          console.log('Date completed, streak now:', streak);
                        } else {
                          console.log('Date not completed, breaking streak at:', streak);
                          break;
                        }
                      }
                      
                      console.log('Final streak:', streak);
                      console.log('=== End App Streak Debug ===');
                      return streak;
                    };
                    
                    const currentStreak = calculateCurrentStreak();
                    
                    return (
                      <View style={styles.actionBar}>
                        <IconButton
                          icon={selectedHabit.icon || "target"}
                          iconColor="#ffffff"
                          size={24}
                          style={styles.actionButton}
                        />
                        <TouchableOpacity style={styles.seriesGoalButton}>
                          <Text style={styles.seriesGoalText}>
                            {selectedHabit.series_goal 
                              ? SERIES_GOALS.find(goal => goal.value === selectedHabit.series_goal)?.label || 'Нет цели серии'
                              : 'Нет цели серии'
                            }
                          </Text>
                        </TouchableOpacity>
                        <View style={styles.streakCounter}>
                          <IconButton
                            icon="fire"
                            iconColor="#ffffff"
                            size={20}
                            style={styles.streakIcon}
                          />
                          <Text style={styles.streakText}>{currentStreak}</Text>
                        </View>
                        <IconButton
                          icon="pencil"
                          iconColor="#ffffff"
                          size={24}
                          style={styles.actionButton}
                          onPress={() => handleEditHabit(selectedHabit)}
                        />
                        <IconButton
                          icon="cog"
                          iconColor="#ffffff"
                          size={24}
                          style={styles.actionButton}
                        />
                      </View>
                    );
                  })()}
                  
                  {/* Интерактивный календарь */}
                  
                  {/* Интерактивный календарь */}
                  <HabitCalendar
                    habitId={selectedHabit.id}
                    color={selectedHabit.color || getHabitColor(selectedHabit.id)}
                    completions={selectedHabit.logs || []}
                    onToggleDay={handleCalendarDayToggle}
                  />
                </Card.Content>
              </Card>
            </View>
          </ScrollView>
        </View>
      );
    }

    switch (currentScreen) {
      case 'habits':
        return (
          <View style={styles.container}>
            <Appbar.Header style={styles.appbar}>
              <Appbar.Action 
                icon="cog" 
                onPress={handleSettingsPress}
                iconColor="#fff"
              />
              <Appbar.Content 
                title="HabitTracker" 
                subtitle=""
                titleStyle={styles.appbarTitle}
                subtitleStyle={styles.appbarSubtitle}
              />
              <Appbar.Action 
                icon="chart-bar" 
                onPress={() => {}}
                iconColor="#fff"
              />
              <Appbar.Action 
                icon="plus" 
                onPress={handleOpenAddModal}
                iconColor="#fff"
              />
            </Appbar.Header>
            
            <ScrollView 
              style={styles.content}
            >

            <View style={styles.habitsList}>
              {habits.map((habit) => (
                <Card
                  key={habit.id}
                  style={[
                    styles.habitCard,
                    isTablet && styles.habitCardTablet
                  ]}
                  onPress={() => handleHabitPress(habit)}
                >
                  <Card.Content style={[
                    styles.habitCardContent,
                    isTablet && styles.habitCardContentTablet
                  ]}>
                    <View style={styles.habitInfo}>
                       {/* Новый хедер карточки: иконка слева, текст центр, статус справа */}
                       <View style={styles.habitHeader}>
                         {/* Левый блок с иконкой */}
                         <View style={styles.habitIconContainer}>
                           <IconButton
                             size={35}
                             icon={habit.icon || "target"}
                             iconColor="#ffffff"
                             style={{ 
                               margin: 0,
                               width: 60,
                               height: 60,
                               borderRadius: 8,
                               backgroundColor: getMutedColor(habit.color || getHabitColor(habit.id))
                             }}
                           />
                         </View>
                         
                         {/* Центральный блок с текстом */}
                         <View style={styles.habitTextContainer}>
                           <View style={styles.habitNameContainer}>
                             <Text variant="bodyLarge" style={styles.habitName}>
                               {habit.name}
                             </Text>
                           </View>
                           <View style={styles.habitDescriptionContainer}>
                             <Text variant="bodyMedium" style={styles.habitDescription}>
                               {habit.description}
                             </Text>
                           </View>
                         </View>
                         
                         {/* Правый блок со статусом */}
                         <View style={styles.habitStatusContainer}>
                           <View
                             style={{
                               margin: 0,
                               width: 60,
                               height: 60,
                               borderRadius: 8,
                               backgroundColor: habit.is_completed_today ? (habit.color || getHabitColor(habit.id)) : getMutedColor(habit.color || getHabitColor(habit.id)),
                               justifyContent: 'center',
                               alignItems: 'center'
                             }}
                           >
                             {habit.is_completed_today && (
                               <IconButton
                                 size={35}
                                 icon="check"
                                 iconColor="#ffffff"
                                 style={{ margin: 0 }}
                               />
                             )}
                           </View>
                         </View>
                       </View>
                      
                      {/* Сетка истории привычки */}
                      <HabitGrid
                        habitId={habit.id}
                        color={habit.color || getHabitColor(habit.id)}
                        completions={habit.logs || []}
                        weeks={25} // показываем 25 недель, как в детальном экране
                        showLegend={false} // Убираем легенду с главного экрана
                      />
                    </View>
                  </Card.Content>
                </Card>
              ))}
            </View>
          </ScrollView>
        </View>
        );
      
      case 'stats':
        return (
          <ScrollView 
            style={styles.screenContainer}
            contentContainerStyle={styles.screenContentContainer}
          >
                    <Text style={styles.screenTitle}>Статистика</Text>
            {userStats ? (
              <View style={styles.statsContainer}>
                <View style={styles.statCard}>
                  <Text style={styles.statNumber}>{userStats.total_habits_created || 0}</Text>
                  <Text style={styles.statLabel}>Всего привычек</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statNumber}>{userStats.total_habits_completed || 0}</Text>
                  <Text style={styles.statLabel}>Всего выполнено</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statNumber}>{userStats.current_streak || 0}</Text>
                  <Text style={styles.statLabel}>Текущий стрик</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statNumber}>{userStats.longest_streak || 0}</Text>
                  <Text style={styles.statLabel}>Лучший стрик</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statNumber}>{userStats.completion_rate || 0}%</Text>
                  <Text style={styles.statLabel}>Процент выполнения</Text>
                </View>
              </View>
            ) : (
              <TouchableOpacity style={styles.loadButton} onPress={loadUserStats}>
                <Text style={styles.loadButtonText}>Загрузить статистику</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        );
      
      case 'analytics':
        return (
          <View style={styles.screenContainer}>
            <Text style={styles.screenTitle}>📈 Аналитика</Text>
            <Text style={styles.screenText}>Здесь будут графики и отчеты</Text>
          </View>
        );
      
      case 'profile':
        return (
          <ScrollView 
            style={styles.screenContainer}
            contentContainerStyle={styles.screenContentContainer}
          >
            <Text style={styles.screenTitle}>👤 Профиль</Text>
            <TouchableOpacity style={styles.profileCard}>
              <Text style={styles.profileTitle}>Пользователь</Text>
              <Text style={styles.profileText}>demo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.profileCard}>
              <Text style={styles.profileTitle}>Email</Text>
              <Text style={styles.profileText}>demo@example.com</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.profileCard}>
              <Text style={styles.profileTitle}>Дата регистрации</Text>
              <Text style={styles.profileText}>24 августа 2025</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.loadButton, { backgroundColor: '#f44336' }]} 
              onPress={() => {
                api.logout();
                setIsLoggedIn(false);
              }}
            >
              <Text style={styles.loadButtonText}>Выйти</Text>
            </TouchableOpacity>
          </ScrollView>
        );
      
      case 'groups':
        return (
          <ScrollView 
            style={styles.screenContainer}
            contentContainerStyle={styles.screenContentContainer}
          >
            <Text style={styles.screenTitle}>Группы привычек</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddGroupModal(true)}
            >
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
            {groups.length > 0 ? (
              <View style={styles.groupsContainer}>
                {groups.map((group) => {
                  const isExpanded = expandedGroups.has(group.id);
                  const groupHabitsList = groupHabits[group.id] || [];
                  const habitsCount = groupHabitsList.length;
                  
                  return (
                    <View key={group.id} style={styles.groupCard}>
                      <TouchableOpacity 
                        style={styles.groupHeader}
                        onPress={() => toggleGroupExpansion(group.id)}
                      >
                        <View style={[styles.groupColor, { backgroundColor: group.color }]} />
                        <View style={styles.groupInfo}>
                          <Text style={styles.groupName}>{group.name}</Text>
                          <Text style={styles.groupDescription}>{group.description || 'Без описания'}</Text>
                          <Text style={styles.groupCount}>{habitsCount} привычек</Text>
                        </View>
                        <Text style={[styles.expandIcon, isExpanded && styles.expandIconRotated]}>
                          {isExpanded ? '▼' : '▶'}
                        </Text>
                      </TouchableOpacity>
                      
                      {isExpanded && (
                        <View style={styles.groupHabitsContainer}>
                          {groupHabitsList.length > 0 ? (
                            groupHabitsList.map((habit) => (
                              <View key={habit.id} style={styles.groupHabitItem}>
                                <Text style={styles.groupHabitName}>{habit.name}</Text>
                                <View style={[
                                  styles.groupHabitStatus,
                                  { backgroundColor: habit.is_completed_today ? '#4CAF50' : '#E0E0E0' }
                                ]}>
                                  <Text style={styles.groupHabitStatusText}>
                                    {habit.is_completed_today ? '✅' : '⭕'}
                                  </Text>
                                </View>
                              </View>
                            ))
                          ) : (
                            <Text style={styles.noHabitsText}>В этой группе пока нет привычек</Text>
                          )}
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>
            ) : (
              <TouchableOpacity style={styles.loadButton} onPress={loadGroups}>
                <Text style={styles.loadButtonText}>Загрузить группы</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        );
      
      default:
        return null;
    }
  };

  if (!fontsLoaded || loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Загрузка...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Основной контент */}
      {renderScreen()}

      <StatusBar style="auto" />

      {/* Нижняя навигация - скрываем в детальном экране */}
      {!showHabitDetail && (
        <View style={[
          styles.bottomNavigation,
          isTablet && styles.bottomNavigationTablet
        ]}>
        <TouchableOpacity
          style={[
            styles.navItem,
            currentScreen === 'habits' && styles.navItemActive,
            isTablet && styles.navItemTablet
          ]}
          onPress={() => setCurrentScreen('habits')}
        >
          <IconButton
            icon="target"
            iconColor={currentScreen === 'habits' ? '#ffffff' : '#666666'}
            size={24}
            style={styles.navIconButton}
          />
          <Text style={[styles.navText, currentScreen === 'habits' && styles.navTextActive]}>Привычки</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.navItem,
            currentScreen === 'stats' && styles.navItemActive,
            isTablet && styles.navItemTablet
          ]}
          onPress={() => setCurrentScreen('stats')}
        >
          <IconButton
            icon="chart-bar"
            iconColor={currentScreen === 'stats' ? '#ffffff' : '#666666'}
            size={24}
            style={styles.navIconButton}
          />
          <Text style={[styles.navText, currentScreen === 'stats' && styles.navTextActive]}>Статистика</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.navItem,
            currentScreen === 'analytics' && styles.navItemActive,
            isTablet && styles.navItemTablet
          ]}
          onPress={() => setCurrentScreen('analytics')}
        >
          <IconButton
            icon="chart-line"
            iconColor={currentScreen === 'analytics' ? '#ffffff' : '#666666'}
            size={24}
            style={styles.navIconButton}
          />
          <Text style={[styles.navText, currentScreen === 'analytics' && styles.navTextActive]}>Аналитика</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.navItem,
            currentScreen === 'groups' && styles.navItemActive,
            isTablet && styles.navItemTablet
          ]}
          onPress={() => setCurrentScreen('groups')}
        >
          <IconButton
            icon="folder"
            iconColor={currentScreen === 'groups' ? '#ffffff' : '#666666'}
            size={24}
            style={styles.navIconButton}
          />
          <Text style={[styles.navText, currentScreen === 'groups' && styles.navTextActive]}>Группы</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.navItem,
            currentScreen === 'profile' && styles.navItemActive,
            isTablet && styles.navItemTablet
          ]}
          onPress={() => setCurrentScreen('profile')}
        >
          <IconButton
            icon="account"
            iconColor={currentScreen === 'profile' ? '#ffffff' : '#666666'}
            size={24}
            style={styles.navIconButton}
          />
          <Text style={[styles.navText, currentScreen === 'profile' && styles.navTextActive]}>Профиль</Text>
        </TouchableOpacity>
      </View>
      )}

        {/* Новое модальное окно создания привычки */}
        <CreateHabitModal
          visible={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddHabit}
          groups={groups}
        />

        {/* Модальное окно редактирования привычки */}
        <CreateHabitModal
          visible={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSave={handleEditHabitSave}
          groups={groups}
          editMode={true}
          habitData={selectedHabit}
        />

      {/* Модальное окно для добавления группы */}
      <Modal
        visible={showAddGroupModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddGroupModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Добавить новую группу</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Название группы"
              value={newGroupName}
              onChangeText={setNewGroupName}
              maxLength={100}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Описание (необязательно)"
              value={newGroupDescription}
              onChangeText={setNewGroupDescription}
              multiline
              numberOfLines={3}
              maxLength={500}
            />
            
            <View style={styles.colorPicker}>
              <Text style={styles.colorLabel}>Цвет группы:</Text>
              <View style={styles.colorOptions}>
                {['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#4CAF50', '#FFA726', '#9C27B0', '#607D8B'].map((color) => (
                  <TouchableOpacity
                    key={color}
                    style={[
                      styles.colorOption,
                      { backgroundColor: color },
                      newGroupColor === color && styles.colorOptionSelected
                    ]}
                    onPress={() => setNewGroupColor(color)}
                  />
                ))}
              </View>
            </View>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowAddGroupModal(false);
                  setNewGroupName('');
                  setNewGroupDescription('');
                  setNewGroupColor('#4CAF50');
                }}
              >
                <Text style={styles.cancelButtonText}>Отмена</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleAddGroup}
              >
                <Text style={styles.saveButtonText}>Добавить</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1015', // Угольно-синий фон приложения
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#ffffff',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#000000', // Черная шапка
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  addButtonText: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff', // Белый текст
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#cccccc', // Светло-серый текст
  },
  habitsList: {
    padding: 0, // Убираем отступы полностью
  },

  // Стили для модального окна
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1a1a1a', // Темно-серый фон для модала
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: '#333333',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff', // Белый текст
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#2a2a2a', // Темный фон для инпутов
    color: '#ffffff', // Белый текст
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButtonText: {
    color: '#666',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Стили для экранов
  screenContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000000',
  },
  screenContentContainer: {
    paddingHorizontal: 0, // Убираем горизонтальные отступы полностью
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
    textAlign: 'center',
  },
  screenTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  screenTitleIcon: {
    margin: 0,
    padding: 0,
    marginRight: 8,
    alignSelf: 'center',
    marginTop: 2,
  },
  screenText: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
  },
  
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
  
  // Стили для статистики
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  statCard: {
    backgroundColor: '#1a1a1a', // Темный фон дл�� карточек статистики
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    width: '48%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff', // Белые цифры
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#cccccc', // Светло-серый текст
    textAlign: 'center',
  },
  loadButton: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#333333',
    alignItems: 'center',
  },
  loadButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  // Стили для групп
  groupsContainer: {
    paddingHorizontal: 10,
  },
  groupCard: {
    backgroundColor: '#1a1a1a', // Темный фон как у карточек привычек
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333', // Серая рамка
  },
  groupColor: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 12,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff', // Белый текст
    marginBottom: 4,
  },
  groupDescription: {
    fontSize: 14,
    color: '#cccccc', // Светло-серый текст
    marginBottom: 4,
  },
  groupCount: {
    fontSize: 12,
    color: '#999999', // Серый текст
  },
  
  // Стили для профиля
  profileCard: {
    backgroundColor: '#1a1a1a', // Темный фон как у карточек привычек
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333333', // Серая рамка
  },
  profileTitle: {
    fontSize: 14,
    color: '#cccccc', // Светло-серый текст
    marginBottom: 4,
  },
  profileText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff', // Белый текст
  },
  
  // Стили для заголовка групп
  groupsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  
  // Стили для выбора цвета
  colorPicker: {
    marginBottom: 16,
  },
  colorLabel: {
    fontSize: 16,
    color: '#ffffff', // Белый текст
    marginBottom: 8,
  },
  colorOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorOptionSelected: {
    borderColor: '#333',
    borderWidth: 3,
  },
  
  // Стили для раскрытия групп
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expandIcon: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  expandIconRotated: {
    transform: [{ rotate: '90deg' }],
  },
  groupHabitsContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  groupHabitItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 6,
  },
  groupHabitName: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  groupHabitStatus: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupHabitStatusText: {
    fontSize: 14,
  },
  noHabitsText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    fontStyle: 'italic',
    paddingVertical: 12,
  },
  
  // Стили для выбора группы
  groupPicker: {
    marginTop: 15,
  },
  groupLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  groupOptions: {
    flexDirection: 'row',
  },
  groupOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    backgroundColor: '#F9F9F9',
  },
  groupOptionSelected: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  groupOptionText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  groupOptionTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  groupColorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  
  // Стили для выпадающего списка групп
  groupDropdown: {
    position: 'relative',
  },
  groupDropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#2a2a2a', // Темный фон
  },
  groupDropdownButtonText: {
    fontSize: 16,
    color: '#ffffff', // Белый текст
  },
  groupDropdownArrow: {
    fontSize: 12,
    color: '#cccccc', // Светло-серый текст
  },
  groupDropdownList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#1a1a1a', // Темный фон
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    marginTop: 2,
    maxHeight: 200,
    zIndex: 1000,
  },
  groupDropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  groupDropdownItemSelected: {
    backgroundColor: '#4CAF50',
  },
  groupDropdownItemText: {
    fontSize: 16,
    color: '#ffffff', // Белый текст
    marginLeft: 8,
  },
  groupDropdownItemTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  
  // Стили для панели действий в детальном экране
  actionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    paddingVertical: 8,
    marginVertical: 16,
  },
  actionButton: {
    margin: 0,
    padding: 8,
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffffff', // Белый контур
    height: 40, // Фиксированная высота
    justifyContent: 'center',
    alignItems: 'center',
  },
  seriesGoalButton: {
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffffff', // Белый контур
    height: 40, // Фиксированная высота
    justifyContent: 'center',
    alignItems: 'center',
  },
  seriesGoalText: {
    fontSize: 14,
    color: colors.text.primary,
    fontWeight: '500',
  },
  streakCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffffff', // Белый контур
    height: 40, // Фиксированная высота
    justifyContent: 'center',
  },
  streakIcon: {
    margin: 0,
    padding: 0,
    marginRight: 6,
  },
  streakText: {
    fontSize: 16,
    color: colors.text.primary,
    fontWeight: 'bold',
  },
  
  // Стили для Appbar
  appbar: {
    backgroundColor: '#000000', // Черная шапка как в HabitKit
    elevation: 4,
  },
  appbarTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  appbarSubtitle: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
  },
  content: {
    flex: 1,
    backgroundColor: '#000000', // Черный фон как у шапки
  },
  
  // Стили для карточек привычек
  habitCard: {
    marginBottom: 10, // Уменьшаем отступы между карточками
    marginHorizontal: 20, // Добавляем небольшие боковые отступы
    elevation: 2,
    backgroundColor: '#272B33', // Dark card background
  },
  habitCardTablet: {
    // Убираем backgroundColor - оставляем только специфичные для планшетов стили
    // backgroundColor: '#1a1a1a', // Darker background for tablets (991px breakpoint)
  },
  habitCardContent: {
    paddingVertical: 0, // Убираем вертикальные отступы полностью
    paddingHorizontal: 0, // Убираем горизонтальные паддинги Card.Content, чтобы сетка растягивалась
  },
  habitCardContentTablet: {
    marginHorizontal: 20, // Add margin for tablet screens
  },
  habitInfo: {
    flex: 1,
  },
  habitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8, // Отступ как у сетки
    paddingVertical: 8, // Отступы сверху и снизу
  },
  habitIconContainer: {
    marginRight: 8, // отступ от центрального блока (как у сетки)
    width: 44, // фиксированная ширина квадратного контейнера (как ячейки сетки)
    height: 44, // фиксированная высота квадратного контейнера (как ячейки сетки)
    borderRadius: 8, // скругление углов контейнера
    borderWidth: 0, // убираем рамку
    backgroundColor: 'transparent', // прозрачный фон
    alignItems: 'center', // центрирование иконки по горизонтали
    justifyContent: 'center', // центрирование иконки по вертикали
  },
  habitTextContainer: {
    flex: 1, // занимает всё доступное пространство между иконкой и статусом
    marginHorizontal: 8, // отступы слева и справа от текстовых блоков
  },
  habitNameContainer: {
    marginBottom: 0, // уменьшаем отступ между названием и описанием
    paddingHorizontal: 12, // увеличиваем внутренние отступы текста
    paddingVertical: 0, // увеличиваем внутренние отступы текста
    borderRadius: 6, // скругление углов текстового блока
    borderWidth: 0, // убираем рамку
    backgroundColor: 'transparent', // прозрачный фон (сливается с карточкой)
  },
  habitDescriptionContainer: {
    paddingHorizontal: 12, // увеличиваем внутренние отступы текста
    paddingVertical: 6, // увеличиваем внутренние отступы текста
    borderRadius: 6, // скругление углов текстового блока
    borderWidth: 0, // убираем рамку
    backgroundColor: 'transparent', // прозрачный фон (сливается с карточкой)
  },
  habitStatusContainer: {
    marginLeft: 8, // отступ от центрального блока (как у сетки)
    width: 44, // фиксированная ширина квадратного контейнера (как ячейки сетки)
    height: 44, // фиксированная высота квадратного контейнера (как ячейки сетки)
    borderRadius: 8, // скругление углов контейнера (как у иконки)
    borderWidth: 0, // убираем рамку
    backgroundColor: 'transparent', // прозрачный фон
    alignItems: 'center', // центрирование иконки по горизонтали
    justifyContent: 'center', // центрирование иконки по вертикали
  },
  habitDetails: {
    marginBottom: 8,
  },
  habitName: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20, // увеличиваем размер шрифта
    color: '#fff', // White text for dark theme
    flex: 1,
  },
  habitDescription: {
    fontFamily: 'Inter_400Regular',
    fontSize: 18, // увеличиваем размер шрифта
    color: '#ccc', // Light grey text for dark theme
    marginBottom: 0,
  },
  habitMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  streakChip: {
    backgroundColor: '#2a2a2a', // Темный фон для чипов
  },
  groupChip: {
    backgroundColor: 'transparent',
  },
  habitStatus: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  habitStatusMobile: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Стили для детальной страницы привычки
  habitDetailContainer: {
    padding: 16,
  },
  habitDetailCard: {
    backgroundColor: '#2a2a2a',
    marginBottom: 16,
  },
  habitDetailName: {
    color: '#fff',
    marginBottom: 8,
  },
  habitDetailDescription: {
    color: '#ccc',
    marginBottom: 16,
  },
  habitDetailStats: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },

  // Стили для страницы настроек
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
    marginHorizontal: 16,
    marginTop: 8,
  },
  listItem: {
    backgroundColor: '#1a1a1a',
    marginHorizontal: 16,
    marginBottom: 1,
    borderRadius: 8,
  },
  listItemTitle: {
    color: '#ffffff',
    fontSize: 16,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 32,
    marginTop: 16,
  },
  versionText: {
    color: '#666666',
    fontSize: 14,
  },
});

export default function App() {
  return (
    <PaperProvider>
      <AppContent />
    </PaperProvider>
  );
}
