import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { screenStyles } from '../../theme/styles/screenStyles';
import { theme } from '../../theme/theme';

interface StatsScreenProps {
  userStats: any;
  loadUserStats: () => void;
}

export const StatsScreen: React.FC<StatsScreenProps> = ({ 
  userStats, 
  loadUserStats 
}) => {
  return (
    <ScrollView 
      style={screenStyles.screenContainer}
      contentContainerStyle={screenStyles.screenContentContainer}
    >
      <Text style={screenStyles.screenTitle}>Статистика</Text>
      {userStats ? (
        <View style={screenStyles.statsContainer}>
          <View style={screenStyles.statCard}>
            <Text style={screenStyles.statNumber}>{userStats.total_habits_created || 0}</Text>
            <Text style={screenStyles.statLabel}>Всего привычек</Text>
          </View>
          <View style={screenStyles.statCard}>
            <Text style={screenStyles.statNumber}>{userStats.total_habits_completed || 0}</Text>
            <Text style={screenStyles.statLabel}>Всего выполнено</Text>
          </View>
          <View style={screenStyles.statCard}>
            <Text style={screenStyles.statNumber}>{userStats.current_streak || 0}</Text>
            <Text style={screenStyles.statLabel}>Текущий стрик</Text>
          </View>
          <View style={screenStyles.statCard}>
            <Text style={screenStyles.statNumber}>{userStats.longest_streak || 0}</Text>
            <Text style={screenStyles.statLabel}>Лучший стрик</Text>
          </View>
          <View style={screenStyles.statCard}>
            <Text style={screenStyles.statNumber}>{userStats.completion_rate || 0}%</Text>
            <Text style={screenStyles.statLabel}>Процент выполнения</Text>
          </View>
        </View>
      ) : (
        <TouchableOpacity style={screenStyles.loadButton} onPress={loadUserStats}>
          <Text style={screenStyles.loadButtonText}>Загрузить статистику</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};
