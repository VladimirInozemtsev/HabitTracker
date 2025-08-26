from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.utils import timezone
from datetime import timedelta
from .models import UserAnalytics
from .serializers import UserAnalyticsSerializer
from habits.models import HabitLog

# Create your views here.

class UserAnalyticsView(generics.RetrieveAPIView):
    """Аналитика пользователя"""
    serializer_class = UserAnalyticsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        analytics, created = UserAnalytics.objects.get_or_create(user=self.request.user)
        return analytics

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def weekly_stats(request):
    """Недельная статистика"""
    user = request.user
    today = timezone.now().date()
    week_ago = today - timedelta(days=7)
    
    # Получаем логи за последнюю неделю
    logs = HabitLog.objects.filter(
        habit__user=user,
        date__gte=week_ago,
        date__lte=today
    )
    
    # Группируем по дням недели
    stats = {
        'monday': logs.filter(date__week_day=2).count(),
        'tuesday': logs.filter(date__week_day=3).count(),
        'wednesday': logs.filter(date__week_day=4).count(),
        'thursday': logs.filter(date__week_day=5).count(),
        'friday': logs.filter(date__week_day=6).count(),
        'saturday': logs.filter(date__week_day=7).count(),
        'sunday': logs.filter(date__week_day=1).count(),
    }
    
    return Response({
        'weekly_stats': stats,
        'total_completions': logs.count(),
        'average_per_day': round(logs.count() / 7, 2)
    })

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def habit_progress(request, habit_id):
    """Прогресс конкретной привычки"""
    from habits.models import Habit
    
    try:
        habit = Habit.objects.get(id=habit_id, user=request.user)
        
        # Получаем логи за последние 30 дней
        thirty_days_ago = timezone.now().date() - timedelta(days=30)
        logs = HabitLog.objects.filter(
            habit=habit,
            date__gte=thirty_days_ago
        ).order_by('date')
        
        # Группируем по дням
        daily_progress = {}
        for log in logs:
            date = log.date.isoformat()
            if date in daily_progress:
                daily_progress[date] += log.value or 0
            else:
                daily_progress[date] = log.value or 0
        
        return Response({
            'habit_name': habit.name,
            'streak': habit.streak,
            'longest_streak': habit.longest_streak,
            'total_completions': habit.total_completions,
            'daily_progress': daily_progress,
            'completion_rate': round((len(daily_progress) / 30) * 100, 2)
        })
    except Habit.DoesNotExist:
        return Response({'error': 'Привычка не найдена'}, status=404)
