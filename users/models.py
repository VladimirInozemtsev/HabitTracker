from django.contrib.auth.models import AbstractUser
from django.db import models
from habit_tracker.settings import uuid7


class User(AbstractUser):
    """Расширенная модель пользователя для habit tracker"""
    id = models.UUIDField(primary_key=True, default=uuid7, editable=False)
    
    # Дополнительные поля
    timezone = models.CharField(max_length=50, default='Europe/Moscow')
    language = models.CharField(max_length=10, default='ru')
    subscription_tier = models.CharField(
        max_length=20, 
        choices=[
            ('free', 'Бесплатный'),
            ('premium', 'Премиум'),
            ('family', 'Семейный'),
        ],
        default='free'
    )
    
    # Настройки уведомлений
    email_notifications = models.BooleanField(default=True)
    push_notifications = models.BooleanField(default=True)
    
    # Статистика
    total_habits_created = models.PositiveIntegerField(default=0)
    total_habits_completed = models.PositiveIntegerField(default=0)
    current_streak = models.PositiveIntegerField(default=0)
    longest_streak = models.PositiveIntegerField(default=0)
    
    # Метаданные
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
    
    def __str__(self):
        return self.username
    
    @property
    def completion_rate(self):
        """Процент выполнения привычек"""
        from habits.models import HabitLog
        total_attempts = HabitLog.objects.filter(habit__user=self).count()
        if total_attempts == 0:
            return 0
        completed_attempts = HabitLog.objects.filter(
            habit__user=self, 
            status='completed'
        ).count()
        return round((completed_attempts / total_attempts) * 100, 2)

    def update_habits_created_count(self):
        """Обновить количество созданных привычек"""
        from habits.models import Habit
        self.total_habits_created = Habit.objects.filter(user=self).count()
        self.save(update_fields=['total_habits_created'])

    def update_habits_completed_count(self):
        """Обновить количество выполненных привычек"""
        from habits.models import HabitLog
        self.total_habits_completed = HabitLog.objects.filter(
            habit__user=self, 
            status='completed'
        ).count()
        self.save(update_fields=['total_habits_completed'])

    def update_streak_stats(self):
        """Обновить статистику стриков"""
        from habits.models import Habit
        habits = Habit.objects.filter(user=self)
        if habits.exists():
            max_streak = max(habit.streak for habit in habits)
            self.longest_streak = max(self.longest_streak, max_streak)
            self.current_streak = max_streak
            self.save(update_fields=['current_streak', 'longest_streak'])
