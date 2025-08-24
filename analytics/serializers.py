from rest_framework import serializers
from .models import UserAnalytics

class UserAnalyticsSerializer(serializers.ModelSerializer):
    """Сериализатор для аналитики пользователя"""
    class Meta:
        model = UserAnalytics
        fields = '__all__'
        read_only_fields = ['user', 'created_at', 'updated_at']
