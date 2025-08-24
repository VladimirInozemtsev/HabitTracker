from django.db import models
from django.contrib.auth import get_user_model
from habit_tracker.settings import uuid7

User = get_user_model()

class Subscription(models.Model):
    """Подписка пользователя"""
    id = models.UUIDField(primary_key=True, default=uuid7, editable=False)
    
    SUBSCRIPTION_TYPES = [
        ('premium', 'Премиум'),
        ('family', 'Семейный'),
    ]
    STATUS_CHOICES = [
        ('active', 'Активна'),
        ('expired', 'Истекла'),
        ('cancelled', 'Отменена'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='subscriptions')
    subscription_type = models.CharField(max_length=20, choices=SUBSCRIPTION_TYPES, verbose_name='Тип подписки')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active', verbose_name='Статус')
    start_date = models.DateTimeField(verbose_name='Дата начала')
    end_date = models.DateTimeField(verbose_name='Дата окончания')
    amount = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Сумма')
    currency = models.CharField(max_length=3, default='RUB', verbose_name='Валюта')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Подписка'
        verbose_name_plural = 'Подписки'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} - {self.get_subscription_type_display()}"
