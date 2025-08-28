// Типы для API запросов и ответов
export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  success: boolean;
  error?: string;
}

// Пагинированный ответ
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Ошибка API
export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

// Параметры запроса
export interface RequestParams {
  page?: number;
  page_size?: number;
  search?: string;
  ordering?: string;
  filters?: Record<string, any>;
}

// Статус загрузки
export interface LoadingState {
  loading: boolean;
  error: string | null;
  data: any | null;
}

// Импортируем основные типы
import { Habit } from './habit';
import { User } from './user';
import { Group } from './group';
import { UserStats, Analytics } from './stats';
