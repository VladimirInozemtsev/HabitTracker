from rest_framework import generics, permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, action
from django.utils import timezone
from datetime import datetime
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
        queryset = Habit.objects.filter(user=self.request.user, is_archived=False)
        
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
        prev_status = None
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
            prev_status = log.status
            log.status = 'completed'
            log.value = request.data.get('value', 1)
            log.save()
        
        # Обновляем статистику привычки, если лог создан или изменён статус
        if created or prev_status is not None:
            habit.recalculate_stats()
        
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

@api_view(['POST', 'DELETE'])
@permission_classes([permissions.IsAuthenticated])
def complete_habit(request, habit_id):
    """Отметить или убрать выполнение привычки на конкретную дату"""
    try:
        habit = Habit.objects.get(id=habit_id, user=request.user)
        
        # Получаем дату из запроса или используем сегодня
        target_date = request.data.get('date')
        if target_date:
            try:
                target_date = datetime.strptime(target_date, '%Y-%m-%d').date()
            except ValueError:
                return Response({'error': 'Неверный формат даты'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            target_date = timezone.now().date()
        
        if request.method == 'DELETE':
            # Удаляем выполнение привычки
            existing_log = HabitLog.objects.filter(
                habit=habit,
                date=target_date,
                status='completed'
            ).first()
            
            if existing_log:
                existing_log.delete()
                
                # Обновляем статистику привычки
                habit.recalculate_stats()
                
                # Обновляем статистику пользователя
                try:
                    request.user.update_habits_completed_count()
                    request.user.update_streak_stats()
                except Exception as e:
                    print(f"Error updating user stats: {e}")
                
                return Response({'message': f'Выполнение привычки {target_date} удалено!'}, status=status.HTTP_200_OK)
            else:
                return Response({'message': f'Привычка не была выполнена {target_date}'}, status=status.HTTP_200_OK)
        
        else:  # POST - добавляем выполнение
            # Проверяем не была ли привычка уже выполнена в эту дату
            existing_log = HabitLog.objects.filter(
                habit=habit,
                date=target_date,
                status='completed'
            ).first()
            
            if existing_log:
                # Привычка уже выполнена в эту дату
                return Response({
                    'message': f'Привычка уже выполнена {target_date}!', 
                    'completed_today': True
                }, status=status.HTTP_200_OK)
            
            # Создаем или обновляем лог выполнения
            prev_status = None
            log, created = HabitLog.objects.get_or_create(
                habit=habit,
                date=target_date,
                defaults={
                    'status': 'completed',
                    'value': request.data.get('value', 1)
                }
            )
            
            # Если лог уже существовал, обновляем его статус
            if not created and log.status != 'completed':
                prev_status = log.status
                log.status = 'completed'
                log.value = request.data.get('value', 1)
                log.save()
            
            # Обновляем статистику привычки, если лог создан или изменён статус
            if created or prev_status is not None:
                habit.recalculate_stats()
            
            # Обновляем статистику пользователя (с обработкой ошибок)
            try:
                request.user.update_habits_completed_count()
                request.user.update_streak_stats()
            except Exception as e:
                print(f"Error updating user stats: {e}")
            
            return Response({'message': f'Привычка выполнена {target_date}!'}, status=status.HTTP_200_OK)
        
    except Habit.DoesNotExist:
        return Response({'error': 'Привычка не найдена'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(f"Error in complete_habit: {e}")
        return Response({'error': 'Внутренняя ошибка сервера'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def archive_habit(request, habit_id):
    """Архивировать привычку"""
    try:
        habit = Habit.objects.get(id=habit_id, user=request.user)
        
        if habit.is_archived:
            return Response({'error': 'Привычка уже в архиве'}, status=status.HTTP_400_BAD_REQUEST)
        
        habit.archive()
        
        return Response({
            'message': 'Привычка перемещена в архив',
            'habit_id': str(habit.id)
        }, status=status.HTTP_200_OK)
        
    except Habit.DoesNotExist:
        return Response({'error': 'Привычка не найдена'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(f"Error in archive_habit: {e}")
        return Response({'error': 'Внутренняя ошибка сервера'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def unarchive_habit(request, habit_id):
    """Восстановить привычку из архива"""
    try:
        habit = Habit.objects.get(id=habit_id, user=request.user)
        
        if not habit.is_archived:
            return Response({'error': 'Привычка не в архиве'}, status=status.HTTP_400_BAD_REQUEST)
        
        habit.unarchive()
        
        return Response({
            'message': 'Привычка восстановлена из архива',
            'habit_id': str(habit.id)
        }, status=status.HTTP_200_OK)
        
    except Habit.DoesNotExist:
        return Response({'error': 'Привычка не найдена'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(f"Error in unarchive_habit: {e}")
        return Response({'error': 'Внутренняя ошибка сервера'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def archived_habits(request):
    """Получить список архивных привычек"""
    try:
        archived_habits = Habit.objects.filter(
            user=request.user,
            is_archived=True
        ).order_by('-archived_at')
        
        serializer = HabitSerializer(archived_habits, many=True)
        
        return Response({
            'habits': serializer.data,
            'count': len(serializer.data)
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        print(f"Error in archived_habits: {e}")
        return Response({'error': 'Внутренняя ошибка сервера'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def delete_habit(request, habit_id):
    """Удалить привычку навсегда"""
    try:
        habit = Habit.objects.get(id=habit_id, user=request.user)
        
        # Удаляем все связанные логи
        HabitLog.objects.filter(habit=habit).delete()
        
        # Удаляем привычку
        habit.delete()
        
        return Response({
            'message': 'Привычка удалена навсегда',
            'habit_id': str(habit_id)
        }, status=status.HTTP_200_OK)
        
    except Habit.DoesNotExist:
        return Response({'error': 'Привычка не найдена'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(f"Error in delete_habit: {e}")
        return Response({'error': 'Внутренняя ошибка сервера'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
