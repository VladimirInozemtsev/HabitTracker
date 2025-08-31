import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { useApp } from '../../context/AppContext';
import { Habit } from '../../types/habit';
import { createCardStyles, getHabitIconStyle } from '../../theme/styles/cardStyles';
import { createArchiveStyles } from '../../theme/styles/archiveStyles';
import { getHabitColor } from '../../theme/theme';

interface ArchiveHabitCardProps {
  habit: Habit;
  onDelete: (habit: Habit) => void;
  onRestore: (habit: Habit) => void;
}

export const ArchiveHabitCard: React.FC<ArchiveHabitCardProps> = ({
  habit,
  onDelete,
  onRestore,
}) => {
  const { theme } = useApp();
  
  // Создаем стили с текущей темой
  const cardStyles = createCardStyles(theme);
  const archiveStyles = createArchiveStyles(theme);
  const baseColor = habit.color || getHabitColor(habit.id);

  return (
    <View style={archiveStyles.archiveCard}>
      {/* Иконка и название */}
      <View style={archiveStyles.cardHeader}>
        <View style={getHabitIconStyle(baseColor)}>
          <IconButton
            icon={habit.icon || 'target'}
            size={32}
            iconColor="#ffffff"
            style={{ margin: 0 }}
          />
        </View>
        
        <View style={archiveStyles.textContainer}>
          <Text style={archiveStyles.habitName}>
            {habit.name}
          </Text>
          {habit.description && (
            <Text style={archiveStyles.habitDescription}>
              {habit.description}
            </Text>
          )}
        </View>
      </View>

      {/* Кнопки действий */}
      <View style={archiveStyles.buttonsContainer}>
        <TouchableOpacity
          style={archiveStyles.deleteButton}
          onPress={() => onDelete(habit)}
        >
          <Text style={archiveStyles.deleteButtonText}>
            Удалить навсегда
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={archiveStyles.restoreButton}
          onPress={() => onRestore(habit)}
        >
          <Text style={archiveStyles.restoreButtonText}>
            Восстановить
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
