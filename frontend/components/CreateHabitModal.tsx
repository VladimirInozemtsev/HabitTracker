import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Text, TextInput, Button, IconButton, Chip } from 'react-native-paper';

interface CreateHabitModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (habitData: any) => void;
  groups: Array<{ id: string; name: string; color: string }>;
  editMode?: boolean;
  habitData?: any;
}

const HABIT_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD',
  '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9', '#F8C471', '#82E0AA',
  '#F1948A', '#85C1E9', '#F7DC6F', '#D7BDE2', '#A9CCE3', '#FAD7A0',
  // Добавляем неоновые цвета
  '#00FF88', '#FF0080', '#8000FF', '#FF8000', '#00FFFF', '#FF00FF',
  '#FFFF00', '#80FF00', '#FF8000', '#0080FF', '#FF0080', '#8000FF'
];

// 100% рабочие иконки Material Design (по 12 в категории)
const HABIT_ICONS = [
  // Деятельность (12 самых ходовых)
  'briefcase', 'clock', 'phone', 'cart', 'bed', 'book', 
  'target', 'headphones', 'leaf', 'wrench', 'fire', 'cellphone',
  
  // Спорт (12 самых ходовых)
  'heart', 'star', 'bike', 'target', 'heart', 'basketball', 
  'dumbbell', 'walk', 'run', 'tennis', 'volleyball', 'swim',
  
  // Еда и напитки (12 самых ходовых)
  'food', 'food-variant', 'food-apple', 'food-croissant', 'food-cake', 'food-coffee',
  'food-fork-knife', 'food-bowl', 'food-bottle', 'food-water', 'food-soda', 'food-beer',
  
  // Искусство (12 самых ходовых)
  'image', 'brush', 'camera', 'palette', 'pencil', 'music',
  'microphone', 'film', 'video', 'book', 'piano', 'guitar',
  
  // Финансы (12 самых ходовых)
  'cash', 'wallet', 'briefcase', 'coins', 'credit-card', 'currency-usd',
  'currency-eur', 'currency-jpy', 'currency-gbp', 'bitcoin', 'piggy-bank', 'chart-line'
];

const SERIES_GOALS = [
  { value: 7, label: '7 дней' },
  { value: 21, label: '21 день' },
  { value: 30, label: '30 дней' },
  { value: 60, label: '60 дней' },
  { value: 90, label: '90 дней' },
  { value: 100, label: '100 дней' }
];

