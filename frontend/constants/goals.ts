// Цели серий для привычек
export const SERIES_GOALS = [
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
  { id: 'health', name: 'Здоровье', icon: 'heart', color: '#00BCD4' },
  { id: 'art', name: 'Искусство', icon: 'palette', color: '#E91E63' },
  { id: 'social', name: 'Общение', icon: 'account-group', color: '#4CAF50' },
  { id: 'nutrition', name: 'Питание', icon: 'food-fork-drink', color: '#FF9800' },
  { id: 'work', name: 'Работа', icon: 'briefcase', color: '#2196F3' },
  { id: 'study', name: 'Учеба', icon: 'school', color: '#9C27B0' },
  { id: 'finance', name: 'Финансы', icon: 'wallet', color: '#4CAF50' },
  { id: 'fitness', name: 'Фитнес', icon: 'bike', color: '#FF5722' },
  { id: 'other', name: 'Другое', icon: 'star', color: '#607D8B' },
  { id: 'morning', name: 'Утро', icon: 'weather-sunny', color: '#FFC107' },
  { id: 'day', name: 'День', icon: 'white-balance-sunny', color: '#FF9800' },
  { id: 'evening', name: 'Вечер', icon: 'weather-night', color: '#3F51B5' },
];
