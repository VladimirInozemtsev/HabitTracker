import React from 'react'; // ← Импорт React для создания компонента
import { View, TouchableOpacity, StyleSheet } from 'react-native'; // ← Базовые компоненты React Native
import { Text } from 'react-native-paper'; // ← UI компоненты из react-native-paper
import { MaterialIcons } from '@expo/vector-icons'; // ← Иконки Material Design
import { theme } from '../../theme/theme'; // ← Объект темы с цветами

// ← Интерфейс пропсов для компонента PeriodSelector
interface PeriodSelectorProps {
  selectedPeriod: number; // ← Выбранное количество дней (1-7)
  onPeriodChange: (period: number) => void; // ← Функция изменения периода
}

// ← Основной компонент селектора периода
export const PeriodSelector: React.FC<PeriodSelectorProps> = ({
  selectedPeriod, // ← Выбранный период
  onPeriodChange // ← Функция изменения
}) => {
  // ← Получаем текущую дату
  const now = new Date();
  
  // ← Массив названий дней недели на русском языке (сокращенные)
  const dayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  
  // ← Генерируем массив дат для выбранного периода
  const generateDateRange = () => {
    const dates = []; // ← Массив для хранения дат
    
    // ← Генерируем даты от сегодня назад на selectedPeriod дней
    for (let i = selectedPeriod - 1; i >= 0; i--) {
      const date = new Date(now); // ← Создаем копию текущей даты
      date.setDate(now.getDate() - i); // ← Вычитаем дни
      
      // ← Получаем день недели (0-6)
      const dayOfWeek = date.getDay();
      // ← Получаем день месяца
      const dayOfMonth = date.getDate();
      
      // ← Добавляем объект даты в массив
      dates.push({
        dayName: dayNames[dayOfWeek], // ← Название дня недели
        dayNumber: dayOfMonth, // ← Номер дня месяца
        date: date // ← Полная дата для логики
      });
    }
    
    return dates; // ← Возвращаем массив дат
  };
  
  // ← Генерируем диапазон дат
  const dateRange = generateDateRange();
  
  // ← Функция получения текста кнопки периода
  const getPeriodText = () => {
    switch (selectedPeriod) {
      case 1: return 'Сегодня';
      case 2: return 'Последние 2 дня';
      case 3: return 'Последние 3 дня';
      case 4: return 'Последние 4 дня';
      case 5: return 'Последние 5 дней';
      case 6: return 'Последние 6 дней';
      case 7: return 'Последние 7 дней';
      default: return 'Последние 5 дней';
    }
  };
  
  // ← Рендерим компонент
  return (
    <View style={styles.container}>
      {/* ← Кнопка выбора периода слева */}
      <TouchableOpacity style={styles.periodButton} onPress={() => {
        // ← Пока просто переключаем между 5 и 7 днями для тестирования
        const newPeriod = selectedPeriod === 5 ? 7 : 5;
        onPeriodChange(newPeriod);
      }}>
        <Text style={styles.periodButtonText}>
          {getPeriodText()}
        </Text>
        <MaterialIcons
          name="keyboard-arrow-down"
          size={20}
          color={theme.colors.text.primary}
        />
      </TouchableOpacity>
      
      {/* ← Строка дат справа */}
      <View style={styles.dateRow}>
        {dateRange.map((date, index) => (
          <View key={index} style={styles.dateItem}>
            {/* ← Название дня недели */}
            <Text style={styles.dayName}>
              {date.dayName}
            </Text>
            {/* ← Номер дня месяца */}
            <Text style={styles.dayNumber}>
              {date.dayNumber}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

// ← Стили компонента
const styles = StyleSheet.create({
  // ← Основной контейнер (горизонтальная компоновка)
  container: {
    flexDirection: 'row', // ← Горизонтальное расположение
    alignItems: 'center', // ← Выравнивание по центру
    justifyContent: 'space-between', // ← Распределение пространства
    marginBottom: 16, // ← Отступ снизу
    paddingHorizontal: 16, // ← Горизонтальные отступы
  },
  // ← Кнопка выбора периода (слева)
  periodButton: {
    flexDirection: 'row', // ← Горизонтальное расположение
    alignItems: 'center', // ← Выравнивание по центру
    justifyContent: 'space-between', // ← Распределение пространства
    backgroundColor: theme.colors.surface, // ← Цвет фона
    paddingHorizontal: 16, // ← Горизонтальные отступы
    paddingVertical: 12, // ← Вертикальные отступы
    borderRadius: 8, // ← Скругление углов
    minWidth: 140, // ← Минимальная ширина кнопки
  },
  // ← Текст кнопки периода
  periodButtonText: {
    fontSize: 16, // ← Размер шрифта
    fontWeight: '600', // ← Жирность шрифта
    color: theme.colors.text.primary, // ← Цвет текста (белый)
  },
  // ← Строка дат (справа)
  dateRow: {
    flexDirection: 'row', // ← Горизонтальное расположение
    justifyContent: 'space-between', // ← Равномерное распределение
    flex: 1, // ← Занимает оставшееся пространство
    marginLeft: 16, // ← Отступ слева от кнопки
  },
  // ← Элемент даты
  dateItem: {
    alignItems: 'center', // ← Выравнивание по центру
    flex: 1, // ← Равномерное распределение пространства
  },
  // ← Название дня недели
  dayName: {
    fontSize: 12, // ← Размер шрифта
    color: theme.colors.text.primary, // ← Цвет текста (белый)
    marginBottom: 2, // ← Отступ снизу
    fontWeight: '500', // ← Жирность шрифта
  },
  // ← Номер дня месяца
  dayNumber: {
    fontSize: 14, // ← Размер шрифта
    fontWeight: '600', // ← Жирность шрифта
    color: theme.colors.text.primary, // ← Цвет текста (белый)
  },
});
