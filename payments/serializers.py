from rest_framework import serializers
from .models import Subscription

class SubscriptionSerializer(serializers.ModelSerializer):
    """Сериализатор для подписки"""
    class Meta:
        model = Subscription
        fields = '__all__'
        read_only_fields = ['user', 'created_at', 'updated_at']
