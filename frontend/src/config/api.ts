// Конфигурация API
export const apiConfig = {
  // Базовый URL API
  baseURL: 'http://localhost:8000/api',
  
  // Таймауты
  timeout: 10000,
  
  // Заголовки по умолчанию
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  
  // Эндпоинты
  endpoints: {
    // Аутентификация
    auth: {
      login: '/auth/login/',
      logout: '/auth/logout/',
      register: '/auth/register/',
      refresh: '/auth/refresh/',
    },
    
    // Привычки
    habits: {
      list: '/habits/',
      create: '/habits/',
      detail: (id: string) => `/habits/${id}/`,
      update: (id: string) => `/habits/${id}/`,
      delete: (id: string) => `/habits/${id}/`,
      complete: (id: string) => `/habits/${id}/complete/`,
      uncomplete: (id: string) => `/habits/${id}/uncomplete/`,
      completeForDate: (id: string, date: string) => `/habits/${id}/complete/${date}/`,
      uncompleteForDate: (id: string, date: string) => `/habits/${id}/uncomplete/${date}/`,
    },
    
    // Группы
    groups: {
      list: '/groups/',
      create: '/groups/',
      detail: (id: string) => `/groups/${id}/`,
      update: (id: string) => `/groups/${id}/`,
      delete: (id: string) => `/groups/${id}/`,
      habits: (id: string) => `/groups/${id}/habits/`,
    },
    
    // Статистика
    stats: {
      user: '/stats/user/',
      analytics: '/stats/analytics/',
    },
    
    // Пользователи
    users: {
      profile: '/users/profile/',
      update: '/users/profile/',
    },
  },
  
  // Настройки пагинации
  pagination: {
    defaultPageSize: 20,
    maxPageSize: 100,
  },
  
  // Настройки кэширования
  cache: {
    enabled: true,
    ttl: 5 * 60 * 1000, // 5 минут
  },
  
  // Настройки повторных попыток
  retry: {
    enabled: true,
    maxRetries: 3,
    retryDelay: 1000,
  },
};

// Типы для API конфигурации
export type ApiConfig = typeof apiConfig;
export type ApiEndpoints = typeof apiConfig.endpoints;
