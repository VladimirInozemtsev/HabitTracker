import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { createScreenStyles } from '../../theme/styles/screenStyles';
import { useApp } from '../../context/AppContext';

interface StatsScreenProps {
  userStats: any;
  loadUserStats: () => void;
}

export const StatsScreen: React.FC<StatsScreenProps> = ({ 
  userStats, 
  loadUserStats 
}) => {
  // Получаем тему из контекста
  const { theme } = useApp();
  const styles = createScreenStyles(theme);

  return (
    <ScrollView 
      style={[styles.screenContainer, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.screenContentContainer}
    >
              <Text style={[styles.screenTitle, { color: theme.colors.text.primary }]}>Статистика</Text>
      {userStats ? (
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: theme.colors.surface }]}>
            <Text style={[styles.statNumber, { color: theme.colors.text.primary }]}>{userStats.total_habits_created || 0}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.text.secondary }]}>Всего привычек</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.colors.surface }]}>
            <Text style={[styles.statNumber, { color: theme.colors.text.primary }]}>{userStats.total_habits_completed || 0}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.text.secondary }]}>Всего выполнено</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.colors.surface }]}>
            <Text style={[styles.statNumber, { color: theme.colors.text.primary }]}>{userStats.current_streak || 0}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.text.secondary }]}>Текущий стрик</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.colors.surface }]}>
            <Text style={[styles.statNumber, { color: theme.colors.text.primary }]}>{userStats.longest_streak || 0}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.text.secondary }]}>Лучший стрик</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.colors.surface }]}>
            <Text style={[styles.statNumber, { color: theme.colors.text.primary }]}>{userStats.completion_rate || 0}%</Text>
            <Text style={[styles.statLabel, { color: theme.colors.text.secondary }]}>Процент выполнения</Text>
          </View>
        </View>
      ) : (
        <TouchableOpacity style={[styles.loadButton, { backgroundColor: theme.colors.primary }]} onPress={loadUserStats}>
          <Text style={[styles.loadButtonText, { color: theme.colors.background }]}>Загрузить статистику</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};
