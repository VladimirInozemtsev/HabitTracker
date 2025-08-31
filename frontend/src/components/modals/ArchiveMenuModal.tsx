import React from 'react';
import { Alert } from 'react-native';
import { Text, Dialog, Portal, Button } from 'react-native-paper';
import { useApp } from '../../context/AppContext';
import { Habit } from '../../types/habit';

interface ArchiveMenuModalProps {
  visible: boolean;
  habit: Habit | null;
  onClose: () => void;
}

export const ArchiveMenuModal: React.FC<ArchiveMenuModalProps> = ({
  visible,
  habit,
  onClose,
}) => {
  const { theme, archiveHabit } = useApp();

  const handleArchive = async () => {
    if (!habit) {
      console.error('No habit provided to archive');
      return;
    }

    console.log('Archiving habit:', habit.id, habit.name);
    
    try {
      await archiveHabit(habit.id);
      Alert.alert('Успех', 'Привычка отправлена в архив');
      onClose();
    } catch (error) {
      console.error('Error archiving habit:', error);
      Alert.alert('Ошибка', 'Не удалось архивировать привычку');
    }
  };

  const handleArchivePress = () => {
    console.log('Archive button pressed for habit:', habit?.id, habit?.name);
    
    // Прямое архивирование без Alert.alert (проблема с React Native Web)
    handleArchive();
  };

  if (!habit) return null;

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onClose}>
        <Dialog.Title style={{ textAlign: 'center' }}>
          Действия с привычкой
        </Dialog.Title>
        <Dialog.Content style={{ alignItems: 'center' }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '500',
            color: theme.colors.text.primary,
            marginBottom: 16,
            textAlign: 'center',
          }}>
            {habit.name}
          </Text>
        </Dialog.Content>
        <Dialog.Actions style={{ justifyContent: 'center', gap: 12 }}>
          <Button onPress={onClose}>Отмена</Button>
          <Button 
            onPress={handleArchivePress}
            textColor={theme.colors.primary}
            mode="contained"
            buttonColor={theme.colors.error}
          >
            Архивировать
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
