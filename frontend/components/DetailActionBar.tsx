import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { Habit } from '../services/api';
import { SERIES_GOALS } from '../constants/goals';
import { colors } from '../constants/appStyles';
import { calculateCurrentStreak } from '../utils/streak';

interface DetailActionBarProps {
  habit: Habit;
  onEdit: (habit: Habit) => void;
}

export const DetailActionBar: React.FC<DetailActionBarProps> = ({ habit, onEdit }) => {
  const currentStreak = calculateCurrentStreak(habit.logs || []);
  const seriesGoalText = habit.series_goal
    ? SERIES_GOALS.find(g => g.value === habit.series_goal)?.label || 'Нет цели серии'
    : 'Нет цели серии';

  return (
    <View style={styles.actionBar}> 
      <IconButton
        icon={habit.icon || 'target'}
        iconColor={colors.text.primary}
        size={24}
        style={styles.actionButton}
      />
      <TouchableOpacity style={styles.seriesGoalButton}>
        <Text style={styles.seriesGoalText}>{seriesGoalText}</Text>
      </TouchableOpacity>
      <View style={styles.streakCounter}>
        <IconButton
          icon="fire"
          iconColor={colors.text.primary}
          size={20}
          style={styles.streakIcon}
        />
        <Text style={styles.streakText}>{currentStreak}</Text>
      </View>
      <IconButton
        icon="pencil"
        iconColor={colors.text.primary}
        size={24}
        style={styles.actionButton}
        onPress={() => onEdit(habit)}
      />
      <IconButton
        icon="cog"
        iconColor={colors.text.primary}
        size={24}
        style={styles.actionButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  actionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    paddingVertical: 8,
    marginVertical: 16,
  },
  actionButton: {
    margin: 0,
    padding: 8,
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffffff',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seriesGoalButton: {
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffffff',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seriesGoalText: {
    fontSize: 14,
    color: colors.text.primary,
    fontWeight: '500',
  },
  streakCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffffff',
    height: 40,
    justifyContent: 'center',
  },
  streakIcon: {
    margin: 0,
    padding: 0,
    marginRight: 6,
  },
  streakText: {
    fontSize: 16,
    color: colors.text.primary,
    fontWeight: 'bold',
  },
});


