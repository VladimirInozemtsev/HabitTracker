import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';

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
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{userStats.total_habits_created || 0}</Text>
            <Text style={styles.statLabel}>Всего привычек</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{userStats.total_habits_completed || 0}</Text>
            <Text style={styles.statLabel}>Всего выполнено</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{userStats.current_streak || 0}</Text>
            <Text style={styles.statLabel}>Текущий стрик</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{userStats.longest_streak || 0}</Text>
            <Text style={styles.statLabel}>Лучший стрик</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{userStats.completion_rate || 0}%</Text>
            <Text style={styles.statLabel}>Процент выполнения</Text>
          </View>
        </View>
      ) : (
        <TouchableOpacity style={styles.loadButton} onPress={onLoadStats}>
          <Text style={styles.loadButtonText}>Загрузить статистику</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};
