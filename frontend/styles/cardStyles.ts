import { StyleSheet } from 'react-native';
import { theme } from '../config/theme';
import { getMutedColor } from '../utils/colors';

export const cardStyles = StyleSheet.create({
  // Стили для карточек привычек
  habitCard: {
    marginBottom: 10, // Уменьшаем отступы между карточками
    marginHorizontal: 20, // Добавляем небольшие боковые отступы
    elevation: 2,
    backgroundColor: theme.colors.card, // Темный фон карточки
  },
  habitCardTablet: {
    // Убираем backgroundColor - оставляем только специфичные для планшетов стили
    // backgroundColor: theme.colors.surface, // Более темный фон для планшетов (991px breakpoint)
  },
  habitCardContent: {
    paddingVertical: 0, // Убираем вертикальные отступы полностью
    paddingHorizontal: 0, // Убираем горизонтальные паддинги Card.Content, чтобы сетка растягивалась
  },
  habitCardContentTablet: {
    marginHorizontal: 20, // Add margin for tablet screens
  },
  habitInfo: {
    flex: 1,
  },
  habitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0, // Отступ как у сетки
    paddingVertical: 8, // Отступы сверху и снизу
  },
  habitIconContainer: {
    marginRight: 0, // отступ от центрального блока (как у сетки)
    width: 60, // фиксированная ширина квадратного контейнера (как ячейки сетки)
    height: 60, // фиксированная высота квадратного контейнера (как ячейки сетки)
    borderRadius: 8, // скругление углов контейнера
    borderWidth: 0, // убираем рамку
    backgroundColor: 'transparent', // прозрачный фон
    alignItems: 'center', // центрирование иконки по горизонтали
    justifyContent: 'center', // центрирование иконки по вертикали
  },
  habitTextContainer: {
    flex: 1, // занимает всё доступное пространство между иконкой и статусом
    marginHorizontal: 8, // отступы слева и справа от текстовых блоков
  },
  habitNameContainer: {
    marginBottom: 0, // уменьшаем отступ между названием и описанием
    paddingHorizontal: 12, // увеличиваем внутренние отступы текста
    paddingVertical: 0, // увеличиваем внутренние отступы текста
    borderRadius: 6, // скругление углов текстового блока
    borderWidth: 0, // убираем рамку
    backgroundColor: 'transparent', // прозрачный фон (сливается с карточкой)
  },
  habitDescriptionContainer: {
    paddingHorizontal: 12, // увеличиваем внутренние отступы текста
    paddingVertical: 6, // увеличиваем внутренние отступы текста
    borderRadius: 6, // скругление углов текстового блока
    borderWidth: 0, // убираем рамку
    backgroundColor: 'transparent', // прозрачный фон (сливается с карточкой)
  },
  habitStatusContainer: {
    marginLeft: 8, // отступ от центрального блока (как у сетки)
    width: 44, // фиксированная ширина квадратного контейнера (как ячейки сетки)
    height: 44, // фиксированная высота квадратного контейнера (как ячейки сетки)
    borderRadius: 8, // скругление углов контейнера (как у иконки)
    borderWidth: 0, // убираем рамку
    backgroundColor: 'transparent', // прозрачный фон
    alignItems: 'center', // центрирование иконки по горизонтали
    justifyContent: 'center', // центрирование иконки по вертикали
  },
  habitStatusIndicator: {
    margin: 0,
    width: 60,
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  habitDetails: {
    marginBottom: 8,
  },
  habitName: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20, // увеличиваем размер шрифта
    color: theme.colors.text.primary, // Белый текст для темной темы
    flex: 1,
  },
  habitDescription: {
    fontFamily: 'Inter_400Regular',
    fontSize: 18, // увеличиваем размер шрифта
    color: theme.colors.text.secondary, // Светло-серый текст для темной темы
    marginBottom: 0,
  },
  habitMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  streakChip: {
    backgroundColor: theme.colors.surface, // Темный фон для чипов
  },
  groupChip: {
    backgroundColor: 'transparent',
  },
  habitStatus: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  habitStatusMobile: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Стили для детальной страницы привычки
  habitDetailContainer: {
    padding: 16,
  },
  habitDetailCard: {
    backgroundColor: theme.colors.surface,
    marginBottom: 16,
  },
  habitDetailName: {
    color: theme.colors.text.primary,
    marginBottom: 8,
  },
  habitDetailDescription: {
    color: theme.colors.text.secondary,
    marginBottom: 16,
  },
  habitDetailStats: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
});

// Функция для генерации стилей статуса с цветом
export const getHabitStatusStyle = (baseColor: string, isCompleted: boolean) => ({
  ...cardStyles.habitStatusIndicator,
  backgroundColor: isCompleted ? baseColor : getMutedColor(baseColor),
});

// Функция для генерации стилей иконки с цветом (если нужен цветной фон)
export const getHabitIconStyle = (baseColor: string) => ({
  ...cardStyles.habitIconContainer,
  backgroundColor: getMutedColor(baseColor), // Всегда приглушенный цвет для иконки
});
