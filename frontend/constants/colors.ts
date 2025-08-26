// Яркие разнообразные цвета без повторов (24 цвета)
export const HABIT_COLORS = [
  '#00FF88', // неоновый зеленый
  '#FF00FF', // неоновый пурпурный
  '#FF4444', // неоновый красный
  '#00FFFF', // неоновый голубой
  '#FFFF00', // неоновый желтый
  '#FF0080', // неоновый розовый
  '#8000FF', // неоновый фиолетовый
  '#00FF00', // неоновый лайм
  '#FF8800', // оранжевый
  '#1E90FF', // голубой
  '#FFD700', // золотой
  '#FF1493', // розово-красный
  '#9400D3', // темно-фиолетовый
  '#32CD32', // лаймово-зеленый
  '#FF69B4', // ярко-розовый
  '#00FA9A', // весенне-зеленый
  '#8A2BE2', // сине-фиолетовый
  '#FF6B6B', // коралловый
  '#40E0D0', // бирюзовый
  '#DC143C', // малиновый
  '#9370DB', // средне-фиолетовый
  '#4169E1', // королевский синий
  '#FF4500', // красно-оранжевый
  '#20B2AA', // светло-морской
];

// Получить цвет для привычки по ID
export const getHabitColor = (habitId: string): string => {
  const hash = habitId.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  return HABIT_COLORS[Math.abs(hash) % HABIT_COLORS.length];
};

// Получить случайный цвет
export const getRandomColor = (): string => {
  return HABIT_COLORS[Math.floor(Math.random() * HABIT_COLORS.length)];
};

// Получить светлую версию цвета для фона
export const getLightColor = (color: string, opacity: number = 0.2): string => {
  // Простое затемнение цвета для фона
  return color + Math.floor(opacity * 255).toString(16).padStart(2, '0');
};
