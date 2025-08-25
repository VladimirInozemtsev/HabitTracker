// API клиент для подключения к Django backend
const API_BASE_URL = 'http://localhost:8000/api';

// Интерфейсы TypeScript для типизации данных
export interface Habit {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  streak: number;
  is_completed_today: boolean;
  group?: {
    id: string;
    name: string;
    color: string;
  };
  logs?: Array<{
    id: string;
    date: string;
    status: string;
  }>;
}

export interface User {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
}

// Сохранение токена в localStorage
const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

const setToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

const removeToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};

// Базовая функция для HTTP запросов
const apiRequest = async (endpoint: string, options: RequestInit = {}): Promise<any> => {
  const token = getToken();
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      if (response.status === 401) {
        // Токен истек, нужно перелогиниться
        removeToken();
        throw new Error('Authentication required');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Request error:', error);
    throw error;
  }
};

// API методы
export const api = {
  // Аутентификация
  login: async (username: string, password: string): Promise<AuthResponse> => {
    const response = await apiRequest('/token/', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    
    if (response.access) {
      setToken(response.access);
    }
    
    return response;
  },

  logout: (): void => {
    removeToken();
  },

  // Получить профиль пользователя
  getProfile: async (): Promise<User> => {
    return apiRequest('/users/profile/');
  },

  // Получить список привычек
  getHabits: async (): Promise<Habit[]> => {
    return apiRequest('/habits/');
  },

  // Создать новую привычку
  createHabit: async (habitData: any): Promise<any> => {
    return apiRequest('/habits/', {
      method: 'POST',
      body: JSON.stringify(habitData),
    });
  },

  // Обновить привычку
  updateHabit: async (habitId: string, habitData: any): Promise<any> => {
    return apiRequest(`/habits/${habitId}/`, {
      method: 'PUT',
      body: JSON.stringify(habitData),
    });
  },

  // Отметить привычку как выполненную
  markHabitComplete: async (habitId: string): Promise<any> => {
    return apiRequest(`/habits/${habitId}/complete/`, {
      method: 'POST',
    });
  },

  // Отметить привычку как выполненную на конкретную дату
  markHabitCompleteForDate: async (habitId: string, date: string): Promise<any> => {
    return apiRequest(`/habits/${habitId}/complete/`, {
      method: 'POST',
      body: JSON.stringify({ date }),
    });
  },

  // Убрать отметку выполнения привычки на конкретную дату
  unmarkHabitCompleteForDate: async (habitId: string, date: string): Promise<any> => {
    return apiRequest(`/habits/${habitId}/complete/`, {
      method: 'DELETE',
      body: JSON.stringify({ date }),
    });
  },

  // Получить статистику пользователя
  getUserStats: async (): Promise<any> => {
    return apiRequest('/users/stats/');
  },

  // Получить аналитику
  getAnalytics: async (): Promise<any> => {
    return apiRequest('/analytics/');
  },

  // Получить группы привычек
  getGroups: async (): Promise<any[]> => {
    return apiRequest('/habits/groups/');
  },

  // Создать новую группу
  createGroup: async (groupData: any): Promise<any> => {
    return apiRequest('/habits/groups/', {
      method: 'POST',
      body: JSON.stringify(groupData),
    });
  },

  // Получить привычки по группе
  getHabitsByGroup: async (groupId: string): Promise<any[]> => {
    return apiRequest(`/habits/?group=${groupId}`);
  },
};

// Проверка аутентификации
export const isAuthenticated = (): boolean => {
  return getToken() !== null;
};
