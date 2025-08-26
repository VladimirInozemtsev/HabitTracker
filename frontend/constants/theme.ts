import { SPACING, BORDER_RADIUS, FONT_SIZE, LINE_HEIGHT } from './spacing';

// Экспортируем SPACING для использования в компонентах
export { SPACING, BORDER_RADIUS, FONT_SIZE, LINE_HEIGHT };

// Цветовая палитра приложения
export const COLORS = {
  // Основные цвета
  primary: '#4CAF50',
  secondary: '#2196F3',
  accent: '#FF9800',
  
  // Фоны
  background: '#0D1015',
  surface: '#1a1a1a',
  surfaceVariant: '#2a2a2a',
  
  // Текст
  text: {
    primary: '#ffffff',
    secondary: '#cccccc',
    tertiary: '#999999',
    disabled: '#666666',
  },
  
  // Границы
  border: '#333333',
  borderLight: '#444444',
  
  // Статусы
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FF9800',
  info: '#2196F3',
  
  // Состояния
  overlay: 'rgba(0, 0, 0, 0.7)',
  ripple: 'rgba(255, 255, 255, 0.1)',
} as const;

// Общие стили для компонентов
export const COMMON_STYLES = {
  // Контейнеры
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  
  // Карточки
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  
  // Кнопки
  button: {
    primary: {
      backgroundColor: COLORS.primary,
      borderRadius: BORDER_RADIUS.md,
      paddingVertical: SPACING.sm,
      paddingHorizontal: SPACING.md,
      alignItems: 'center',
      justifyContent: 'center',
    },
    secondary: {
      backgroundColor: COLORS.surface,
      borderRadius: BORDER_RADIUS.md,
      paddingVertical: SPACING.sm,
      paddingHorizontal: SPACING.md,
      borderWidth: 1,
      borderColor: COLORS.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: COLORS.text.primary,
      fontSize: FONT_SIZE.md,
      fontWeight: '600',
    },
  },
  
  // Инпуты
  input: {
    backgroundColor: COLORS.surfaceVariant,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    color: COLORS.text.primary,
    fontSize: FONT_SIZE.md,
  },
  
  // Заголовки
  title: {
    large: {
      fontSize: FONT_SIZE.xxxl,
      fontWeight: 'bold',
      color: COLORS.text.primary,
      marginBottom: SPACING.sm,
    },
    medium: {
      fontSize: FONT_SIZE.xxl,
      fontWeight: 'bold',
      color: COLORS.text.primary,
      marginBottom: SPACING.sm,
    },
    small: {
      fontSize: FONT_SIZE.lg,
      fontWeight: '600',
      color: COLORS.text.primary,
      marginBottom: SPACING.xs,
    },
  },
  
  // Текст
  text: {
    body: {
      fontSize: FONT_SIZE.md,
      color: COLORS.text.primary,
      lineHeight: LINE_HEIGHT.md,
    },
    caption: {
      fontSize: FONT_SIZE.sm,
      color: COLORS.text.secondary,
      lineHeight: LINE_HEIGHT.sm,
    },
    label: {
      fontSize: FONT_SIZE.sm,
      color: COLORS.text.secondary,
      fontWeight: '500',
      marginBottom: SPACING.xs,
    },
  },
  
  // Отступы
  spacing: {
    xs: SPACING.xs,
    sm: SPACING.sm,
    md: SPACING.md,
    lg: SPACING.lg,
    xl: SPACING.xl,
  },
} as const;

// Тема для React Native Paper
export const PAPER_THEME = {
  dark: true,
  colors: {
    primary: COLORS.primary,
    secondary: COLORS.secondary,
    background: COLORS.background,
    surface: COLORS.surface,
    surfaceVariant: COLORS.surfaceVariant,
    onPrimary: COLORS.text.primary,
    onSecondary: COLORS.text.primary,
    onBackground: COLORS.text.primary,
    onSurface: COLORS.text.primary,
    onSurfaceVariant: COLORS.text.secondary,
    outline: COLORS.border,
    outlineVariant: COLORS.borderLight,
  },
};
