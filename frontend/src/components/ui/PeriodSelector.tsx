import React, { useState } from 'react'; // ← Импорт React для создания компонента
import { View, TouchableOpacity, StyleSheet } from 'react-native'; // ← Базовые компоненты React Native
import { Text } from 'react-native-paper'; // ← UI компоненты из react-native-paper
import { MaterialIcons } from '@expo/vector-icons'; // ← Иконки Material Design
import { theme } from '../../theme/theme'; // ← Объект темы с цветами
import { Modal } from './Modal'; // ← Импорт модального окна

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
  // ← Состояние для отображения модального окна
  const [showPeriodModal, setShowPeriodModal] = useState(false);
  
  // ← Получаем текущую дату
  const now = new Date();
  
  // ← Массив названий дней недели на русском языке (сокращенные)
  const dayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  
  // ← Генерируем массив дат для выбранного периода (СИНХРОНИЗИРОВАНО с ListHabitCard)
  const generateDateRange = () => {
    const dates = []; // ← Массив для хранения дат
    
    // ← Генерируем даты от сегодня назад на selectedPeriod дней (ТОЧНО как в ListHabitCard)
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

  // ← Функция выбора периода
  const handlePeriodSelect = (period: number) => {
    onPeriodChange(period);
    setShowPeriodModal(false);
  };
  
  // ← Рендерим компонент
  return (
    <>
      <View style={styles.container}>
        {/* ← Кнопка выбора периода слева */}
        <TouchableOpacity style={styles.periodButton} onPress={() => setShowPeriodModal(true)}>
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
            <View key={index} style={[
              styles.dateItem,
              index === 0 && { marginLeft: 0 } // ← У первого элемента нет отступа слева
            ]}>
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

      {/* ← Модальное окно выбора периода */}
      <Modal
        visible={showPeriodModal}
        onClose={() => setShowPeriodModal(false)}
        title="Выберите период"
      >
        <View style={styles.modalContent}>
          {[1, 2, 3, 4, 5, 6, 7].map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodOption,
                selectedPeriod === period && styles.periodOptionActive
              ]}
              onPress={() => handlePeriodSelect(period)}
            >
              <Text style={[
                styles.periodOptionText,
                selectedPeriod === period && styles.periodOptionTextActive
              ]}>
                {period === 1 ? 'Сегодня' : `Последние ${period} ${period === 1 ? 'день' : period < 5 ? 'дня' : 'дней'}`}
              </Text>
              {selectedPeriod === period && (
                <MaterialIcons
                  name="check"
                  size={20}
                  color={theme.colors.icons.purple}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </>
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
    paddingHorizontal: 2, // ← Горизонтальные отступы
    paddingVertical: 12, // ← Вертикальные отступы
    borderRadius: 8, // ← Скругление углов
    minWidth: 100, // ← Минимальная ширина кнопки
  },
  // ← Текст кнопки периода
  periodButtonText: {
    fontSize: 16, // ← Размер шрифта
    fontWeight: '600', // ← Жирность шрифта
    color: theme.colors.text.primary, // ← Цвет текста (белый)
  },
  // ← Строка дат (справа) - ПРИЖИМАЕМ К ПРАВОМУ КРАЮ
  dateRow: {
    flexDirection: 'row', // ← Горизонтальное расположение
    justifyContent: 'flex-end', // ← Прижимаем к правому краю
    flex: 1, // ← Занимает оставшееся пространство
    marginLeft: 16, // ← Отступ слева от кнопки
  },
  // ← Элемент даты - ФИКСИРОВАННАЯ ШИРИНА
  dateItem: {
    alignItems: 'center', // ← Выравнивание по центру
    width: 20, // ← Ширина как у клеточек в ListHabitCard
    marginLeft: 4, // ← Отступ между элементами (СИНХРОНИЗИРОВАНО с ListHabitCard)
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
  // ← Контент модального окна
  modalContent: {
    paddingVertical: 8, // ← Вертикальные отступы
  },
  // ← Опция периода в модальном окне
  periodOption: {
    flexDirection: 'row', // ← Горизонтальное расположение
    alignItems: 'center', // ← Выравнивание по центру
    justifyContent: 'space-between', // ← Распределение пространства
    paddingVertical: 16, // ← Вертикальные отступы
    paddingHorizontal: 20, // ← Горизонтальные отступы
    borderRadius: 8, // ← Скругление углов
    marginBottom: 4, // ← Отступ снизу
  },
  // ← Активная опция периода
  periodOptionActive: {
    backgroundColor: theme.colors.surface, // ← Цвет фона активной опции
  },
  // ← Текст опции периода
  periodOptionText: {
    fontSize: 16, // ← Размер шрифта
    color: theme.colors.text.primary, // ← Цвет текста (белый)
    fontWeight: '500', // ← Жирность шрифта
  },
  // ← Текст активной опции периода
  periodOptionTextActive: {
    color: theme.colors.icons.purple, // ← Цвет текста активной опции (фиолетовый)
    fontWeight: '600', // ← Жирность шрифта
  },
});
