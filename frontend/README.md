# HabitTracker Frontend

Мобильное приложение для трекинга привычек, построенное на React Native с Expo.

## 🎨 Система дизайна

### Отступы (Spacing)
Используется единая система отступов:
- `xs: 4px` - минимальные отступы
- `sm: 8px` - маленькие отступы  
- `md: 16px` - средние отступы
- `lg: 24px` - большие отступы
- `xl: 32px` - очень большие отступы
- `xxl: 48px` - максимальные отступы

### Цвета
- **Primary**: `#4CAF50` - основной зеленый
- **Background**: `#0D1015` - темный фон
- **Surface**: `#1a1a1a` - фон карточек
- **Text Primary**: `#ffffff` - основной текст
- **Text Secondary**: `#cccccc` - вторичный текст

### Шрифты
- `xs: 12px` - очень маленький
- `sm: 14px` - маленький
- `md: 16px` - средний
- `lg: 18px` - большой
- `xl: 20px` - очень большой
- `xxl: 24px` - заголовки
- `xxxl: 28px` - большие заголовки

## 📁 Структура проекта

```
frontend/
├── components/
│   ├── common/           # Переиспользуемые компоненты
│   │   ├── Button.tsx    # Кнопки с разными вариантами
│   │   ├── Card.tsx      # Карточки
│   │   ├── StatusBadge.tsx # Статусные индикаторы
│   │   └── index.ts      # Экспорт компонентов
│   ├── HabitsScreen.tsx  # Главный экран привычек
│   ├── StatsScreen.tsx   # Экран статистики
│   └── ...               # Другие экраны
├── constants/
│   ├── colors.ts         # Цветовая палитра
│   ├── spacing.ts        # Система отступов
│   ├── theme.ts          # Тема приложения
│   └── index.ts          # Экспорт констант
├── styles/
│   ├── screenStyles.ts   # Общие стили экранов
│   └── modalStyles.ts    # Стили модальных окон
└── App.tsx               # Главный компонент
```

## 🧩 Переиспользуемые компоненты

### Button
```tsx
import { Button } from './components/common';

<Button
  title="Нажми меня"
  onPress={() => {}}
  variant="primary" // primary | secondary | outline
  size="medium"     // small | medium | large
  disabled={false}
/>
```

### Card
```tsx
import { Card } from './components/common';

<Card
  onPress={() => {}}
  padding="medium"  // none | small | medium | large
  margin="medium"   // none | small | medium | large
>
  <Text>Содержимое карточки</Text>
</Card>
```

### StatusBadge
```tsx
import { StatusBadge } from './components/common';

<StatusBadge
  isCompleted={true}
  size={20}
/>
```

## 🎯 Использование системы отступов

```tsx
import { SPACING } from './constants/theme';

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,    // 16px
    marginBottom: SPACING.lg, // 24px
  },
  button: {
    paddingHorizontal: SPACING.sm, // 8px
    paddingVertical: SPACING.xs,   // 4px
  },
});
```

## 🚀 Запуск проекта

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm start

# Запуск на Android
npm run android

# Запуск на iOS
npm run ios
```

## 📱 Технологии

- **React Native** - фреймворк для мобильной разработки
- **Expo** - платформа для разработки
- **React Native Paper** - UI библиотека
- **TypeScript** - типизированный JavaScript

## 🎨 Принципы дизайна

1. **Единообразие** - все отступы и размеры из системы дизайна
2. **Переиспользование** - общие компоненты для повторяющихся элементов
3. **Темная тема** - современный темный дизайн
4. **Адаптивность** - поддержка разных размеров экранов
