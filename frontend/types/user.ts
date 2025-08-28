// Типы для пользователя
export interface User {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  created_at?: string;
  updated_at?: string;
}

// Ответ аутентификации
export interface AuthResponse {
  access: string;
  refresh: string;
  user?: User;
}

// Данные для входа
export interface LoginData {
  username: string;
  password: string;
}

// Данные для регистрации
export interface RegisterData {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}
