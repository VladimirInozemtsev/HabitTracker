import { StyleSheet } from 'react-native';

export const createDetailStyles = (theme: any) => StyleSheet.create({
  // Стили для панели действий в детальном экране
  actionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    paddingVertical: 8,
    marginVertical: 16,
  },
  actionButton: {
    margin: 0,
    padding: 8,
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.text.primary, // Белый контур
    height: 40, // Фиксированная высота
    justifyContent: 'center',
    alignItems: 'center',
  },
  seriesGoalButton: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.text.primary, // Белый контур
    height: 40, // Фиксированная высота
    justifyContent: 'center',
    alignItems: 'center',
  },
  seriesGoalText: {
    fontSize: 14,
    color: theme.colors.text.primary,
    fontWeight: '500',
  },
  streakCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.text.primary, // Белый контур
    height: 40, // Фиксированная высота
    justifyContent: 'center',
  },
  streakIcon: {
    margin: 0,
    padding: 0,
    marginRight: 6,
  },
  streakText: {
    fontSize: 16,
    color: theme.colors.text.primary,
    fontWeight: 'bold',
  },

  // Стили для детальной страницы привычки
  habitDetailContainer: {
    padding: 16,
  },
  habitDetailCard: {
    backgroundColor: theme.colors.card,
    marginBottom: 16,
  },
  habitDetailName: {
    color: theme.colors.text.primary,
    marginBottom: 8,
  },
  habitDetailDescription: {
    color: theme.colors.text.secondary,
    marginBottom: 16,
  },
  habitDetailStats: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
});
