import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { screenStyles } from '../../theme/styles/screenStyles';
import { groupStyles } from '../../theme/styles/groupStyles';

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
  return (
    <ScrollView 
      style={screenStyles.screenContainer}
      contentContainerStyle={screenStyles.screenContentContainer}
    >
      <Text style={screenStyles.screenTitle}>Группы привычек</Text>
      <TouchableOpacity
        style={screenStyles.addButton}
        onPress={onOpenAddGroupModal}
      >
        <Text style={screenStyles.addButtonText}>+</Text>
      </TouchableOpacity>
      {groups.length > 0 ? (
        <View style={groupStyles.groupsContainer}>
          {groups.map((group) => {
            const isExpanded = expandedGroups.has(group.id);
            const groupHabitsList = groupHabits[group.id] || [];
            const habitsCount = groupHabitsList.length;
            
            return (
              <View key={group.id} style={groupStyles.groupCard}>
                <TouchableOpacity 
                  style={groupStyles.groupHeader}
                  onPress={() => onToggleGroupExpansion(group.id)}
                >
                  <View style={[groupStyles.groupColor, { backgroundColor: group.color }]} />
                  <View style={groupStyles.groupInfo}>
                    <Text style={groupStyles.groupName}>{group.name}</Text>
                    <Text style={groupStyles.groupDescription}>{group.description || 'Без описания'}</Text>
                    <Text style={groupStyles.groupCount}>{habitsCount} привычек</Text>
                  </View>
                  <Text style={[groupStyles.expandIcon, isExpanded && groupStyles.expandIconRotated]}>
                    {isExpanded ? '▼' : '▶'}
                  </Text>
                </TouchableOpacity>
                
                {isExpanded && (
                  <View style={groupStyles.groupHabitsContainer}>
                    {groupHabitsList.length > 0 ? (
                      groupHabitsList.map((habit) => (
                        <View key={habit.id} style={groupStyles.groupHabitItem}>
                          <Text style={groupStyles.groupHabitName}>{habit.name}</Text>
                          <View style={[
                            groupStyles.groupHabitStatus,
                            { backgroundColor: habit.is_completed_today ? '#4CAF50' : '#E0E0E0' }
                          ]}>
                            <Text style={groupStyles.groupHabitStatusText}>
                              {habit.is_completed_today ? '✅' : '⭕'}
                            </Text>
                          </View>
                        </View>
                      ))
                    ) : (
                      <Text style={groupStyles.noHabitsText}>В этой группе пока нет привычек</Text>
                    )}
                  </View>
                )}
              </View>
            );
          })}
        </View>
      ) : (
        <TouchableOpacity style={screenStyles.loadButton} onPress={onLoadGroups}>
          <Text style={screenStyles.loadButtonText}>Загрузить группы</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};
