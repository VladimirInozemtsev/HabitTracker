import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Card, Chip, Appbar, IconButton } from 'react-native-paper';
import { HabitGrid } from '../components/HabitGrid';
import { HabitCalendar } from '../components/HabitCalendar';
import { getHabitColor, colors, baseStyles, detailStyles } from '../styles';
import { Habit } from '../services/api';
import { HABIT_CATEGORIES, SERIES_GOALS } from '../constants/goals';
import { calculateCurrentStreak } from '../utils/streak';

interface HabitDetailScreenProps {
  habit: Habit;
  onBack: () => void;
  onEditHabit: (habit: Habit) => void;
  onCalendarDayToggle: (date: string) => void;
}

export const HabitDetailScreen: React.FC<HabitDetailScreenProps> = ({
  habit,
  onBack,
  onEditHabit,
  onCalendarDayToggle
}) => {
  // Определяем иконку для первой кнопки (иконка деятельности)
  const categoryIcon = habit.icon || "target";
  
  // Определяем текст цели серии
  const seriesGoalText = habit.series_goal 
    ? SERIES_GOALS.find(goal => goal.value === habit.series_goal)?.label || 'Нет цели серии'
    : 'Нет цели серии';

  const currentStreak = calculateCurrentStreak(habit.logs || []);

  return (
    <View style={baseStyles.container}>
      <Appbar.Header style={{ backgroundColor: colors.background, elevation: 4 }}>
        <Appbar.BackAction 
          onPress={onBack} 
          iconColor="#ffffff"
        />
        <Appbar.Content title={habit.name} />
      </Appbar.Header>
      
      <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
        <View style={detailStyles.habitDetailContainer}>
          <Card style={detailStyles.habitDetailCard}>
            <Card.Content>
              <Text variant="titleLarge" style={detailStyles.habitDetailName}>
                {habit.name}
              </Text>
              <Text variant="bodyMedium" style={detailStyles.habitDetailDescription}>
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
              <View style={detailStyles.actionBar}>
                <IconButton
                  icon={categoryIcon}
                  iconColor="#ffffff"
                  size={24}
                  style={detailStyles.actionButton}
                />
                <TouchableOpacity style={detailStyles.seriesGoalButton}>
                  <Text style={detailStyles.seriesGoalText}>
                    {seriesGoalText}
                  </Text>
                </TouchableOpacity>
                <View style={detailStyles.streakCounter}>
                  <IconButton
                    icon="fire"
                    iconColor="#ffffff"
                    size={20}
                    style={detailStyles.streakIcon}
                  />
                  <Text style={detailStyles.streakText}>{currentStreak}</Text>
                </View>
                <IconButton
                  icon="pencil"
                  iconColor="#ffffff"
                  size={24}
                  style={detailStyles.actionButton}
                  onPress={() => onEditHabit(habit)}
                />
                <IconButton
                  icon="cog"
                  iconColor="#ffffff"
                  size={24}
                  style={detailStyles.actionButton}
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
