import React from 'react';
import { View } from 'react-native';
import { Text, Button, Portal, Dialog, IconButton } from 'react-native-paper';
import { useApp } from '../../context/AppContext';
import { createReminderNotificationStyles } from '../../theme/styles/reminderNotificationStyles';

interface ReminderNotificationModalProps {
  visible: boolean;
  onClose: () => void;
  onCheckHabits: () => void;
  onSnooze: () => void;
  title: string;
  message: string;
}

export const ReminderNotificationModal: React.FC<ReminderNotificationModalProps> = ({
  visible,
  onClose,
  onCheckHabits,
  onSnooze,
  title,
  message,
}) => {
  const { theme } = useApp();
  const styles = createReminderNotificationStyles(theme);

  return (
    <Portal>
      <Dialog 
        visible={visible} 
        onDismiss={onClose}
        style={{ backgroundColor: theme.colors.surface }}
      >
        <Dialog.Title style={styles.modalTitle}>
          {title}
        </Dialog.Title>
        <Dialog.Content style={styles.modalContent}>
          <View style={styles.iconContainer}>
            <IconButton
              icon="bell-ring"
              size={48}
              iconColor={theme.colors.primary}
            />
          </View>
          <Text style={styles.message}>
            {message}
          </Text>
        </Dialog.Content>
        <Dialog.Actions style={styles.actionsContainer}>
          <Button 
            onPress={onSnooze} 
            style={styles.actionButton}
            textColor={theme.colors.text.secondary}
          >
            Отложить
          </Button>
          <Button 
            onPress={onCheckHabits} 
            style={styles.actionButton}
            textColor={theme.colors.primary}
          >
            Проверить привычки
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
