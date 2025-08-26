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
export const baseStyles = {
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
  
  // Поля ввода
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    color: colors.text.primary,
  },
  
  // Иконки
  icon: {
    color: colors.text.primary,
  },
  
  iconSecondary: {
    color: colors.text.secondary,
  },
  
  // Списки
  listItem: {
    backgroundColor: colors.surface,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  
  // Навигация
  navigation: {
    backgroundColor: colors.background,
  },
  
  // Модалы
  modal: {
    backgroundColor: colors.background,
  },
  
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 20,
    margin: 20,
  }
};

// Отступы
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

// Скругления
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
};

// Тени
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
};
