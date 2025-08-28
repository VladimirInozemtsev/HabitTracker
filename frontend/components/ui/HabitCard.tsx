import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { Habit } from '../services/api';
import { HabitGrid } from './HabitGrid';
import { getHabitColor } from '../styles';
import { cardStyles, getHabitStatusStyle, getHabitIconStyle } from '../styles';

interface HabitCardProps {
  habit: Habit;
  isTablet: boolean;
  onPress: () => void;
  onToggleStatus?: () => void;
}


export const HabitCard: React.FC<HabitCardProps> = ({ habit, isTablet, onPress, onToggleStatus }) => {
  const baseColor = habit.color || getHabitColor(habit.id);
  return (
    <Card
      style={[
        cardStyles.habitCard,
        isTablet && cardStyles.habitCardTablet
      ]}
      onPress={onPress}
    >
      <Card.Content style={[
        cardStyles.habitCardContent,
        isTablet && cardStyles.habitCardContentTablet
      ]}>
        <View style={cardStyles.habitInfo}>
          {/* Левый блок: иконка привычки */}
          <View style={cardStyles.habitHeader}>
            <View style={getHabitIconStyle(baseColor)}>
              <IconButton
                icon={habit.icon || 'target'}
                size={32}
                iconColor="#ffffff"
                style={{ margin: 0 }}
              />
            </View>

            {/* Центральный блок: название и описание */}
            <View style={cardStyles.habitTextContainer}>
              <View style={cardStyles.habitNameContainer}>
                <Text style={cardStyles.habitName} numberOfLines={1}>{habit.name}</Text>
              </View>
              {habit.description ? (
                <View style={cardStyles.habitDescriptionContainer}>
                  <Text style={cardStyles.habitDescription} numberOfLines={2}>{habit.description}</Text>
                </View>
              ) : null}
            </View>

            {/* Правый блок: статус сегодня - нажмите чтобы отметить/снять отметку */}
            <View style={cardStyles.habitStatusContainer}>
              <TouchableOpacity
                style={[
                  getHabitStatusStyle(baseColor, habit.is_completed_today),
                  { 
                    minWidth: 50, 
                    minHeight: 50, 
                    justifyContent: 'center', 
                    alignItems: 'center'
                  }
                ]}
                onPress={onToggleStatus}
                disabled={!onToggleStatus}
                activeOpacity={0.7}
              >
                {habit.is_completed_today ? (
                  <IconButton
                    size={35}
                    icon="check"
                    iconColor="#ffffff"
                    style={{ margin: 0 }}
                  />
                ) : (
                  <IconButton
                    size={35}
                    icon="plus"
                    iconColor="#ffffff"
                    style={{ margin: 0 }}
                  />
                )}
              </TouchableOpacity>
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


