// Утилиты для работы с датами

/**
 * Получить текущую дату в формате YYYY-MM-DD в локальном часовом поясе
 */
export const getCurrentDate = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Получить дату в формате YYYY-MM-DD из Date объекта
 */
export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Проверить, является ли дата сегодняшней
 */
export const isToday = (dateString: string): boolean => {
  return dateString === getCurrentDate();
};

/**
 * Получить дату вчера в формате YYYY-MM-DD
 */
export const getYesterday = (): string => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return formatDate(yesterday);
};

/**
 * Получить дату завтра в формате YYYY-MM-DD
 */
export const getTomorrow = (): string => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return formatDate(tomorrow);
};

/**
 * Получить день недели (0-6, где 0 - воскресенье)
 */
export const getDayOfWeek = (dateString?: string): number => {
  const date = dateString ? new Date(dateString) : new Date();
  return date.getDay();
};

/**
 * Получить название дня недели на русском
 */
export const getDayName = (dateString?: string): string => {
  const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  const dayIndex = getDayOfWeek(dateString);
  return days[dayIndex];
};

/**
 * Получить короткое название дня недели на русском
 */
export const getShortDayName = (dateString?: string): string => {
  const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  const dayIndex = getDayOfWeek(dateString);
  return days[dayIndex];
};
