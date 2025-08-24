import uuid
from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
from habit_tracker.settings import uuid7

User = get_user_model()


class HabitGroup(models.Model):
    """Группа привычек (например: Утро, Вечер, Здоровье)"""
    
    id = models.UUIDField(primary_key=True, default=uuid7, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='habit_groups')
    name = models.CharField(max_length=100, verbose_name='Название группы')
    description = models.TextField(blank=True, verbose_name='Описание')
    color = models.CharField(max_length=7, default='#3B82F6', verbose_name='Цвет')
    icon = models.CharField(max_length=50, blank=True, verbose_name='Иконка')
    order = models.PositiveIntegerField(default=0, verbose_name='Порядок')
    
    # Метаданные
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Группа привычек'
        verbose_name_plural = 'Группы привычек'
        ordering = ['order', 'name']
        unique_together = ['user', 'name']
    
    def __str__(self):
        return f"{self.user.username} - {self.name}"


class Habit(models.Model):
    """Модель привычки"""
    
    id = models.UUIDField(primary_key=True, default=uuid7, editable=False)
    
    HABIT_TYPES = [
        ('boolean', 'Да/Нет'),
        ('numeric', 'Количественная'),
        ('timer', 'Таймер'),
        ('negative', 'Отказ от привычки'),
    ]
    
    FREQUENCY_CHOICES = [
        ('daily', 'Ежедневно'),
        ('weekly', 'Еженедельно'),
        ('monthly', 'Ежемесячно'),
        ('custom', 'Кастомная'),
    ]
    
    # Основная информация
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='habits')
    group = models.ForeignKey(HabitGroup, on_delete=models.SET_NULL, null=True, blank=True, related_name='habits')
    name = models.CharField(max_length=200, verbose_name='Название привычки')
    description = models.TextField(blank=True, verbose_name='Описание')
    habit_type = models.CharField(max_length=20, choices=HABIT_TYPES, default='boolean', verbose_name='Тип привычки')
    
    # Цели и настройки
    target_value = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, verbose_name='Целевое значение')
    unit = models.CharField(max_length=50, blank=True, verbose_name='Единица измерения')
    frequency = models.CharField(max_length=20, choices=FREQUENCY_CHOICES, default='daily', verbose_name='Частота')
    custom_days = models.JSONField(default=list, blank=True, verbose_name='Кастомные дни')
    
    # Напоминания
    reminder_time = models.TimeField(null=True, blank=True, verbose_name='Время напоминания')
    reminder_days = models.JSONField(default=list, blank=True, verbose_name='Дни напоминаний')
    reminder_enabled = models.BooleanField(default=True, verbose_name='Включить напоминания')
    
    # Геймификация
    streak = models.PositiveIntegerField(default=0, verbose_name='Текущая серия')
    longest_streak = models.PositiveIntegerField(default=0, verbose_name='Самая длинная серия')
    total_completions = models.PositiveIntegerField(default=0, verbose_name='Всего выполнений')
    total_skips = models.PositiveIntegerField(default=0, verbose_name='Всего пропусков')
    
    # Статус
    is_active = models.BooleanField(default=True, verbose_name='Активна')
    is_archived = models.BooleanField(default=False, verbose_name='Архивирована')
    
    # Метаданные
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Привычка'
        verbose_name_plural = 'Привычки'
        ordering = ['group__order', 'group__name', 'name']
    
    def __str__(self):
        return f"{self.user.username} - {self.name}"
    
    @property
    def completion_rate(self):
        """Процент выполнения привычки"""
        total = self.total_completions + self.total_skips
        if total == 0:
            return 0
        return round((self.total_completions / total) * 100, 2)

    @property
    def calculated_total_completions(self):
        """Подсчитать выполненные логи на лету"""
        return self.logs.filter(status='completed').count()

    @property
    def calculated_total_skips(self):
        """Подсчитать пропущенные логи на лету"""
        return self.logs.filter(status='skipped').count()

    @property
    def calculated_streak(self):
        """Подсчитать текущий стрик на лету"""
        from datetime import date, timedelta
        current_streak = 0
        
        # Проверяем последние 30 дней
        for i in range(30):
            check_date = date.today() - timedelta(days=i)
            log = self.logs.filter(date=check_date).first()
            
            if log and log.status == 'completed':
                current_streak += 1
            else:
                break
        
        return current_streak

    @property
    def calculated_longest_streak(self):
        """Подсчитать самый длинный стрик на лету"""
        from datetime import date, timedelta
        longest_streak = 0
        temp_streak = 0
        
        # Проверяем последние 365 дней
        for i in range(365):
            check_date = date.today() - timedelta(days=i)
            log = self.logs.filter(date=check_date).first()
            
            if log and log.status == 'completed':
                temp_streak += 1
            else:
                longest_streak = max(longest_streak, temp_streak)
                temp_streak = 0
        
        return max(longest_streak, temp_streak)


class HabitLog(models.Model):
    """Лог выполнения привычки"""
    
    id = models.UUIDField(primary_key=True, default=uuid7, editable=False)
    
    COMPLETION_STATUS = [
        ('completed', 'Выполнено'),
        ('skipped', 'Пропущено'),
        ('partial', 'Частично'),
    ]
    
    habit = models.ForeignKey(Habit, on_delete=models.CASCADE, related_name='logs')
    date = models.DateField(verbose_name='Дата')
    status = models.CharField(max_length=20, choices=COMPLETION_STATUS, default='completed', verbose_name='Статус')
    value = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, verbose_name='Значение')
    notes = models.TextField(blank=True, verbose_name='Заметки')
    
    # Метаданные
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Лог привычки'
        verbose_name_plural = 'Логи привычек'
        unique_together = ['habit', 'date']
        ordering = ['-date']
    
    def __str__(self):
        return f"{self.habit.name} - {self.date} ({self.get_status_display()})"


class HabitReminder(models.Model):
    """Напоминания о привычках"""
    
    id = models.UUIDField(primary_key=True, default=uuid7, editable=False)
    
    habit = models.ForeignKey(Habit, on_delete=models.CASCADE, related_name='reminders')
    time = models.TimeField(verbose_name='Время')
    days = models.JSONField(default=list, verbose_name='Дни недели')
    message = models.CharField(max_length=200, blank=True, verbose_name='Сообщение')
    is_active = models.BooleanField(default=True, verbose_name='Активно')
    
    # Метаданные
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Напоминание'
        verbose_name_plural = 'Напоминания'
    
    def __str__(self):
        return f"{self.habit.name} - {self.time}"
