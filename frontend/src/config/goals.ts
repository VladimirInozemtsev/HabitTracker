// Цели серий для привычек
export const SERIES_GOALS = [
  { value: 1, label: 'ежедневно' },
  { value: 7, label: '7 дней' },
  { value: 21, label: '21 день' },
  { value: 30, label: '30 дней' },
  { value: 60, label: '60 дней' },
  { value: 90, label: '90 дней' },
  { value: 100, label: '100 дней' }
];

// Типы отслеживания
export const TRACKING_TYPES = {
  step: 'step',
  custom: 'custom'
} as const;

export type TrackingType = typeof TRACKING_TYPES[keyof typeof TRACKING_TYPES];

// Категории привычек с иконками
export const HABIT_CATEGORIES = [
  { id: 'health', name: 'Здоровье', icon: 'heart-pulse' },
  { id: 'art', name: 'Искусство', icon: 'palette' },
  { id: 'social', name: 'Общение', icon: 'account-group' },
  { id: 'nutrition', name: 'Питание', icon: 'food' },
  { id: 'work', name: 'Работа', icon: 'briefcase' },
  { id: 'study', name: 'Учеба', icon: 'book-open' },
  { id: 'finance', name: 'Финансы', icon: 'wallet' },
  { id: 'fitness', name: 'Фитнес', icon: 'dumbbell' },
  { id: 'other', name: 'Другое', icon: 'star' },
  { id: 'morning', name: 'Утро', icon: 'weather-sunny' },
  { id: 'day', name: 'День', icon: 'white-balance-sunny' },
  { id: 'evening', name: 'Вечер', icon: 'weather-night' },
];
