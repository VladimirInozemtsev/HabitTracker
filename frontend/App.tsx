import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Modal, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { api, Habit, isAuthenticated } from './services/api';

// Типы для навигации
type Screen = 'habits' | 'stats' | 'analytics' | 'profile' | 'groups';

export default function App() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitDescription, setNewHabitDescription] = useState('');
  const [newHabitGroup, setNewHabitGroup] = useState<string | null>(null);
  const [showGroupDropdown, setShowGroupDropdown] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>('habits');
  const [userStats, setUserStats] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [groups, setGroups] = useState<any[]>([]);
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [newGroupColor, setNewGroupColor] = useState('#4CAF50');
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [groupHabits, setGroupHabits] = useState<{[key: string]: any[]}>({});

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
        setHabits(data);
      } else if (data && typeof data === 'object' && 'results' in data && Array.isArray((data as any).results)) {
        // Если данные в формате пагинации
        setHabits((data as any).results);
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

  const handleAddHabit = async () => {
    if (!newHabitName.trim()) {
      Alert.alert('Ошибка', 'Введите название привычки');
      return;
    }

    try {
      const habitData: any = {
        name: newHabitName.trim(),
        description: newHabitDescription.trim(),
        habit_type: 'boolean',
        frequency: 'daily'
      };
      
      // Добавляем группу, если выбрана
      if (newHabitGroup) {
        habitData.group = newHabitGroup;
      }
      
      await api.createHabit(habitData);
      
      // Очищаем форму
      setNewHabitName('');
      setNewHabitDescription('');
      setNewHabitGroup(null);
      setShowGroupDropdown(false);
      setShowAddModal(false);
      
      // Перезагружаем привычки и группы
      await loadHabits();
      await loadGroups();
      
      Alert.alert('Успех', 'Привычка добавлена!');
    } catch (error) {
      console.error('Add habit error:', error);
      Alert.alert('Ошибка', 'Не удалось добавить привычку');
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
    switch (currentScreen) {
      case 'habits':
        return (
          <ScrollView>
            <View style={styles.header}>
              <View style={styles.headerContent}>
                <View>
                  <Text style={styles.title}>🎯 Habit Tracker</Text>
                  <Text style={styles.subtitle}>Твой путь к лучшей версии себя</Text>
                </View>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={handleOpenAddModal}
                >
                  <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.habitsList}>
              {habits.map((habit) => (
                <TouchableOpacity
                  key={habit.id}
                  style={styles.habitCard}
                  onPress={() => handleHabitToggle(habit.id)}
                >
                  <View style={styles.habitInfo}>
                    <Text style={styles.habitName}>{habit.name}</Text>
                    <Text style={styles.habitDescription}>{habit.description}</Text>
                    <Text style={styles.habitStreak}>🔥 {habit.streak} дней подряд</Text>
                    {habit.group && (
                      <Text style={[styles.habitGroup, { color: habit.group.color }]}>
                        📁 {habit.group.name}
                      </Text>
                    )}
                  </View>
                  <View style={[
                    styles.habitStatus,
                    { backgroundColor: habit.is_completed_today ? '#4CAF50' : '#E0E0E0' }
                  ]}>
                    <Text style={styles.statusText}>
                      {habit.is_completed_today ? '✅' : '⭕'}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        );
      
      case 'stats':
        return (
          <ScrollView 
            style={styles.screenContainer}
            contentContainerStyle={styles.screenContentContainer}
          >
            <Text style={styles.screenTitle}>📊 Статистика</Text>
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
            <View style={styles.groupsHeader}>
              <Text style={styles.screenTitle}>📁 Группы привычек</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setShowAddGroupModal(true)}
              >
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>
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

  if (loading) {
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

      {/* Нижняя навигация */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity
          style={[styles.navItem, currentScreen === 'habits' && styles.navItemActive]}
          onPress={() => setCurrentScreen('habits')}
        >
          <Text style={[styles.navIcon, currentScreen === 'habits' && styles.navIconActive]}>🎯</Text>
          <Text style={[styles.navText, currentScreen === 'habits' && styles.navTextActive]}>Привычки</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.navItem, currentScreen === 'stats' && styles.navItemActive]}
          onPress={() => setCurrentScreen('stats')}
        >
          <Text style={[styles.navIcon, currentScreen === 'stats' && styles.navIconActive]}>📊</Text>
          <Text style={[styles.navText, currentScreen === 'stats' && styles.navTextActive]}>Статистика</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.navItem, currentScreen === 'analytics' && styles.navItemActive]}
          onPress={() => setCurrentScreen('analytics')}
        >
          <Text style={[styles.navIcon, currentScreen === 'analytics' && styles.navIconActive]}>📈</Text>
          <Text style={[styles.navText, currentScreen === 'analytics' && styles.navTextActive]}>Аналитика</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.navItem, currentScreen === 'groups' && styles.navItemActive]}
          onPress={() => setCurrentScreen('groups')}
        >
          <Text style={[styles.navIcon, currentScreen === 'groups' && styles.navIconActive]}>📁</Text>
          <Text style={[styles.navText, currentScreen === 'groups' && styles.navTextActive]}>Группы</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.navItem, currentScreen === 'profile' && styles.navItemActive]}
          onPress={() => setCurrentScreen('profile')}
        >
          <Text style={[styles.navIcon, currentScreen === 'profile' && styles.navIconActive]}>👤</Text>
          <Text style={[styles.navText, currentScreen === 'profile' && styles.navTextActive]}>Профиль</Text>
        </TouchableOpacity>
      </View>

            {/* Модальное окно для добавления привычки */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Добавить новую привычку</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Название привычки"
              value={newHabitName}
              onChangeText={setNewHabitName}
              maxLength={100}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Описание (необязательно)"
              value={newHabitDescription}
              onChangeText={setNewHabitDescription}
              multiline
              numberOfLines={3}
              maxLength={500}
            />
            
            <View style={styles.groupPicker}>
              <Text style={styles.groupLabel}>Группа (необязательно):</Text>
              <View style={styles.groupDropdown}>
                <TouchableOpacity
                  style={styles.groupDropdownButton}
                  onPress={() => setShowGroupDropdown(!showGroupDropdown)}
                >
                  <Text style={styles.groupDropdownButtonText}>
                    {newHabitGroup ? 
                      groups.find(g => g.id === newHabitGroup)?.name || 'Выберите группу' : 
                      'Без группы'
                    }
                  </Text>
                  <Text style={styles.groupDropdownArrow}>
                    {showGroupDropdown ? '▲' : '▼'}
                  </Text>
                </TouchableOpacity>
                
                {showGroupDropdown && (
                  <View style={styles.groupDropdownList}>
                  <TouchableOpacity
                    style={[
                      styles.groupDropdownItem,
                      !newHabitGroup && styles.groupDropdownItemSelected
                    ]}
                    onPress={() => {
                      setNewHabitGroup(null);
                      setShowGroupDropdown(false);
                    }}
                  >
                    <Text style={[
                      styles.groupDropdownItemText,
                      !newHabitGroup && styles.groupDropdownItemTextSelected
                    ]}>
                      Без группы
                    </Text>
                  </TouchableOpacity>
                  {groups.map((group) => (
                    <TouchableOpacity
                      key={group.id}
                      style={[
                        styles.groupDropdownItem,
                        newHabitGroup === group.id && styles.groupDropdownItemSelected
                      ]}
                      onPress={() => {
                        setNewHabitGroup(group.id);
                        setShowGroupDropdown(false);
                      }}
                    >
                      <View style={[styles.groupColorDot, { backgroundColor: group.color }]} />
                      <Text style={[
                        styles.groupDropdownItemText,
                        newHabitGroup === group.id && styles.groupDropdownItemTextSelected
                      ]}>
                        {group.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                  </View>
                )}
              </View>
            </View>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowAddModal(false);
                  setNewHabitName('');
                  setNewHabitDescription('');
                  setNewHabitGroup(null);
                  setShowGroupDropdown(false);
                }}
              >
                <Text style={styles.cancelButtonText}>Отмена</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleAddHabit}
              >
                <Text style={styles.saveButtonText}>Добавить</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  addButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  habitsList: {
    padding: 20,
  },
  habitCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  habitInfo: {
    flex: 1,
  },
  habitName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  habitDescription: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  habitStreak: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  habitGroup: {
    fontSize: 12,
    fontWeight: '500',
  },
  habitStatus: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  statusText: {
    fontSize: 20,
  },
  // Стили для модального окна
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
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
  },
  screenContentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  screenText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  
  // Стили для нижней навигации
  bottomNavigation: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navItemActive: {
    backgroundColor: '#F0F8FF',
    borderRadius: 8,
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  navIconActive: {
    color: '#4CAF50',
  },
  navText: {
    fontSize: 12,
    color: '#666',
  },
  navTextActive: {
    color: '#4CAF50',
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
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  loadButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
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
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    color: '#333',
    marginBottom: 4,
  },
  groupDescription: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  groupCount: {
    fontSize: 12,
    color: '#666',
  },
  
  // Стили для профиля
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  profileText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
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
    color: '#333',
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
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f9f9f9',
  },
  groupDropdownButtonText: {
    fontSize: 16,
    color: '#333',
  },
  groupDropdownArrow: {
    fontSize: 12,
    color: '#666',
  },
  groupDropdownList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: 2,
    maxHeight: 200,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  groupDropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  groupDropdownItemSelected: {
    backgroundColor: '#4CAF50',
  },
  groupDropdownItemText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
  groupDropdownItemTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
});
