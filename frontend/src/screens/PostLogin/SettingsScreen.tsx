import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Appbar, List, Switch } from 'react-native-paper';
import { useApp } from '../../context/AppContext';

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
  const { isDark, toggleTheme, theme } = useApp();

  const handleGeneralSettingsPress = () => {
    console.log('General Settings pressed!');
    if (onNavigateToGeneralSettings) {
      onNavigateToGeneralSettings();
    }
  };

  const handleArchivePress = () => {
    console.log('Archive pressed!');
    if (onNavigateToArchive) {
      onNavigateToArchive();
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Appbar.Header style={{ backgroundColor: theme.colors.background, elevation: 4 }}>
        <Appbar.BackAction 
          onPress={onClose} 
          iconColor={theme.colors.text.primary}
        />
        <Appbar.Content title="Настройки" />
      </Appbar.Header>
      
      <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        {/* Секция "Приложение" */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>Приложение</Text>
          
          <List.Item
            title="Основные"
            left={(props) => <List.Icon {...props} icon="cog" color={theme.colors.text.primary} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={[styles.listItemTitle, { color: theme.colors.text.primary }]}
            style={[styles.listItem, { backgroundColor: theme.colors.surface }]}
            onPress={handleGeneralSettingsPress}
          />
          
          <List.Item
            title="Ежедневные напоминания о проверке"
            left={(props) => <List.Icon {...props} icon="bell" color={theme.colors.text.primary} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={[styles.listItemTitle, { color: theme.colors.text.primary }]}
            style={[styles.listItem, { backgroundColor: theme.colors.surface }]}
          />
          
          <List.Item
            title="Тема"
            left={(props) => <List.Icon {...props} icon="palette" color={theme.colors.text.primary} />}
            right={() => (
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                color={theme.colors.icons.purple}
                trackColor={{
                  false: theme.colors.divider,
                  true: theme.colors.icons.purple,
                }}
              />
            )}
            titleStyle={[styles.listItemTitle, { color: theme.colors.text.primary }]}
            style={[styles.listItem, { backgroundColor: theme.colors.surface }]}
          />
          
          <List.Item
            title="Архив привычек"
            left={(props) => <List.Icon {...props} icon="archive" color={theme.colors.text.primary} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={[styles.listItemTitle, { color: theme.colors.text.primary }]}
            style={[styles.listItem, { backgroundColor: theme.colors.surface }]}
            onPress={handleArchivePress}
          />
          
          <List.Item
            title="Импорт/Экспорт данных"
            left={(props) => <List.Icon {...props} icon="database-export" color={theme.colors.text.primary} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={[styles.listItemTitle, { color: theme.colors.text.primary }]}
            style={[styles.listItem, { backgroundColor: theme.colors.surface }]}
          />
          
          <List.Item
            title="Отсортировать привычки"
            left={(props) => <List.Icon {...props} icon="sort" color={theme.colors.text.primary} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={[styles.listItemTitle, { color: theme.colors.text.primary }]}
            style={[styles.listItem, { backgroundColor: theme.colors.surface }]}
          />
        </View>

        {/* Секция "Помощь" */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>Помощь</Text>
          
          <List.Item
            title="Show Onboarding"
            left={(props) => <List.Icon {...props} icon="ship-wheel" color={theme.colors.text.primary} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={[styles.listItemTitle, { color: theme.colors.text.primary }]}
            style={[styles.listItem, { backgroundColor: theme.colors.surface }]}
          />
          
          <List.Item
            title="Show What's New"
            left={(props) => <List.Icon {...props} icon="newspaper" color={theme.colors.text.primary} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={[styles.listItemTitle, { color: theme.colors.text.primary }]}
            style={[styles.listItem, { backgroundColor: theme.colors.surface }]}
          />
          
          <List.Item
            title="Обратная связь"
            left={(props) => <List.Icon {...props} icon="send" color={theme.colors.text.primary} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={[styles.listItemTitle, { color: theme.colors.text.primary }]}
            style={[styles.listItem, { backgroundColor: theme.colors.surface }]}
          />
        </View>

        {/* Секция "Информация о приложении" */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>Информация о приложении</Text>
          
          <List.Item
            title="Сайт"
            left={(props) => <List.Icon {...props} icon="web" color={theme.colors.text.primary} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={[styles.listItemTitle, { color: theme.colors.text.primary }]}
            style={[styles.listItem, { backgroundColor: theme.colors.surface }]}
          />
          
          <List.Item
            title="Политика конфиденциальности"
            left={(props) => <List.Icon {...props} icon="shield-lock" color={theme.colors.text.primary} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={[styles.listItemTitle, { color: theme.colors.text.primary }]}
            style={[styles.listItem, { backgroundColor: theme.colors.surface }]}
          />
          
          <List.Item
            title="Условия использования"
            left={(props) => <List.Icon {...props} icon="file-document" color={theme.colors.text.primary} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={[styles.listItemTitle, { color: theme.colors.text.primary }]}
            style={[styles.listItem, { backgroundColor: theme.colors.surface }]}
          />
          
          <List.Item
            title="Оцените приложение"
            left={(props) => <List.Icon {...props} icon="star-outline" color={theme.colors.text.primary} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={[styles.listItemTitle, { color: theme.colors.text.primary }]}
            style={[styles.listItem, { backgroundColor: theme.colors.surface }]}
          />
        </View>

        {/* Версия приложения */}
        <View style={styles.section}>
          <Text style={[styles.textSecondary, { color: theme.colors.text.secondary }]}>HabitTracker 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  listItem: {
    borderRadius: 8,
    marginBottom: 4,
  },
  listItemTitle: {
    fontSize: 16,
  },
  textSecondary: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
});
