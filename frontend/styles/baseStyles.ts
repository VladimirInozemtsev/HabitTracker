import { StyleSheet } from 'react-native';

// Базовые стили для всего приложения HabitTracker
// СТИЛЬ: Чёрный фон + белый/серый текст + цвета привычек выбирает пользователь

// Цветовая палитра (минималистичная)
export const colors = {
  // Основные цвета
  primary: '#ffffff',        // Белый (основной текст)
  secondary: '#cccccc',      // Светло-серый (вторичный текст)
  
  // Фоны
  background: '#000000',     // Основной фон (чёрный)
  surface: '#1a1a1a',        // Поверхности (карточки)
  card: '#272B33',           // Карточки привычек
  
  // Текст
  text: {
    primary: '#ffffff',      // Основной текст (белый)
    secondary: '#cccccc',    // Вторичный текст (светло-серый)
    disabled: '#666666',     // Отключенный текст (серый)
  },
  
  // Границы
  border: '#333333',         // Границы
  divider: '#333333',        // Разделители
  
  // Статусы (нейтральные)
  success: '#ffffff',        // Успех (белый)
  error: '#ff6b6b',          // Ошибка (красный)
  warning: '#ffa726',        // Предупреждение (оранжевый)
  info: '#4ecdc4',           // Информация (бирюзовый)
  
  // Акценты (минималистичные)
  accent: {
    primary: '#ffffff',      // Основной акцент (белый)
    secondary: '#cccccc',    // Вторичный акцент (серый)
    muted: '#666666',        // Приглушенный (тёмно-серый)
  }
};

// Базовые стили компонентов
export const baseStyles = StyleSheet.create({
  // Контейнеры
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  // Карточки
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    margin: 8,
  },
  
  // Кнопки
  button: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  buttonPrimary: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Текст
  text: {
    color: colors.text.primary,
    fontSize: 16,
  },
  
  textSecondary: {
    color: colors.text.secondary,
    fontSize: 14,
  },
  
  // Заголовки
  title: {
    color: colors.text.primary,
    fontSize: 24,
    fontWeight: 'bold',
  },
  
  subtitle: {
    color: colors.text.secondary,
    fontSize: 18,
    fontWeight: '500',
  },
  
  // Appbar
  appbar: {
    backgroundColor: colors.background,
    elevation: 4,
  },
  
  // Content
  content: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  // Settings
  section: {
    marginVertical: 16,
  },
  
  sectionTitle: {
    color: colors.text.primary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  
  listItem: {
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    marginVertical: 2,
    borderRadius: 8,
  },
  
  listItemTitle: {
    color: colors.text.primary,
    fontSize: 16,
  },
  
  // Поля ввода
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    backgroundColor: colors.surface,
    color: colors.text.primary,
    fontSize: 16,
  },
  
  // Загрузка
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.text.primary,
  },
});

// Функция для получения цвета привычки по ID (fallback)
export const getHabitColor = (habitId: string): string => {
  // Простая функция для получения цвета по ID
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#4CAF50', '#FFA726', '#9C27B0', '#607D8B'];
  const index = habitId.charCodeAt(0) % colors.length;
  return colors[index];
};
