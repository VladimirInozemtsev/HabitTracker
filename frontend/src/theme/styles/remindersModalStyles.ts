import { StyleSheet } from 'react-native';

export const createRemindersModalStyles = (theme: any) => StyleSheet.create({
  modalTitle: {
    color: theme.colors.text.primary,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
  },
  contentScroll: {
    maxHeight: 600, // Увеличиваем максимальную высоту
  },
  description: {
    color: theme.colors.text.secondary,
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  toggleLabel: {
    color: theme.colors.text.primary,
    fontSize: 16,
    flex: 1,
    marginRight: 16,
  },
  daysContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: theme.colors.text.primary,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  daysGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  dayButton: {
    margin: 0,
    padding: 0,
  },
  dayButtonActive: {
    backgroundColor: theme.colors.primary + '20',
  },
  daysLabels: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  dayLabel: {
    color: theme.colors.text.secondary,
    fontSize: 12,
    textAlign: 'center',
    width: 32,
  },
  timeContainer: {
    marginBottom: 24,
  },
  timePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginHorizontal: 16,
  },
  timeText: {
    color: theme.colors.text.primary,
    fontSize: 16,
    marginLeft: 12,
  },
  customFieldsContainer: {
    marginBottom: 16,
  },
  textInput: {
    backgroundColor: theme.colors.surface,
    marginBottom: 12,
    marginHorizontal: 16,
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
