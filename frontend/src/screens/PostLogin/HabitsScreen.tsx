import React from 'react';
import { View, ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Habit } from '../../services/api';
import { HabitCard } from '../../components/ui/HabitCard';
import { theme } from '../../theme/theme';

interface HabitsScreenProps {
  habits: Habit[];
  isTablet: boolean;
  onHabitPress: (habit: Habit) => void;
  onHabitToggle: (habitId: string) => void;
  onSettingsPress: () => void;
  onOpenAddModal: () => void;
  highlightCurrentDay?: boolean; // ← ДОБАВЛЕНО: пропс для подсветки текущего дня
  weekStartsOn?: string; // ← ДОБАВЛЕНО: день начала недели
}

export const HabitsScreen: React.FC<HabitsScreenProps> = ({
  habits,
  isTablet,
  onHabitPress,
  onHabitToggle,
  onSettingsPress,
  onOpenAddModal,
  highlightCurrentDay = true, // ← ДОБАВЛЕНО: по умолчанию включено
  weekStartsOn = 'monday' // ← ДОБАВЛЕНО: по умолчанию понедельник
}) => {
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Appbar.Header style={{ backgroundColor: theme.colors.background, elevation: 4 }}>
        <Appbar.Action 
          icon="cog" 
          onPress={onSettingsPress}
          iconColor="#fff"
        />
        <Appbar.Content 
          title="HabitTracker" 
          subtitle=""
          titleStyle={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}
          subtitleStyle={{ color: '#fff', fontSize: 14, opacity: 0.9 }}
        />
        <Appbar.Action 
          icon="chart-bar" 
          onPress={() => {}}
          iconColor="#fff"
        />
        <Appbar.Action 
          icon="plus" 
          onPress={onOpenAddModal}
          iconColor="#fff"
        />
      </Appbar.Header>
      
      <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <View style={{ padding: 0 }}>
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              isTablet={isTablet}
              onPress={() => onHabitPress(habit)}
              onToggleStatus={() => onHabitToggle(habit.id)}
              highlightCurrentDay={highlightCurrentDay} // ← ДОБАВЛЕНО: передаем настройку
              weekStartsOn={weekStartsOn} // ← ДОБАВЛЕНО: передаем настройку дня недели
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
