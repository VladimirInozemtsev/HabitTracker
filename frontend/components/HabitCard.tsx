import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { Habit } from '../services/api';
import { HabitGrid } from './HabitGrid';
import { getHabitColor } from '../constants/colors';
import { getMutedColor } from '../utils/colors';

interface HabitCardProps {
  habit: Habit;
  isTablet: boolean;
  styles: any;
  onPress: () => void;
}


export const HabitCard: React.FC<HabitCardProps> = ({ habit, isTablet, styles, onPress }) => {
  const baseColor = habit.color || getHabitColor(habit.id);
  return (
    <Card
      style={[
        styles.habitCard,
        isTablet && styles.habitCardTablet
      ]}
      onPress={onPress}
    >
      <Card.Content style={[
        styles.habitCardContent,
        isTablet && styles.habitCardContentTablet
      ]}>
        <View style={styles.habitInfo}>
          {/* Левый блок: иконка привычки */}
          <View style={styles.habitHeader}>
            <View style={styles.habitIconContainer}>
              <IconButton
                icon={habit.icon || 'target'}
                size={32}
                iconColor="#ffffff"
                style={{ margin: 0 }}
              />
            </View>

            {/* Центральный блок: название и описание */}
            <View style={styles.habitTextContainer}>
              <View style={styles.habitNameContainer}>
                <Text style={styles.habitName} numberOfLines={1}>{habit.name}</Text>
              </View>
              {habit.description ? (
                <View style={styles.habitDescriptionContainer}>
                  <Text style={styles.habitDescription} numberOfLines={2}>{habit.description}</Text>
                </View>
              ) : null}
            </View>

            {/* Правый блок: статус сегодня */}
            <View style={styles.habitStatusContainer}>
              <View
                style={{
                  margin: 0,
                  width: 60,
                  height: 60,
                  borderRadius: 8,
                  backgroundColor: habit.is_completed_today ? baseColor : getMutedColor(baseColor),
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {habit.is_completed_today && (
                  <IconButton
                    size={35}
                    icon="check"
                    iconColor="#ffffff"
                    style={{ margin: 0 }}
                  />
                )}
              </View>
            </View>
          </View>
        </View>

        {/* Сетка истории привычки */}
        <HabitGrid
          habitId={habit.id}
          color={baseColor}
          completions={habit.logs || []}
          weeks={25}
          showLegend={false}
        />
      </Card.Content>
    </Card>
  );
};


