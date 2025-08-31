# Habit Tracker Frontend - Техническая документация

## 🎯 Обзор проекта
**React Native + Expo приложение** для трекинга привычек с поддержкой веб и мобильных платформ.

## 🛠 Технический стек
- **Framework**: React Native 0.79.6 + Expo ~53.0.22
- **UI Library**: React Native Paper 5.14.5
- **Language**: TypeScript 5.8.3
- **Icons**: React Native Vector Icons 10.3.0
- **Fonts**: Google Fonts Inter
- **State**: Context API + Custom Hooks
- **Storage**: localStorage (web) / планируется AsyncStorage (mobile)

---

## 📁 Архитектура проекта

### 🎨 Дизайн-система
**Тема**: Черный фон + белый/серый текст. Цветовые акценты выбираются пользователем для привычек.
- **Темная тема**: `#000000` фон, `#ffffff` текст, `#1a1a1a` поверхности
- **Светлая тема**: `#F4E4BC` фон (топленое молоко), `#000000` текст
- **Навигация**: белый/серый без зеленых акцентов
- **Палитра привычек**: 24 цвета для пользовательского выбора

### 🔧 Принципы архитектуры
1. **Модульность**: Разделение по функциональности (components, hooks, screens, services)
2. **Типизация**: Строгий TypeScript для всех интерфейсов
3. **Централизованное состояние**: Context API + custom hooks
4. **Responsive design**: Адаптация под планшеты и телефоны
5. **Кроссплатформенность**: React Native Web + Expo

---

## 📂 Структура папок

### `/src/components/`
**UI компоненты и модальные окна**

#### `/ui/` - Основные UI компоненты
- `HabitCard.tsx` - Карточка привычки с сеткой истории
- `HabitGrid.tsx` - Календарная сетка выполнения (GitHub-style)
- `BottomNavigation.tsx` - Нижняя навигация
- `Modal.tsx` - Базовый модальный компонент
- `ModalManager.tsx` - Менеджер всех модалок
- `CreateHabitModal.tsx` - Создание привычки
- `ViewSelector.tsx` - Переключатель видов (сетка/список)
- `PeriodSelector.tsx` - Выбор периода отображения

#### `/modals/` - Модальные окна
- `RemindersModal.tsx` - Настройка напоминаний
- `ReminderNotificationModal.tsx` - Уведомления напоминаний
- `TimePickerModal.tsx` - Выбор времени
- `SortHabitsModal.tsx` - Сортировка привычек
- `ArchiveMenuModal.tsx` - Меню архивирования

### `/src/screens/PostLogin/`
**Экраны после авторизации**
- `HabitsScreen.tsx` - Главный экран с привычками
- `HabitDetailScreen.tsx` - Детали привычки + календар
- `StatsScreen.tsx` - Статистика пользователя
- `AnalyticsScreen.tsx` - Аналитика
- `SettingsScreen.tsx` - Главные настройки
- `GeneralSettingsScreen.tsx` - Общие настройки приложения
- `ArchiveScreen.tsx` - Архивные привычки
- `GroupsScreen.tsx` - Группы привычек
- `ProfileScreen.tsx` - Профиль пользователя

### `/src/hooks/`
**Custom React Hooks**
- `useHabits.ts` - Управление привычками (CRUD, архив)
- `useAuth.ts` - Аутентификация и авторизация
- `useGroups.ts` - Работа с группами привычек
- `useNavigation.ts` - Навигация между экранами
- `useResponsive.ts` - Адаптивность под планшеты
- `useReminders.ts` - Система напоминаний
- `useAppLogic.ts` - Центральная бизнес-логика

### `/src/context/`
**Глобальное состояние**
- `AppContext.tsx` - Центральный контекст приложения
  - Объединяет все хуки
  - Управляет темой (темная/светлая)
  - Глобальные модальные состояния
  - Настройки сортировки и отображения

### `/src/services/`
**Внешние сервисы**
- `api.ts` - HTTP клиент для работы с Django backend
  - Типизированные API вызовы
  - Обработка ошибок
  - Методы для привычек, групп, статистики

### `/src/theme/`
**Система стилей**

#### `theme.ts` - Основная тема
- Цветовые схемы (темная/светлая)
- Типография (Inter шрифты)
- Отступы и размеры
- Тени и радиусы

