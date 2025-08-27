from __future__ import annotations

import random
from datetime import date, timedelta

from django.core.management.base import BaseCommand, CommandParser
from django.db import transaction
from django.utils import timezone

from users.models import User
from habits.models import Habit, HabitLog


class Command(BaseCommand):
    help = "Generate random HabitLog entries for a user over a date range"

    def add_arguments(self, parser: CommandParser) -> None:
        parser.add_argument(
            "--username",
            type=str,
            default="demo",
            help="Username to populate (default: demo)",
        )
        parser.add_argument(
            "--days",
            type=int,
            default=365,
            help="How many days back from today to generate (default: 365)",
        )
        parser.add_argument(
            "--completion",
            type=float,
            default=0.65,
            help="Baseline completion probability between 0 and 1 (default: 0.65)",
        )
        parser.add_argument(
            "--overwrite",
            action="store_true",
            help="If set, existing logs for those dates will be replaced",
        )

    def handle(self, *args, **options):
        username: str = options["username"]
        days: int = options["days"]
        baseline_completion: float = max(0.0, min(1.0, options["completion"]))
        overwrite: bool = options["overwrite"]

        try:
            user: User = User.objects.get(username=username)
        except User.DoesNotExist:
            self.stderr.write(self.style.ERROR(f"User '{username}' not found"))
            return

        habits = list(Habit.objects.filter(user=user, is_active=True))
        if not habits:
            self.stdout.write(self.style.WARNING("No active habits to populate."))
            return

        today = timezone.now().date()
        start_date = today - timedelta(days=days - 1)

        created_count = 0
        updated_count = 0

        # Slightly vary completion chance per habit to look more realistic
        habit_completion_bias = {
            habit.id: max(0.05, min(0.95, baseline_completion + random.uniform(-0.15, 0.15)))
            for habit in habits
        }

        with transaction.atomic():
            for offset in range(days):
                current_date = start_date + timedelta(days=offset)

                for habit in habits:
                    # Skip future dates just in case
                    if current_date > today:
                        continue

                    # Decide status
                    p = habit_completion_bias[habit.id]
                    rnd = random.random()
                    if rnd < p:
                        status = "completed"
                    elif rnd < p + (1 - p) * 0.2:
                        status = "partial"
                    else:
                        status = "skipped"

                    value = None
                    if status != "skipped":
                        if habit.habit_type == "numeric":
                            target = float(habit.target_value or 1)
                            # 50%..130% of target for completed, 20%..70% for partial
                            low, high = (0.5, 1.3) if status == "completed" else (0.2, 0.7)
                            value = round(target * random.uniform(low, high), 2)
                        elif habit.habit_type == "timer":
                            target = float(habit.target_value or 10)
                            low, high = (0.5, 1.5) if status == "completed" else (0.2, 0.8)
                            value = round(target * random.uniform(low, high), 2)
                        elif habit.habit_type == "boolean":
                            value = 1 if status == "completed" else 0.5
                        elif habit.habit_type == "negative":
                            # For negative habits, completed means no-relapse; value can be 1
                            value = 1 if status == "completed" else 0

                    existing = HabitLog.objects.filter(habit=habit, date=current_date).first()
                    if existing:
                        if overwrite:
                            existing.status = status
                            existing.value = value
                            existing.notes = existing.notes or ""
                            if existing.notes:
                                existing.notes += "\n"
                            existing.notes += f"Auto-filled on {today.isoformat()}"
                            existing.save(update_fields=["status", "value", "notes", "updated_at"])
                            updated_count += 1
                        # else: keep existing
                        continue

                    HabitLog.objects.create(
                        habit=habit,
                        date=current_date,
                        status=status,
                        value=value,
                        notes=f"Auto-filled for {current_date.isoformat()}",
                    )
                    created_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Done. Created: {created_count}, Updated: {updated_count}, User: {user.username}, Days: {days}, Habits: {len(habits)}"
            )
        )


