import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../theme/theme';

export type ViewType = 'grid' | 'square' | 'list';

interface ViewSelectorProps {
  selectedView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export const ViewSelector: React.FC<ViewSelectorProps> = ({
  selectedView,
  onViewChange,
}) => {
  const views: { type: ViewType; icon: string }[] = [
    { type: 'grid', icon: 'grid-view' },
    { type: 'square', icon: 'crop-square' },
    { type: 'list', icon: 'format-list-bulleted' },
  ];

  return (
    <View style={styles.container}>
      {views.map((view) => (
        <TouchableOpacity
          key={view.type}
          style={[
            styles.iconButton,
            selectedView === view.type && styles.activeIconButton,
          ]}
          onPress={() => onViewChange(view.type)}
        >
          <MaterialIcons
            name={view.icon as any}
            size={24}
            color={
              selectedView === view.type
                ? theme.colors.icons.purple
                : theme.colors.text.primary
            }
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface, // ← ИЗМЕНЕНО: серый фон
    borderRadius: 15,
    padding: 4,
    marginHorizontal: 120, // ← ИЗМЕНЕНО: увеличил отступы для заужения
    marginVertical: 4,
    borderWidth: 0, // ← ИЗМЕНЕНО: убрал границу
    elevation: 0, // ← ИЗМЕНЕНО: убрал тень
  },
  iconButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  activeIconButton: {
    backgroundColor: 'transparent', // ← ИЗМЕНЕНО: прозрачный фон для активной кнопки
  },
});
