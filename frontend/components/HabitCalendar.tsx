import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, IconButton } from 'react-native-paper';

interface HabitCalendarProps {
  habitId: string;
  color: string;
  completions: Array<string | { id: string; date: string; status: string }>;
  onToggleDay?: (date: string) => void;
}

export const HabitCalendar: React.FC<HabitCalendarProps> = ({
  habitId,
  color,
  completions,
  onToggleDay
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

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

  // ОТЛАДКА: выводим информацию о данных
  console.log('HabitCalendar DEBUG:', {
    habitId,
    color,
    completionsLength: completions.length,
    completedDates,
    completions: completions
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
     const prevMonth = new Date(year, month - 1, 0);
     
     for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
       const day = new Date(year, month - 1, prevMonth.getDate() - i);
       calendar.push({
         date: day.toISOString().split('T')[0],
         day: day.getDate(),
         isCurrentMonth: false,
         isToday: false
       });
     }
     
     // Добавляем дни текущего месяца
     for (let day = 1; day <= lastDay.getDate(); day++) {
       const date = new Date(year, month, day);
       const dateString = date.toISOString().split('T')[0];
       const today = new Date();
       const isToday = date.toDateString() === today.toDateString();
       
       calendar.push({
         date: dateString,
         day: day,
         isCurrentMonth: true,
         isToday: isToday
       });
     }
     
     // Добавляем дни следующего месяца для заполнения последней недели
     const totalDays = calendar.length;
     const weeksNeeded = Math.ceil(totalDays / 7);
     const daysNeeded = weeksNeeded * 7 - totalDays;
     
     // Добавляем дни только если нужно заполнить последнюю неделю
     if (daysNeeded > 0) {
       for (let day = 1; day <= daysNeeded; day++) {
         const date = new Date(year, month + 1, day);
         calendar.push({
           date: date.toISOString().split('T')[0],
           day: day,
           isCurrentMonth: false,
           isToday: false
         });
       }
     }
     
     return calendar;
   };

     const calendar = generateCalendar();
   
   // Вычисляем день недели для дебаг информации
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
      {/* Заголовок календаря */}
      <View style={styles.header}>
        <IconButton
          icon="chevron-left"
          iconColor="#fff"
          size={24}
          onPress={goToPreviousMonth}
        />
        <Text variant="titleMedium" style={styles.monthTitle}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </Text>
        <IconButton
          icon="chevron-right"
          iconColor="#fff"
          size={24}
          onPress={goToNextMonth}
        />
      </View>

      {/* Дни недели */}
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
           const isFuture = new Date(day.date) > new Date();
           
           // Создаем светлый оттенок цвета для неактивных дней
           const lightColor = color ? `${color}40` : '#4CAF5040'; // 40 = 25% прозрачности
           
           return (
             <TouchableOpacity
               key={index}
               style={[
                 styles.day,
                 day.isCurrentMonth && { backgroundColor: lightColor }, // Светлый цвет для всех дней текущего месяца
                 !day.isCurrentMonth && styles.otherMonthDay,
                 day.isToday && styles.today,
                 isCompleted && { backgroundColor: color }, // Полный цвет для выполненных
                 isFuture && styles.futureDay
               ]}
               onPress={() => handleDayPress(day.date)}
               disabled={isFuture || !day.isCurrentMonth}
             >
               <Text style={[
                 styles.dayText,
                 day.isToday && styles.todayText,
                 !day.isCurrentMonth && styles.otherMonthText,
                 isCompleted && styles.completedText
               ]}>
                 {day.day}
               </Text>
               {isCompleted && (
                 <View style={[styles.completionDot, { backgroundColor: color }]} />
               )}
             </TouchableOpacity>
           );
         })}
       </View>

             {/* Подсказка */}
       <Text style={styles.hint}>
         Tap dates to add or remove completions
       </Text>
       
               {/* Дебаг информация */}
        <Text style={styles.debug}>
          Недель: {Math.ceil(calendar.length / 7)} | Дней: {calendar.length} | 
          Первый день: {new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toDateString()} |
          День недели: {new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()} |
          Дней из прошлого: {firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1}
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
    color: '#fff',
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
     color: '#ccc',
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
     borderRadius: 6, // Уменьшили радиус
     position: 'relative',
     minHeight: 32, // Уменьшили минимальную высоту
   },
     // currentMonthDay больше не нужен - используем динамический светлый цвет
  otherMonthDay: {
    backgroundColor: '#2a2a2a',
  },
  today: {
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  futureDay: {
    opacity: 0.3,
  },
  dayText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  todayText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  otherMonthText: {
    color: '#666',
  },
  completedText: {
    color: '#fff',
    fontWeight: 'bold',
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
    color: '#999',
    fontSize: 12,
    marginTop: 12,
    fontStyle: 'italic',
  },
  debug: {
    textAlign: 'center',
    color: '#666',
    fontSize: 10,
    marginTop: 8,
  },
});
