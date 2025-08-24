from rest_framework import generics, permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, UserRegistrationSerializer

User = get_user_model()

class UserRegistrationView(generics.CreateAPIView):
    """Регистрация нового пользователя"""
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]

class UserProfileView(generics.RetrieveUpdateAPIView):
    """Профиль пользователя (получить/обновить)"""
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_stats(request):
    """Статистика пользователя"""
    user = request.user
    
    # Обновляем статистику
    user.update_habits_created_count()
    user.update_habits_completed_count()
    user.update_streak_stats()
    
    return Response({
        'total_habits_created': user.total_habits_created,
        'total_habits_completed': user.total_habits_completed,
        'current_streak': user.current_streak,
        'longest_streak': user.longest_streak,
        'completion_rate': user.completion_rate,
    })
