import { Habit } from '../types/habit';
import { calculateCurrentStreak } from './streak';

export type SortType = 
  | 'name_asc'        // По названию А-Я
  | 'name_desc'       // По названию Я-А
  | 'created_asc'     // По дате создания (старые сначала)
  | 'created_desc'    // По дате создания (новые сначала)
  | 'status_completed' // По статусу (выполненные сначала)
  | 'status_pending'   // По статусу (невыполненные сначала)
  | 'streak_asc'      // По серии (меньше серия сначала)
  | 'streak_desc';    // По серии (больше серия сначала)

/**
 * Сортирует массив привычек по указанному типу
 */
export const sortHabits = (habits: Habit[], sortType: SortType): Habit[] => {
  const sortedHabits = [...habits]; // Создаем копию массива

  switch (sortType) {
    case 'name_asc':
      return sortedHabits.sort((a, b) => 
        a.name.localeCompare(b.name, 'ru', { sensitivity: 'base' })
      );

    case 'name_desc':
      return sortedHabits.sort((a, b) => 
        b.name.localeCompare(a.name, 'ru', { sensitivity: 'base' })
      );

    case 'created_asc':
      return sortedHabits.sort((a, b) => {
        const dateA = new Date(a.created_at || a.createdAt || 0);
        const dateB = new Date(b.created_at || b.createdAt || 0);
        return dateA.getTime() - dateB.getTime();
      });

    case 'created_desc':
      return sortedHabits.sort((a, b) => {
        const dateA = new Date(a.created_at || a.createdAt || 0);
        const dateB = new Date(b.created_at || b.createdAt || 0);
        return dateB.getTime() - dateA.getTime();
      });

    case 'status_completed':
      return sortedHabits.sort((a, b) => {
        // Сначала выполненные сегодня, потом невыполненные
        if (a.is_completed_today && !b.is_completed_today) return -1;
        if (!a.is_completed_today && b.is_completed_today) return 1;
        // Если статус одинаковый, сортируем по названию
        return a.name.localeCompare(b.name, 'ru', { sensitivity: 'base' });
      });

    case 'status_pending':
      return sortedHabits.sort((a, b) => {
        // Сначала невыполненные сегодня, потом выполненные
        if (!a.is_completed_today && b.is_completed_today) return -1;
        if (a.is_completed_today && !b.is_completed_today) return 1;
        // Если статус одинаковый, сортируем по названию
        return a.name.localeCompare(b.name, 'ru', { sensitivity: 'base' });
      });

    case 'streak_asc':
      return sortedHabits.sort((a, b) => {
        const streakA = calculateCurrentStreak(a.logs || []);
        const streakB = calculateCurrentStreak(b.logs || []);
        if (streakA !== streakB) {
          return streakA - streakB; // Меньшие серии сначала
        }
        // Если серии одинаковые, сортируем по названию
        return a.name.localeCompare(b.name, 'ru', { sensitivity: 'base' });
      });

    case 'streak_desc':
      return sortedHabits.sort((a, b) => {
        const streakA = calculateCurrentStreak(a.logs || []);
        const streakB = calculateCurrentStreak(b.logs || []);
        if (streakA !== streakB) {
          return streakB - streakA; // Большие серии сначала
        }
        // Если серии одинаковые, сортируем по названию
        return a.name.localeCompare(b.name, 'ru', { sensitivity: 'base' });
      });

    default:
      // По умолчанию сортируем по названию А-Я
      return sortedHabits.sort((a, b) => 
        a.name.localeCompare(b.name, 'ru', { sensitivity: 'base' })
      );
  }
};

/**
 * Получает человекочитаемое название типа сортировки
 */
export const getSortTypeLabel = (sortType: SortType): string => {
  switch (sortType) {
    case 'name_asc':
      return 'По названию (А-Я)';
    case 'name_desc':
      return 'По названию (Я-А)';
    case 'created_asc':
      return 'По дате создания (старые сначала)';
    case 'created_desc':
      return 'По дате создания (новые сначала)';
    case 'status_completed':
      return 'По статусу (выполненные сначала)';
    case 'status_pending':
      return 'По статусу (невыполненные сначала)';
    case 'streak_asc':
      return 'По серии (меньше серия сначала)';
    case 'streak_desc':
      return 'По серии (больше серия сначала)';
    default:
      return 'По названию (А-Я)';
  }
};
