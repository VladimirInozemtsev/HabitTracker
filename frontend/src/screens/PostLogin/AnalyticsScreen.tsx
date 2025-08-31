import React from 'react';
import { View, Text } from 'react-native';
import { createScreenStyles } from '../../theme/styles/screenStyles';
import { useApp } from '../../context/AppContext';

interface AnalyticsScreenProps {
}

export const AnalyticsScreen: React.FC<AnalyticsScreenProps> = () => {
  // Получаем тему из контекста
  const { theme } = useApp();
  const styles = createScreenStyles(theme);

  return (
    <View style={[styles.screenContainer, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.screenTitle, { color: theme.colors.text.primary }]}>Аналитика</Text>
      <Text style={[styles.screenText, { color: theme.colors.text.secondary }]}>Здесь будут графики и отчеты</Text>
    </View>
  );
};
