import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../theme/theme';

interface WeekStartSelectorProps {
  selectedDay: string;
  onDaySelect: (dayKey: string) => void;
}

const weekDays = [
  { key: 'monday', label: 'Понедельник', icon: 'monday' },
  { key: 'tuesday', label: 'Вторник', icon: 'tuesday' },
  { key: 'wednesday', label: 'Среда', icon: 'wednesday' },
  { key: 'thursday', label: 'Четверг', icon: 'thursday' },
  { key: 'friday', label: 'Пятница', icon: 'friday' },
  { key: 'saturday', label: 'Суббота', icon: 'saturday' },
  { key: 'sunday', label: 'Воскресенье', icon: 'sunday' },
];

export const WeekStartSelector: React.FC<WeekStartSelectorProps> = ({
  selectedDay,
  onDaySelect,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.instruction}>
        Выберите день, с которого начинается неделя
      </Text>
      
      <View style={styles.daysList}>
        {weekDays.map((day) => (
          <TouchableOpacity
            key={day.key}
            style={[
              styles.dayItem,
              selectedDay === day.key && styles.selectedDayItem,
            ]}
            onPress={() => onDaySelect(day.key)}
          >
            <Text
              style={[
                styles.dayLabel,
                selectedDay === day.key && styles.selectedDayLabel,
              ]}
            >
              {day.label}
            </Text>
            {selectedDay === day.key && (
              <MaterialIcons
                name="check"
                size={20}
                color={theme.colors.icons.purple}
                style={styles.checkIcon}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  instruction: {
    fontSize: 16,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  daysList: {
    gap: 12,
  },
  dayItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  selectedDayItem: {
    borderColor: theme.colors.icons.purple,
    backgroundColor: theme.colors.surface,
  },
  dayLabel: {
    fontSize: 16,
    color: theme.colors.text.primary,
  },
  selectedDayLabel: {
    color: theme.colors.icons.purple,
    fontWeight: '600',
  },
  checkIcon: {
    marginLeft: 8,
  },
});
