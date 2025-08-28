import { useState, useCallback } from 'react';
import { api } from '../services/api';
import { Group, CreateGroupData, UpdateGroupData } from '../types';

export const useGroups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [groupHabits, setGroupHabits] = useState<{[key: string]: any[]}>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Загрузка групп
  const loadGroups = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await api.getGroups();
      
      if (data && typeof data === 'object' && 'results' in data && Array.isArray((data as any).results)) {
        setGroups((data as any).results);
      } else if (Array.isArray(data)) {
        setGroups(data);
      } else {
        setGroups([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки групп');
      console.error('Error loading groups:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Добавление новой группы
  const addGroup = useCallback(async (groupData: CreateGroupData) => {
    try {
      setLoading(true);
      setError(null);
      
      const newGroup = await api.createGroup(groupData);
      setGroups(prev => [...prev, newGroup]);
      return newGroup;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка создания группы');
      console.error('Error creating group:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Обновление группы
  const updateGroup = useCallback(async (id: string, groupData: UpdateGroupData) => {
    try {
      setLoading(true);
      setError(null);
      
      const updatedGroup = await api.updateGroup(id, groupData);
      setGroups(prev => prev.map(group => 
        group.id === id ? updatedGroup : group
      ));
      return updatedGroup;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка обновления группы');
      console.error('Error updating group:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Удаление группы
  const deleteGroup = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      await api.deleteGroup(id);
      setGroups(prev => prev.filter(group => group.id !== id));
      
      // Удаляем привычки группы из кэша
      setGroupHabits(prev => {
        const newGroupHabits = { ...prev };
        delete newGroupHabits[id];
        return newGroupHabits;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка удаления группы');
      console.error('Error deleting group:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Загрузка привычек группы
  const loadGroupHabits = useCallback(async (groupId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const data: any = await api.getHabitsByGroup(groupId);
      
      if (data && Array.isArray(data)) {
        setGroupHabits(prev => ({
          ...prev,
          [groupId]: data
        }));
        return data;
      } else {
        setGroupHabits(prev => ({
          ...prev,
          [groupId]: []
        }));
        return [];
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки привычек группы');
      console.error('Error loading group habits:', err);
      setGroupHabits(prev => ({
        ...prev,
        [groupId]: []
      }));
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Получение привычек группы из кэша
  const getGroupHabits = useCallback((groupId: string) => {
    return groupHabits[groupId] || [];
  }, [groupHabits]);

  // Очистка кэша привычек группы
  const clearGroupHabits = useCallback((groupId: string) => {
    setGroupHabits(prev => {
      const newGroupHabits = { ...prev };
      delete newGroupHabits[groupId];
      return newGroupHabits;
    });
  }, []);

  return {
    groups,
    groupHabits,
    loading,
    error,
    loadGroups,
    addGroup,
    updateGroup,
    deleteGroup,
    loadGroupHabits,
    getGroupHabits,
    clearGroupHabits,
  };
};
