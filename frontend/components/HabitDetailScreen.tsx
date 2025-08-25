import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Card, Chip, Appbar, IconButton } from 'react-native-paper';
import { HabitGrid } from './HabitGrid';
import { HabitCalendar } from './HabitCalendar';
import { getHabitColor } from '../constants/colors';
import { Habit } from '../services/api';

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
              
              <View style={styles.habitDetailStats}>
                <Chip 
                  icon="fire" 
                  textStyle={{color: '#FF6B35'}}
                  style={styles.streakChip}
                >
                  {habit.streak} дней подряд
                </Chip>
                {habit.group ? (
                  <Chip 
                    icon="folder" 
                    textStyle={{color: habit.group.color}}
                    style={[styles.groupChip, {borderColor: habit.group.color}]}
                    mode="outlined"
                  >
                    {habit.group.name}
                  </Chip>
                ) : (
                  <Chip 
                    icon="folder-outline" 
                    textStyle={{color: '#999'}}
                    style={[styles.groupChip, {borderColor: '#999'}]}
                    mode="outlined"
                  >
                    Без группы
                  </Chip>
                )}
              </View>
              
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
                  icon={habit.icon || "target"}
                  iconColor="#ffffff"
                  size={24}
                  style={styles.actionButton}
                />
                <TouchableOpacity style={styles.seriesGoalButton}>
                  <Text style={styles.seriesGoalText}>Нет цели серии</Text>
                </TouchableOpacity>
                <View style={styles.streakCounter}>
                  <IconButton
                    icon="water"
                    iconColor="#ffffff"
                    size={20}
                    style={styles.streakIcon}
                  />
                  <Text style={styles.streakText}>0</Text>
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
