import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';
import { COLORS } from '../../constants/theme';

interface StatusBadgeProps {
  isCompleted: boolean;
  size?: number;
  style?: any;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  isCompleted,
  size = 20,
  style,
}) => {
  return (
    <Avatar.Icon
      size={size}
      icon={isCompleted ? "check" : "circle-outline"}
      style={[
        styles.badge,
        {
          backgroundColor: isCompleted ? COLORS.success : '#E0E0E0',
        },
        style,
      ]}
      color="#fff"
    />
  );
};

const styles = StyleSheet.create({
  badge: {
    // Дополнительные стили если нужны
  },
});
