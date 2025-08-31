// Типы для привычек
export interface Habit {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  streak: number;
  is_completed_today: boolean;
  series_goal?: number;
  categories?: string[];
  tracking_type: 'step' | 'boolean' | 'time';
  daily_target?: number;
  reminder_time?: string;
  is_archived?: boolean;
  archived_at?: string;
  group?: {
    id: string;
    name: string;
    color: string;
  };
  logs?: HabitLog[];
}

// Лог выполнения привычки
export interface HabitLog {
  id: string;
  date: string;
  status: 'completed' | 'skipped' | 'partial';
  value?: number;
}

// Данные для создания новой привычки
export interface CreateHabitData {
  name: string;
  description: string;
  color: string;
  icon: string;
  categories?: string[];
  series_goal?: number;
  tracking_type: 'step' | 'boolean' | 'time';
  daily_target?: number;
  reminder_time?: string;
}

// Данные для обновления привычки
export interface UpdateHabitData extends Partial<CreateHabitData> {
  id: string;
}

// API ответы для архивирования
export interface ArchiveHabitResponse {
  message: string;
  habit_id: string;
}

export interface ArchivedHabitsResponse {
  habits: Habit[];
  count: number;
}
