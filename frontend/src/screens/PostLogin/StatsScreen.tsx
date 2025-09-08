import React, { useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SettingsItemCard } from '../../components/ui/SettingsItemCard';
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
  const { theme, habits: habitsState } = useApp();
  const styles = createScreenStyles(theme);

  // Считаем топ-привычки по проценту выполнения (все логи)
  const topHabits = useMemo(() => {
    const habits = habitsState?.habits || [];
    const scored = habits.map((h: any) => {
      const logs = Array.isArray(h.logs) ? h.logs : [];
      const total = logs.length || 0;
      const completed = logs.filter((l: any) => l && l.status === 'completed').length;
      const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
      return { id: h.id, name: h.name, completion_rate: rate, color: h.color };
    });
    return scored
      .sort((a: any, b: any) => b.completion_rate - a.completion_rate)
      .slice(0, 10);
  }, [habitsState?.habits]);

  return (
    <ScrollView 
      style={[styles.screenContainer, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.screenContentContainer}
    >
      <Text style={styles.screenTitle}>Статистика</Text>
      {userStats ? (
        <>
          <View style={styles.statsContainer}>
            {/* Первая строка - 3 карточки */}
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{userStats.total_habits_created || 0}</Text>
              <Text style={styles.statLabel}>Всего привычек</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{userStats.total_habits_completed || 0}</Text>
              <Text style={styles.statLabel}>Всего выполнено</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{userStats.completion_rate || 0}%</Text>
              <Text style={styles.statLabel}>Процент выполнения</Text>
            </View>

            {/* Вторая строка - 3 карточки */}
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{userStats.current_streak || 0}</Text>
              <Text style={styles.statLabel}>Текущий стрик</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{userStats.longest_streak || 0}</Text>
              <Text style={styles.statLabel}>Лучший стрик</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{userStats.days_with_app || 0}</Text>
              <Text style={styles.statLabel}>Дней с приложением</Text>
            </View>

            {/* Третья строка - 3 карточки */}
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{userStats.monthly_completion_rate || 0}%</Text>
              <Text style={styles.statLabel}>Процент за месяц</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{userStats.weekly_completion_rate || 0}%</Text>
              <Text style={styles.statLabel}>Процент за неделю</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{userStats.perfect_days || 0}</Text>
              <Text style={styles.statLabel}>Идеальных дней</Text>
            </View>
          </View>

          {/* Секция: Самые успешные привычки */}
          <View style={styles.successfulHabitsSection}>
            <Text style={styles.sectionTitle}>Самые успешные привычки</Text>
            {(
              (userStats.top_habits && userStats.top_habits.length > 0
                ? userStats.top_habits
                : topHabits)
            ).length > 0 ? (
              (userStats.top_habits && userStats.top_habits.length > 0
                ? userStats.top_habits
                : topHabits
              ).map((habit: any, index: number) => (
                <SettingsItemCard
                  key={habit.id || index}
                  title={habit.name}
                  style={{ marginHorizontal: 0 }}
                  leftColor={habit.color}
                  rightContent={<Text style={styles.habitPercentage}>{habit.completion_rate}%</Text>}
                />
              ))
            ) : (
              <Text style={styles.noDataText}>Нет данных о привычках</Text>
            )}
          </View>
        </>
      ) : (
        <TouchableOpacity style={styles.loadButton} onPress={loadUserStats}>
          <Text style={styles.loadButtonText}>Загрузить статистику</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};
