// Утилиты для форматирования данных

/**
 * Форматирует число с разделителями тысяч
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString('ru-RU');
};

/**
 * Форматирует процентное значение
 */
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${(value * 100).toFixed(decimals)}%`;
};

/**
 * Форматирует время в формате ЧЧ:ММ
 */
export const formatTime = (hours: number, minutes: number): string => {
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

/**
 * Форматирует дату в читаемом формате
 */
export const formatReadableDate = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (date.toDateString() === today.toDateString()) {
    return 'Сегодня';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Вчера';
  } else {
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
};

/**
 * Форматирует дату в коротком формате
 */
export const formatShortDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short'
  });
};

/**
 * Форматирует время выполнения привычки
 */
export const formatHabitTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} мин`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return `${hours} ч`;
    } else {
      return `${hours} ч ${remainingMinutes} мин`;
    }
  }
};

/**
 * Форматирует количество шагов
 */
export const formatSteps = (steps: number): string => {
  if (steps < 1000) {
    return `${steps} шагов`;
  } else if (steps < 10000) {
    return `${(steps / 1000).toFixed(1)} тыс шагов`;
  } else {
    return `${Math.round(steps / 1000)} тыс шагов`;
  }
};

/**
 * Форматирует количество повторений
 */
export const formatRepetitions = (count: number, unit: string = 'раз'): string => {
  if (count === 1) {
    return `1 ${unit}`;
  } else if (count < 5) {
    return `${count} ${unit}а`;
  } else {
    return `${count} ${unit}`;
  }
};

/**
 * Форматирует серию привычек
 */
export const formatStreak = (streak: number): string => {
  if (streak === 0) {
    return 'Нет серии';
  } else if (streak === 1) {
    return '1 день';
  } else if (streak < 5) {
    return `${streak} дня`;
  } else {
    return `${streak} дней`;
  }
};

/**
 * Форматирует размер файла
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Б';
  
  const k = 1024;
  const sizes = ['Б', 'КБ', 'МБ', 'ГБ'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Форматирует имя пользователя для отображения
 */
export const formatUsername = (username: string): string => {
  return username.charAt(0).toUpperCase() + username.slice(1);
};

/**
 * Обрезает текст до указанной длины
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Форматирует цвет для отображения
 */
export const formatColor = (color: string): string => {
  // Убираем # если есть
  const cleanColor = color.startsWith('#') ? color.slice(1) : color;
  
  // Если короткий формат (3 символа), расширяем до 6
  if (cleanColor.length === 3) {
    return '#' + cleanColor.split('').map(char => char + char).join('');
  }
  
  return '#' + cleanColor;
};
