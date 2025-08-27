import React from 'react';
import { View, ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Habit } from '../services/api';
import { HabitCard } from '../components/HabitCard';
import { colors, baseStyles } from '../styles';

interface HabitsScreenProps {
  habits: Habit[];
  isTablet: boolean;
  onHabitPress: (habit: Habit) => void;
  onSettingsPress: () => void;
  onOpenAddModal: () => void;
}

export const HabitsScreen: React.FC<HabitsScreenProps> = ({
  habits,
  isTablet,
  onHabitPress,
  onSettingsPress,
  onOpenAddModal
}) => {
  return (
    <View style={baseStyles.container}>
      <Appbar.Header style={{ backgroundColor: colors.background, elevation: 4 }}>
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
      
      <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
        <View style={{ padding: 0 }}>
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              isTablet={isTablet}
              onPress={() => onHabitPress(habit)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
