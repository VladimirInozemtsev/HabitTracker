from django.core.management.base import BaseCommand
from habits.models import Habit, HabitLog
from datetime import date, timedelta

class Command(BaseCommand):
    help = 'Обновить статистику всех привычек'

    def handle(self, *args, **options):
        habits = Habit.objects.all()
        updated_count = 0
        
        for habit in habits:
            # Подсчитываем логи
            logs = HabitLog.objects.filter(habit=habit)
            total_completions = logs.filter(status='completed').count()
            total_skips = logs.filter(status='skipped').count()
            
            # Обновляем статистику
            habit.total_completions = total_completions
            habit.total_skips = total_skips
            
            # Вычисляем текущий стрик
            current_streak = 0
            longest_streak = 0
            temp_streak = 0
            
            # Проверяем последние 30 дней
            for i in range(30):
                check_date = date.today() - timedelta(days=i)
                log = logs.filter(date=check_date).first()
                
                if log and log.status == 'completed':
                    temp_streak += 1
                    if i == 0:  # Сегодня
                        current_streak = temp_streak
                else:
                    longest_streak = max(longest_streak, temp_streak)
                    temp_streak = 0
            
            # Обновляем стрики
            habit.streak = current_streak
            habit.longest_streak = max(longest_streak, temp_streak)
            
            habit.save(update_fields=['total_completions', 'total_skips', 'streak', 'longest_streak'])
            updated_count += 1
            
            self.stdout.write(f"✅ {habit.name}: {total_completions} выполнено, {total_skips} пропущено, стрик: {current_streak}")
            
        self.stdout.write(
            self.style.SUCCESS(f'Успешно обновлена статистика для {updated_count} привычек')
        )
