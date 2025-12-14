from datetime import timedelta

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from django.utils import timezone
from rest_framework.test import APIClient

from habits.models import Habit, HabitGroup, HabitLog


User = get_user_model()


class HabitStatsRecalculationTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='u1', password='pass12345')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        self.group = HabitGroup.objects.create(user=self.user, name='g1')
        self.habit = Habit.objects.create(user=self.user, group=self.group, name='h1')

    def test_complete_habit_updates_stats_when_existing_log_was_skipped(self):
        today = timezone.localdate()
        HabitLog.objects.create(habit=self.habit, date=today, status='skipped')

        url = reverse('complete-habit', kwargs={'habit_id': self.habit.id})
        resp = self.client.post(url, data={'date': today.isoformat()}, format='json')
        self.assertEqual(resp.status_code, 200)

        self.habit.refresh_from_db()
        self.assertEqual(self.habit.total_completions, 1)
        self.assertEqual(self.habit.total_skips, 0)
        self.assertEqual(self.habit.streak, 1)
        self.assertEqual(self.habit.longest_streak, 1)

        # Повторный POST не должен «накручивать» статистику
        resp2 = self.client.post(url, data={'date': today.isoformat()}, format='json')
        self.assertEqual(resp2.status_code, 200)
        self.habit.refresh_from_db()
        self.assertEqual(self.habit.total_completions, 1)
        self.assertEqual(self.habit.total_skips, 0)


class HabitStreakQueryPerformanceTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='u2', password='pass12345')
        self.habit = Habit.objects.create(user=self.user, name='h2')

    def test_calculated_streak_uses_single_query(self):
        today = timezone.localdate()
        HabitLog.objects.create(habit=self.habit, date=today, status='completed')
        HabitLog.objects.create(habit=self.habit, date=today - timedelta(days=1), status='completed')
        HabitLog.objects.create(habit=self.habit, date=today - timedelta(days=2), status='skipped')

        with self.assertNumQueries(1):
            self.assertEqual(self.habit.calculated_streak, 2)

    def test_calculated_longest_streak_uses_single_query(self):
        today = timezone.localdate()
        # Две серии: 2 дня и 3 дня -> longest = 3
        for d in [0, 1]:
            HabitLog.objects.create(habit=self.habit, date=today - timedelta(days=d), status='completed')
        HabitLog.objects.create(habit=self.habit, date=today - timedelta(days=2), status='skipped')
        for d in [3, 4, 5]:
            HabitLog.objects.create(habit=self.habit, date=today - timedelta(days=d), status='completed')

        with self.assertNumQueries(1):
            self.assertEqual(self.habit.calculated_longest_streak, 3)
