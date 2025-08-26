import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Card, Chip, Appbar, IconButton } from 'react-native-paper';
import { HabitGrid } from './HabitGrid';
import { HabitCalendar } from './HabitCalendar';
import { getHabitColor } from '../constants/colors';
import { Habit } from '../services/api';
import { HABIT_CATEGORIES, SERIES_GOALS } from '../constants/goals';

interface HabitDetailScreenProps {
  habit: Habit;
  onBack: () => void;
  onEditHabit: (habit: Habit) => void;
  onCalendarDayToggle: (date: string) => void;
  styles: any;
}

export const HabitDetailScreen: React.FC<HabitDetailScreenProps> = ({
  habit,
  onBack,
  onEditHabit,
  onCalendarDayToggle,
  styles
}) => {
  // Определяем иконку для первой кнопки (иконка деятельности)
  const categoryIcon = habit.icon || "target";
  
  // Определяем текст цели серии
  const seriesGoalText = habit.series_goal 
    ? SERIES_GOALS.find(goal => goal.value === habit.series_goal)?.label || 'Нет цели серии'
    : 'Нет цели серии';

  // Функция для подсчета текущего стрика (последнего комбо)
  const calculateCurrentStreak = () => {
    console.log('=== Streak Debug ===');
    console.log('habit.logs:', habit.logs);
    
    if (!habit.logs || habit.logs.length === 0) {
      console.log('No logs found, returning 0');
      return 0;
    }
    
    // Получаем выполненные даты
    const completedDates = habit.logs
      .filter(log => log.status === 'completed')
      .map(log => log.date)
      .sort((a, b) => b.localeCompare(a)); // Сортируем по убыванию (новые сначала)
    
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
    
    // Идем назад от последнего выполненного дня
    while (true) {
      const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
      
      console.log('Checking date:', dateString, 'completedDates.includes:', completedDates.includes(dateString));
      
      if (completedDates.includes(dateString)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
        console.log('Date completed, streak now:', streak);
      } else {
        console.log('Date not completed, breaking streak at:', streak);
        break; // Прерываем стрик
      }
    }
    
    console.log('Final streak:', streak);
    console.log('=== End Streak Debug ===');
    return streak;
  };

  const currentStreak = calculateCurrentStreak();

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction 
          onPress={onBack} 
          iconColor="#ffffff"
        />
        <Appbar.Content title={habit.name} />
      </Appbar.Header>
      
      <ScrollView style={styles.content}>
        <View style={styles.habitDetailContainer}>
          <Card style={styles.habitDetailCard}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.habitDetailName}>
                {habit.name}
              </Text>
              <Text variant="bodyMedium" style={styles.habitDetailDescription}>
                {habit.description}
              </Text>
              
              
              
              {/* Сетка активности (7×25) */}
              <HabitGrid
                habitId={habit.id}
                color={habit.color || getHabitColor(habit.id)}
                completions={habit.logs || []}
                weeks={25} // показываем 25 недель для детального просмотра
                showLegend={false}
              />
              
              {/* Панель действий */}
              <View style={styles.actionBar}>
                <IconButton
                  icon={categoryIcon}
                  iconColor="#ffffff"
                  size={20}
                  style={styles.actionButton}
                />
                <TouchableOpacity style={styles.seriesGoalButton}>
                  <Text style={styles.seriesGoalText}>{seriesGoalText}</Text>
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
                  onPress={() => onEditHabit(habit)}
                />
                <IconButton
                  icon="cog"
                  iconColor="#ffffff"
                  size={24}
                  style={styles.actionButton}
                />
              </View>
              
              {/* Интерактивный календарь */}
              <HabitCalendar
                habitId={habit.id}
                color={habit.color || getHabitColor(habit.id)}
                completions={habit.logs || []}
                onToggleDay={onCalendarDayToggle}
              />
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};
