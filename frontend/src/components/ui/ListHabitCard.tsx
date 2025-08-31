import React, { useState } from 'react'; // ← Импорт React для создания компонента
import { View, TouchableOpacity, StyleSheet } from 'react-native'; // ← Базовые компоненты React Native
import { Text } from 'react-native-paper'; // ← UI компоненты из react-native-paper
import { MaterialIcons } from '@expo/vector-icons'; // ← Иконки Material Design
import { Habit } from '../../types/habit'; // ← Тип данных привычки из API
import { getHabitColor } from '../../theme/theme'; // ← Функция получения цвета привычки

import { useApp } from '../../context/AppContext'; // ← Контекст приложения
import { getMutedColor } from '../../theme/theme'; // ← Функция получения приглушенного цвета
import { ArchiveMenuModal } from '../modals/ArchiveMenuModal';

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
  // Получаем тему из контекста
  const { theme } = useApp();
  
  // Состояние для модального окна архивирования
  const [showArchiveModal, setShowArchiveModal] = useState(false);
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
    <>
      {/* ← Основной контейнер карточки (нажимаемый) */}
      <TouchableOpacity 
        style={{
          flexDirection: 'row',
          alignItems: 'center' as const,
          backgroundColor: theme.colors.surface,
          borderRadius: 12,
          padding: 5,
          marginBottom: 5,
          elevation: 2,
          minHeight: 30,
          maxHeight: 50,
        }} 
        onPress={onPress}
        onLongPress={() => setShowArchiveModal(true)}
        activeOpacity={0.8}
      >
      {/* ← Иконка статуса слева */}
      <TouchableOpacity
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          justifyContent: 'center' as const,
          alignItems: 'center' as const,
          marginRight: 12,
          backgroundColor: habit.is_completed_today ? baseColor : getMutedColor(baseColor),
        }}
        onPress={onToggleStatus}
        disabled={!onToggleStatus}
        activeOpacity={0.7}
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
          {
            flex: 1,
            fontSize: 16,
            fontWeight: '600',
            color: theme.colors.text.primary,
            marginLeft: 2,
            marginRight: 12,
            paddingHorizontal: 4,
            paddingVertical: 6,
            borderRadius: 6,
          },
          { backgroundColor: getMutedColor(baseColor) }
        ]} 
        numberOfLines={1}
      >
        {habit.name}
      </Text>
      
      {/* ← Сетка статусов справа */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 10,
      }}>
        {statusGrid.map((status, index) => (
          // ← Квадрат статуса дня
          <View
            key={index}
            style={[
              {
                width: 20,
                height: 20,
                borderRadius: 4,
                marginLeft: 4,
              },
              { backgroundColor: getMutedColor(baseColor) },
              status.completed && { backgroundColor: baseColor },
              highlightCurrentDay && status.isToday && {
                borderWidth: 1,
                borderColor: theme.colors.text.primary,
              },
              index === 0 && { marginLeft: 0 }
            ]}
          />
        ))}
      </View>
    </TouchableOpacity>

    {/* Модальное окно архивирования */}
    <ArchiveMenuModal
      visible={showArchiveModal}
      habit={habit}
      onClose={() => setShowArchiveModal(false)}
    />
  </>
  );
};


