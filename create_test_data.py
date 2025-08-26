#!/usr/bin/env python
"""
Создание тестовых данных для API
"""
import os
import django
from datetime import date, timedelta, datetime

# Настройка Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'habit_tracker.settings')
django.setup()

from users.models import User
from habits.models import HabitGroup, Habit, HabitLog
from analytics.models import UserAnalytics
from payments.models import Subscription

def create_demo_data():
    """Создаем демо данные"""
    print("🔧 Создаем демо данные...")
    
    # Создаем пользователя
    user = User.objects.create_user(
        username='demo',
        email='demo@example.com',
        password='demo12345',
        first_name='Демо',
        last_name='Пользователь'
    )
    print(f"✅ Пользователь создан: {user.username}")
    
    # Создаем группы привычек
    groups = []
    group_data = [
        {'name': 'Утро', 'color': '#FF6B6B', 'icon': '🌅'},
        {'name': 'Здоровье', 'color': '#4ECDC4', 'icon': '💪'},
        {'name': 'Работа', 'color': '#45B7D1', 'icon': '💼'},
        {'name': 'Вечер', 'color': '#96CEB4', 'icon': '🌙'},
    ]
    
    for i, data in enumerate(group_data):
        group = HabitGroup.objects.create(
            user=user,
            name=data['name'],
            color=data['color'],
            icon=data['icon'],
            order=i
        )
        groups.append(group)
        print(f"✅ Группа создана: {group.name}")
    
    # Создаем привычки
    habits = []
    habit_data = [
        {
            'name': 'Утренняя зарядка',
            'group': groups[0],
            'habit_type': 'boolean',
            'frequency': 'daily',
            'target_value': None,
            'description': '15 минут упражнений'
        },
        {
            'name': 'Пить воду',
            'group': groups[1],
            'habit_type': 'numeric',
            'frequency': 'daily',
            'target_value': 2.0,
            'unit': 'литра',
            'description': 'Выпивать 2 литра воды в день'
        }        
    ]
    
    for data in habit_data:
        habit = Habit.objects.create(
            user=user,
            group=data['group'],
            name=data['name'],
            description=data['description'],
            habit_type=data['habit_type'],
            frequency=data['frequency'],
            target_value=data['target_value'],
            unit=data.get('unit', '')
        )
        habits.append(habit)
        print(f"✅ Привычка создана: {habit.name}")
    
    # Создаем логи выполнения за последние 14 дней
    print("\n📊 Создаем логи выполнения...")
    for i in range(14):
        log_date = date.today() - timedelta(days=i)
        print(f"Создаем лог для даты: {log_date}")
        
        for habit in habits:
            # Реалистичные данные выполнения
            import random
            
            # Разные привычки имеют разную вероятность выполнения
            if habit.name == 'Пить воду':
                completion_chance = 0.8  # 80% выполнения
            elif habit.name == 'Утренняя зарядка':
                completion_chance = 0.6  # 60% выполнения
            elif habit.name == 'Читать книги':
                completion_chance = 0.7  # 70% выполнения
            else:
                completion_chance = 0.5  # 50% выполнения
            
            if random.random() < completion_chance:
                status = 'completed'
                if habit.habit_type == 'numeric':
                    # Случайное значение от 50% до 120% от цели
                    target = float(habit.target_value)
                    value = target * random.uniform(0.5, 1.2)
                elif habit.habit_type == 'timer':
                    # Случайное время от 50% до 150% от цели
                    target = float(habit.target_value)
                    value = target * random.uniform(0.5, 1.5)
                else:
                    value = 1
            else:
                status = 'skipped'
                value = None
            
            HabitLog.objects.create(
                habit=habit,
                date=log_date,
                status=status,
                value=value,
                notes=f'Лог за {log_date.strftime("%d.%m.%Y")}'
            )
    
    print(f"✅ Создано {14 * len(habits)} логов выполнения")
    
    # Создаем аналитику
    analytics = UserAnalytics.objects.create(
        user=user,
        total_days_active=14,
        last_active_date=date.today(),
        monday_completions=8,
        tuesday_completions=9,
        wednesday_completions=7,
        thursday_completions=10,
        friday_completions=8,
        saturday_completions=6,
        sunday_completions=5
    )
    print(f"✅ Аналитика создана")
    
    # Создаем подписку
    subscription = Subscription.objects.create(
        user=user,
        subscription_type='premium',
        status='active',
        start_date=datetime.now(),
        end_date=datetime.now() + timedelta(days=30),
        amount=299.00,
        currency='RUB'
    )
    print(f"✅ Подписка создана")
    
    print(f"\n🎉 Демо данные созданы!")
    print(f"👤 Пользователь: demo / demo12345")
    print(f"📱 UUID пользователя: {user.id}")
    print(f"📊 Привычек: {len(habits)}")
    print(f"📈 Логов: {14 * len(habits)}")
    
    return user, groups, habits

if __name__ == '__main__':
    create_demo_data()
