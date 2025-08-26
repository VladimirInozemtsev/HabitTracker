#!/usr/bin/env python
"""
Тест UUID7 генерации
"""
import os
import django

# Настройка Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'habit_tracker.settings')
django.setup()

from habit_tracker.settings import uuid7
from users.models import User
from habits.models import Habit, HabitGroup

def test_uuid7():
    """Тестируем UUID7 генерацию"""
    print("🔍 Тестируем UUID7...")
    
    # Генерируем несколько UUID7
    uuids = [uuid7() for _ in range(5)]
    
    print("\n📋 Сгенерированные UUID7:")
    for i, uid in enumerate(uuids, 1):
        print(f"{i}. {uid}")
    
    # Проверяем уникальность
    unique_uuids = set(uuids)
    print(f"\n✅ Уникальность: {len(uuids)} == {len(unique_uuids)}")
    
    # Проверяем сортировку (UUID7 должны быть сортируемы по времени)
    sorted_uuids = sorted(uuids)
    print(f"\n📊 Сортировка работает: {uuids == sorted_uuids}")
    
    # Тестируем создание пользователя
    print("\n👤 Тестируем создание пользователя с UUID7...")
    try:
        user = User.objects.create_user(
            username='test_uuid7',
            email='test@uuid7.com',
            password='testpass123'
        )
        print(f"✅ Пользователь создан с UUID7: {user.id}")
        
        # Тестируем создание группы привычек
        group = HabitGroup.objects.create(
            user=user,
            name='Тестовая группа',
            color='#FF5733'
        )
        print(f"✅ Группа создана с UUID7: {group.id}")
        
        # Тестируем создание привычки
        habit = Habit.objects.create(
            user=user,
            group=group,
            name='Тестовая привычка',
            habit_type='boolean'
        )
        print(f"✅ Привычка создана с UUID7: {habit.id}")
        
        # Очистка
        user.delete()
        print("🧹 Тестовые данные удалены")
        
    except Exception as e:
        print(f"❌ Ошибка: {e}")

if __name__ == '__main__':
    test_uuid7()
