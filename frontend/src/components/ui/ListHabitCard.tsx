import React from 'react'; // ← Импорт React для создания компонента
import { View, TouchableOpacity, StyleSheet } from 'react-native'; // ← Базовые компоненты React Native
import { Text } from 'react-native-paper'; // ← UI компоненты из react-native-paper
import { MaterialIcons } from '@expo/vector-icons'; // ← Иконки Material Design
import { Habit } from '../../services/api'; // ← Тип данных привычки из API
import { getHabitColor } from '../../theme/theme'; // ← Функция получения цвета привычки
import { getHabitStatusStyle } from '../../theme/styles/cardStyles'; // ← Стили для статуса
import { theme } from '../../theme/theme'; // ← Объект темы с цветами
import { getMutedColor } from '../../utils/colors'; // ← Функция получения приглушенного цвета

// ← Интерфейс пропсов для компонента ListHabitCard
interface ListHabitCardProps {
  habit: Habit; // ← Объект привычки с данными
  onPress: () => void; // ← Функция при нажатии на карточку
  onToggleStatus?: () => void; // ← Опциональная функция переключения статуса
  selectedPeriod: number; // ← Выбранное количество дней (1-7)
  highlightCurrentDay?: boolean; // ← Опциональный флаг подсветки текущего дня
}

// ← Основной компонент горизонтальной карточки привычки
export const ListHabitCard: React.FC<ListHabitCardProps> = ({
  habit, // ← Объект привычки
  onPress, // ← Функция нажатия
  onToggleStatus, // ← Функция переключения статуса
  selectedPeriod, // ← Выбранный период
  highlightCurrentDay = true // ← По умолчанию подсвечиваем текущий день
}) => {
  // ← Получаем цвет привычки (из настроек или генерируем по ID)
  const baseColor = habit.color || getHabitColor(habit.id);
  
  // ← Получаем текущую дату
  const now = new Date();
  
  // ← Функция генерации сетки статусов за выбранный период
  const generateStatusGrid = () => {
    const statusArray = []; // ← Массив для хранения статусов
    
    // ← Получаем выполненные даты из логов привычки
    const completedDates = habit.logs
      ?.filter(log => log.status === 'completed') // ← Фильтруем только выполненные
      .map(log => {
        const date = new Date(log.date); // ← Создаем объект даты из строки
        // ← Форматируем дату в формат YYYY-MM-DD
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      }) || [];
    
    // ← Генерируем статусы для каждого дня периода
    for (let i = selectedPeriod - 1; i >= 0; i--) {
      const date = new Date(now); // ← Создаем копию текущей даты
      date.setDate(now.getDate() - i); // ← Вычитаем дни
      
      // ← Форматируем дату в строку YYYY-MM-DD
      const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      // ← Форматируем сегодняшнюю дату в строку YYYY-MM-DD
      const todayString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      
      // ← Проверяем выполнена ли привычка в этот день
      const isCompleted = completedDates.includes(dateString);
      // ← Проверяем является ли день будущим
      const isFuture = dateString > todayString;
      // ← Проверяем является ли день сегодняшним
      const isToday = dateString === todayString;
      
      // ← Добавляем объект статуса в массив
      statusArray.push({
        date: dateString, // ← Строка даты
        completed: isCompleted, // ← Флаг выполнения
        future: isFuture, // ← Флаг будущего дня
        isToday: isToday // ← Флаг сегодняшнего дня
      });
    }
    
    return statusArray; // ← Возвращаем массив статусов
  };
  
  // ← Генерируем сетку статусов
  const statusGrid = generateStatusGrid();
  
  // ← Рендерим компонент
  return (
    // ← Основной контейнер карточки (нажимаемый)
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
    >
      {/* ← Иконка статуса слева */}
             <TouchableOpacity
         style={[
           styles.statusIcon,
           getHabitStatusStyle(baseColor, habit.is_completed_today), // ← Динамические стили статуса
           { width: 32, height: 32, marginRight: 12 } // ← ПЕРЕЗАПИСЫВАЕМ размеры + отступ
         ]}
        onPress={onToggleStatus} // ← Обработчик нажатия
        disabled={!onToggleStatus} // ← Отключаем если нет функции переключения
        activeOpacity={0.7} // ← Прозрачность при нажатии
      >
        {/* ← Показываем галочку если привычка выполнена сегодня */}
        {habit.is_completed_today ? (
          <MaterialIcons
            name="check"
            size={20}
            color="#ffffff"
          />
        ) : (
          // ← Показываем иконку привычки если не выполнена
          <MaterialIcons
            name={habit.icon as any || 'target'}
            size={20}
            color="#ffffff"
          />
        )}
      </TouchableOpacity>
      
      {/* ← Название привычки */}
      <Text 
        style={[
          styles.habitName,
          { backgroundColor: getMutedColor(baseColor) } // ← Фон текста = приглушенный цвет привычки
        ]} 
        numberOfLines={1}
      >
        {habit.name}
      </Text>
      
      {/* ← Сетка статусов справа */}
      <View style={styles.statusGrid}>
        {statusGrid.map((status, index) => (
          // ← Квадрат статуса дня
          <View
            key={index}
            style={[
              styles.statusSquare, // ← Базовые стили квадрата
              { backgroundColor: getMutedColor(baseColor) }, // ← Приглушенный цвет по умолчанию
              status.completed && { backgroundColor: baseColor }, // ← Цвет привычки если выполнено
              highlightCurrentDay && status.isToday && styles.todaySquare // ← Белая рамка для сегодня
            ]}
          />
        ))}
      </View>
    </TouchableOpacity>
  );
};

