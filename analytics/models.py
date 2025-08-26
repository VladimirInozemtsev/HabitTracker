from django.db import models
from django.contrib.auth import get_user_model
from habit_tracker.settings import uuid7

User = get_user_model()

class UserAnalytics(models.Model):
    """Аналитика пользователя"""
    id = models.UUIDField(primary_key=True, default=uuid7, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='analytics')
    total_days_active = models.PositiveIntegerField(default=0, verbose_name='Всего дней активности')
    last_active_date = models.DateField(null=True, blank=True, verbose_name='Последняя активность')
    monday_completions = models.PositiveIntegerField(default=0)
    tuesday_completions = models.PositiveIntegerField(default=0)
    wednesday_completions = models.PositiveIntegerField(default=0)
    thursday_completions = models.PositiveIntegerField(default=0)
    friday_completions = models.PositiveIntegerField(default=0)
    saturday_completions = models.PositiveIntegerField(default=0)
    sunday_completions = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Аналитика пользователя'
        verbose_name_plural = 'Аналитика пользователей'

    def __str__(self):
        return f"Аналитика {self.user.username}"
