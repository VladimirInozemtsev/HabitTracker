import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';

interface GroupsScreenProps {
  groups: any[];
  expandedGroups: Set<string>;
  groupHabits: {[key: string]: any[]};
  onToggleGroupExpansion: (groupId: string) => void;
  onOpenAddGroupModal: () => void;
  onLoadGroups: () => void;
  styles: any;
}

export const GroupsScreen: React.FC<GroupsScreenProps> = ({
  groups,
  expandedGroups,
  groupHabits,
  onToggleGroupExpansion,
  onOpenAddGroupModal,
  onLoadGroups,
  styles
}) => {
  return (
    <ScrollView 
      style={styles.screenContainer}
      contentContainerStyle={styles.screenContentContainer}
    >
      <Text style={styles.screenTitle}>Группы привычек</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={onOpenAddGroupModal}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      {groups.length > 0 ? (
        <View style={styles.groupsContainer}>
          {groups.map((group) => {
            const isExpanded = expandedGroups.has(group.id);
            const groupHabitsList = groupHabits[group.id] || [];
            const habitsCount = groupHabitsList.length;
            
            return (
              <View key={group.id} style={styles.groupCard}>
                <TouchableOpacity 
                  style={styles.groupHeader}
                  onPress={() => onToggleGroupExpansion(group.id)}
                >
                  <View style={[styles.groupColor, { backgroundColor: group.color }]} />
                  <View style={styles.groupInfo}>
                    <Text style={styles.groupName}>{group.name}</Text>
                    <Text style={styles.groupDescription}>{group.description || 'Без описания'}</Text>
                    <Text style={styles.groupCount}>{habitsCount} привычек</Text>
                  </View>
                  <Text style={[styles.expandIcon, isExpanded && styles.expandIconRotated]}>
                    {isExpanded ? '▼' : '▶'}
                  </Text>
                </TouchableOpacity>
                
                {isExpanded && (
                  <View style={styles.groupHabitsContainer}>
                    {groupHabitsList.length > 0 ? (
                      groupHabitsList.map((habit) => (
                        <View key={habit.id} style={styles.groupHabitItem}>
                          <Text style={styles.groupHabitName}>{habit.name}</Text>
                          <View style={[
                            styles.groupHabitStatus,
                            { backgroundColor: habit.is_completed_today ? '#4CAF50' : '#E0E0E0' }
                          ]}>
                            <Text style={styles.groupHabitStatusText}>
                              {habit.is_completed_today ? '✅' : '⭕'}
                            </Text>
                          </View>
                        </View>
                      ))
                    ) : (
                      <Text style={styles.noHabitsText}>В этой группе пока нет привычек</Text>
                    )}
                  </View>
                )}
              </View>
            );
          })}
        </View>
      ) : (
        <TouchableOpacity style={styles.loadButton} onPress={onLoadGroups}>
          <Text style={styles.loadButtonText}>Загрузить группы</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};
