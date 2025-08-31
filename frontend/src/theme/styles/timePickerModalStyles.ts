import { StyleSheet } from 'react-native';

export const createTimePickerModalStyles = (theme: any) => StyleSheet.create({
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
    minHeight: 300, // Увеличиваем минимальную высоту
  },
  timePicker: {
    width: 300, // Увеличиваем ширину
    height: 200, // Увеличиваем высоту
    alignSelf: 'center',
  },
  manualInputContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  manualInputLabel: {
    color: theme.colors.text.primary,
    fontSize: 16,
    marginRight: 10,
  },
  manualInputRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  manualInput: {
    width: 60,
    textAlign: 'center',
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 4,
    padding: 8,
  },
  timeSeparator: {
    color: theme.colors.text.primary,
    fontSize: 20,
    marginHorizontal: 10,
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
