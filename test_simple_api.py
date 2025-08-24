#!/usr/bin/env python
"""
Простой тест API
"""
import os
import django
import requests
import json

# Настройка Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'habit_tracker.settings')
django.setup()

def test_api():
    """Тестируем API"""
    base_url = "http://localhost:8000/api"
    
    print("🔍 Тестируем API...")
    
    # 1. Получение токена
    print("\n1️⃣ Получение токена...")
    token_data = {
        'username': 'demo',
        'password': 'demo12345'
    }
    
    try:
        response = requests.post(f"{base_url}/token/", json=token_data)
        print(f"Статус: {response.status_code}")
        print(f"Ответ: {response.text[:200]}...")
        
        if response.status_code == 200:
            token = response.json()['access']
            headers = {'Authorization': f'Bearer {token}'}
            print("✅ Токен получен")
            
            # 2. Профиль пользователя
            print("\n2️⃣ Профиль пользователя...")
            response = requests.get(f"{base_url}/users/profile/", headers=headers)
            print(f"Статус: {response.status_code}")
            print(f"Ответ: {response.text[:200]}...")
            
            # 3. Статистика
            print("\n3️⃣ Статистика...")
            response = requests.get(f"{base_url}/users/stats/", headers=headers)
            print(f"Статус: {response.status_code}")
            print(f"Ответ: {response.text[:200]}...")
            
            # 4. Привычки
            print("\n4️⃣ Привычки...")
            response = requests.get(f"{base_url}/habits/", headers=headers)
            print(f"Статус: {response.status_code}")
            print(f"Ответ: {response.text[:200]}...")
            
        else:
            print(f"❌ Ошибка получения токена: {response.text}")
            
    except requests.exceptions.ConnectionError:
        print("❌ Сервер не запущен")
    except Exception as e:
        print(f"❌ Ошибка: {e}")

if __name__ == '__main__':
    test_api()
