import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';

export type ViewType = 'grid' | 'square' | 'list';

interface ViewSelectorProps {
  selectedView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export const ViewSelector: React.FC<ViewSelectorProps> = ({
  selectedView,
  onViewChange,
}) => {
  // Получаем тему из контекста
  const { theme } = useApp();
  const views: { type: ViewType; icon: string }[] = [
    { type: 'grid', icon: 'grid-view' },
    { type: 'square', icon: 'crop-square' },
    { type: 'list', icon: 'format-list-bulleted' },
  ];

  return (
    <View style={{
      flexDirection: 'row',
      backgroundColor: theme.colors.surface,
      borderRadius: 15,
      padding: 4,
      marginHorizontal: 120,
      marginVertical: 4,
      borderWidth: 0,
      elevation: 0,
    }}>
      {views.map((view) => (
        <TouchableOpacity
          key={view.type}
          style={[
            {
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 12,
            },
            selectedView === view.type && {
              backgroundColor: 'transparent',
            },
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


