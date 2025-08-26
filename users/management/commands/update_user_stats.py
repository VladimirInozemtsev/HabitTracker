from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()

class Command(BaseCommand):
    help = 'Обновить статистику всех пользователей'

    def handle(self, *args, **options):
        users = User.objects.all()
        updated_count = 0
        
        for user in users:
            user.update_habits_created_count()
            user.update_habits_completed_count()
            user.update_streak_stats()
            updated_count += 1
            
        self.stdout.write(
            self.style.SUCCESS(f'Успешно обновлена статистика для {updated_count} пользователей')
        )
