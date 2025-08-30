import React from 'react'; // ← Импорт React для создания компонента
import { View, TouchableOpacity, StyleSheet } from 'react-native'; // ← Базовые компоненты React Native
import { Text } from 'react-native-paper'; // ← UI компоненты из react-native-paper
import { MaterialIcons } from '@expo/vector-icons'; // ← Иконки Material Design
import { Habit } from '../../services/api'; // ← Тип данных привычки из API
import { getHabitColor } from '../../theme/theme'; // ← Функция получения цвета привычки
import { getHabitStatusStyle, getHabitIconStyle } from '../../theme/styles/cardStyles'; // ← Стили для статуса и иконки
import { theme } from '../../theme/theme'; // ← Объект темы с цветами
import { getMutedColor } from '../../utils/colors'; // ← Функция получения приглушенного цвета

// ← Интерфейс пропсов для компонента SquareHabitCard
interface SquareHabitCardProps {
  habit: Habit; // ← Объект привычки с данными
  onPress: () => void; // ← Функция при нажатии на карточку
  onToggleStatus?: () => void; // ← Опциональная функция переключения статуса
  highlightCurrentDay?: boolean; // ← Опциональный флаг подсветки текущего дня
  weekStartsOn?: string; // ← Опциональная настройка начала недели
}

