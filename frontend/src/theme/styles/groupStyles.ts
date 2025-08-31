import { StyleSheet } from 'react-native';

export const createGroupStyles = (theme: any) => StyleSheet.create({
  // Стили для групп
  groupsContainer: {
    paddingHorizontal: 10,
  },
  groupCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.divider,
  },
  groupColor: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 12,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  groupDescription: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    marginBottom: 4,
  },
  groupCount: {
    fontSize: 12,
    color: theme.colors.text.disabled,
  },

  // Стили для заголовка групп
  groupsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },

  // Стили для раскрытия групп
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expandIcon: {
    fontSize: 16,
    color: theme.colors.text.disabled,
    marginLeft: 8,
  },
  expandIconRotated: {
    transform: [{ rotate: '90deg' }],
  },
  groupHabitsContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
  },
  groupHabitItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    marginBottom: 6,
  },
  groupHabitName: {
    fontSize: 14,
    color: theme.colors.text.primary,
    flex: 1,
  },
  groupHabitStatus: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupHabitStatusText: {
    fontSize: 14,
  },
  noHabitsText: {
    fontSize: 14,
    color: theme.colors.text.disabled,
    textAlign: 'center',
    fontStyle: 'italic',
    paddingVertical: 12,
  },

  // Стили для выбора группы
  groupPicker: {
    marginTop: 15,
  },
  groupLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: 10,
  },
  groupOptions: {
    flexDirection: 'row',
  },
  groupOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: theme.colors.divider,
    backgroundColor: theme.colors.surface,
  },
  groupOptionSelected: {
    backgroundColor: theme.colors.info,
    borderColor: theme.colors.info,
  },
  groupOptionText: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    marginLeft: 6,
  },
  groupOptionTextSelected: {
    color: theme.colors.text.primary,
    fontWeight: '600',
  },
  groupColorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },

  // Стили для выпадающего списка групп
  groupDropdown: {
    position: 'relative',
  },
  groupDropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.divider,
    borderRadius: 8,
    padding: 12,
    backgroundColor: theme.colors.surface,
  },
  groupDropdownButtonText: {
    fontSize: 16,
    color: theme.colors.text.primary,
  },
  groupDropdownArrow: {
    fontSize: 12,
    color: theme.colors.text.secondary,
  },
  groupDropdownList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.divider,
    borderRadius: 8,
    marginTop: 2,
    maxHeight: 200,
    zIndex: 1000,
  },
  groupDropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  groupDropdownItemSelected: {
    backgroundColor: theme.colors.info,
  },
  groupDropdownItemText: {
    fontSize: 16,
    color: theme.colors.text.primary,
    marginLeft: 8,
  },
  groupDropdownItemTextSelected: {
    color: theme.colors.text.primary,
    fontWeight: '600',
  },
});
