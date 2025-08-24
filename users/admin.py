from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model

User = get_user_model()

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    """Админка для кастомной модели пользователя"""
    list_display = ['username', 'email', 'first_name', 'last_name', 'subscription_tier', 
                   'total_habits_created', 'total_habits_completed', 'current_streak', 'is_active']
    list_filter = ['subscription_tier', 'is_active', 'is_staff', 'date_joined']
    search_fields = ['username', 'email', 'first_name', 'last_name']
    ordering = ['-date_joined']
    
    fieldsets = UserAdmin.fieldsets + (
        ('Habit Tracker', {
            'fields': ('timezone', 'language', 'subscription_tier', 
                      'email_notifications', 'push_notifications',
                      'total_habits_created', 'total_habits_completed', 
                      'current_streak', 'longest_streak')
        }),
    )
    
    readonly_fields = ['total_habits_created', 'total_habits_completed', 
                      'current_streak', 'longest_streak', 'completion_rate']
