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
  const [currentScreen, setCurrentScreen] = useState<Screen>('habits');

  // Проверка аутентификации при загрузке
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    if (isAuthenticated()) {
      setIsLoggedIn(true);
      await loadHabits();
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
      await api.createHabit({
        name: newHabitName.trim(),
        description: newHabitDescription.trim(),
        habit_type: 'boolean',
        frequency: 'daily'
      });
      
      // Очищаем форму
      setNewHabitName('');
      setNewHabitDescription('');
      setShowAddModal(false);
      
      // Перезагружаем привычки
      await loadHabits();
      
      Alert.alert('Успех', 'Привычка добавлена!');
    } catch (error) {
      console.error('Add habit error:', error);
      Alert.alert('Ошибка', 'Не удалось добавить привычку');
    }
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
                  onPress={() => setShowAddModal(true)}
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
          <View style={styles.screenContainer}>
            <Text style={styles.screenTitle}>📊 Статистика</Text>
            <Text style={styles.screenText}>Здесь будет статистика пользователя</Text>
          </View>
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
          <View style={styles.screenContainer}>
            <Text style={styles.screenTitle}>👤 Профиль</Text>
            <Text style={styles.screenText}>Настройки пользователя</Text>
          </View>
        );
      
      case 'groups':
        return (
          <View style={styles.screenContainer}>
            <Text style={styles.screenTitle}>📁 Группы</Text>
            <Text style={styles.screenText}>Управление группами привычек</Text>
          </View>
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
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowAddModal(false);
                  setNewHabitName('');
                  setNewHabitDescription('');
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
});
