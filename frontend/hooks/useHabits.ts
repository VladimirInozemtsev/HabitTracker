import { useState, useCallback } from 'react';
import { api } from '../services/api';
import { Habit, CreateHabitData, UpdateHabitData } from '../types';

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
      
      if (data && typeof data === 'object' && 'results' in data && Array.isArray((data as any).results)) {
        setHabits([...(data as any).results]);
      } else if (Array.isArray(data)) {
        setHabits(data);
      } else {
        setHabits([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки привычек');
      console.error('Error loading habits:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Добавление новой привычки
  const addHabit = useCallback(async (habitData: CreateHabitData) => {
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
  const updateHabit = useCallback(async (id: string, habitData: UpdateHabitData) => {
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

  // Удаление привычки
  const deleteHabit = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await api.deleteHabit(id);
      setHabits(prev => prev.filter(habit => habit.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка удаления привычки');
      console.error('Error deleting habit:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Переключение статуса привычки
  const toggleHabitStatus = useCallback(async (id: string) => {
    try {
      setError(null);
      const habit = habits.find(h => h.id === id);
      if (!habit) return;

      const updatedHabit = await api.toggleHabitCompletion(id);
      setHabits(prev => prev.map(h => 
        h.id === id ? updatedHabit : h
      ));
      return updatedHabit;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка переключения статуса');
      console.error('Error toggling habit status:', err);
      throw err;
    }
  }, [habits]);

  return {
    habits,
    loading,
    error,
    loadHabits,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleHabitStatus,
  };
};
