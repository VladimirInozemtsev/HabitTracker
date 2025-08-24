// Цветовые схемы для привычек (как в HabitKit)
export const habitColors = [
  '#FF6B6B', // красный
  '#4ECDC4', // бирюзовый
  '#45B7D1', // голубой
  '#96CEB4', // зеленый
  '#4CAF50', // зеленый (наш основной)
  '#FFA726', // оранжевый
  '#9C27B0', // фиолетовый
  '#607D8B', // серо-синий
  '#FF5722', // красно-оранжевый
  '#795548', // коричневый
  '#9E9E9E', // серый
  '#E91E63', // розовый
];

// Получить цвет для привычки по ID
export const getHabitColor = (habitId: string): string => {
  const hash = habitId.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  return habitColors[Math.abs(hash) % habitColors.length];
};

// Получить случайный цвет
export const getRandomColor = (): string => {
  return habitColors[Math.floor(Math.random() * habitColors.length)];
};
