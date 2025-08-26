import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { Card, Button } from './common';
import { COLORS, SPACING, COMMON_STYLES } from '../constants/theme';

interface StatsScreenProps {
  userStats: any;
  onLoadStats: () => void;
  styles: any;
}

export const StatsScreen: React.FC<StatsScreenProps> = ({
  userStats,
  onLoadStats,
  styles
}) => {
  return (
    <ScrollView 
      style={styles.screenContainer}
      contentContainerStyle={styles.screenContentContainer}
    >
      <Text style={styles.screenTitle}>Статистика</Text>
      {userStats ? (
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>{userStats.total_habits_created || 0}</Text>
            <Text style={styles.statLabel}>Всего привычек</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>{userStats.total_habits_completed || 0}</Text>
            <Text style={styles.statLabel}>Всего выполнено</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>{userStats.current_streak || 0}</Text>
            <Text style={styles.statLabel}>Текущий стрик</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>{userStats.longest_streak || 0}</Text>
            <Text style={styles.statLabel}>Лучший стрик</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statNumber}>{userStats.completion_rate || 0}%</Text>
            <Text style={styles.statLabel}>Процент выполнения</Text>
          </Card>
        </View>
      ) : (
        <Button
          title="Загрузить статистику"
          onPress={onLoadStats}
          variant="primary"
          size="large"
          style={styles.loadButton}
        />
      )}
    </ScrollView>
  );
};
