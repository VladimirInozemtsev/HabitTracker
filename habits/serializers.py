from rest_framework import serializers
from .models import HabitGroup, Habit, HabitLog, HabitReminder

class HabitGroupSerializer(serializers.ModelSerializer):
    """Сериализатор для группы привычек"""
    class Meta:
        model = HabitGroup
        fields = '__all__'
        read_only_fields = ['user', 'created_at', 'updated_at']

class HabitReminderSerializer(serializers.ModelSerializer):
    """Сериализатор для напоминаний"""
    class Meta:
        model = HabitReminder
        fields = '__all__'

class HabitSerializer(serializers.ModelSerializer):
    """Сериализатор для привычки"""
    reminders = HabitReminderSerializer(many=True, read_only=True)
    group_name = serializers.CharField(source='group.name', read_only=True)
    
    # Расчетные поля
    total_completions = serializers.SerializerMethodField()
    total_skips = serializers.SerializerMethodField()
    streak = serializers.SerializerMethodField()
    longest_streak = serializers.SerializerMethodField()
    completion_rate = serializers.SerializerMethodField()
    
    class Meta:
        model = Habit
        fields = '__all__'
        read_only_fields = ['user', 'created_at', 'updated_at']

    def get_total_completions(self, obj):
        return obj.calculated_total_completions

    def get_total_skips(self, obj):
        return obj.calculated_total_skips

    def get_streak(self, obj):
        return obj.calculated_streak

    def get_longest_streak(self, obj):
        return obj.calculated_longest_streak

    def get_completion_rate(self, obj):
        total = obj.calculated_total_completions + obj.calculated_total_skips
        if total == 0:
            return 0
        return round((obj.calculated_total_completions / total) * 100, 2)

class HabitLogSerializer(serializers.ModelSerializer):
    """Сериализатор для лога привычки"""
    habit_name = serializers.CharField(source='habit.name', read_only=True)
    
    class Meta:
        model = HabitLog
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']
