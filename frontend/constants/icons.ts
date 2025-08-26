// Иконки для привычек, разделенные по категориям
// Все названия проверены на совместимость с Material Design Icons
export const HABIT_ICONS = {
  // Деятельность и работа (12 иконок)
  activity: [
    'briefcase', 'clock', 'phone', 'cart', 'bed', 'book-open', 
    'target', 'headphones', 'leaf', 'wrench', 'fire', 'laptop'
  ],
  
  // Спорт и фитнес (12 иконок)
  sport: [
    'heart-pulse', 'star', 'bike', 'bullseye', 'heart', 'basketball', 
    'dumbbell', 'walk', 'run', 'tennis', 'volleyball', 'swim'
  ],
  
  // Еда и напитки (12 иконок)
  food: [
    'food', 'food-variant', 'apple', 'bread-slice', 'cake', 'coffee',
    'silverware', 'bowl', 'bottle-wine-outline', 'water', 'cup-water', 'glass-mug'
  ],
  
  // Искусство и творчество (12 иконок)
  art: [
    'image', 'brush', 'camera', 'palette', 'pencil', 'music',
    'microphone', 'film', 'video', 'notebook', 'piano', 'guitar'
  ],
  
  // Финансы и деньги (12 иконок)
  finance: [
    'cash', 'wallet', 'office-building', 'coins', 'credit-card', 'currency-usd',
    'currency-eur', 'currency-jpy', 'currency-gbp', 'bitcoin', 'piggy-bank', 'chart-line'
  ]
};

// Получить все иконки в одном массиве (для обратной совместимости)
export const getAllIcons = (): string[] => {
  return Object.values(HABIT_ICONS).flat();
};

// Получить иконки по категории
export const getIconsByCategory = (category: keyof typeof HABIT_ICONS): string[] => {
  return HABIT_ICONS[category];
};