#### `/styles/` - Модульные стили
- `cardStyles.ts` - Стили карточек привычек
- `remindersModalStyles.ts` - Стили модалки напоминаний
- `timePickerModalStyles.ts` - Стили выбора времени
- `reminderNotificationStyles.ts` - Стили уведомлений
- `index.ts` - Экспорт всех стилей

### `/src/types/`
**TypeScript интерфейсы**
- `habit.ts` - Типы привычек и их логов
- `user.ts` - Типы пользователей
- `group.ts` - Типы групп привычек
- `stats.ts` - Типы статистики
- `api.ts` - Типы API ответов

### `/src/utils/`
**Утилиты и хелперы**
- `date.ts` - Работа с датами
- `format.ts` - Форматирование данных
- `validation.ts` - Валидация форм
- `colors.ts` - ⚠️ УСТАРЕЛ (использовать theme.ts)
- `streak.ts` - Подсчет стриков
- `sortHabits.ts` - Сортировка привычек

### `/src/config/`
**Конфигурация**
- `api.ts` - Настройки API (endpoints, timeouts, retry)
- `goals.ts` - Конфигурация целей
- `icons.ts` - Набор доступных иконок

---

## 🎯 Ключевые паттерны и принципы

### 1. **Управление состоянием**
```typescript
// Центральный контекст объединяет все хуки
const { habits, auth, groups, navigation, theme } = useApp();

// Каждый домен имеет свой хук
const { loadHabits, addHabit, archiveHabit } = useHabits();
```

### 2. **Стилизация**
```typescript
// Темизированные стили
const { theme } = useApp();
const cardStyles = createCardStyles(theme);

// Цвета привычек
const baseColor = habit.color || getHabitColor(habit.id);
```

### 3. **Типизация**
```typescript
// Строгая типизация всех компонентов
interface HabitCardProps {
  habit: Habit;
  isTablet: boolean;
  onPress: () => void;
  highlightCurrentDay?: boolean;
}
```

### 4. **API взаимодействие**
```typescript
// Типизированные API вызовы
const habits = await api.getHabits();
const newHabit = await api.createHabit(habitData);
```

### 5. **Responsive Design**
```typescript
// Адаптация под планшеты
const { responsive } = useApp();
style={[baseStyle, responsive.isTablet && tabletStyle]}
```

---

## 🔄 Потоки данных

### Загрузка привычек:
`App.tsx` → `useAppLogic()` → `useHabits()` → `api.getHabits()` → `HabitsScreen`

### Создание привычки:
`CreateHabitModal` → `useAppLogic()` → `useHabits.addHabit()` → `api.createHabit()`

### Переключение темы:
`SettingsScreen` → `useApp().toggleTheme()` → `localStorage` → `theme.ts`

---

## ⚙️ Настройки и конфигурация

### Локальное хранение (localStorage):
- `habitTrackerTheme` - тема (темная/светлая)
- `habitTrackerSettings` - общие настройки
- `habitTrackerSortType` - тип сортировки
- `reminderSettings` - настройки напоминаний

### API конфигурация:
- Base URL: `http://localhost:8000/api`
- Timeout: 10 секунд
- Retry: до 3 попыток
- Cache TTL: 5 минут

---

## 📱 Особенности платформ

### Web (React Native Web):
- localStorage для настроек
- Адаптивная верстка
- Поддержка тем

### Mobile (планируется):
- AsyncStorage вместо localStorage
- Push уведомления
- Нативная навигация

---

## 🐛 Отладка и разработка

### Логирование:
- `console.log` для отладочной информации
- `console.error` для ошибок API
- React DevTools для состояния

---

## 🚨 Важные замечания

1. **НЕ используйте устаревший `colors.ts`** - только `theme.ts`
2. **Команды с `&&` не поддерживаются** - выполняйте отдельно
3. **Рефакторинг только пошагово** - не ломайте приложение
4. **Комментарии на русском языке** - для команды
5. **Зеленый цвет НЕ используется** в навигации
6. **Тема по умолчанию**: темная (черный фон)
7. **НЕ запускайте приложение** - пользователь сам контролирует запуск
8. **Переиспользуйте готовые компоненты** - избегайте дублирования кода

## 🔧 Доступные MCP серверы

### Context7
- Документация библиотек и фреймворков
- Актуальные примеры кода React Native/TypeScript
- Best practices для современной разработки

### BlueStone Apps
- Готовые компоненты React Native
- Примеры экранов и хуков
- Стандарты архитектуры мобильных приложений

---

*Документация обновлена: август 2025*
*Версия: 1.0.0*
