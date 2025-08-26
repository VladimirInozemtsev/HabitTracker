import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Card, Avatar, Appbar, IconButton } from 'react-native-paper';
import { HabitGrid } from './HabitGrid';
import { getHabitColor } from '../constants/colors';
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
              style={styles.habitCard}
              onPress={() => onHabitPress(habit)}
            >
              <Card.Content style={styles.habitCardContent}>
                <View style={styles.habitInfo}>
                  {/* Компактная карточка: название + описание + статус */}
                  <View style={styles.habitHeader}>
                    <View style={styles.habitText}>
                      <Text variant="bodyMedium" style={styles.habitName}>
                        {habit.name}
                      </Text>
                      <Text variant="bodySmall" style={styles.habitDescription}>
                        {habit.description}
                      </Text>
                    </View>
                    <View style={styles.habitStatus}>
                      <Avatar.Icon 
                        size={20} 
                        icon={habit.is_completed_today ? "check" : "circle-outline"}
                        style={{
                          backgroundColor: habit.is_completed_today ? '#4CAF50' : '#E0E0E0'
                        }}
                        color="#fff"
                      />
                    </View>
                  </View>
                  
                  {/* Сетка истории привычки */}
                  <HabitGrid
                    habitId={habit.id}
                    color={habit.color || getHabitColor(habit.id)}
                    completions={habit.logs || []}
                    weeks={25} // показываем 25 недель, как на детальном экране
                    showLegend={false} // Убираем легенду с главного экрана
                  />
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
