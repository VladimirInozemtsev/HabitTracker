import React from 'react';
import { View, Text } from 'react-native';
import { screenStyles } from '../styles';

interface AnalyticsScreenProps {
}

export const AnalyticsScreen: React.FC<AnalyticsScreenProps> = () => {
  return (
    <View style={screenStyles.screenContainer}>
      <Text style={screenStyles.screenTitle}>Аналитика</Text>
      <Text style={screenStyles.screenText}>Здесь будут графики и отчеты</Text>
    </View>
  );
};
