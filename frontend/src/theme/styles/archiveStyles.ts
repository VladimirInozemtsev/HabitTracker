import { StyleSheet } from 'react-native';

export const createArchiveStyles = (theme: any) => StyleSheet.create({
  // Контейнер архивной карточки
  archiveCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.divider,
  },

  // Контейнер для иконки и названия
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  // Контейнер для текста
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },

  // Название привычки
  habitName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: 4,
  },

  // Описание привычки
  habitDescription: {
    fontSize: 14,
    color: theme.colors.text.secondary,
  },

  // Контейнер для кнопок
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },

  // Кнопка удаления
  deleteButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.error,
    alignItems: 'center',
  },

  // Текст кнопки удаления
  deleteButtonText: {
    color: theme.colors.error,
    fontSize: 14,
    fontWeight: '600',
  },

  // Кнопка восстановления
  restoreButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
  },

  // Текст кнопки восстановления
  restoreButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '600',
  },
});