// ← Стили компонента
const styles = StyleSheet.create({
  // ← Основной контейнер карточки
  container: {
    flexDirection: 'row', // ← Горизонтальное расположение элементов
    alignItems: 'center', // ← Выравнивание по центру
    backgroundColor: theme.colors.surface, // ← Цвет фона карточки (серый)
    borderRadius: 12, // ← Скругление углов
    padding: 10, // ← Внутренние отступы
    marginBottom: 5, // ← Внешние отступы снизу
    elevation: 2, // ← Тень (Android)
    minHeight: 30, // ← Минимальная высота
    maxHeight: 50, // ← Максимальная высота
  },
  // ← Иконка статуса
  statusIcon: {
    width: 40, // ← Ширина иконки
    height: 40, // ← Высота иконки
    borderRadius: 8, // ← Скругление углов
    justifyContent: 'center', // ← Выравнивание по центру по горизонтали
    alignItems: 'center', // ← Выравнивание по центру по вертикали
  },
  // ← Название привычки
  habitName: {
    flex: 1, // ← Занимает оставшееся пространство
    fontSize: 16, // ← Размер шрифта
    fontWeight: '600', // ← Жирность шрифта
    color: theme.colors.text.primary, // ← Цвет текста (белый)
    marginLeft: 12, // ← Отступ слева от иконки
    marginRight: 12, // ← Отступ справа от иконки
    paddingHorizontal: 8, // ← Горизонтальные отступы для фона
    paddingVertical: 7, // ← Вертикальные отступы для фона
    borderRadius: 6, // ← Скругление углов фона
  },
  // ← Сетка статусов
  statusGrid: {
    flexDirection: 'row', // ← Горизонтальное расположение квадратов
    gap: 4, // ← Отступы между квадратами
  },
  // ← Квадрат статуса дня
  statusSquare: {
    width: 24, // ← Ширина квадрата
    height: 24, // ← Высота квадрата
    borderRadius: 4, // ← Скругление углов
  },
  // ← Стили для сегодняшнего дня
  todaySquare: {
    borderWidth: 1, // ← Ширина рамки
    borderColor: theme.colors.text.primary, // ← Цвет рамки (белый)
  },
});
