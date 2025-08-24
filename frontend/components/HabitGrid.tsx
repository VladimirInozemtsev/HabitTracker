import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

interface HabitGridProps {
  habitId: string;
  color: string;
  completions: Array<string | { id: string; date: string; status: string }>; // массив дат или объектов логов
  weeks?: number; // количество недель для отображения
  showLegend?: boolean; // показывать ли легенду
}

export const HabitGrid: React.FC<HabitGridProps> = ({
  habitId,
  color,
  completions,
  weeks = 20, // 20 столбцов
  showLegend = true // по умолчанию показываем легенду
}) => {
  // Создаем массив недель
  const generateWeeks = () => {
    const weeksArray = [];
    const today = new Date();
    
    // Получаем только выполненные даты
    const completedDates = completions
      .filter(completion => {
        if (typeof completion === 'string') {
          return true; // строка = дата
        } else if (completion && completion.date) {
          return completion.status === 'completed';
        }
        return false;
      })
      .map(completion => {
        if (typeof completion === 'string') {
          return completion;
        } else {
          return completion.date;
        }
      });
    
    // Начинаем с 14 недель назад
    for (let week = 0; week < weeks; week++) {
      const weekDays = [];
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - (weeks - week - 1) * 7);
      
      // Находим понедельник текущей недели
      const dayOfWeek = weekStart.getDay(); // 0 = воскресенье, 1 = понедельник
      const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Дни до понедельника
      weekStart.setDate(weekStart.getDate() - daysToMonday);
      
      for (let day = 0; day < 7; day++) {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + day);
        const dateString = date.toISOString().split('T')[0];
        
        const isCompleted = completedDates.includes(dateString);
        const isFuture = date > today;
        
        weekDays.push({
          date: dateString,
          completed: isCompleted,
          future: isFuture
        });
      }
      weeksArray.push(weekDays);
    }
    
    return weeksArray;
  };

  const weeksData = generateWeeks();

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {weeksData.map((week, weekIndex) => (
          <View key={weekIndex} style={styles.week}>
            {week.map((day, dayIndex) => {
              // Создаем светлый оттенок цвета для неактивных дней
              const lightColor = color ? `${color}40` : '#4CAF5040'; // 40 = 25% прозрачности
              
              return (
                <View
                  key={dayIndex}
                  style={[
                    styles.day,
                    day.completed && { backgroundColor: color }, // Полный цвет для выполненных
                    day.future && styles.future,
                    !day.completed && !day.future && { backgroundColor: lightColor } // Светлый цвет для неактивных
                  ]}
                />
              );
            })}
          </View>
        ))}
      </View>
      {showLegend && (
        <Text style={styles.legend}>
          {completions.filter(c => 
            typeof c === 'string' || (c && c.status === 'completed')
          ).length} выполнений за {weeks} недель
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4, // Уменьшаем отступы
  },
  grid: {
    flexDirection: 'row',
    gap: 0.5, // Уменьшаем отступы между неделями
    flex: 1, // Растягиваем сетку на всю ширину
  },
  week: {
    gap: 0.5, // Уменьшаем отступы между днями
    flex: 1, // Каждая неделя растягивается
  },
  day: {
    flex: 1, // Растягиваем на всю доступную ширину
    aspectRatio: 1, // Делаем квадратными
    borderRadius: 2,
    margin: 0.25, // Еще меньше отступы
    maxWidth: 14, // Увеличиваем максимальную ширину
    maxHeight: 14, // Увеличиваем максимальную высоту
  },
  // empty больше не нужен - используем динамический светлый цвет
  future: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  legend: {
    fontSize: 12,
    color: '#ccc', // Light grey text for dark theme
    marginTop: 8,
    textAlign: 'center',
  },
  debug: {
    fontSize: 10,
    color: '#999',
    marginTop: 4,
    textAlign: 'center',
  },
});
