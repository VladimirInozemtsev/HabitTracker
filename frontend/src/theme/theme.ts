// ЕДИНАЯ СИСТЕМА ЦВЕТОВ ДЛЯ HABIT TRACKER
// Поддержка светлой и темной темы

// Темная тема
const darkTheme = {
  colors: {
    // ОСНОВНЫЕ ЦВЕТА
    primary: '#ffffff',        // Белый (основной акцент)
    secondary: '#cccccc',      // Светло-серый (вторичный)
    
    // ФОНОВЫЕ ЦВЕТА
    background: '#000000',     // Черный фон
    surface: '#1a1a1a',       // Поверхности карточек
    card: '#1a1a1a',           // Карточки привычек
    
    // ТЕКСТОВЫЕ ЦВЕТА
    text: {
      primary: '#ffffff',      // Основной текст (белый)
      secondary: '#cccccc',    // Вторичный текст (светло-серый)
      disabled: '#666666',     // Отключенный текст (серый)
    },
    
    // ГРАНИЦЫ И РАЗДЕЛИТЕЛИ
    border: '#333333',         // Границы
    divider: '#333333',        // Разделители
    
    // СТАТУСЫ И СОСТОЯНИЯ
    success: '#ffffff',        // Успех (белый)
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
    
    // АКЦЕНТЫ
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
      white: '#cccccc',        // Белый
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

// Светлая тема
const lightTheme = {
  colors: {
    // ОСНОВНЫЕ ЦВЕТА
    primary: '#000000',        // Черный (основной акцент)
    secondary: '#333333',      // Темно-серый (вторичный)
    
    // ФОНОВЫЕ ЦВЕТА
    background: '#ffffff',     // Белый фон
    surface: '#f5f5f5',       // Светло-серые поверхности
    card: '#ffffff',           // Белые карточки
    
    // ТЕКСТОВЫЕ ЦВЕТА
    text: {
      primary: '#000000',      // Основной текст (черный)
      secondary: '#333333',    // Вторичный текст (темно-серый)
      disabled: '#999999',     // Отключенный текст (серый)
    },
    
    // ГРАНИЦЫ И РАЗДЕЛИТЕЛИ
    border: '#e0e0e0',         // Светлые границы
    divider: '#e0e0e0',        // Светлые разделители
    
    // СТАТУСЫ И СОСТОЯНИЯ
    success: '#000000',        // Успех (черный)
    warning: '#ffa726',        // Предупреждение (оранжевый)
    error: '#ff6b6b',          // Ошибка (красный)
    info: '#4ecdc4',           // Информация (бирюзовый)
    
    // НАВИГАЦИЯ
    navigation: {
      background: '#f5f5f5',   // Светлый фон навигации
      active: '#000000',       // Активный элемент (черный)
      inactive: '#999999',     // Неактивный элемент (серый)
      border: '#e0e0e0',       // Границы навигации
    },
    
    // АКЦЕНТЫ
    accent: {
      primary: '#000000',      // Основной акцент (черный)
      secondary: '#333333',    // Вторичный акцент (темно-серый)
      muted: '#999999',        // Приглушенный (серый)
    },
    
    // ПАЛИТРА ДЛЯ ИКОНОК НАСТРОЕК (те же цвета)
    icons: {
      pink: '#FF6B9D',         // Розовый
      teal: '#4ECDC4',         // Бирюзовый  
      orange: '#FFA726',       // Оранжевый
      green: '#66BB6A',        // Зеленый
      purple: '#AB47BC',       // Фиолетовый
      red: '#EF5350',          // Красный
      white: '#333333',        // Темно-серый (вместо белого)
    },
    
    // ПАЛИТРА ЦВЕТОВ ПРИВЫЧЕК (те же цвета)
    habitColors: [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#4CAF50', 
      '#FFA726', '#9C27B0', '#607D8B', '#FF1744', '#D500F9', 
      '#651FFF', '#3D5AFE', '#2979FF', '#00B0FF', '#00E5FF', 
      '#1DE9B6', '#00E676', '#76FF03', '#C6FF00', '#FFEA00', 
      '#FFC400', '#FF9100', '#FF3D00', '#E91E63'
    ],
  },
  
  // Размеры шрифтов (те же)
  typography: {
    h1: { fontSize: 32, fontWeight: 'bold' },
    h2: { fontSize: 24, fontWeight: 'bold' },
    h3: { fontSize: 20, fontWeight: '600' },
    body: { fontSize: 16, fontWeight: 'normal' },
    caption: { fontSize: 14, fontWeight: 'normal' },
    button: { fontSize: 16, fontWeight: '600' },
  },
  
  // Отступы и размеры (те же)
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  // Радиусы скругления (те же)
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    round: 50,
  },
  
  // Тени (адаптированы для светлой темы)
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
  },
};

// Функция получения текущей темы
export const getCurrentTheme = (isDark: boolean) => {
  return isDark ? darkTheme : lightTheme;
};

// Экспортируем темную тему как основную (для обратной совместимости)
export const theme = darkTheme;

// УТИЛИТЫ ДЛЯ РАБОТЫ С ЦВЕТАМИ
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
export type Theme = typeof darkTheme;
export type ThemeColors = typeof darkTheme.colors;
export type ThemeTypography = typeof darkTheme.typography;
