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
        queryset = Habit.objects.filter(user=self.request.user)
        
        # Фильтрация по группе
        group_id = self.request.query_params.get('group', None)
        if group_id:
            queryset = queryset.filter(group_id=group_id)
        
        return queryset

    def perform_create(self, serializer):
        habit = serializer.save(user=self.request.user)
        # Обновляем статистику пользователя
        self.request.user.update_habits_created_count()

    @action(detail=True, methods=['post'])
    def complete(self, request, pk=None):
        """Отметить выполнение привычки"""
        habit = self.get_object()
        
        # Создаем или обновляем лог выполнения
        log, created = HabitLog.objects.get_or_create(
            habit=habit,
            date=timezone.now().date(),
            defaults={
                'status': 'completed',
                'value': request.data.get('value', 1)
            }
        )
        
        # Если лог уже существовал, обновляем его статус
        if not created and log.status != 'completed':
            log.status = 'completed'
            log.value = request.data.get('value', 1)
            log.save()
        
        # Обновляем статистику привычки только если лог был создан
        if created:
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
        
        # Проверяем не была ли привычка уже выполнена сегодня
        today = timezone.now().date()
        existing_log = HabitLog.objects.filter(
            habit=habit,
            date=today,
            status='completed'
        ).first()
        
        if existing_log:
            # Привычка уже выполнена сегодня, но можно нажать еще раз
            return Response({
                'message': 'Привычка уже выполнена сегодня!', 
                'completed_today': True
            }, status=status.HTTP_200_OK)
        
        # Создаем или обновляем лог выполнения
        log, created = HabitLog.objects.get_or_create(
            habit=habit,
            date=today,
            defaults={
                'status': 'completed',
                'value': request.data.get('value', 1)
            }
        )
        
        # Если лог уже существовал, обновляем его статус
        if not created and log.status != 'completed':
            log.status = 'completed'
            log.value = request.data.get('value', 1)
            log.save()
        
        # Обновляем статистику привычки только если лог был создан
        if created:
            habit.total_completions += 1
            habit.streak += 1
            if habit.streak > habit.longest_streak:
                habit.longest_streak = habit.streak
            habit.save()
        
        # Обновляем статистику пользователя (с обработкой ошибок)
        try:
            request.user.update_habits_completed_count()
            request.user.update_streak_stats()
        except Exception as e:
            print(f"Error updating user stats: {e}")
        
        return Response({'message': 'Привычка выполнена!'}, status=status.HTTP_200_OK)
        
    except Habit.DoesNotExist:
        return Response({'error': 'Привычка не найдена'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(f"Error in complete_habit: {e}")
        return Response({'error': 'Внутренняя ошибка сервера'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
