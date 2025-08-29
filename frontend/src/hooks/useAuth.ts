import { useState, useCallback } from 'react';
import { api, isAuthenticated } from '../services/api';
import { User, AuthResponse, LoginData } from '../types';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Проверка аутентификации
  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (isAuthenticated()) {
        setIsLoggedIn(true);
        // Можно добавить загрузку данных пользователя
        // const userData = await api.getCurrentUser();
        // setUser(userData);
        return true;
      } else {
        setIsLoggedIn(false);
        setUser(null);
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка проверки аутентификации');
      console.error('Error checking auth:', err);
      setIsLoggedIn(false);
      setUser(null);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Вход в систему
  const login = useCallback(async (username: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response: AuthResponse = await api.login(username, password);
      
      if (response.access) {
        setIsLoggedIn(true);
        if (response.user) {
          setUser(response.user);
        }
        return response;
      } else {
        throw new Error('Неверные данные для входа');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка входа');
      console.error('Error logging in:', err);
      setIsLoggedIn(false);
      setUser(null);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Автоматический вход с демо-данными
  const loginWithDemo = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await login('demo', 'demo12345');
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка демо-входа');
      console.error('Error demo login:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [login]);

  // Выход из системы
  const logout = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      await api.logout();
      setIsLoggedIn(false);
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка выхода');
      console.error('Error logging out:', err);
      // Даже если ошибка, сбрасываем состояние
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Обновление данных пользователя
  const updateUser = useCallback((userData: User) => {
    setUser(userData);
  }, []);

  return {
    isLoggedIn,
    user,
    loading,
    error,
    checkAuth,
    login,
    loginWithDemo,
    logout,
    updateUser,
  };
};
