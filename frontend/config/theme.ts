// Конфигурация темы приложения
export const theme = {
  colors: {
    // Основные цвета
    primary: '#4CAF50',
    secondary: '#2196F3',
    accent: '#FF9800',
    
    // Фоновые цвета
    background: '#121212',
    surface: '#1E1E1E',
    card: '#2D2D2D',
    
    // Текстовые цвета
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
      disabled: '#666666',
    },
    
    // Цвета статусов
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
    
    // Цвета навигации
    navigation: {
      background: '#1A1A1A',
      active: '#4CAF50',
      inactive: '#666666',
    },
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

// Типы для темы
export type Theme = typeof theme;
export type ThemeColors = typeof theme.colors;
export type ThemeTypography = typeof theme.typography;
