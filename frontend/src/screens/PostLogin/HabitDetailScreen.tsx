import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Card, Chip, Appbar, IconButton } from 'react-native-paper';
import { HabitGrid } from '../../components/ui/HabitGrid';
import { HabitCalendar } from '../../components/ui/HabitCalendar';
import { createDetailStyles } from '../../theme/styles/detailStyles';
import { getHabitColor } from '../../theme/theme';
import { Habit } from '../../services/api';
import { HABIT_CATEGORIES, SERIES_GOALS } from '../../config/goals';
import { calculateCurrentStreak } from '../../utils/streak';
import { useApp } from '../../context/AppContext';

interface HabitDetailScreenProps {
  habit: Habit;
  onBack: () => void;
  onEditHabit: (habit: Habit) => void;
  onCalendarDayToggle: (date: string) => void;
  highlightCurrentDay?: boolean; // ← ДОБАВЛЕНО: пропс для подсветки текущего дня
  weekStartsOn?: string; // ← ДОБАВЛЕНО: день начала недели
}

export const HabitDetailScreen: React.FC<HabitDetailScreenProps> = ({
  habit,
  onBack,
  onEditHabit,
  onCalendarDayToggle,
  highlightCurrentDay = true, // ← ДОБАВЛЕНО: по умолчанию включено
  weekStartsOn = 'monday' // ← ДОБАВЛЕНО: по умолчанию понедельник
}) => {
  // Получаем тему из контекста
  const { theme } = useApp();
  
  // Создаем стили с текущей темой
  const detailStyles = createDetailStyles(theme);

  // Определяем иконку для первой кнопки (иконка деятельности)
  const categoryIcon = habit.icon || "target";
  
  // Определяем текст цели серии
  const seriesGoalText = habit.series_goal 
    ? SERIES_GOALS.find(goal => goal.value === habit.series_goal)?.label || 'Нет цели серии'
    : 'Нет цели серии';

  const currentStreak = calculateCurrentStreak(habit.logs || []);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Appbar.Header style={{ backgroundColor: theme.colors.background, elevation: 4 }}>
        <Appbar.BackAction 
          onPress={onBack} 
          iconColor={theme.colors.text.primary}
        />
        <Appbar.Content title={habit.name} titleStyle={{ color: theme.colors.text.primary }} />
      </Appbar.Header>
      
      <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
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
                highlightCurrentDay={highlightCurrentDay} // ← ДОБАВЛЕНО: передаем настройку
                weekStartsOn={weekStartsOn} // ← ДОБАВЛЕНО: передаем настройку дня недели
              />
              
              {/* Панель действий */}
              <View style={detailStyles.actionBar}>
                <IconButton
                  icon={categoryIcon}
                  iconColor={theme.colors.text.primary}
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
                    iconColor={theme.colors.text.primary}
                    size={20}
                    style={detailStyles.streakIcon}
                  />
                  <Text style={detailStyles.streakText}>{currentStreak}</Text>
                </View>
                <IconButton
                  icon="pencil"
                  iconColor={theme.colors.text.primary}
                  size={24}
                  style={detailStyles.actionButton}
                  onPress={() => onEditHabit(habit)}
                />
                <IconButton
                  icon="cog"
                  iconColor={theme.colors.text.primary}
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
                highlightCurrentDay={highlightCurrentDay} // ← ДОБАВЛЕНО: передаем настройку
                weekStartsOn={weekStartsOn} // ← ДОБАВЛЕНО: передаем настройку дня недели
              />
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};
