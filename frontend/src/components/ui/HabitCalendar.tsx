import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { theme } from '../../theme/theme';

interface HabitCalendarProps {
  habitId: string;
  color: string;
  completions: Array<string | { id: string; date: string; status: string }>;
  onToggleDay?: (date: string) => void;
}

import { getMutedColor } from '../../utils/colors';

export const HabitCalendar: React.FC<HabitCalendarProps> = ({
  habitId,
  color,
  completions,
  onToggleDay
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Автоматически переключаемся на текущий месяц при загрузке
  React.useEffect(() => {
    const today = new Date();
    setCurrentDate(today);
  }, []);

  // Получаем выполненные даты
  const completedDates = completions
    .filter(completion => {
      if (typeof completion === 'string') {
        return true;
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
    


  // Генерируем календарь для текущего месяца
   const generateCalendar = () => {
     const year = currentDate.getFullYear();
     const month = currentDate.getMonth();
     
     
     
     // Первый день месяца
     const firstDay = new Date(year, month, 1);
     // Последний день месяца
     const lastDay = new Date(year, month + 1, 0);
     
     // День недели первого дня (0 = воскресенье, 1 = понедельник)
     const firstDayOfWeek = firstDay.getDay();
     
     // Корректируем для начала недели с понедельника
     // Если воскресенье (0), то это 6 дней предыдущего месяца
     // Если понедельник (1), то это 0 дней предыдущего месяца
     // Если вторник (2), то это 1 день предыдущего месяца
     // И так далее...
     const daysFromPrevMonth = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
     
     const calendar = [];
     
     // Добавляем дни предыдущего месяца для заполнения первой недели
     // ВАЖНО: последний день ПРЕДЫДУЩЕГО месяца получаем как new Date(year, month, 0)
     // (month уже текущий, day=0 смещает к последнему дню предыдущего месяца)
     const prevMonth = new Date(year, month, 0);
     
     for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
       const day = new Date(year, month - 1, prevMonth.getDate() - i);
       const dateString = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
       calendar.push({
         date: dateString,
         day: day.getDate(),
         isCurrentMonth: false,
         isToday: false
       });
     }
     
     // Добавляем дни текущего месяца
     for (let day = 1; day <= lastDay.getDate(); day++) {
                        const date = new Date(year, month, day);
         const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                 const today = new Date();
         const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        
        // Используем ту же логику что и в сетке
        const isToday = dateString === todayString;
        const isFuture = dateString > todayString;
        
        
       
       calendar.push({
         date: dateString,
         day: day,
         isCurrentMonth: true,
         isToday: isToday,
         isFuture: isFuture
       });
     }
     
     // Добавляем дни следующего месяца для заполнения последней недели
     const totalDays = calendar.length;
     const weeksNeeded = Math.ceil(totalDays / 7);
     const daysNeeded = weeksNeeded * 7 - totalDays;
     
     for (let day = 1; day <= daysNeeded; day++) {
       const date = new Date(year, month + 1, day);
       const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
       calendar.push({
         date: dateString,
         day: day,
         isCurrentMonth: false,
         isToday: false
       });
     }
     
     return calendar;
   };

   const calendar = generateCalendar();
   const firstDayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

   const monthNames = [
     'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
     'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
   ];

  const handleDayPress = (date: string) => {
    if (onToggleDay) {
      onToggleDay(date);
    }
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <View style={styles.container}>
      {/* Заголовок с навигацией */}
      <View style={styles.header}>
        <IconButton
          icon="chevron-left"
          iconColor={theme.colors.text.primary}
          size={24}
          onPress={goToPreviousMonth}
        />
        <Text style={styles.monthTitle}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </Text>
        <IconButton
          icon="chevron-right"
          iconColor={theme.colors.text.primary}
          size={24}
          onPress={goToNextMonth}
        />
      </View>

      {/* Названия дней недели */}
      <View style={styles.weekDays}>
        {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, index) => (
          <Text key={index} style={styles.weekDay}>
            {day}
          </Text>
        ))}
      </View>

      {/* Календарная сетка */}
      <View style={styles.calendar}>
        {calendar.map((day, index) => {
          const isCompleted = completedDates.includes(day.date);
          const mutedColor = getMutedColor(color);
          

          

          
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.day,
                day.isFuture && styles.futureDay,
                !day.isFuture && !day.isCurrentMonth && styles.otherMonthDay,
                !day.isFuture && day.isToday && styles.today,
                !day.isFuture && day.isCurrentMonth && isCompleted && { backgroundColor: color },
              ]}
              onPress={() => {
                if (day.isFuture) return;
                if (!day.isCurrentMonth) {
                  const d = new Date(day.date);
                  setCurrentDate(new Date(d.getFullYear(), d.getMonth(), 1));
                  return;
                }
                if (onToggleDay) onToggleDay(day.date);
              }}
            >
              <Text style={[
                styles.dayText,
                !day.isCurrentMonth && styles.otherMonthText,
                day.isToday && styles.todayText,
                day.isCurrentMonth && isCompleted && styles.completedText,
              ]}>
                {day.day}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Подсказка */}
      <Text style={styles.hint}>
        Tap dates to add or remove completions
      </Text>
      

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthTitle: {
    color: theme.colors.text.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
     weekDays: {
     flexDirection: 'row',
     marginBottom: 8,
     paddingHorizontal: 4, // Добавили отступы как у календаря
     justifyContent: 'center', // Центрируем названия дней
     gap: 4, // Добавили отступы между названиями дней
   },
   weekDay: {
     width: '12%', // Такая же ширина как у дней
     textAlign: 'center',
     color: theme.colors.text.secondary,
     fontSize: 12,
     fontWeight: '500',
   },
   calendar: {
     flexDirection: 'row',
     flexWrap: 'wrap',
     gap: 4,
     paddingHorizontal: 4,
     justifyContent: 'center', // Центрируем календарь
   },
     day: {
     width: '12%', // Уменьшили с 14.28% до 12%
     aspectRatio: 1,
     justifyContent: 'center',
     alignItems: 'center',
     borderRadius: 8, // Увеличиваем скругления
     position: 'relative',
     minHeight: 36, // Увеличиваем минимальную высоту
     margin: 1, // Добавляем небольшие отступы
   },
     // currentMonthDay больше не нужен - используем динамический светлый цвет
  otherMonthDay: {
    backgroundColor: 'transparent',
  },
  today: {
    borderWidth: 2,
    borderColor: theme.colors.text.primary,
  },
  futureDay: {
    backgroundColor: 'transparent',
    borderWidth: 0, // убираем рамку
  },
  dayText: {
    color: theme.colors.text.primary,
    fontSize: 14,
    fontWeight: '400', // базовый нормальный вес
  },
  todayText: {
    color: theme.colors.text.primary,
    fontWeight: '400', // не делаем жирным, только рамка у контейнера today
  },
  otherMonthText: {
    color: theme.colors.text.disabled,
    fontWeight: '400',
  },
  completedText: {
    color: theme.colors.text.primary,
    fontWeight: '700', // жирный только для реально выполненных дней текущего месяца
  },
  completionDot: {
    position: 'absolute',
    bottom: 2,
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  hint: {
    textAlign: 'center',
    color: theme.colors.text.secondary,
    fontSize: 12,
    marginTop: 12,
    fontStyle: 'italic',
  },

});
