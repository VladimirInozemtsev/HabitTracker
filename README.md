# 🎯 Habit Tracker - Русская личная сказка в смартфоне

[![Status](https://img.shields.io/badge/status-in%20development-orange.svg)](https://github.com/your-username/habit-tracker)
[![Django](https://img.shields.io/badge/Django-5.2.5-green.svg)](https://www.djangoproject.com/)
[![DRF](https://img.shields.io/badge/DRF-3.16.1-blue.svg)](https://www.django-rest-framework.org/)
[![Python](https://img.shields.io/badge/Python-3.12-yellow.svg)](https://www.python.org/)

Современное приложение для отслеживания привычек с фокусом на российский рынок. Проект направлен на создание пассивного дохода $10-15K/месяц через 1-2 года.

## 🚀 Статус проекта

**Статус:** В разработке  
**Этап:** Backend завершен, готов к фронтенду  
**Время разработки:** 0.5 дня (backend)

## 📱 Концепция

> "Русская личная сказка в смартфоне" - создаем эмоциональную связь с пользователем вместо сухого технического трекера.

### 🎯 Цели проекта:
- Создать приложение для пассивного дохода
- Заполнить нишу на российском рынке (RuStore)
- Предложить "личную сказку" вместо сухого трекера
- Интегрировать российские платежные системы

## 🏗️ Технический стек

### Backend (✅ Завершен):
- **Django 5.2.5** + **DRF 3.16.1** - API
- **PostgreSQL** (SQLite для dev) - база данных
- **Poetry** - управление зависимостями
- **JWT** - аутентификация
- **UUID7** - безопасные идентификаторы

### Frontend (🔄 В разработке):
- **React Native** - кроссплатформенность
- **Builder.io** - visual AI code editor
- **React** - единый стек с работой

## 📊 Анализ рынка

Подробный анализ конкурентов и рыночных возможностей в папке [docs/](./docs/):

- [Анализ рынка](./docs/market_research.md) - обзор конкурентов
- [Анализ отзывов](./docs/user_feedback_analysis.md) - проблемы пользователей

### 🎯 Ключевые преимущества:
- **RuStore** - низкая конкуренция
- **Российские платежи** - YuMoney, СБП, QIWI
- **Эмоциональная связь** - "личная сказка"
- **Современный UI** - Builder.io для быстрой разработки

## 🚀 Быстрый старт

### Требования:
- Python 3.12+
- Poetry
- Node.js (для фронтенда)

### Установка:

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
├── docs/                    # Документация и анализ
│   ├── market_research.md
│   └── user_feedback_analysis.md
├── habit_tracker/          # Основной проект Django
├── users/                  # Приложение пользователей
├── habits/                 # Приложение привычек
├── analytics/              # Приложение аналитики
├── payments/               # Приложение платежей
├── dev_journal.md          # Журнал разработки
├── create_test_data.py     # Создание демо данных
├── pyproject.toml          # Poetry конфигурация
└── README.md               # Этот файл
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

## 🎯 Следующие шаги

1. **Изучить Builder.io** для работы
2. **Создать React Native проект**
3. **Интегрировать с Django API**
4. **Реализовать UI** в стиле "личной сказки"

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

- **Автор:** [Ваше имя]
- **Email:** [ваш@email.com]
- **Telegram:** [@ваш_username]

---

**Создаем будущее привычек вместе!** 🚀
