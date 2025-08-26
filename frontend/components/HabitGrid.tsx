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

// Функция для создания приглушенного цвета
const getMutedColor = (color: string): string => {
  // Добавляем прозрачность к основному цвету (60 = 37.5% непрозрачности)
  return `${color}60`;
};

export const HabitGrid: React.FC<HabitGridProps> = ({
  habitId,
  color,
  completions,
  weeks = 20, // 20 столбцов
  showLegend = true // по умолчанию показываем легенду
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
    
         // Используем сегодняшнюю дату как базу (как в календаре)
     const currentMonday = new Date(today);
     // Находим понедельник текущей недели: если воскресенье (0), то -6 дней, иначе -(день недели - 1)
     const dayOfWeek = today.getDay();
     const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
     currentMonday.setDate(today.getDate() - daysToMonday);
     
     // Теперь идем назад по неделям, начиная с текущей недели
     for (let week = 0; week < weeks; week++) {
       const weekDays = [];
       const monday = new Date(currentMonday);
       monday.setDate(currentMonday.getDate() - (weeks - week - 1) * 7);
      
      for (let day = 0; day < 7; day++) {
        const date = new Date(monday);
        date.setDate(monday.getDate() + day);
        // Генерируем дату точно как в календаре (используя локальное время)
        const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        
                 const isCompleted = completedDates.includes(dateString);
         // Используем строковое форматирование даты
         const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
         const isFuture = dateString > todayString; // Будущие дни = строго больше сегодня (не включая сегодня)
         

        

        

        
        weekDays.push({
          date: dateString,
          completed: isCompleted,
          future: isFuture,
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
                    day.completed && { backgroundColor: color }
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
  // пустых дней нет — базовый цвет задаётся в day
  future: {},
  legend: {
    fontSize: 12,
    color: '#ccc', // Light grey text for dark theme
    marginTop: 8,
    textAlign: 'center',
  },
});
