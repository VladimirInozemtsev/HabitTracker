import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { createScreenStyles } from '../../theme/styles/screenStyles';
import { createGroupStyles } from '../../theme/styles/groupStyles';
import { useApp } from '../../context/AppContext';

interface GroupsScreenProps {
  groups: any[];
  expandedGroups: Set<string>;
  groupHabits: {[key: string]: any[]};
  onToggleGroupExpansion: (groupId: string) => void;
  onOpenAddGroupModal: () => void;
  onLoadGroups: () => void;
}

export const GroupsScreen: React.FC<GroupsScreenProps> = ({
  groups,
  expandedGroups,
  groupHabits,
  onToggleGroupExpansion,
  onOpenAddGroupModal,
  onLoadGroups
}) => {
  // Получаем тему из контекста
  const { theme } = useApp();
  const styles = createScreenStyles(theme);
  const groupStyles = createGroupStyles(theme);

  return (
    <ScrollView 
      style={[styles.screenContainer, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.screenContentContainer}
    >
      <Text style={[styles.screenTitle, { color: theme.colors.text.primary }]}>Группы привычек</Text>
      <TouchableOpacity
        style={[styles.loadButton, { backgroundColor: theme.colors.primary }]}
        onPress={onOpenAddGroupModal}
      >
        <Text style={[styles.loadButtonText, { color: theme.colors.background }]}>+</Text>
      </TouchableOpacity>
      {groups.length > 0 ? (
        <View style={groupStyles.groupsContainer}>
          {groups.map((group) => {
            const isExpanded = expandedGroups.has(group.id);
            const groupHabitsList = groupHabits[group.id] || [];
            const habitsCount = groupHabitsList.length;
            
            return (
              <View key={group.id} style={[groupStyles.groupCard, { backgroundColor: theme.colors.surface }]}>
                <TouchableOpacity 
                  style={groupStyles.groupHeader}
                  onPress={() => onToggleGroupExpansion(group.id)}
                >
                  <View style={[groupStyles.groupColor, { backgroundColor: group.color }]} />
                  <View style={groupStyles.groupInfo}>
                    <Text style={[groupStyles.groupName, { color: theme.colors.text.primary }]}>{group.name}</Text>
                    <Text style={[groupStyles.groupDescription, { color: theme.colors.text.secondary }]}>{group.description || 'Без описания'}</Text>
                    <Text style={[groupStyles.groupCount, { color: theme.colors.text.secondary }]}>{habitsCount} привычек</Text>
                  </View>
                  <Text style={[groupStyles.expandIcon, isExpanded && groupStyles.expandIconRotated, { color: theme.colors.text.primary }]}>
                    {isExpanded ? '▼' : '▶'}
                  </Text>
                </TouchableOpacity>
                
                {isExpanded && (
                  <View style={groupStyles.groupHabitsContainer}>
                    {groupHabitsList.length > 0 ? (
                      groupHabitsList.map((habit) => (
                        <View key={habit.id} style={groupStyles.groupHabitItem}>
                          <Text style={[groupStyles.groupHabitName, { color: theme.colors.text.primary }]}>{habit.name}</Text>
                          <View style={[
                            groupStyles.groupHabitStatus,
                            { backgroundColor: habit.is_completed_today ? theme.colors.success : theme.colors.divider }
                          ]}>
                            <Text style={groupStyles.groupHabitStatusText}>
                              {habit.is_completed_today ? '✅' : '⭕'}
                            </Text>
                          </View>
                        </View>
                      ))
                    ) : (
                      <Text style={[groupStyles.noHabitsText, { color: theme.colors.text.secondary }]}>В этой группе пока нет привычек</Text>
                    )}
                  </View>
                )}
              </View>
            );
          })}
        </View>
      ) : (
        <TouchableOpacity style={[styles.loadButton, { backgroundColor: theme.colors.primary }]} onPress={onLoadGroups}>
          <Text style={[styles.loadButtonText, { color: theme.colors.background }]}>Загрузить группы</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};
