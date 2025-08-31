import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Alert } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useApp } from '../../context/AppContext';
import { ArchiveHabitCard } from '../../components/ui/ArchiveHabitCard';
import { Habit } from '../../types/habit';

interface ArchiveScreenProps {
  onBack?: () => void;
}

export const ArchiveScreen: React.FC<ArchiveScreenProps> = ({ onBack }) => {
  const { theme, loadArchivedHabits, unarchiveHabit, deleteHabit } = useApp();
  const [archivedHabits, setArchivedHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(false);

  // Загружаем архивные привычки при монтировании компонента
  useEffect(() => {
    loadArchivedHabitsData();
  }, []);

  const loadArchivedHabitsData = async () => {
    try {
      setLoading(true);
      const habits = await loadArchivedHabits();
      setArchivedHabits(habits);
    } catch (error) {
      console.error('Error loading archived habits:', error);
      Alert.alert('Ошибка', 'Не удалось загрузить архивные привычки');
    } finally {
      setLoading(false);
    }
  };

  const handleUnarchive = async (habit: Habit) => {
    try {
      await unarchiveHabit(habit.id);
      // Удаляем привычку из списка архивных
      setArchivedHabits(prev => prev.filter(h => h.id !== habit.id));
      Alert.alert('Успех', 'Привычка восстановлена из архива');
    } catch (error) {
      console.error('Error unarchiving habit:', error);
      Alert.alert('Ошибка', 'Не удалось восстановить привычку');
    }
  };

  const handleDelete = async (habit: Habit) => {
    try {
      await deleteHabit(habit.id);
      // Удаляем привычку из списка архивных
      setArchivedHabits(prev => prev.filter(h => h.id !== habit.id));
      Alert.alert('Успех', 'Привычка удалена навсегда');
    } catch (error) {
      console.error('Error deleting habit:', error);
      Alert.alert('Ошибка', 'Не удалось удалить привычку');
    }
  };

    return (
    <View style={{
      flex: 1,
      backgroundColor: theme.colors.background,
    }}>
      {/* Header */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.divider,
      }}>
        <IconButton
          icon="arrow-left"
          iconColor={theme.colors.text.primary}
          size={24}
          onPress={onBack}
        />
        <Text style={{
          flex: 1,
          fontSize: 20,
          fontWeight: '600',
          color: theme.colors.text.primary,
          marginLeft: 8,
        }}>
          Архив привычек
        </Text>
        <View style={{ width: 48 }} />
      </View>

      {/* Content */}
      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 40,
          }}>
            <Text style={{
              color: theme.colors.text.secondary,
              fontSize: 16,
            }}>
              Загрузка архивных привычек...
            </Text>
          </View>
        ) : archivedHabits.length === 0 ? (
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 40,
          }}>
            <Text style={{
              color: theme.colors.text.secondary,
              fontSize: 16,
              textAlign: 'center',
            }}>
              Архив пуст{'\n'}
              Здесь будут отображаться архивированные привычки
            </Text>
          </View>
        ) : (
          <View>
            {/* Информация о количестве */}
            <Text style={{
              color: theme.colors.text.secondary,
              fontSize: 14,
              marginBottom: 16,
            }}>
              {archivedHabits.length} привыч{archivedHabits.length === 1 ? 'ка' : archivedHabits.length < 5 ? 'ки' : 'ек'} в архиве
            </Text>

            {/* Список архивных привычек */}
            <View style={{ gap: 12 }}>
              {archivedHabits.map((habit) => (
                <ArchiveHabitCard
                  key={habit.id}
                  habit={habit}
                  onDelete={handleDelete}
                  onRestore={handleUnarchive}
                />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
