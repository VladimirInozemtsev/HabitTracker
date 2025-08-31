import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { Habit } from '../../services/api';
import { SERIES_GOALS } from '../../config/goals';
import { useApp } from '../../context/AppContext';
import { calculateCurrentStreak } from '../../utils/streak';

interface DetailActionBarProps {
  habit: Habit;
  onEdit: (habit: Habit) => void;
}

export const DetailActionBar: React.FC<DetailActionBarProps> = ({ habit, onEdit }) => {
  const { theme } = useApp();
  const currentStreak = calculateCurrentStreak(habit.logs || []);
  const seriesGoalText = habit.series_goal
    ? SERIES_GOALS.find(g => g.value === habit.series_goal)?.label || 'Нет цели серии'
    : 'Нет цели серии';

  const styles = createStyles(theme);

  return (
    <View style={styles.actionBar}> 
      <IconButton
        icon={habit.icon || 'target'}
        iconColor={theme.colors.text.primary}
        size={24}
        style={styles.actionButton}
      />
      <TouchableOpacity style={styles.seriesGoalButton}>
        <Text style={styles.seriesGoalText}>{seriesGoalText}</Text>
      </TouchableOpacity>
      <View style={styles.streakCounter}>
        <IconButton
          icon="fire"
          iconColor={theme.colors.text.primary}
          size={20}
          style={styles.streakIcon}
        />
        <Text style={styles.streakText}>{currentStreak}</Text>
      </View>
      <IconButton
        icon="pencil"
        iconColor={theme.colors.text.primary}
        size={24}
        style={styles.actionButton}
        onPress={() => onEdit(habit)}
      />
      <IconButton
        icon="cog"
        iconColor={theme.colors.text.primary}
        size={24}
        style={styles.actionButton}
      />
    </View>
  );
};

const createStyles = (theme: any) => StyleSheet.create({
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
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seriesGoalButton: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seriesGoalText: {
    fontSize: 14,
    color: theme.colors.text.primary,
    fontWeight: '500',
  },
  streakCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
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
    color: theme.colors.text.primary,
    fontWeight: 'bold',
  },
});


