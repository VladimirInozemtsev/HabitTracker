// Утилиты для работы с цветами

/**
 * Создает приглушенный цвет с прозрачностью
 */
export const getMutedColor = (color: string): string => {
  return `${color}60`;
};

/**
 * Создает более светлый оттенок цвета
 */
export const getLightColor = (color: string): string => {
  // Убираем # если есть
  const cleanColor = color.startsWith('#') ? color.slice(1) : color;
  
  // Конвертируем в RGB
  const r = parseInt(cleanColor.slice(0, 2), 16);
  const g = parseInt(cleanColor.slice(2, 4), 16);
  const b = parseInt(cleanColor.slice(4, 6), 16);
  
  // Делаем светлее на 30%
  const lightR = Math.min(255, r + (255 - r) * 0.3);
  const lightG = Math.min(255, g + (255 - g) * 0.3);
  const lightB = Math.min(255, b + (255 - b) * 0.3);
  
  return `#${Math.round(lightR).toString(16).padStart(2, '0')}${Math.round(lightG).toString(16).padStart(2, '0')}${Math.round(lightB).toString(16).padStart(2, '0')}`;
};

/**
 * Создает более темный оттенок цвета
 */
export const getDarkColor = (color: string): string => {
  // Убираем # если есть
  const cleanColor = color.startsWith('#') ? color.slice(1) : color;
  
  // Конвертируем в RGB
  const r = parseInt(cleanColor.slice(0, 2), 16);
  const g = parseInt(cleanColor.slice(2, 4), 16);
  const b = parseInt(cleanColor.slice(4, 6), 16);
  
  // Делаем темнее на 30%
  const darkR = Math.max(0, r * 0.7);
  const darkG = Math.max(0, g * 0.7);
  const darkB = Math.max(0, b * 0.7);
  
  return `#${Math.round(darkR).toString(16).padStart(2, '0')}${Math.round(darkG).toString(16).padStart(2, '0')}${Math.round(darkB).toString(16).padStart(2, '0')}`;
};

/**
 * Проверяет, является ли цвет светлым
 */
export const isLightColor = (color: string): boolean => {
  // Убираем # если есть
  const cleanColor = color.startsWith('#') ? color.slice(1) : color;
  
  // Конвертируем в RGB
  const r = parseInt(cleanColor.slice(0, 2), 16);
  const g = parseInt(cleanColor.slice(2, 4), 16);
  const b = parseInt(cleanColor.slice(4, 6), 16);
  
  // Вычисляем яркость
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
  return brightness > 128;
};

/**
 * Получает контрастный цвет (белый или черный) для текста
 */
export const getContrastColor = (color: string): string => {
  return isLightColor(color) ? '#000000' : '#FFFFFF';
};

/**
 * Создает градиент из двух цветов
 */
export const createGradient = (color1: string, color2: string): string => {
  return `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
};


