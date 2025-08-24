from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    """Сериализатор для пользователя"""
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 
                 'timezone', 'language', 'subscription_tier', 
                 'email_notifications', 'push_notifications',
                 'total_habits_created', 'total_habits_completed', 
                 'current_streak', 'longest_streak', 'completion_rate',
                 'created_at', 'updated_at']
        read_only_fields = ['id', 'total_habits_created', 'total_habits_completed', 
                           'current_streak', 'longest_streak', 'completion_rate',
                           'created_at', 'updated_at']

class UserRegistrationSerializer(serializers.ModelSerializer):
    """Сериализатор для регистрации пользователя"""
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password_confirm', 
                 'first_name', 'last_name']

    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError("Пароли не совпадают")
        return attrs

    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = User.objects.create_user(**validated_data)
        return user
