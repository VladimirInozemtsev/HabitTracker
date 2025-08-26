import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Appbar, IconButton, List } from 'react-native-paper';

interface SettingsScreenProps {
  onClose: () => void;
  styles: any;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onClose,
  styles
}) => {
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction 
          onPress={onClose} 
          iconColor="#ffffff"
        />
        <Appbar.Content title="Настройки" />
      </Appbar.Header>
      
      <ScrollView style={styles.content}>
        {/* Секция "Приложение" */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Приложение</Text>
          
          <List.Item
            title="Основные"
            left={(props) => <List.Icon {...props} icon="cog" color="#FF6B9D" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={styles.listItemTitle}
            style={styles.listItem}
          />
          
          <List.Item
            title="Ежедневные напоминания о проверке"
            left={(props) => <List.Icon {...props} icon="bell" color="#4ECDC4" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={styles.listItemTitle}
            style={styles.listItem}
          />
          
          <List.Item
            title="Тема"
            left={(props) => <List.Icon {...props} icon="palette" color="#FFA726" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={styles.listItemTitle}
            style={styles.listItem}
          />
          
          <List.Item
            title="Архив привычек"
            left={(props) => <List.Icon {...props} icon="archive" color="#66BB6A" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={styles.listItemTitle}
            style={styles.listItem}
          />
          
          <List.Item
            title="Импорт/Экспорт данных"
            left={(props) => <List.Icon {...props} icon="database-export" color="#AB47BC" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={styles.listItemTitle}
            style={styles.listItem}
          />
          
          <List.Item
            title="Отсортировать привычки"
            left={(props) => <List.Icon {...props} icon="sort" color="#EF5350" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={styles.listItemTitle}
            style={styles.listItem}
          />
        </View>

        {/* Секция "Помощь" */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Помощь</Text>
          
          <List.Item
            title="Show Onboarding"
            left={(props) => <List.Icon {...props} icon="ship-wheel" color="#FFA726" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={styles.listItemTitle}
            style={styles.listItem}
          />
          
          <List.Item
            title="Show What's New"
            left={(props) => <List.Icon {...props} icon="newspaper" color="#4ECDC4" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={styles.listItemTitle}
            style={styles.listItem}
          />
          
          <List.Item
            title="Обратная связь"
            left={(props) => <List.Icon {...props} icon="send" color="#ffffff" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={styles.listItemTitle}
            style={styles.listItem}
          />
        </View>

        {/* Секция "Информация о приложении" */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Информация о приложении</Text>
          
          <List.Item
            title="Сайт"
            left={(props) => <List.Icon {...props} icon="web" color="#66BB6A" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={styles.listItemTitle}
            style={styles.listItem}
          />
          
          <List.Item
            title="Политика конфиденциальности"
            left={(props) => <List.Icon {...props} icon="shield-lock" color="#FF6B9D" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={styles.listItemTitle}
            style={styles.listItem}
          />
          
          <List.Item
            title="Условия использования"
            left={(props) => <List.Icon {...props} icon="file-document" color="#66BB6A" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={styles.listItemTitle}
            style={styles.listItem}
          />
          
          <List.Item
            title="Оцените приложение"
            left={(props) => <List.Icon {...props} icon="star-outline" color="#AB47BC" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={styles.listItemTitle}
            style={styles.listItem}
          />
        </View>

        {/* Версия приложения */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>HabitTracker 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
};
