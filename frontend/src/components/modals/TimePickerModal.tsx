import React, { useState, useEffect } from 'react';
import { View, Platform } from 'react-native';
import { Text, Button, Portal, Dialog, TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createTimePickerModalStyles } from '../../theme/styles/timePickerModalStyles';

interface TimePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (time: string) => void;
  currentTime: string;
  theme: any;
}

export const TimePickerModal: React.FC<TimePickerModalProps> = ({
  visible,
  onClose,
  onSave,
  currentTime,
  theme,
}) => {
  const styles = createTimePickerModalStyles(theme);

  // Парсим текущее время
  const parseTime = (timeString: string): Date => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  const [selectedTime, setSelectedTime] = useState(parseTime(currentTime));
  const [manualHours, setManualHours] = useState(selectedTime.getHours().toString().padStart(2, '0'));
  const [manualMinutes, setManualMinutes] = useState(selectedTime.getMinutes().toString().padStart(2, '0'));

  // Обновляем выбранное время при изменении currentTime
  useEffect(() => {
    const newTime = parseTime(currentTime);
    setSelectedTime(newTime);
    setManualHours(newTime.getHours().toString().padStart(2, '0'));
    setManualMinutes(newTime.getMinutes().toString().padStart(2, '0'));
  }, [currentTime]);

  const handleTimeChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') {
      // На Android сразу сохраняем и закрываем
      if (date) {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}`;
        onSave(timeString);
      }
      onClose();
    } else {
      // На iOS обновляем состояние
      if (date) {
        setSelectedTime(date);
        setManualHours(date.getHours().toString().padStart(2, '0'));
        setManualMinutes(date.getMinutes().toString().padStart(2, '0'));
      }
    }
  };

  const handleManualSave = () => {
    const hours = parseInt(manualHours) || 0;
    const minutes = parseInt(manualMinutes) || 0;
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    onSave(timeString);
    onClose();
  };

  const handleSave = () => {
    const hours = selectedTime.getHours().toString().padStart(2, '0');
    const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    onSave(timeString);
    onClose();
  };

  const handleCancel = () => {
    const originalTime = parseTime(currentTime);
    setSelectedTime(originalTime);
    setManualHours(originalTime.getHours().toString().padStart(2, '0'));
    setManualMinutes(originalTime.getMinutes().toString().padStart(2, '0'));
    onClose();
  };

  return (
    <Portal>
      <Dialog 
        visible={visible} 
        onDismiss={handleCancel}
        style={{ backgroundColor: theme.colors.surface }}
      >
        <Dialog.Title style={styles.modalTitle}>
          Выберите время
        </Dialog.Title>
        <Dialog.Content style={styles.modalContent}>
          {/* Нативный TimePicker */}
          <DateTimePicker
            value={selectedTime}
            mode="time"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleTimeChange}
            style={styles.timePicker}
            textColor={Platform.OS === 'ios' ? theme.colors.text.primary : undefined}
          />

          {/* Ручной ввод времени (для веб-версии) */}
          <View style={styles.manualInputContainer}>
            <Text style={styles.manualInputLabel}>
              Или введите вручную:
            </Text>
          </View>
          <View style={styles.manualInputRow}>
            <TextInput
              value={manualHours}
              onChangeText={setManualHours}
              style={styles.manualInput}
              keyboardType="numeric"
              maxLength={2}
              textColor={theme.colors.text.primary}
              contentStyle={{ color: theme.colors.text.primary }}
            />
            <Text style={styles.timeSeparator}>:</Text>
            <TextInput
              value={manualMinutes}
              onChangeText={setManualMinutes}
              style={styles.manualInput}
              keyboardType="numeric"
              maxLength={2}
              textColor={theme.colors.text.primary}
              contentStyle={{ color: theme.colors.text.primary }}
            />
          </View>
        </Dialog.Content>
        <Dialog.Actions style={styles.actionsContainer}>
          <Button 
            onPress={handleCancel} 
            style={styles.actionButton}
            textColor={theme.colors.text.secondary}
          >
            Отмена
          </Button>
          <Button 
            onPress={Platform.OS === 'web' ? handleManualSave : handleSave} 
            style={styles.actionButton}
            textColor={theme.colors.primary}
          >
            Сохранить
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
