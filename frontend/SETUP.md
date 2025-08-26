# Настройка проекта HabitTracker Frontend

## Быстрая установка (Windows)

Просто запустите файл `install-deps.bat` двойным кликом!

## Ручная установка зависимостей

```bash
# Перейти в папку frontend
cd frontend

# Установить зависимости
npm install

# Установить типы для React Native
npm install --save-dev @types/react-native

# Исправить зависимости Expo
npx expo install --fix
```

## Возможные проблемы и решения

### 1. Ошибки с типами React Native
Если появляются ошибки "Cannot find module 'react-native'", выполните:

```bash
npm install --save-dev @types/react-native
```

### 2. Проблемы с Expo
Если есть проблемы с Expo, попробуйте:

```bash
# Установить Expo CLI глобально
npm install -g @expo/cli

# Или использовать npx (рекомендуется)
npx expo install --fix
```

### 3. Очистка кэша
Если TypeScript не видит изменения:

```bash
# Очистить кэш TypeScript
rm -rf node_modules/.cache
# Перезапустить IDE
```

## Запуск проекта

```bash
# Запуск в режиме разработки
npm start

# Запуск на Android
npm run android

# Запуск на iOS
npm run ios
```

## Структура типов

Проект использует:
- TypeScript для типизации
- React Native Paper для UI компонентов
- Expo для разработки

Все типы определены в:
- `constants/theme.ts` - тема и стили
- `constants/spacing.ts` - система отступов
- `types/react-native.d.ts` - базовые типы React Native
