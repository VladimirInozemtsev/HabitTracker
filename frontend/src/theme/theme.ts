// ЕДИНАЯ СИСТЕМА ЦВЕТОВ ДЛЯ HABIT TRACKER
// Объединяет все цвета из baseStyles.ts + добавляет новые
export const theme = {
  colors: {
    // ОСНОВНЫЕ ЦВЕТА
    primary: '#ffffff',        // Белый (основной акцент) - из baseStyles
    secondary: '#cccccc',      // Светло-серый (вторичный) - из baseStyles
    
    // ФОНОВЫЕ ЦВЕТА (унифицированы)
    background: '#000000',     // Черный фон (из baseStyles как основной)
    surface: '#1a1a1a',       // Поверхности карточек (из baseStyles)
    card: '#1a1a1a',           // Карточки привычек (из baseStyles)
    
    // ТЕКСТОВЫЕ ЦВЕТА
    text: {
      primary: '#ffffff',      // Основной текст (белый)
      secondary: '#cccccc',    // Вторичный текст (светло-серый)
      disabled: '#666666',     // Отключенный текст (серый)
    },
    
    // ГРАНИЦЫ И РАЗДЕЛИТЕЛИ
    border: '#333333',         // Границы - из baseStyles
    divider: '#333333',        // Разделители - из baseStyles
    
    // СТАТУСЫ И СОСТОЯНИЯ
    success: '#ffffff',        // Успех (белый) - минималистично
    warning: '#ffa726',        // Предупреждение (оранжевый)
    error: '#ff6b6b',          // Ошибка (красный)
    info: '#4ecdc4',           // Информация (бирюзовый)
    
    // НАВИГАЦИЯ
    navigation: {
      background: '#1a1a1a',   // Темный фон навигации
      active: '#ffffff',       // Активный элемент (белый)
      inactive: '#666666',     // Неактивный элемент (серый)
      border: '#333333',       // Границы навигации
    },
    
    // АКЦЕНТЫ (минималистичные)
    accent: {
      primary: '#ffffff',      // Основной акцент (белый)
      secondary: '#cccccc',    // Вторичный акцент (серый)
      muted: '#666666',        // Приглушенный (тёмно-серый)
    },
    
    // ПАЛИТРА ДЛЯ ИКОНОК НАСТРОЕК
    icons: {
      pink: '#FF6B9D',         // Розовый
      teal: '#4ECDC4',         // Бирюзовый  
      orange: '#FFA726',       // Оранжевый
      green: '#66BB6A',        // Зеленый
      purple: '#AB47BC',       // Фиолетовый
      red: '#EF5350',          // Красный
    },
    
    // ПАЛИТРА ЦВЕТОВ ПРИВЫЧЕК
    habitColors: [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#4CAF50', 
      '#FFA726', '#9C27B0', '#607D8B', '#FF1744', '#D500F9', 
      '#651FFF', '#3D5AFE', '#2979FF', '#00B0FF', '#00E5FF', 
      '#1DE9B6', '#00E676', '#76FF03', '#C6FF00', '#FFEA00', 
      '#FFC400', '#FF9100', '#FF3D00', '#E91E63'
    ],
  },
  
  // Размеры шрифтов
  typography: {
    h1: { fontSize: 32, fontWeight: 'bold' },
    h2: { fontSize: 24, fontWeight: 'bold' },
    h3: { fontSize: 20, fontWeight: '600' },
    body: { fontSize: 16, fontWeight: 'normal' },
    caption: { fontSize: 14, fontWeight: 'normal' },
    button: { fontSize: 16, fontWeight: '600' },
  },
  
  // Отступы и размеры
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  // Радиусы скругления
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    round: 50,
  },
  
  // Тени
  shadows: {
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
  },
};

// УТИЛИТЫ ДЛЯ РАБОТЫ С ЦВЕТАМИ (из baseStyles.ts)
export const getHabitColor = (habitId: string): string => {
  const colors = theme.colors.habitColors;
  const index = habitId.charCodeAt(0) % colors.length;
  return colors[index];
};

// Дополнительные утилиты для цветов
export const getIconColor = (iconType: keyof typeof theme.colors.icons): string => {
  return theme.colors.icons[iconType];
};

// Типы для темы
export type Theme = typeof theme;
export type ThemeColors = typeof theme.colors;
export type ThemeTypography = typeof theme.typography;
