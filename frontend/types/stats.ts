// Типы для статистики пользователя
export interface UserStats {
  total_habits_created: number;
  total_habits_completed: number;
  current_streak: number;
  longest_streak: number;
  completion_rate: number;
  total_days: number;
  average_completion_rate: number;
  most_productive_day?: string;
  least_productive_day?: string;
}

// Типы для аналитики
export interface Analytics {
  daily_completions: DailyCompletion[];
  weekly_stats: WeeklyStats[];
  monthly_stats: MonthlyStats[];
  habit_performance: HabitPerformance[];
  category_stats: CategoryStats[];
}

// Ежедневная статистика
export interface DailyCompletion {
  date: string;
  completed_habits: number;
  total_habits: number;
  completion_rate: number;
}

// Еженедельная статистика
export interface WeeklyStats {
  week_start: string;
  week_end: string;
  total_completions: number;
  average_daily_rate: number;
  best_day: string;
  worst_day: string;
}

// Ежемесячная статистика
export interface MonthlyStats {
  month: string;
  total_completions: number;
  average_daily_rate: number;
  total_days: number;
  completed_days: number;
}

// Производительность привычки
export interface HabitPerformance {
  habit_id: string;
  habit_name: string;
  completion_rate: number;
  current_streak: number;
  longest_streak: number;
  total_completions: number;
}

// Статистика по категориям
export interface CategoryStats {
  category: string;
  habits_count: number;
  average_completion_rate: number;
  total_completions: number;
}