// ← Основной компонент квадратной карточки привычки
export const SquareHabitCard: React.FC<SquareHabitCardProps> = ({
  habit, // ← Объект привычки
  onPress, // ← Функция нажатия
  onToggleStatus, // ← Функция переключения статуса
  highlightCurrentDay = true, // ← По умолчанию подсвечиваем текущий день
  weekStartsOn = 'monday' // ← По умолчанию неделя начинается с понедельника
}) => {
  // ← Получаем цвет привычки (из настроек или генерируем по ID)
  const baseColor = habit.color || getHabitColor(habit.id);
  
  // ← Получаем текущую дату для отображения месяца и года
  const now = new Date();
  // ← Массив названий месяцев на русском языке
  const monthNames = [
    'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
    'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'
  ];
  // ← Текущий месяц (сокращенное название)
  const currentMonth = monthNames[now.getMonth()];
  // ← Текущий год
  const currentYear = now.getFullYear();

  // ← Функция генерации сетки активности (5x7 как в HabitGrid)
  const generateActivityGrid = () => {
    const weeksArray = []; // ← Массив для хранения недель
    const today = now; // ← Текущая дата
    
    // ← Получаем выполненные даты из логов привычки
    const completedDates = habit.logs
      ?.filter(log => log.status === 'completed') // ← Фильтруем только выполненные
      .map(log => {
        const date = new Date(log.date); // ← Создаем объект даты из строки
        // ← Форматируем дату в формат YYYY-MM-DD
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      }) || [];
    
    // ← Функция нахождения начала недели с учетом настройки weekStartsOn
    const getStartOfWeek = (date: Date, weekStartsOn: string) => {
      const dayOfWeek = date.getDay(); // ← День недели (0=воскресенье, 1=понедельник, ...)
      // ← Карта соответствия названий дней недели и их номеров
      const weekStartMap: { [key: string]: number } = {
        'sunday': 0,
        'monday': 1,
        'tuesday': 2,
        'wednesday': 3,
        'thursday': 4,
        'friday': 5,
        'saturday': 6,
      };
      
      const targetDay = weekStartMap[weekStartsOn] || 1; // ← Целевой день начала недели
      // ← Вычисляем сколько дней нужно отнять для получения начала недели
      const daysToSubtract = (dayOfWeek - targetDay + 7) % 7;
      
      const startOfWeek = new Date(date); // ← Создаем копию даты
      startOfWeek.setDate(date.getDate() - daysToSubtract); // ← Устанавливаем начало недели
      return startOfWeek;
    };
    
    // ← Функция нахождения стандартного начала недели (понедельник)
    const getStandardWeekStart = (date: Date) => {
      const dayOfWeek = date.getDay(); // ← День недели
      // ← Вычисляем дни до понедельника (воскресенье = 0, поэтому 6 дней назад)
      const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      const monday = new Date(date); // ← Создаем копию даты
      monday.setDate(date.getDate() - daysToMonday); // ← Устанавливаем понедельник
      return monday;
    };
    
    // ← Получаем начало недели с учетом пользовательских настроек
    const currentWeekStart = getStartOfWeek(today, weekStartsOn);
    // ← Получаем стандартное начало недели (понедельник)
    const standardWeekStart = getStandardWeekStart(today);
    
    // ← Вычисляем сдвиг между выбранным днем недели и стандартным понедельником
    const weekShift = Math.floor((currentWeekStart.getTime() - standardWeekStart.getTime()) / (1000 * 60 * 60 * 24));
    
    // ← Генерируем 5 недель (как в HabitGrid)
    for (let week = 0; week < 5; week++) {
      const weekDays = []; // ← Массив для хранения дней недели
      const weekStart = new Date(standardWeekStart); // ← Создаем копию стандартного начала недели
      // ← Вычисляем начало конкретной недели с учетом сдвига
      weekStart.setDate(standardWeekStart.getDate() - (5 - week - 1) * 7 + weekShift);
      
      // ← Генерируем 7 дней недели
      for (let day = 0; day < 7; day++) {
        const date = new Date(weekStart); // ← Создаем копию начала недели
        date.setDate(weekStart.getDate() + day); // ← Устанавливаем конкретный день
        
        // ← Форматируем дату в строку YYYY-MM-DD
        const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        // ← Форматируем сегодняшнюю дату в строку YYYY-MM-DD
        const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        
        // ← Проверяем выполнена ли привычка в этот день
        const isCompleted = completedDates.includes(dateString);
        // ← Проверяем является ли день будущим
        const isFuture = dateString > todayString;
        // ← Проверяем является ли день сегодняшним
        const isToday = dateString === todayString;
        
        // ← Добавляем объект дня в массив недели
        weekDays.push({
          date: dateString, // ← Строка даты
          completed: isCompleted, // ← Флаг выполнения
          future: isFuture, // ← Флаг будущего дня
          isToday: isToday // ← Флаг сегодняшнего дня
        });
      }
      weeksArray.push(weekDays); // ← Добавляем неделю в общий массив
    }
    
    return weeksArray; // ← Возвращаем массив недель
  };

  // ← Генерируем сетку активности
  const activityGrid = generateActivityGrid();

  // ← Рендерим компонент
  return (
    // ← Основной контейнер карточки (нажимаемый)
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {/* ← Хедер карточки */}
      <View style={styles.header}>
        {/* ← Квадрат статуса слева (нажимаемый) */}
                 <TouchableOpacity
           style={[
             styles.statusSquare,
             getHabitStatusStyle(baseColor, habit.is_completed_today), // ← Динамические стили статуса
             { width: 32, height: 32, marginRight: 20 } // ← ПЕРЕЗАПИСЫВАЕМ глобальные стили + отступ
           ]}
          onPress={onToggleStatus} // ← Обработчик нажатия
          disabled={!onToggleStatus} // ← Отключаем если нет функции переключения
          activeOpacity={0.7} // ← Прозрачность при нажатии
        >
                     {/* ← Показываем галочку если привычка выполнена сегодня */}
           {habit.is_completed_today ? (
             <MaterialIcons
               name="check"
               size={16}
               color="#ffffff"
             />
           ) : (
             // ← Показываем иконку привычки если не выполнена
                           <MaterialIcons
                name={habit.icon as any || 'target'}
                size={16}
                color="#ffffff"
              />
           )}
        </TouchableOpacity>

        {/* ← Текстовая часть хедера */}
        <View style={styles.textContainer}>
          {/* ← Название привычки */}
          <Text style={styles.habitName} numberOfLines={1}>
            {habit.name}
          </Text>
          {/* ← Месяц и год */}
          <Text style={styles.monthText}>
            {currentMonth} {currentYear}
          </Text>
        </View>
      </View>

      {/* ← Сетка активности */}
      <View style={styles.gridContainer}>
        {/* ← Итерируемся по неделям */}
        {activityGrid.map((week: any[], weekIndex: number) => (
          // ← Контейнер недели
          <View key={weekIndex} style={styles.weekRow}>
            {/* ← Итерируемся по дням недели */}
            {week.map((day: any, dayIndex: number) => (
              // ← Квадрат дня
              <View
                key={dayIndex}
                style={[
                  styles.daySquare, // ← Базовые стили квадрата
                  { backgroundColor: getMutedColor(baseColor) }, // ← Приглушенный цвет по умолчанию
                  day.completed && { backgroundColor: baseColor }, // ← Цвет привычки если выполнено
                  highlightCurrentDay && day.isToday && styles.todaySquare // ← Белая рамка для сегодня
                ]}
              />
            ))}
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};

// ← Стили компонента
const styles = StyleSheet.create({
  // ← Основной контейнер карточки
  container: {
    backgroundColor: theme.colors.surface, // ← Цвет фона (серый)
    borderRadius: 12, // ← Скругление углов
    padding: 12, // ← Внутренние отступы
    margin: 8, // ← Внешние отступы
    width: 140, // ← Ширина карточки
    height: 140, // ← Высота карточки (квадратная форма)
    elevation: 2, // ← Тень (Android)
  },
  // ← Хедер карточки
  header: {
    flexDirection: 'row', // ← Горизонтальное расположение элементов
    alignItems: 'center', // ← Выравнивание по центру
    marginBottom: 8, // ← Отступ снизу
  },
  // ← Квадрат статуса
  statusSquare: {
    width: 20, // ← Ширина квадрата
    height: 20, // ← Высота квадрата
    borderRadius: 6, // ← Скругление углов
    justifyContent: 'center', // ← Выравнивание по центру по горизонтали
    alignItems: 'center', // ← Выравнивание по центру по вертикали
    marginRight: 20, // ← ИЗМЕНЕНО: увеличил отступ справа с 8 до 12
  },
  // ← Контейнер текста
  textContainer: {
    flex: 1, // ← Занимает оставшееся пространство
  },
  // ← Название привычки
  habitName: {
    fontSize: 14, // ← Размер шрифта
    fontWeight: '600', // ← Жирность шрифта
    color: theme.colors.text.primary, // ← Цвет текста (белый)
    marginBottom: 2, // ← Отступ снизу
  },
  // ← Текст месяца и года
  monthText: {
    fontSize: 12, // ← Размер шрифта
    color: theme.colors.text.secondary, // ← Цвет текста (серый)
  },
  // ← Контейнер сетки
  gridContainer: {
    flex: 1, // ← Занимает оставшееся пространство
  },
  // ← Строка недели
  weekRow: {
    flexDirection: 'row', // ← Горизонтальное расположение дней
    marginBottom: 1, // ← Отступ между неделями
  },
  // ← Квадрат дня
  daySquare: {
    flex: 1, // ← Равномерное распределение пространства
    aspectRatio: 1, // ← Квадратная форма
    marginHorizontal: 1, // ← Горизонтальные отступы между днями
    borderRadius: 2, // ← Скругление углов
    transform: [{ scale: 0.8 }], // ← Уменьшение размера на 10%
  },
  // ← Стили для сегодняшнего дня
  todaySquare: {
    borderWidth: 1, // ← Ширина рамки
    borderColor: theme.colors.text.primary, // ← Цвет рамки (белый)
  },
});
