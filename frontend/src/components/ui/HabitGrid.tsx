import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { theme } from '../../theme/theme';
import { getMutedColor } from '../../utils/colors';
// import { formatDate } from '../../utils/format'; // ← УДАЛЕНО: не используется

interface HabitGridProps {
  habitId: string;
  color: string;
  completions: Array<string | { id: string; date: string; status: string }>; // массив дат или объектов логов
  weeks?: number; // количество недель для отображения
  showLegend?: boolean; // показывать ли легенду
  highlightCurrentDay?: boolean; // ← ДОБАВЛЕНО: пропс для подсветки текущего дня
  weekStartsOn?: string; // ← ДОБАВЛЕНО: день начала недели
}



export const HabitGrid: React.FC<HabitGridProps> = ({
  habitId,
  color,
  completions,
  weeks = 20, // 20 столбцов
  showLegend = true, // по умолчанию показываем легенду
  highlightCurrentDay = true, // ← ДОБАВЛЕНО: по умолчанию включено
  weekStartsOn = 'monday' // ← ДОБАВЛЕНО: по умолчанию понедельник
}) => {
  // Обновляем дату при каждом рендере
  const [currentDate, setCurrentDate] = React.useState(new Date());
  
  React.useEffect(() => {
    setCurrentDate(new Date());
  }, []); // Пустой массив зависимостей - обновляем только при монтировании
  // Создаем массив недель
  const generateWeeks = () => {
         const weeksArray = [];
     const today = currentDate;
    
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
    
         // ← ДОБАВЛЕНО: находим начало недели и сдвигаем сетку
     const getStartOfWeek = (date: Date, weekStartsOn: string) => {
       const dayOfWeek = date.getDay(); // 0 = воскресенье, 1 = понедельник, ...
       const weekStartMap: { [key: string]: number } = {
         'sunday': 0,
         'monday': 1,
         'tuesday': 2,
         'wednesday': 3,
         'thursday': 4,
         'friday': 5,
         'saturday': 6,
       };
       
       const targetDay = weekStartMap[weekStartsOn] || 1; // по умолчанию понедельник
       const daysToSubtract = (dayOfWeek - targetDay + 7) % 7;
       
       const startOfWeek = new Date(date);
       startOfWeek.setDate(date.getDate() - daysToSubtract);
       return startOfWeek;
     };
     
     // ← ДОБАВЛЕНО: находим стандартное начало недели (понедельник) для календаря
     const getStandardWeekStart = (date: Date) => {
       const dayOfWeek = date.getDay();
       const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
       const monday = new Date(date);
       monday.setDate(date.getDate() - daysToMonday);
       return monday;
     };
     
     const currentWeekStart = getStartOfWeek(today, weekStartsOn);
     const standardWeekStart = getStandardWeekStart(today);
     
     // ← ДОБАВЛЕНО: вычисляем сдвиг между выбранным днем недели и стандартным понедельником
     const weekShift = Math.floor((currentWeekStart.getTime() - standardWeekStart.getTime()) / (1000 * 60 * 60 * 24));
     
     // Отладочная информация (закомментировано)
     // console.log('🔍 HabitGrid Debug:', {
     //   today: today.toISOString().split('T')[0],
     //   weekStartsOn,
     //   currentWeekStart: currentWeekStart.toISOString().split('T')[0],
     //   standardWeekStart: standardWeekStart.toISOString().split('T')[0],
     //   weekShift,
     //   todayDayOfWeek: today.getDay(),
     // });
     
     // ← ДОБАВЛЕНО: идем назад по неделям, применяя сдвиг к стандартному календарю
     for (let week = 0; week < weeks; week++) {
       const weekDays = [];
       const weekStart = new Date(standardWeekStart);
       weekStart.setDate(standardWeekStart.getDate() - (weeks - week - 1) * 7 + weekShift);
      
             for (let day = 0; day < 7; day++) {
         const date = new Date(weekStart);
         date.setDate(weekStart.getDate() + day);
        // Генерируем дату точно как в календаре (используя локальное время)
        const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        
                 const isCompleted = completedDates.includes(dateString);
         // Используем строковое форматирование даты
         const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
         const isFuture = dateString > todayString; // Будущие дни = строго больше сегодня (не включая сегодня)
         

        

        

        
        const isToday = dateString === todayString; // ← ДОБАВЛЕНО: проверка на текущий день
        
        weekDays.push({
          date: dateString,
          completed: isCompleted,
          future: isFuture,
          isToday: isToday, // ← ДОБАВЛЕНО: добавляем флаг текущего дня
          dateString: dateString,
          todayString: todayString
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
              // Создаем приглушенный оттенок цвета для неактивных дней
              const mutedColor = getMutedColor(color);
              
              return (
                <View
                  key={dayIndex}
                  style={[
                    styles.day,
                    { backgroundColor: mutedColor },
                    day.completed && { backgroundColor: color },
                    highlightCurrentDay && day.isToday && styles.today // ← ДОБАВЛЕНО: подсветка текущего дня
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
    // компенсируем внутренний паддинг карточки, чтобы сетка занимала всю ширину
    marginHorizontal: -16, // больше компенсация для полного растяжения
    paddingHorizontal: 8, // минимальные поля внутри
    paddingBottom: 8, // такой же отступ как по горизонтали
    marginVertical: 2, // уменьшаем вертикальные отступы
  },
  grid: {
    flexDirection: 'row',
    gap: 2, // стандартные интервалы между столбцами
    flex: 1,
    width: '100%',
    alignSelf: 'stretch',
  },
  week: {
    gap: 2, // стандартные интервалы между днями
    flex: 1, // Каждая неделя растягивается
  },
  day: {
    flex: 1, // Растягиваем на всю доступную ширину
    aspectRatio: 1, // Квадратные клетки
    borderRadius: 3,
    margin: 0.5,
    // убраны maxWidth/maxHeight, чтобы сетка могла заполнять всю карточку
  },
  today: {
    borderWidth: 2,
    borderColor: '#ffffff', // ← ДОБАВЛЕНО: белая рамка для текущего дня
  },
  // пустых дней нет — базовый цвет задаётся в day
  future: {},
  legend: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    marginTop: 8,
    textAlign: 'center',
  },
});
