import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Appbar, List, Switch } from 'react-native-paper';
import { useApp } from '../../context/AppContext';
import { SortHabitsModal } from '../../components/modals/SortHabitsModal';
import { RemindersModal } from '../../components/modals/RemindersModal';
import { getSortTypeLabel, SortType } from '../../utils/sortHabits';
import { createScreenStyles } from '../../theme/styles/screenStyles';

interface SettingsScreenProps {
  onClose: () => void;
  onNavigateToGeneralSettings?: () => void;
  onNavigateToArchive?: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onClose,
  onNavigateToGeneralSettings,
  onNavigateToArchive,
}) => {
  // Получаем тему из контекста
  const { isDark, setIsDark, theme, sortType, setSortType, reminderSettings, setReminderSettings } = useApp();
  const styles = createScreenStyles(theme);
  
  // ← ДОБАВЛЕНО: состояние для модального окна сортировки
  const [showSortModal, setShowSortModal] = React.useState(false);
  const [showRemindersModal, setShowRemindersModal] = React.useState(false);

  const handleGeneralSettingsPress = () => {
    if (onNavigateToGeneralSettings) onNavigateToGeneralSettings();
  };

  const handleArchivePress = () => {
    if (onNavigateToArchive) onNavigateToArchive();
  };

  // ← ДОБАВЛЕНО: обработчик для открытия модального окна сортировки
  const handleSortPress = () => setShowSortModal(true);

  // ← ДОБАВЛЕНО: обработчик для применения сортировки
  const handleSortApply = (newSortType: string) => {
    setSortType(newSortType);
    setShowSortModal(false);
  };

  const handleRemindersPress = () => setShowRemindersModal(true);
  const handleRemindersSave = (settings: any) => setReminderSettings(settings);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.card }}>
      <Appbar.Header style={{ backgroundColor: theme.colors.background, elevation: 4 }}>
        <Appbar.BackAction 
          onPress={onClose} 
          iconColor={theme.colors.text.primary}
        />
        <Appbar.Content title="Настройки" />
      </Appbar.Header>
      
      <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        {/* Секция "Приложение" */}
        <View style={styles.settingsSection}>
          <Text style={styles.settingsSectionTitle}>Приложение</Text>
          
          <List.Item
            title="Основные"
            left={(props) => <List.Icon {...props} icon="cog" color={theme.colors.text.primary} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={styles.settingsListItemTitle}
            style={[styles.settingsListItem, { backgroundColor: theme.colors.card }]}
            onPress={handleGeneralSettingsPress}
          />
          
          <List.Item
            title="Ежедневные напоминания о проверке"
            left={(props) => <List.Icon {...props} icon="bell" color={theme.colors.text.primary} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={styles.settingsListItemTitle}
            style={[styles.settingsListItem, { backgroundColor: theme.colors.card }]}
            onPress={handleRemindersPress}
          />
          
          <List.Item
            title="Тема"
            left={(props) => <List.Icon {...props} icon="palette" color={theme.colors.text.primary} />}
            right={() => (
              <Switch
                value={isDark}
                onValueChange={setIsDark}
                color={theme.colors.icons.purple}
                trackColor={{
                  false: theme.colors.divider,
                  true: theme.colors.icons.purple,
                }}
              />
            )}
            titleStyle={styles.settingsListItemTitle}
            style={[styles.settingsListItem, { backgroundColor: theme.colors.card }]}
          />
          
          <List.Item
            title="Архив привычек"
            left={(props) => <List.Icon {...props} icon="archive" color={theme.colors.text.primary} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={styles.settingsListItemTitle}
            style={[styles.settingsListItem, { backgroundColor: theme.colors.card }]}
            onPress={handleArchivePress}
          />
          
          <List.Item
            title="Импорт/Экспорт данных"
            left={(props) => <List.Icon {...props} icon="database-export" color={theme.colors.text.primary} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={styles.settingsListItemTitle}
            style={[styles.settingsListItem, { backgroundColor: theme.colors.card }]}
          />
          
          <List.Item
            title="Отсортировать привычки"
            description={getSortTypeLabel(sortType as SortType)}
            left={(props) => <List.Icon {...props} icon="sort" color={theme.colors.text.primary} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={styles.settingsListItemTitle}
            style={[styles.settingsListItem, { backgroundColor: theme.colors.card }]}
            onPress={handleSortPress}
          />
        </View>

        {/* Секция "Помощь" */}
        <View style={styles.settingsSection}>
          <Text style={styles.settingsSectionTitle}>Помощь</Text>
          
          <List.Item
            title="Show Onboarding"
            left={(props) => <List.Icon {...props} icon="ship-wheel" color={theme.colors.text.primary} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={styles.settingsListItemTitle}
            style={styles.settingsListItem}
          />
          
          <List.Item
            title="Show What's New"
            left={(props) => <List.Icon {...props} icon="newspaper" color={theme.colors.text.primary} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={styles.settingsListItemTitle}
            style={styles.settingsListItem}
          />
          
          <List.Item
            title="Обратная связь"
            left={(props) => <List.Icon {...props} icon="send" color={theme.colors.text.primary} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={styles.settingsListItemTitle}
            style={styles.settingsListItem}
          />
        </View>

        {/* Секция "Информация о приложении" */}
        <View style={styles.settingsSection}>
          <Text style={styles.settingsSectionTitle}>Информация о приложении</Text>
          
          <List.Item
            title="Сайт"
            left={(props) => <List.Icon {...props} icon="web" color={theme.colors.text.primary} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={styles.settingsListItemTitle}
            style={styles.settingsListItem}
          />
          
          <List.Item
            title="Политика конфиденциальности"
            left={(props) => <List.Icon {...props} icon="shield-lock" color={theme.colors.text.primary} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={styles.settingsListItemTitle}
            style={styles.settingsListItem}
          />
          
          <List.Item
            title="Условия использования"
            left={(props) => <List.Icon {...props} icon="file-document" color={theme.colors.text.primary} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={styles.settingsListItemTitle}
            style={styles.settingsListItem}
          />
          
          <List.Item
            title="Оцените приложение"
            left={(props) => <List.Icon {...props} icon="star-outline" color={theme.colors.text.primary} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={styles.settingsListItemTitle}
            style={styles.settingsListItem}
          />
        </View>

        {/* Версия приложения */}
        <View style={styles.settingsSection}>
          <Text style={styles.settingsTextSecondary}>HabitTracker 1.0.0</Text>
        </View>
      </ScrollView>

      {/* Модальное окно сортировки */}
      <SortHabitsModal
        visible={showSortModal}
        onClose={() => setShowSortModal(false)}
        currentSortType={sortType}
        onApply={handleSortApply}
      />

      {/* Модальное окно напоминаний */}
      <RemindersModal
        visible={showRemindersModal}
        onClose={() => setShowRemindersModal(false)}
        onSave={handleRemindersSave}
        currentSettings={reminderSettings}
      />
    </View>
  );
};