export const CreateHabitModal: React.FC<CreateHabitModalProps> = ({
  visible,
  onClose,
  onSave,
  groups,
  editMode = false,
  habitData = null
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState(HABIT_COLORS[0]);
  const [selectedIcon, setSelectedIcon] = useState(HABIT_ICONS[0]);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [seriesGoal, setSeriesGoal] = useState<number | null>(null);
  const [trackingType, setTrackingType] = useState<'step' | 'custom'>('step');
  const [dailyTarget, setDailyTarget] = useState(1);
  const [reminderTime, setReminderTime] = useState<string | null>(null);

  // Загружаем данные привычки при редактировании
  useEffect(() => {
    if (editMode && habitData && visible) {
      setName(habitData.name || '');
      setDescription(habitData.description || '');
      setSelectedColor(habitData.color || HABIT_COLORS[0]);
      setSelectedIcon(habitData.icon || HABIT_ICONS[0]);
      setSelectedGroup(habitData.group?.id || null);
      setSeriesGoal(habitData.series_goal || null);
      setTrackingType(habitData.tracking_type || 'step');
      setDailyTarget(habitData.daily_target || 1);
      setReminderTime(habitData.reminder_time || null);
    }
  }, [editMode, habitData, visible]);

  const handleSave = () => {
    if (!name.trim()) return;

    const habitData = {
      name: name.trim(),
      description: description.trim(),
      color: selectedColor,
      icon: selectedIcon,
      group: selectedGroup,
      series_goal: seriesGoal,
      tracking_type: trackingType,
      daily_target: dailyTarget,
      reminder_time: reminderTime,
    };

    onSave(habitData);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setSelectedColor(HABIT_COLORS[0]);
    setSelectedIcon(HABIT_ICONS[0]);
    setSelectedGroup(null);
    setShowAdvancedSettings(false);
    setSeriesGoal(null);
    setTrackingType('step');
    setDailyTarget(1);
    setReminderTime(null);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <IconButton
            icon="close"
            iconColor="#fff"
            size={24}
            onPress={onClose}
          />
          <Text style={styles.headerTitle}>Новая привычка</Text>
          <View style={{ width: 48 }} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                     {/* Icon Selection */}
           <View style={styles.section}>
             <Text style={styles.sectionTitle}>Иконка</Text>
             
                           {/* Категории иконок */}
              <View style={styles.iconCategories}>
                <Text style={styles.categoryTitle}>Деятельность</Text>
                                 <View style={styles.iconGrid}>
                   {HABIT_ICONS.slice(0, 12).map((icon, index) => (
                     <TouchableOpacity
                       key={index}
                       style={[
                         styles.iconItem,
                         selectedIcon === icon && styles.iconItemSelected
                       ]}
                       onPress={() => setSelectedIcon(icon)}
                     >
                       <IconButton
                         icon={icon}
                         iconColor="#ffffff"
                         size={22}
                         style={styles.iconButton}
                       />
                     </TouchableOpacity>
                   ))}
                 </View>
                
                <Text style={styles.categoryTitle}>Спорт</Text>
                                 <View style={styles.iconGrid}>
                   {HABIT_ICONS.slice(12, 24).map((icon, index) => (
                     <TouchableOpacity
                       key={index + 12}
                       style={[
                         styles.iconItem,
                         selectedIcon === icon && styles.iconItemSelected
                       ]}
                       onPress={() => setSelectedIcon(icon)}
                     >
                       <IconButton
                         icon={icon}
                         iconColor="#ffffff"
                         size={22}
                         style={styles.iconButton}
                       />
                     </TouchableOpacity>
                   ))}
                 </View>
                
                <Text style={styles.categoryTitle}>Еда и напитки</Text>
                                 <View style={styles.iconGrid}>
                   {HABIT_ICONS.slice(24, 36).map((icon, index) => (
                     <TouchableOpacity
                       key={index + 24}
                       style={[
                         styles.iconItem,
                         selectedIcon === icon && styles.iconItemSelected
                       ]}
                       onPress={() => setSelectedIcon(icon)}
                     >
                       <IconButton
                         icon={icon}
                         iconColor="#ffffff"
                         size={22}
                         style={styles.iconButton}
                       />
                     </TouchableOpacity>
                   ))}
                 </View>
                
                <Text style={styles.categoryTitle}>Искусство</Text>
                                 <View style={styles.iconGrid}>
                   {HABIT_ICONS.slice(36, 48).map((icon, index) => (
                     <TouchableOpacity
                       key={index + 36}
                       style={[
                         styles.iconItem,
                         selectedIcon === icon && styles.iconItemSelected
                       ]}
                       onPress={() => setSelectedIcon(icon)}
                     >
                       <IconButton
                         icon={icon}
                         iconColor="#ffffff"
                         size={22}
                         style={styles.iconButton}
                       />
                     </TouchableOpacity>
                   ))}
                 </View>
                
                <Text style={styles.categoryTitle}>Финансы</Text>
                                 <View style={styles.iconGrid}>
                   {HABIT_ICONS.slice(48, 60).map((icon, index) => (
                     <TouchableOpacity
                       key={index + 48}
                       style={[
                         styles.iconItem,
                         selectedIcon === icon && styles.iconItemSelected
                       ]}
                       onPress={() => setSelectedIcon(icon)}
                     >
                       <IconButton
                         icon={icon}
                         iconColor="#ffffff"
                         size={22}
                         style={styles.iconButton}
                       />
                     </TouchableOpacity>
                   ))}
                 </View>
              </View>
           </View>

          {/* Name and Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Имя</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Название привычки"
              placeholderTextColor="#666"
            />
            
            <Text style={styles.sectionTitle}>Описание</Text>
            <TextInput
              style={styles.input}
              value={description}
              onChangeText={setDescription}
              placeholder="Описание привычки"
              placeholderTextColor="#666"
              multiline
            />
          </View>

          {/* Color Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Цвет</Text>
            <View style={styles.colorGrid}>
              {HABIT_COLORS.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.colorItem,
                    { backgroundColor: color },
                    selectedColor === color && styles.colorItemSelected
                  ]}
                  onPress={() => setSelectedColor(color)}
                />
              ))}
            </View>
          </View>

          {/* Group Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Категория</Text>
            <View style={styles.groupOptions}>
              <TouchableOpacity
                style={[
                  styles.groupOption,
                  !selectedGroup && styles.groupOptionSelected
                ]}
                onPress={() => setSelectedGroup(null)}
              >
                <Text style={[
                  styles.groupOptionText,
                  !selectedGroup && styles.groupOptionTextSelected
                ]}>
                  Без группы
                </Text>
              </TouchableOpacity>
              {groups.map((group) => (
                <TouchableOpacity
                  key={group.id}
                  style={[
                    styles.groupOption,
                    selectedGroup === group.id && styles.groupOptionSelected
                  ]}
                  onPress={() => setSelectedGroup(group.id)}
                >
                  <View style={[styles.groupColor, { backgroundColor: group.color }]} />
                  <Text style={[
                    styles.groupOptionText,
                    selectedGroup === group.id && styles.groupOptionTextSelected
                  ]}>
                    {group.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Advanced Settings Toggle */}
          <TouchableOpacity
            style={styles.advancedToggle}
            onPress={() => setShowAdvancedSettings(!showAdvancedSettings)}
          >
            <Text style={styles.advancedToggleText}>Дополнительные настройки</Text>
            <IconButton
              icon={showAdvancedSettings ? "chevron-up" : "chevron-down"}
              iconColor="#fff"
              size={20}
            />
          </TouchableOpacity>

          {/* Advanced Settings */}
          {showAdvancedSettings && (
            <View style={styles.advancedSettings}>
              {/* Series Goal */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Цель серии</Text>
                <View style={styles.goalOptions}>
                  {SERIES_GOALS.map((goal) => (
                    <TouchableOpacity
                      key={goal.value}
                      style={[
                        styles.goalOption,
                        seriesGoal === goal.value && styles.goalOptionSelected
                      ]}
                      onPress={() => setSeriesGoal(seriesGoal === goal.value ? null : goal.value)}
                    >
                      <Text style={[
                        styles.goalOptionText,
                        seriesGoal === goal.value && styles.goalOptionTextSelected
                      ]}>
                        {goal.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Tracking Type */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Как отслеживать выполнения?</Text>
                <View style={styles.trackingOptions}>
                  <TouchableOpacity
                    style={[
                      styles.trackingOption,
                      trackingType === 'step' && styles.trackingOptionSelected
                    ]}
                    onPress={() => setTrackingType('step')}
                  >
                    <Text style={[
                      styles.trackingOptionText,
                      trackingType === 'step' && styles.trackingOptionTextSelected
                    ]}>
                      Пошагово
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.trackingOption,
                      trackingType === 'custom' && styles.trackingOptionSelected
                    ]}
                    onPress={() => setTrackingType('custom')}
                  >
                    <Text style={[
                      styles.trackingOptionText,
                      trackingType === 'custom' && styles.trackingOptionTextSelected
                    ]}>
                      Своё значение
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.trackingDescription}>
                  {trackingType === 'step' 
                    ? 'Увеличивать на 1 с каждым выполнением'
                    : 'Вводить количество выполнений вручную'
                  }
                </Text>
              </View>

              {/* Daily Target */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Выполнений в день</Text>
                <View style={styles.targetControls}>
                  <View style={styles.targetDisplay}>
                    <Text style={styles.targetText}>{dailyTarget} / День</Text>
                  </View>
                  <View style={styles.targetButtons}>
                    <TouchableOpacity
                      style={styles.targetButton}
                      onPress={() => setDailyTarget(Math.max(1, dailyTarget - 1))}
                    >
                      <Text style={styles.targetButtonText}>-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.targetButton}
                      onPress={() => setDailyTarget(dailyTarget + 1)}
                    >
                      <Text style={styles.targetButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={styles.targetDescription}>
                  Квадрат будет полностью заполнен при достижении этого числа
                </Text>
              </View>

              {/* Reminder */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Напоминание</Text>
                <TouchableOpacity style={styles.reminderButton}>
                  <Text style={styles.reminderButtonText}>
                    {reminderTime || 'Нет'}
                  </Text>
                  <IconButton
                    icon="chevron-right"
                    iconColor="#fff"
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Save Button */}
        <View style={styles.footer}>
          <Button
            mode="contained"
            onPress={handleSave}
            style={styles.saveButton}
            disabled={!name.trim()}
          >
            Сохранить
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#2a2a2a',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    padding: 12,
    color: '#ffffff',
    marginBottom: 16,
  },
  iconCategories: {
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#cccccc',
    marginTop: 16,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    justifyContent: 'center',
    maxWidth: 280, // Принудительно ограничиваем ширину для 6 иконок
  },
  iconItem: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconItemSelected: {
    borderColor: '#00FF88',
    borderWidth: 2,
    backgroundColor: '#1a2a1a',
  },
  iconButton: {
    margin: 0,
    padding: 0,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  colorItem: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorItemSelected: {
    borderColor: '#ffffff',
    borderWidth: 3,
  },
  groupOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  groupOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333333',
    backgroundColor: '#1a1a1a',
  },
  groupOptionSelected: {
    backgroundColor: '#00FF88',
    borderColor: '#00FF88',
  },
  groupColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  groupOptionText: {
    fontSize: 14,
    color: '#cccccc',
  },
  groupOptionTextSelected: {
    color: '#ffffff',
    fontWeight: '600',
  },
  advancedToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#333333',
    marginTop: 16,
  },
  advancedToggleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  advancedSettings: {
    marginTop: 16,
  },
  goalOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  goalOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#333333',
    backgroundColor: '#1a1a1a',
  },
  goalOptionSelected: {
    backgroundColor: '#00FF88',
    borderColor: '#00FF88',
  },
  goalOptionText: {
    fontSize: 14,
    color: '#cccccc',
  },
  goalOptionTextSelected: {
    color: '#ffffff',
    fontWeight: '600',
  },
  trackingOptions: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  trackingOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333333',
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
  },
  trackingOptionSelected: {
    backgroundColor: '#00FF88',
    borderColor: '#00FF88',
  },
  trackingOptionText: {
    fontSize: 14,
    color: '#cccccc',
  },
  trackingOptionTextSelected: {
    color: '#ffffff',
    fontWeight: '600',
  },
  trackingDescription: {
    fontSize: 12,
    color: '#999999',
    fontStyle: 'italic',
  },
  targetControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  targetDisplay: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    padding: 12,
  },
  targetText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
  },
  targetButtons: {
    flexDirection: 'row',
    gap: 4,
  },
  targetButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00FF88',
    justifyContent: 'center',
    alignItems: 'center',
  },
  targetButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  targetDescription: {
    fontSize: 12,
    color: '#999999',
    fontStyle: 'italic',
  },
  reminderButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    padding: 12,
  },
  reminderButtonText: {
    fontSize: 16,
    color: '#ffffff',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  saveButton: {
    backgroundColor: '#00FF88',
  },
});
