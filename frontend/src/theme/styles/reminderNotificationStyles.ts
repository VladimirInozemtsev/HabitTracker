import { StyleSheet } from 'react-native';

export const createReminderNotificationStyles = (theme: any) => StyleSheet.create({
  modalTitle: {
    color: theme.colors.text.primary,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    paddingVertical: 16,
  },
  iconContainer: {
    marginBottom: 16,
  },
  message: {
    color: theme.colors.text.secondary,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  actionsContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 8,
  },
});
