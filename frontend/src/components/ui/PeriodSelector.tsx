import React, { useState } from 'react'; // ← Импорт React для создания компонента
import { View, TouchableOpacity, StyleSheet } from 'react-native'; // ← Базовые компоненты React Native
import { Text } from 'react-native-paper'; // ← UI компоненты из react-native-paper
import { MaterialIcons } from '@expo/vector-icons'; // ← Иконки Material Design
import { useApp } from '../../context/AppContext'; // ← Контекст приложения
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
  // Получаем тему из контекста
  const { theme } = useApp();
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
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        paddingHorizontal: 16,
      }}>
        {/* ← Кнопка выбора периода слева */}
        <TouchableOpacity style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: theme.colors.surface,
          paddingHorizontal: 10,
          paddingVertical: 12,
          borderRadius: 8,
          minWidth: 100,
        }} onPress={() => setShowPeriodModal(true)}>
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            color: theme.colors.text.primary,
          }}>
            {getPeriodText()}
          </Text>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={20}
            color={theme.colors.text.primary}
          />
        </TouchableOpacity>
        
        {/* ← Строка дат справа */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          flex: 1,
          marginLeft: 16,
        }}>
          {dateRange.map((date, index) => (
            <View key={index} style={[
              {
                alignItems: 'center',
                width: 20,
                marginLeft: 4,
              },
              index === 0 && { marginLeft: 0 }
            ]}>
              {/* ← Название дня недели */}
              <Text style={{
                fontSize: 12,
                color: theme.colors.text.primary,
                marginBottom: 2,
                fontWeight: '500',
              }}>
                {date.dayName}
              </Text>
              {/* ← Номер дня месяца */}
              <Text style={{
                fontSize: 14,
                fontWeight: '600',
                color: theme.colors.text.primary,
              }}>
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
        <View style={{
          paddingVertical: 8,
        }}>
          {[1, 2, 3, 4, 5, 6, 7].map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: 16,
                  paddingHorizontal: 20,
                  borderRadius: 8,
                  marginBottom: 4,
                },
                selectedPeriod === period && {
                  backgroundColor: theme.colors.surface,
                }
              ]}
              onPress={() => handlePeriodSelect(period)}
            >
              <Text style={[
                {
                  fontSize: 16,
                  color: theme.colors.text.primary,
                  fontWeight: '500',
                },
                selectedPeriod === period && {
                  color: theme.colors.icons.purple,
                  fontWeight: '600',
                }
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


