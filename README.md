# 🎯 Habit Tracker

[![Status](https://img.shields.io/badge/status-in%20development-orange.svg)](https://github.com/your-username/habit-tracker)
[![Django](https://img.shields.io/badge/Django-5.2.5-green.svg)](https://www.djangoproject.com/)
[![DRF](https://img.shields.io/badge/DRF-3.16.1-blue.svg)](https://www.django-rest-framework.org/)
[![Python](https://img.shields.io/badge/Python-3.12-yellow.svg)](https://www.python.org/)

Кроссплатформенное приложение для отслеживания привычек. Проект активно развивается; цель — практичный, быстрый и удобный инструмент для повседневного использования.

## 🚀 Статус проекта


**Статус:** В разработке  
**Этап:** Бэкенд готов, фронтенд в активной разработке  
**Время разработки:** обновляется по мере прогресса

## 📱 Концепция

Фокус на простоте, скорости и понятном UX. Минимум кликов для ежедневной отметки привычек, наглядная статистика и чистый интерфейс.

## 🏗️ Технический стек

### Backend (✅ Завершен):
- **Django 5.2.5** + **DRF 3.16.1** - API
- **PostgreSQL** (SQLite для dev) - база данных
- **Poetry** - управление зависимостями
- **JWT** - аутентификация
- **UUID7** - безопасные идентификаторы

### Frontend (🔄 В разработке):
- **Expo + React Native**
- **TypeScript**
- **React Native Paper** (компоненты UI)

## 📊 Анализ рынка

Подробный анализ конкурентов и рыночных возможностей в папке [docs/](./docs/):

- [Анализ рынка](./docs/market_research.md) - обзор конкурентов
- [Анализ отзывов](./docs/user_feedback_analysis.md) - проблемы пользователей

### 🎯 Ключевые преимущества:
- Быстрый старт, минимальный онбординг
- Чистый, темный интерфейс по умолчанию
- Простая локальная установка и демо-данные

## 🚀 Быстрый старт

### Требования:
- Python 3.12+
- Poetry (или venv)
- Node.js LTS (для фронтенда)

### Установка и запуск (Backend):

```bash
# Клонирование
git clone https://github.com/your-username/habit-tracker.git
cd habit-tracker

# Backend
poetry install
poetry run python manage.py migrate
poetry run python manage.py createsuperuser
poetry run python manage.py runserver

# Создание демо данных
poetry run python create_test_data.py
```

### Установка и запуск (Frontend):

```bash
cd frontend
npm install
# при необходимости: npx expo install --fix
npx expo start
```

### API эндпоинты:

```bash
# Аутентификация
POST /api/token/
POST /api/users/register/

# Пользователи
GET /api/users/profile/
GET /api/users/stats/

# Привычки
GET /api/habits/
GET /api/habits/groups/

# Аналитика
GET /api/analytics/

# Платежи
GET /api/payments/current/
```

## 📁 Структура проекта

```
habit-tracker/
├── docs/
├── habit_tracker/
├── users/
├── habits/
├── analytics/
├── payments/
├── frontend/               # Мобильное приложение (Expo)
├── dev_journal.md
├── create_test_data.py
├── pyproject.toml
└── README.md
```

## 🎯 Демо данные

Создан демо пользователь для тестирования:
- **Логин:** `demo`
- **Пароль:** `demo12345`
- **Данные:** 5 привычек, 70 логов, реалистичная статистика

## 📈 Метрики проекта

- **Время разработки backend:** 0.5 дня
- **Строк кода:** ~2000
- **API эндпоинтов:** 8 основных
- **Моделей данных:** 6
- **Демо данных:** 5 привычек, 70 логов

## 🔧 Ключевые особенности

### UUID7 архитектура:
```python
def uuid7():
    """Generate UUID7 (timestamp-based UUID)"""
    timestamp_ms = int(time.time() * 1000)
    timestamp_bytes = timestamp_ms.to_bytes(6, 'big')
    random_bytes = random.getrandbits(74).to_bytes(10, 'big')
    uuid_bytes = timestamp_bytes + random_bytes
    return uuid.UUID(bytes=uuid_bytes)
```

### Автоматическая статистика:
- Расчет completion_rate на лету
- Подсчет стриков в реальном времени
- Актуальные данные без команд

## 🗺️ Roadmap (кратко)

- Вёрстка экранов: Группы, Профиль, Аналитика, Категории
- Единая система отступов/типографики, чистка inline-стилей
- Календарь: только выполненные дни закрашены, невыполненные — тонкая рамка
- Аутентификация (JWT), хранение токена, автологин демо-пользователя
- Оптимизации: мемоизация списков, уменьшение лишних перерендеров
- Импорт/экспорт данных; офлайн-режим (кэш)

## 📝 Журнал разработки

Подробный журнал разработки с решениями и уроками: [dev_journal.md](./dev_journal.md)

## 🤝 Вклад в проект

1. Fork проекта
2. Создайте feature branch (`git checkout -b feature/amazing-feature`)
3. Commit изменения (`git commit -m 'Add amazing feature'`)
4. Push в branch (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📄 Лицензия

Этот проект лицензирован под MIT License - см. файл [LICENSE](LICENSE) для деталей.

## 📞 Контакты

- **Автор:** [Владимир Иноземцев]
- **Email:** [vladimir.inozemtzev@yandex.ru]
- **Telegram:** [@VladimirInozemtsev]

---

**Создаем будущее привычек вместе!** 🚀
