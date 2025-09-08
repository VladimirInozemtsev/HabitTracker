import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Button, RadioButton, Portal, Dialog } from 'react-native-paper';
import { useApp } from '../../context/AppContext';
import { createSortModalStyles } from '../../theme/styles/sortModalStyles';

interface SortHabitsModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (sortType: string) => void;
  currentSortType: string;
}

export const SortHabitsModal: React.FC<SortHabitsModalProps> = ({
  visible,
  onClose,
  onApply,
  currentSortType,
}) => {
  const { theme } = useApp();
  const [selectedSortType, setSelectedSortType] = React.useState(currentSortType);
  const styles = createSortModalStyles(theme);

  const sortOptions = [
    {
      value: 'name_asc',
      label: 'По названию (А-Я)',
      description: 'Алфавитный порядок',
      icon: 'sort-alphabetical-ascending',
    },
    {
      value: 'name_desc',
      label: 'По названию (Я-А)',
      description: 'Обратный алфавитный порядок',
      icon: 'sort-alphabetical-descending',
    },
    {
      value: 'created_desc',
      label: 'По дате создания (новые сначала)',
      description: 'Сначала новые привычки',
      icon: 'clock-outline',
    },
    {
      value: 'created_asc',
      label: 'По дате создания (старые сначала)',
      description: 'Сначала старые привычки',
      icon: 'clock',
    },
    {
      value: 'status_completed',
      label: 'По статусу (выполненные сначала)',
      description: 'Сначала выполненные сегодня',
      icon: 'check-circle',
    },
    {
      value: 'status_pending',
      label: 'По статусу (невыполненные сначала)',
      description: 'Сначала невыполненные сегодня',
      icon: 'circle-outline',
    },
    {
      value: 'streak_desc',
      label: 'По серии (больше серия сначала)',
      description: 'Сначала длинные серии',
      icon: 'fire',
    },
    {
      value: 'streak_asc',
      label: 'По серии (меньше серия сначала)',
      description: 'Сначала короткие серии',
      icon: 'fire-off',
    },
  ];

  const handleApply = () => {
    onApply(selectedSortType);
    onClose();
  };

  return (
    <Portal>
      <Dialog 
        visible={visible} 
        onDismiss={onClose}
        style={{ backgroundColor: theme.colors.card }}
      >
        <Dialog.Title style={styles.modalTitle}>
          Сортировка привычек
        </Dialog.Title>
        <Dialog.Content style={styles.modalContent}>
          <ScrollView style={styles.optionsList}>
            <RadioButton.Group
              onValueChange={value => setSelectedSortType(value)}
              value={selectedSortType}
            >
              {sortOptions.map((option) => (
                <View key={option.value} style={styles.optionItem}>
                  <View style={styles.radioButton}>
                    <RadioButton
                      value={option.value}
                      color={theme.colors.primary}
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.optionLabel}>
                      {option.label}
                    </Text>
                    <Text style={styles.optionDescription}>
                      {option.description}
                    </Text>
                  </View>
                </View>
              ))}
            </RadioButton.Group>
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
            onPress={handleApply} 
            style={styles.actionButton}
            textColor={theme.colors.text.primary}
          >
            Применить
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
