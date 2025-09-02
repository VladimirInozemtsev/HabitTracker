import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Button, Switch, Portal, Dialog, TextInput, IconButton } from 'react-native-paper';
import { useApp } from '../../context/AppContext';
import { createRemindersModalStyles } from '../../theme/styles/remindersModalStyles';
import { TimePickerModal } from './TimePickerModal';

interface RemindersModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (settings: ReminderSettings) => void;
  currentSettings: ReminderSettings;
}

export interface ReminderSettings {
  enabled: boolean;
  days: string[];
  time: string;
  title: string;
  message: string;
}

export const RemindersModal: React.FC<RemindersModalProps> = ({
  visible,
  onClose,
  onSave,
  currentSettings,
}) => {
  const { theme } = useApp();
  const [settings, setSettings] = React.useState<ReminderSettings>(currentSettings);
  const [showTimePicker, setShowTimePicker] = React.useState(false);
  const styles = createRemindersModalStyles(theme);

  const daysOfWeek = [
    { key: 'mon', label: 'Пн', fullName: 'Понедельник' },
    { key: 'tue', label: 'Вт', fullName: 'Вторник' },
    { key: 'wed', label: 'Ср', fullName: 'Среда' },
    { key: 'thu', label: 'Чт', fullName: 'Четверг' },
    { key: 'fri', label: 'Пт', fullName: 'Пятница' },
    { key: 'sat', label: 'Сб', fullName: 'Суббота' },
    { key: 'sun', label: 'Вс', fullName: 'Воскресенье' },
  ];

  const handleToggleEnabled = () => {
    setSettings(prev => ({ ...prev, enabled: !prev.enabled }));
  };

  const handleDayToggle = (dayKey: string) => {
    setSettings(prev => ({
      ...prev,
      days: prev.days.includes(dayKey)
        ? prev.days.filter(d => d !== dayKey)
        : [...prev.days, dayKey]
    }));
  };

  const handleTimePress = () => {
    setShowTimePicker(true);
  };

  const handleTimeSave = (time: string) => {
    setSettings(prev => ({ ...prev, time }));
  };

  const handleSave = () => {
    onSave(settings);
    onClose();
  };

  return (
    <Portal>
      <Dialog 
        visible={visible} 
        onDismiss={onClose}
        style={{ backgroundColor: theme.colors.surface }}
      >
        <Dialog.Title style={styles.modalTitle}>
          Напоминания о проверке
        </Dialog.Title>
        <Dialog.Content style={styles.modalContent}>
          <ScrollView style={styles.contentScroll}>
            <Text style={styles.description}>
              Настройте уведомление.
            </Text>

            {/* Переключатель включения */}
            <View style={styles.toggleContainer}>
              <Text style={styles.toggleLabel}>
                Включить напоминания
              </Text>
              <Switch
                value={settings.enabled}
                onValueChange={handleToggleEnabled}
                color={theme.colors.icons.purple}
                trackColor={{
                  false: theme.colors.divider,
                  true: theme.colors.icons.purple,
                }}
              />
            </View>

            {/* Выбор дней недели */}
            <View style={styles.daysContainer}>
              <Text style={styles.sectionTitle}>Дни недели</Text>
              <View style={styles.daysGrid}>
                {daysOfWeek.map((day) => (
                  <IconButton
                    key={day.key}
                    icon={settings.days.includes(day.key) ? 'check' : 'circle-outline'}
                    size={24}
                    iconColor={settings.days.includes(day.key) ? theme.colors.primary : theme.colors.text.secondary}
                    style={[
                      styles.dayButton,
                      settings.days.includes(day.key) && styles.dayButtonActive
                    ]}
                    onPress={() => handleDayToggle(day.key)}
                  />
                ))}
              </View>
              <View style={styles.daysLabels}>
                {daysOfWeek.map((day) => (
                  <Text key={day.key} style={styles.dayLabel}>
                    {day.label}
                  </Text>
                ))}
              </View>
            </View>

            {/* Выбор времени */}
            <View style={styles.timeContainer}>
              <Text style={styles.sectionTitle}>Время напоминания</Text>
              <TouchableOpacity 
                style={styles.timePicker}
                onPress={handleTimePress}
                activeOpacity={0.7}
              >
                <IconButton
                  icon="clock-outline"
                  size={24}
                  iconColor={theme.colors.text.primary}
                />
                <Text style={styles.timeText}>{settings.time}</Text>
              </TouchableOpacity>
            </View>

            {/* Кастомные поля */}
            <View style={styles.customFieldsContainer}>
              <Text style={styles.sectionTitle}>Кастомные настройки</Text>
              
              <TextInput
                label="Пользовательский заголовок уведомления"
                value={settings.title}
                onChangeText={(text) => setSettings(prev => ({ ...prev, title: text }))}
                style={styles.textInput}
                textColor={theme.colors.text.primary}
                contentStyle={{ color: theme.colors.text.primary }}
                underlineColor="transparent"
              />
              
              <TextInput
                label="Пользовательское сообщение уведомления"
                value={settings.message}
                onChangeText={(text) => setSettings(prev => ({ ...prev, message: text }))}
                style={styles.textInput}
                textColor={theme.colors.text.primary}
                contentStyle={{ color: theme.colors.text.primary }}
                multiline
                underlineColor="transparent"
              />
            </View>
          </ScrollView>
        </Dialog.Content>
        <Dialog.Actions style={styles.actionsContainer}>
          <Button 
            onPress={onClose} 
            style={styles.actionButton}
            textColor={theme.colors.text.primary}
          >
            Отмена
          </Button>
          <Button 
            onPress={handleSave} 
            style={styles.actionButton}
            textColor={theme.colors.text.primary}
          >
            Сохранить
          </Button>
        </Dialog.Actions>
      </Dialog>

      {/* TimePicker Modal */}
      <TimePickerModal
        visible={showTimePicker}
        onClose={() => setShowTimePicker(false)}
        onSave={handleTimeSave}
        currentTime={settings.time}
        theme={theme}
      />
    </Portal>
  );
};
