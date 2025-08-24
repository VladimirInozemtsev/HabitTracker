from django.contrib import admin
from .models import HabitGroup, Habit, HabitLog, HabitReminder

@admin.register(HabitGroup)
class HabitGroupAdmin(admin.ModelAdmin):
    """Админка для групп привычек"""
    list_display = ['name', 'user', 'color', 'created_at']
    list_filter = ['color', 'created_at']
    search_fields = ['name', 'user__username']
    ordering = ['-created_at']

@admin.register(Habit)
class HabitAdmin(admin.ModelAdmin):
    """Админка для привычек"""
    list_display = ['name', 'user', 'group', 'habit_type', 'frequency', 
                   'streak', 'longest_streak', 'total_completions', 'is_active']
    list_filter = ['habit_type', 'frequency', 'is_active', 'created_at']
    search_fields = ['name', 'user__username', 'group__name']
    ordering = ['-created_at']
    readonly_fields = ['streak', 'longest_streak', 'total_completions', 'total_skips']

@admin.register(HabitLog)
class HabitLogAdmin(admin.ModelAdmin):
    """Админка для логов привычек"""
    list_display = ['habit', 'date', 'status', 'value', 'created_at']
    list_filter = ['status', 'date', 'created_at']
    search_fields = ['habit__name', 'habit__user__username']
    ordering = ['-date']
    readonly_fields = ['created_at', 'updated_at']

@admin.register(HabitReminder)
class HabitReminderAdmin(admin.ModelAdmin):
    """Админка для напоминаний"""
    list_display = ['habit', 'time', 'days', 'is_active']
    list_filter = ['is_active', 'time']
    search_fields = ['habit__name']
    ordering = ['time']
