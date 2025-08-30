import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Habit } from '../../services/api';
import { HabitCard, ViewSelector, SquareHabitCard, PeriodSelector, ListHabitCard } from '../../components/ui';
import { theme } from '../../theme/theme';
import { ViewType } from '../../components/ui/ViewSelector';

interface HabitsScreenProps {
  habits: Habit[];
  isTablet: boolean;
  onHabitPress: (habit: Habit) => void;
  onHabitToggle: (habitId: string) => void;
  onSettingsPress: () => void;
  onOpenAddModal: () => void;
  highlightCurrentDay?: boolean; // ← ДОБАВЛЕНО: пропс для подсветки текущего дня
  weekStartsOn?: string; // ← ДОБАВЛЕНО: день начала недели
  showBottomPanel?: boolean; // ← ДОБАВЛЕНО: показывать нижнюю панель
}

export const HabitsScreen: React.FC<HabitsScreenProps> = ({
  habits,
  isTablet,
  onHabitPress,
  onHabitToggle,
  onSettingsPress,
  onOpenAddModal,
  highlightCurrentDay = true, // ← ДОБАВЛЕНО: по умолчанию включено
  weekStartsOn = 'monday', // ← ДОБАВЛЕНО: по умолчанию понедельник
  showBottomPanel = true // ← ДОБАВЛЕНО: по умолчанию показывать
}) => {
  // ← ДОБАВЛЕНО: состояние для выбранного вида карточек
  const [selectedView, setSelectedView] = React.useState<ViewType>('grid');
  // ← ДОБАВЛЕНО: состояние для выбранного периода (количество дней)
  const [selectedPeriod, setSelectedPeriod] = React.useState<number>(5);
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Appbar.Header style={{ backgroundColor: theme.colors.background, elevation: 4 }}>
        <Appbar.Action 
          icon="cog" 
          onPress={onSettingsPress}
          iconColor="#fff"
        />
        <Appbar.Content 
          title="HabitTracker" 
          subtitle=""
          titleStyle={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}
          subtitleStyle={{ color: '#fff', fontSize: 14, opacity: 0.9 }}
        />
        <Appbar.Action 
          icon="chart-bar" 
          onPress={() => {}}
          iconColor="#fff"
        />
        <Appbar.Action 
          icon="plus" 
          onPress={onOpenAddModal}
          iconColor="#fff"
        />
      </Appbar.Header>
      
      <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background, paddingBottom: 80 }}>
        <View style={{ padding: 0 }}>
          {selectedView === 'grid' ? (
            // ← Обычные карточки
            habits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                isTablet={isTablet}
                onPress={() => onHabitPress(habit)}
                onToggleStatus={() => onHabitToggle(habit.id)}
                highlightCurrentDay={highlightCurrentDay}
                weekStartsOn={weekStartsOn}
              />
            ))
          ) : selectedView === 'square' ? (
            // ← Квадратные карточки в сетке
            <View style={styles.gridContainer}>
              {habits.map((habit) => (
                <SquareHabitCard
                  key={habit.id}
                  habit={habit}
                  onPress={() => onHabitPress(habit)}
                  onToggleStatus={() => onHabitToggle(habit.id)}
                  highlightCurrentDay={highlightCurrentDay}
                  weekStartsOn={weekStartsOn}
                />
              ))}
            </View>
          ) : (
            // ← Список с селектором периода
            <>
              <PeriodSelector
                selectedPeriod={selectedPeriod}
                onPeriodChange={setSelectedPeriod}
              />
              {habits.map((habit) => (
                <ListHabitCard
                  key={habit.id}
                  habit={habit}
                  onPress={() => onHabitPress(habit)}
                  onToggleStatus={() => onHabitToggle(habit.id)}
                  selectedPeriod={selectedPeriod}
                  highlightCurrentDay={highlightCurrentDay}
                />
              ))}
            </>
          )}
        </View>
      </ScrollView>
      
      {/* ← ДОБАВЛЕНО: Нижняя панель с селектором видов */}
      {showBottomPanel && (
        <View style={styles.bottomPanel}>
          <ViewSelector
            selectedView={selectedView}
            onViewChange={setSelectedView}
          />
        </View>
      )}
          </View>
    );
};

const styles = StyleSheet.create({
  bottomPanel: {
    position: 'absolute', // ← ДОБАВЛЕНО: абсолютное позиционирование
    bottom: 0, // ← ДОБАВЛЕНО: внизу экрана
    left: 0, // ← ДОБАВЛЕНО: слева
    right: 0, // ← ДОБАВЛЕНО: справа
    backgroundColor: 'transparent', // ← ИЗМЕНЕНО: прозрачный фон
    paddingVertical: 8,
    borderTopWidth: 0, // ← ИЗМЕНЕНО: убрал границу
    zIndex: 1000, // ← ДОБАВЛЕНО: поверх всего контента
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 8,
  },
});
