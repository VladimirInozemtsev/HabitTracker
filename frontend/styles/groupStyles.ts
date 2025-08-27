import { StyleSheet } from 'react-native';
import { colors } from './baseStyles';

export const groupStyles = StyleSheet.create({
  // Стили для групп
  groupsContainer: {
    paddingHorizontal: 10,
  },
  groupCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
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
    color: colors.text.primary,
    marginBottom: 4,
  },
  groupDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  groupCount: {
    fontSize: 12,
    color: colors.text.disabled,
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
    color: colors.text.disabled,
    marginLeft: 8,
  },
  expandIconRotated: {
    transform: [{ rotate: '90deg' }],
  },
  groupHabitsContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  groupHabitItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.surface,
    borderRadius: 8,
    marginBottom: 6,
  },
  groupHabitName: {
    fontSize: 14,
    color: colors.text.primary,
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
    color: colors.text.disabled,
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
    color: colors.text.primary,
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
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  groupOptionSelected: {
    backgroundColor: colors.info,
    borderColor: colors.info,
  },
  groupOptionText: {
    fontSize: 14,
    color: colors.text.secondary,
    marginLeft: 6,
  },
  groupOptionTextSelected: {
    color: colors.text.primary,
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
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    backgroundColor: colors.surface,
  },
  groupDropdownButtonText: {
    fontSize: 16,
    color: colors.text.primary,
  },
  groupDropdownArrow: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  groupDropdownList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
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
    borderBottomColor: colors.border,
  },
  groupDropdownItemSelected: {
    backgroundColor: colors.info,
  },
  groupDropdownItemText: {
    fontSize: 16,
    color: colors.text.primary,
    marginLeft: 8,
  },
  groupDropdownItemTextSelected: {
    color: colors.text.primary,
    fontWeight: '600',
  },
});
