import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

interface AnalyticsScreenProps {
  styles: any;
}

export const AnalyticsScreen: React.FC<AnalyticsScreenProps> = ({
  styles
}) => {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>📈 Аналитика</Text>
      <Text style={styles.screenText}>Здесь будут графики и отчеты</Text>
    </View>
  );
};
