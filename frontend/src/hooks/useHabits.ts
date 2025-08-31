import { useState, useCallback } from 'react';
import { api, Habit } from '../services/api';
import { getCurrentDate } from '../utils/date';

export const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Загрузка привычек
  const loadHabits = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getHabits();
      
      console.log('useHabits: API response:', data);
      
      let habitsData;
      if (data && typeof data === 'object' && 'results' in data && Array.isArray((data as any).results)) {
        habitsData = (data as any).results;
      } else if (Array.isArray(data)) {
        habitsData = data;
      } else {
        habitsData = [];
      }
      
      // Исправляем статус is_completed_today на основе данных из logs
      const correctedHabitsData = habitsData.map((habit: any) => {
        const today = getCurrentDate();
        const isCompletedToday = habit.logs?.some((log: any) => 
          log.date === today && log.status === 'completed'
        ) || false;
        
        // Если статус из API не совпадает с реальными данными, исправляем
        if (habit.is_completed_today !== isCompletedToday) {
          return {
            ...habit,
            is_completed_today: isCompletedToday
          };
        }
        
        return habit;
      });
      
      setHabits(correctedHabitsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки привычек');
      console.error('Error loading habits:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Добавление новой привычки
  const addHabit = useCallback(async (habitData: any) => {
    try {
      setLoading(true);
      setError(null);
      const newHabit = await api.createHabit(habitData);
      setHabits(prev => [...prev, newHabit]);
      return newHabit;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка создания привычки');
      console.error('Error creating habit:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Обновление привычки
  const updateHabit = useCallback(async (id: string, habitData: any) => {
    try {
      setLoading(true);
      setError(null);
      const updatedHabit = await api.updateHabit(id, habitData);
      setHabits(prev => prev.map(habit => 
        habit.id === id ? updatedHabit : habit
      ));
      return updatedHabit;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка обновления привычки');
      console.error('Error updating habit:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Архивирование привычки
  const archiveHabit = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.archiveHabit(id);
      
      // Удаляем привычку из списка активных
      setHabits(prev => prev.filter(habit => habit.id !== id));
      
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка архивирования привычки');
      console.error('Error archiving habit:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Восстановление привычки из архива
  const unarchiveHabit = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.unarchiveHabit(id);
      
      // Перезагружаем список привычек, чтобы включить восстановленную
      await loadHabits();
      
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка восстановления привычки');
      console.error('Error unarchiving habit:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadHabits]);

  // Загрузка архивных привычек
  const loadArchivedHabits = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getArchivedHabits();
      return data.habits || [];
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки архивных привычек');
      console.error('Error loading archived habits:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Удаление привычки навсегда
  const deleteHabit = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.deleteHabit(id);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка удаления привычки');
      console.error('Error deleting habit:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    habits,
    loading,
    error,
    loadHabits,
    addHabit,
    updateHabit,
    archiveHabit,
    unarchiveHabit,
    loadArchivedHabits,
    deleteHabit,
  };
};
