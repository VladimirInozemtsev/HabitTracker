import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Appbar, IconButton, List } from 'react-native-paper';
import { theme } from '../config/theme';
import { baseStyles } from '../styles';

interface SettingsScreenProps {
  onClose: () => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onClose,
  isDark = true,
  onToggleTheme,
}) => {
  return (
    <View style={baseStyles.container}>
      <Appbar.Header style={baseStyles.appbar}>
        <Appbar.BackAction 
          onPress={onClose} 
          iconColor={theme.colors.text.primary}
        />
        <Appbar.Content title="Настройки" />
      </Appbar.Header>
      
      <ScrollView style={baseStyles.content}>
        {/* Секция "Приложение" */}
        <View style={baseStyles.section}>
          <Text style={baseStyles.sectionTitle}>Приложение</Text>
          
          <List.Item
            title="Основные"
            left={(props) => <List.Icon {...props} icon="cog" color={theme.colors.icons.pink} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={baseStyles.listItemTitle}
            style={baseStyles.listItem}
          />
          
          <List.Item
            title="Ежедневные напоминания о проверке"
            left={(props) => <List.Icon {...props} icon="bell" color={theme.colors.icons.teal} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={baseStyles.listItemTitle}
            style={baseStyles.listItem}
          />
          
          <List.Item
            title="Тема"
            left={(props) => <List.Icon {...props} icon="palette" color={theme.colors.icons.orange} />}
            right={() => (
              <IconButton
                icon={isDark ? 'toggle-switch' : 'toggle-switch-off'}
                onPress={onToggleTheme}
              />
            )}
            titleStyle={baseStyles.listItemTitle}
            style={baseStyles.listItem}
          />
          
          <List.Item
            title="Архив привычек"
            left={(props) => <List.Icon {...props} icon="archive" color={theme.colors.icons.green} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={baseStyles.listItemTitle}
            style={baseStyles.listItem}
          />
          
          <List.Item
            title="Импорт/Экспорт данных"
            left={(props) => <List.Icon {...props} icon="database-export" color={theme.colors.icons.purple} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={baseStyles.listItemTitle}
            style={baseStyles.listItem}
          />
          
          <List.Item
            title="Отсортировать привычки"
            left={(props) => <List.Icon {...props} icon="sort" color={theme.colors.icons.red} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={baseStyles.listItemTitle}
            style={baseStyles.listItem}
          />
        </View>

        {/* Секция "Помощь" */}
        <View style={baseStyles.section}>
          <Text style={baseStyles.sectionTitle}>Помощь</Text>
          
          <List.Item
            title="Show Onboarding"
            left={(props) => <List.Icon {...props} icon="ship-wheel" color={theme.colors.icons.orange} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={baseStyles.listItemTitle}
            style={baseStyles.listItem}
          />
          
          <List.Item
            title="Show What's New"
            left={(props) => <List.Icon {...props} icon="newspaper" color={theme.colors.icons.teal} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={baseStyles.listItemTitle}
            style={baseStyles.listItem}
          />
          
          <List.Item
            title="Обратная связь"
            left={(props) => <List.Icon {...props} icon="send" color={theme.colors.text.primary} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={baseStyles.listItemTitle}
            style={baseStyles.listItem}
          />
        </View>

        {/* Секция "Информация о приложении" */}
        <View style={baseStyles.section}>
          <Text style={baseStyles.sectionTitle}>Информация о приложении</Text>
          
          <List.Item
            title="Сайт"
            left={(props) => <List.Icon {...props} icon="web" color={theme.colors.icons.green} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={baseStyles.listItemTitle}
            style={baseStyles.listItem}
          />
          
          <List.Item
            title="Политика конфиденциальности"
            left={(props) => <List.Icon {...props} icon="shield-lock" color={theme.colors.icons.pink} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={baseStyles.listItemTitle}
            style={baseStyles.listItem}
          />
          
          <List.Item
            title="Условия использования"
            left={(props) => <List.Icon {...props} icon="file-document" color={theme.colors.icons.green} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={baseStyles.listItemTitle}
            style={baseStyles.listItem}
          />
          
          <List.Item
            title="Оцените приложение"
            left={(props) => <List.Icon {...props} icon="star-outline" color={theme.colors.icons.purple} />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={baseStyles.listItemTitle}
            style={baseStyles.listItem}
          />
        </View>

        {/* Версия приложения */}
        <View style={baseStyles.section}>
          <Text style={baseStyles.textSecondary}>HabitTracker 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
};
