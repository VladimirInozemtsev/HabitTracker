// Типы для групп привычек
export interface Group {
  id: string;
  name: string;
  description: string;
  color: string;
  created_at?: string;
  updated_at?: string;
  habits_count?: number;
}

// Данные для создания новой группы
export interface CreateGroupData {
  name: string;
  description: string;
  color: string;
}

// Данные для обновления группы
export interface UpdateGroupData extends Partial<CreateGroupData> {
  id: string;
}

// Группа с привычками
export interface GroupWithHabits extends Group {
  habits: Habit[];
}

// Импортируем тип Habit из habit.ts
import { Habit } from './habit';
