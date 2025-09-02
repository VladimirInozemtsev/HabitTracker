import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';

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
  // Получаем тему из контекста
  const { theme } = useApp();
  
  return (
    <View style={{
      flex: 1,
    }}>
      <Text style={{
        fontSize: 16,
        color: theme.colors.text.secondary,
        textAlign: 'center',
        marginBottom: 24,
      }}>
        Выберите день, с которого начинается неделя
      </Text>
      
      <View style={{
        gap: 12,
      }}>
        {weekDays.map((day) => (
          <TouchableOpacity
            key={day.key}
            style={[
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 16,
                paddingHorizontal: 20,
                backgroundColor: theme.colors.surface,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: theme.colors.divider,
              },
              selectedDay === day.key && {
                borderColor: theme.colors.icons.purple,
                backgroundColor: theme.colors.surface,
              },
            ]}
            onPress={() => onDaySelect(day.key)}
          >
            <Text
              style={[
                {
                  fontSize: 16,
                  color: theme.colors.text.primary,
                },
                selectedDay === day.key && {
                  color: theme.colors.icons.purple,
                  fontWeight: '600',
                },
              ]}
            >
              {day.label}
            </Text>
            {selectedDay === day.key && (
              <MaterialIcons
                name="check"
                size={20}
                color={theme.colors.icons.purple}
                style={{
                  marginLeft: 8,
                }}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
