// Утилиты для валидации данных

/**
 * Проверяет, является ли строка валидным email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Проверяет, является ли строка валидным именем пользователя
 */
export const isValidUsername = (username: string): boolean => {
  // Имя пользователя должно быть 3-30 символов, только буквы, цифры и подчеркивания
  const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
  return usernameRegex.test(username);
};

/**
 * Проверяет, является ли строка валидным именем привычки
 */
export const isValidHabitName = (name: string): boolean => {
  return name.trim().length >= 1 && name.trim().length <= 100;
};

/**
 * Проверяет, является ли строка валидным описанием
 */
export const isValidDescription = (description: string): boolean => {
  return description.length <= 500;
};

/**
 * Проверяет, является ли строка валидным цветом (hex формат)
 */
export const isValidColor = (color: string): boolean => {
  const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return colorRegex.test(color);
};

/**
 * Проверяет, является ли число валидной целью серии
 */
export const isValidSeriesGoal = (goal: number): boolean => {
  return Number.isInteger(goal) && goal > 0 && goal <= 365;
};

/**
 * Проверяет, является ли число валидной ежедневной целью
 */
export const isValidDailyTarget = (target: number): boolean => {
  return Number.isInteger(target) && target > 0 && target <= 1000;
};

/**
 * Проверяет, является ли строка валидным временем напоминания
 */
export const isValidReminderTime = (time: string): boolean => {
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
};

/**
 * Проверяет, является ли строка валидной датой в формате YYYY-MM-DD
 */
export const isValidDate = (dateString: string): boolean => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) return false;
  
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
};

/**
 * Получает сообщение об ошибке для поля
 */
export const getFieldErrorMessage = (fieldName: string, value: any): string | null => {
  switch (fieldName) {
    case 'email':
      return !isValidEmail(value) ? 'Введите корректный email адрес' : null;
    case 'username':
      return !isValidUsername(value) ? 'Имя пользователя должно содержать 3-30 символов (буквы, цифры, подчеркивания)' : null;
    case 'habitName':
      return !isValidHabitName(value) ? 'Название привычки должно содержать от 1 до 100 символов' : null;
    case 'description':
      return !isValidDescription(value) ? 'Описание не должно превышать 500 символов' : null;
    case 'color':
      return !isValidColor(value) ? 'Выберите корректный цвет' : null;
    case 'seriesGoal':
      return !isValidSeriesGoal(value) ? 'Цель серии должна быть от 1 до 365 дней' : null;
    case 'dailyTarget':
      return !isValidDailyTarget(value) ? 'Ежедневная цель должна быть от 1 до 1000' : null;
    case 'reminderTime':
      return !isValidReminderTime(value) ? 'Введите корректное время в формате ЧЧ:ММ' : null;
    case 'date':
      return !isValidDate(value) ? 'Введите корректную дату в формате ГГГГ-ММ-ДД' : null;
    default:
      return null;
  }
};
