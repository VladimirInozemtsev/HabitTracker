export type HabitLog = { id?: string; date: string; status: string };

/**
 * Calculates current streak (consecutive completed days) starting from the last completed day.
 * Accepts logs as array of strings (dates) or objects with date/status.
 */
export function calculateCurrentStreak(logs: Array<string | HabitLog>): number {
  if (!logs || logs.length === 0) {
    return 0;
  }

  const completedDates: string[] = logs
    .filter((log: any) => {
      if (typeof log === 'string') return true;
      return log && log.status === 'completed';
    })
    .map((log: any) => (typeof log === 'string' ? log : log.date))
    .sort((a: string, b: string) => b.localeCompare(a));

  if (completedDates.length === 0) return 0;

  const lastCompletedDate = completedDates[0];
  let streak = 0;
  const currentDate = new Date(lastCompletedDate);

  // Walk backwards from last completed day
  while (true) {
    const dateString = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

    if (completedDates.includes(dateString)) {
      streak += 1;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}


