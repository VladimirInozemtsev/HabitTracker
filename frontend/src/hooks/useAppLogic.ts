import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { api } from '../services/api';
import { getCurrentDate } from '../utils/date';
import { useApp } from '../context';

export const useAppLogic = () => {
  // Используем контекст
  const { habits, auth } = useApp();

  // Состояние модальных окон
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Состояние для детальной страницы привычки
  const [selectedHabit, setSelectedHabit] = useState<any>(null);
  const [showHabitDetail, setShowHabitDetail] = useState(false);

  // Состояние для групп
  const [groups, setGroups] = useState<any[]>([]);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [groupHabits, setGroupHabits] = useState<{[key: string]: any[]}>({});

  // Состояние для статистики и аналитики
  const [userStats, setUserStats] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);

  // Автоматически обновляем selectedHabit при изменении habits
  useEffect(() => {
    if (selectedHabit && habits.habits.length > 0) {
      const updatedHabit = habits.habits.find(h => h.id === selectedHabit.id);
      if (updatedHabit) {
        setSelectedHabit(updatedHabit);
      }
    }
  }, [habits.habits]);

  // Функция для загрузки групп
  const loadGroups = async () => {
    try {
      const data = await api.getGroups();
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
      const habits = data.results || data;
      setGroupHabits(prev => ({
        ...prev,
        [groupId]: habits
      }));
    } catch (error) {
      console.error('Load group habits error:', error);
    }
  };

  // Обработчик переключения привычки
  const handleHabitToggle = async (habitId: string) => {
    try {
      const habit = habits.habits.find(h => h.id === habitId);
      if (!habit) {
        Alert.alert('Ошибка', 'Привычка не найдена');
        return;
      }

      const today = getCurrentDate();
      let response;
      
      if (habit.is_completed_today) {
        response = await api.unmarkHabitComplete(habitId, today);
      } else {
        response = await api.markHabitComplete(habitId, today);
      }
      
      await habits.loadHabits();
      
      setTimeout(async () => {
        await habits.loadHabits();
      }, 500);
      
      if (response.message) {
        Alert.alert('Информация', response.message);
      }
    } catch (error) {
      console.error('Toggle habit error:', error);
      Alert.alert('Ошибка', 'Не удалось изменить статус привычки');
    }
  };

  // Обработчик нажатия на привычку
  const handleHabitPress = (habit: any) => {
    setSelectedHabit(habit);
    setShowHabitDetail(true);
  };

  // Обработчик переключения дня в календаре
  const handleCalendarDayToggle = async (date: string) => {
    if (!selectedHabit) return;
    
    try {
      const isCompleted = selectedHabit.logs?.some((log: any) => 
        log.date === date && log.status === 'completed'
      );
      
      if (isCompleted) {
        await api.unmarkHabitCompleteForDate(selectedHabit.id, date);
      } else {
        await api.markHabitCompleteForDate(selectedHabit.id, date);
      }
      
      await habits.loadHabits();
    } catch (error) {
      console.error('Calendar day toggle error:', error);
      Alert.alert('Ошибка', 'Не удалось изменить статус привычки');
    }
  };

  // Обработчик добавления привычки
  const handleAddHabit = async (habitData: any) => {
    try {
      const data = {
        ...habitData,
        habit_type: 'boolean',
        frequency: 'daily'
      };
      
      await habits.addHabit(data);
      await loadGroups();
      Alert.alert('Успех', 'Привычка добавлена!');
    } catch (error) {
      console.error('Add habit error:', error);
      Alert.alert('Ошибка', 'Не удалось добавить привычку');
    }
  };

  // Обработчик редактирования привычки
  const handleEditHabit = (habit: any) => {
    setSelectedHabit(habit);
    setShowEditModal(true);
  };

  // Обработчик сохранения редактирования привычки
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

  // Обработчик открытия модального окна добавления
  const handleOpenAddModal = async () => {
    setShowAddModal(true);
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

  // Обработчик добавления группы
  const handleAddGroup = async (groupData: { name: string; description: string; color: string }) => {
    try {
      await api.createGroup(groupData);
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
      if (!groupHabits[groupId]) {
        loadGroupHabits(groupId);
      }
    }
    setExpandedGroups(newExpanded);
  };

  return {
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
  };
};
