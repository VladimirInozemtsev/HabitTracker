import React from 'react';
import { View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { Card, Switch, Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import { createScreenStyles } from '../../theme/styles/screenStyles';

interface SettingsItemCardProps {
  title: string;
  subtitle?: string;
  value?: boolean;
  onToggle?: (value: boolean) => void;
  onPress?: () => void;
  showArrow?: boolean;
  showSwitch?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const SettingsItemCard: React.FC<SettingsItemCardProps> = ({
  title,
  subtitle,
  value,
  onToggle,
  onPress,
  showArrow,
  showSwitch,
  style,
}) => {
  const { theme } = useApp();
  const styles = createScreenStyles(theme);

  return (
    <Card style={[styles.settingsItemCard, { marginBottom: 8 }, style]}> 
      <TouchableOpacity
        onPress={onPress}
        disabled={!onPress && !onToggle}
        style={styles.settingsItemContent}
      >
        <View style={styles.settingsItemText}>
          <Text style={styles.settingsItemTitle}>{title}</Text>
          {subtitle ? (
            <Text style={styles.settingsItemSubtitle}>{subtitle}</Text>
          ) : null}
        </View>
        <View style={styles.settingsItemControl}>
          {showSwitch ? (
            <Switch
              value={!!value}
              onValueChange={onToggle}
              color={theme.colors.icons.purple}
              trackColor={{ false: theme.colors.divider, true: theme.colors.divider }}
            />
          ) : null}
          {showArrow ? (
            <MaterialIcons
              name="chevron-right"
              size={20}
              color={theme.colors.text.secondary}
              style={{ marginLeft: 8 }}
            />
          ) : null}
        </View>
      </TouchableOpacity>
    </Card>
  );
};
