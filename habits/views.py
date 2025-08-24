from rest_framework import generics, permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, action
from django.utils import timezone
from .models import HabitGroup, Habit, HabitLog, HabitReminder
from .serializers import (
    HabitGroupSerializer, HabitSerializer, 
    HabitLogSerializer, HabitReminderSerializer
)

class HabitGroupViewSet(viewsets.ModelViewSet):
    """ViewSet для групп привычек"""
    serializer_class = HabitGroupSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return HabitGroup.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class HabitViewSet(viewsets.ModelViewSet):
    """ViewSet для привычек"""
    serializer_class = HabitSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Habit.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        habit = serializer.save(user=self.request.user)
        # Обновляем статистику пользователя
        self.request.user.update_habits_created_count()

    @action(detail=True, methods=['post'])
    def complete(self, request, pk=None):
        """Отметить выполнение привычки"""
        habit = self.get_object()
        
        # Создаем лог выполнения
        HabitLog.objects.create(
            habit=habit,
            date=timezone.now().date(),
            status='completed',
            value=request.data.get('value', 1)
        )
        
        # Обновляем статистику привычки
        habit.total_completions += 1
        habit.streak += 1
        if habit.streak > habit.longest_streak:
            habit.longest_streak = habit.streak
        habit.save()
        
        # Обновляем статистику пользователя
        request.user.update_habits_completed_count()
        request.user.update_streak_stats()
        
        return Response({'message': 'Привычка выполнена!'}, status=status.HTTP_200_OK)

class HabitLogListCreateView(generics.ListCreateAPIView):
    """Список и создание логов привычек"""
    serializer_class = HabitLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return HabitLog.objects.filter(habit__user=self.request.user)

    def perform_create(self, serializer):
        habit = serializer.validated_data['habit']
        if habit.user != self.request.user:
            raise permissions.PermissionDenied("Вы не можете создавать логи для чужих привычек")
        log = serializer.save()
        
        # Обновляем статистику пользователя
        self.request.user.update_habits_completed_count()
        self.request.user.update_streak_stats()

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def complete_habit(request, habit_id):
    """Отметить выполнение привычки (для обратной совместимости)"""
    try:
        habit = Habit.objects.get(id=habit_id, user=request.user)
        
        # Создаем лог выполнения
        HabitLog.objects.create(
            habit=habit,
            date=timezone.now().date(),
            status='completed',
            value=request.data.get('value', 1)
        )
        
        # Обновляем статистику привычки
        habit.total_completions += 1
        habit.streak += 1
        if habit.streak > habit.longest_streak:
            habit.longest_streak = habit.streak
        habit.save()
        
        # Обновляем статистику пользователя
        request.user.update_habits_completed_count()
        request.user.update_streak_stats()
        
        return Response({'message': 'Привычка выполнена!'}, status=status.HTTP_200_OK)
    except Habit.DoesNotExist:
        return Response({'error': 'Привычка не найдена'}, status=status.HTTP_404_NOT_FOUND)
