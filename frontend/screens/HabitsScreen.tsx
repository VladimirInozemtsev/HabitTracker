import React from 'react';
import { View, ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Habit } from '../services/api';
import { HabitCard } from '../components/HabitCard';

interface HabitsScreenProps {
  habits: Habit[];
  isTablet: boolean;
  styles: any;
  onHabitPress: (habit: Habit) => void;
  onSettingsPress: () => void;
  onOpenAddModal: () => void;
}

export const HabitsScreen: React.FC<HabitsScreenProps> = ({
  habits,
  isTablet,
  styles,
  onHabitPress,
  onSettingsPress,
  onOpenAddModal
}) => {
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Action 
          icon="cog" 
          onPress={onSettingsPress}
          iconColor="#fff"
        />
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
            <HabitCard
              key={habit.id}
              habit={habit}
              isTablet={isTablet}
              styles={styles}
              onPress={() => onHabitPress(habit)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
