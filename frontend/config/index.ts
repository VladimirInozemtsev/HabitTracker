// Экспорт всех конфигураций
export * from './theme';
export * from './api';
export * from './navigation';
export * from './goals';
export * from './icons';

// Основная конфигурация приложения
export const appConfig = {
  name: 'HabitTracker',
  version: '1.0.0',
  environment: process.env.NODE_ENV || 'development',
  
  // Настройки приложения
  settings: {
    defaultTheme: 'dark',
    language: 'ru',
    timezone: 'Europe/Moscow',
  },
  
  // Настройки разработки
  development: {
    enableLogs: true,
    enableDebugger: true,
    enableHotReload: true,
  },
  
  // Настройки продакшена
  production: {
    enableLogs: false,
    enableDebugger: false,
    enableHotReload: false,
  },
};

// Типы для конфигурации приложения
export type AppConfig = typeof appConfig;
