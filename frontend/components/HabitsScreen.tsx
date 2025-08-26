import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Appbar } from 'react-native-paper';
import { HabitGrid } from './HabitGrid';
import { Card, StatusBadge } from './common';
import { getHabitColor } from '../constants/colors';
import { COLORS, SPACING, COMMON_STYLES } from '../constants/theme';
import { Habit } from '../services/api';

interface HabitsScreenProps {
  habits: Habit[];
  onHabitPress: (habit: Habit) => void;
  onOpenAddModal: () => void;
  styles: any;
}

export const HabitsScreen: React.FC<HabitsScreenProps> = ({
  habits,
  onHabitPress,
  onOpenAddModal,
  styles
}) => {
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content 
          title="HabitTracker" 
          subtitle=""
          titleStyle={styles.appbarTitle}
          subtitleStyle={styles.appbarSubtitle}
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
      
      <ScrollView style={styles.content}>
        <View style={styles.habitsList}>
          {habits.map((habit) => (
            <Card
              key={habit.id}
              onPress={() => onHabitPress(habit)}
              style={styles.habitCard}
            >
              <View style={styles.habitInfo}>
                {/* Компактная карточка: название + описание + статус */}
                <View style={styles.habitHeader}>
                  <View style={styles.habitText}>
                    <Text style={styles.habitName}>
                      {habit.name}
                    </Text>
                    <Text style={styles.habitDescription}>
                      {habit.description}
                    </Text>
                  </View>
                  <View style={styles.habitStatus}>
                    <StatusBadge isCompleted={habit.is_completed_today} />
                  </View>
                </View>
                
                {/* Сетка истории привычки */}
                <HabitGrid
                  habitId={habit.id}
                  color={habit.color || getHabitColor(habit.id)}
                  completions={habit.logs || []}
                  weeks={20} // показываем 20 недель
                  showLegend={false} // Убираем легенду с главного экрана
                />
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
