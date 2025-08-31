import { StyleSheet } from 'react-native';

export const createSortModalStyles = (theme: any) => StyleSheet.create({
  // Стили для модального окна
  modalContainer: {
    backgroundColor: theme.colors.background,
    borderRadius: 12,
    margin: 20,
    maxHeight: '80%',
  },
  
  // Стили для заголовка
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    textAlign: 'center',
    paddingVertical: 16,
  },
  
  // Стили для контента
  modalContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  
  // Стили для списка опций
  optionsList: {
    maxHeight: 400,
  },
  
  // Стили для элемента опции
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  
  // Стили для радио-кнопки
  radioButton: {
    marginRight: 12,
  },
  
  // Стили для контейнера текста
  textContainer: {
    flex: 1,
  },
  
  // Стили для основного текста опции
  optionLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text.primary,
    marginBottom: 2,
  },
  
  // Стили для описания опции
  optionDescription: {
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  
  // Стили для кнопок действий
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
  },
  
  // Стили для кнопки
  actionButton: {
    minWidth: 100,
  },
});
