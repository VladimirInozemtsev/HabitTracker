import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Text, TextInput, Button, IconButton } from 'react-native-paper';

// Импорты из констант
import { HABIT_ICONS, getAllIcons } from '../constants/icons';
import { HABIT_COLORS } from '../constants/colors';
import { SERIES_GOALS, TRACKING_TYPES, TrackingType, HABIT_CATEGORIES } from '../constants/goals';

// Импорт стилей
import { modalStyles as styles } from '../styles/modalStyles';
import { colors, baseStyles } from '../constants/appStyles';

// Импорт компонентов
import { CategoriesScreen } from './CategoriesScreen';

interface CreateHabitModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (habitData: any) => void;
  groups: Array<{ id: string; name: string; color: string }>;
  editMode?: boolean;
  habitData?: any;
}

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
  const [selectedIcon, setSelectedIcon] = useState(getAllIcons()[0]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [seriesGoal, setSeriesGoal] = useState<number | null>(null);
  const [trackingType, setTrackingType] = useState<TrackingType>('step');
  const [dailyTarget, setDailyTarget] = useState(1);
  const [reminderTime, setReminderTime] = useState<string | null>(null);
  const [showFullIconSelector, setShowFullIconSelector] = useState<boolean>(false);
  const [showCategoriesScreen, setShowCategoriesScreen] = useState<boolean>(false);

  // Загружаем данные привычки при редактировании
  useEffect(() => {
    if (editMode && habitData && visible) {
      setName(habitData.name || '');
      setDescription(habitData.description || '');
      setSelectedColor(habitData.color || HABIT_COLORS[0]);
      setSelectedIcon(habitData.icon || getAllIcons()[0]);
      setSelectedCategories(habitData.categories || []);
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
      categories: selectedCategories,
      series_goal: seriesGoal,
      tracking_type: trackingType,
      daily_target: dailyTarget,
      reminder_time: reminderTime,
    };



    onSave(habitData);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setSelectedColor(HABIT_COLORS[0]);
    setSelectedIcon(getAllIcons()[0]);
    setSelectedCategories([]);
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
            iconColor={colors.text.primary}
            size={24}
            onPress={onClose}
          />
          <Text style={styles.headerTitle}>
            {editMode ? 'Редактировать привычку' : 'Новая привычка'}
          </Text>
          <View style={{ width: 48 }} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Icon Selection */}
          <View style={styles.section}>
                        
            {/* Центральная иконка с фоном */}
            <TouchableOpacity 
              style={styles.centralIconContainer}
              onPress={() => setShowFullIconSelector(!showFullIconSelector)}
            >
              {/* Фоновые мини-иконки */}
              <View style={styles.backgroundIcons}>
                {getAllIcons().slice(0, 45).map((icon, index) => (
                  <IconButton
                    key={index}
                    icon={icon}
                    iconColor={colors.text.primary}
                    size={12}
                    style={styles.backgroundIcon}
                  />
                ))}
              </View>
              
              {/* Центральная большая иконка */}
              <View style={styles.centralIconCircle}>
                <IconButton
                  icon={selectedIcon}
                  iconColor={colors.text.primary}
                  size={32}
                  style={styles.centralIcon}
                />
              </View>
            </TouchableOpacity>
            
            {/* Полный селектор иконок (показывается при нажатии) */}
            {showFullIconSelector && (
              <View style={styles.iconCategories}>
                {Object.entries(HABIT_ICONS).map(([category, icons]) => (
                  <View key={category}>
                    <Text style={styles.categoryTitle}>
                      {category === 'activity' && 'Деятельность'}
                      {category === 'sport' && 'Спорт'}
                      {category === 'food' && 'Еда и напитки'}
                      {category === 'art' && 'Искусство'}
                      {category === 'finance' && 'Финансы'}
                    </Text>
                    <View style={styles.iconGrid}>
                      {icons.map((icon, index) => (
                        <TouchableOpacity
                          key={index}
                          style={[
                            styles.iconItem,
                            selectedIcon === icon && styles.iconItemSelected
                          ]}
                          onPress={() => {
                            setSelectedIcon(icon);
                            setShowFullIconSelector(false); // Скрываем после выбора
                          }}
                        >
                          <IconButton
                            icon={icon}
                            iconColor={colors.text.primary}
                            size={22}
                            style={styles.iconButton}
                          />
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            )}
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
              dense
              mode="outlined"
              outlineColor={colors.text.primary}
              activeOutlineColor={colors.text.primary}
              contentStyle={{ paddingVertical: 4 }}
            />
            
            <Text style={styles.sectionTitle}>Описание</Text>
            <TextInput
              style={styles.input}
              value={description}
              onChangeText={setDescription}
              placeholder="Описание привычки"
              placeholderTextColor="#666"
              multiline
              dense
              mode="outlined"
              outlineColor={colors.text.primary}
              activeOutlineColor={colors.text.primary}
              contentStyle={{ paddingVertical: 4 }}
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



          {/* Advanced Settings Toggle */}
          <TouchableOpacity
            style={styles.advancedToggle}
            onPress={() => setShowAdvancedSettings(!showAdvancedSettings)}
          >
            <Text style={styles.advancedToggleText}>Дополнительные настройки</Text>
            <IconButton
              icon={showAdvancedSettings ? "chevron-up" : "chevron-down"}
              iconColor={colors.text.primary}
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
                      trackingType === TRACKING_TYPES.step && styles.trackingOptionSelected
                    ]}
                    onPress={() => setTrackingType(TRACKING_TYPES.step)}
                  >
                    <Text style={[
                      styles.trackingOptionText,
                      trackingType === TRACKING_TYPES.step && styles.trackingOptionTextSelected
                    ]}>
                      Пошагово
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.trackingOption,
                      trackingType === TRACKING_TYPES.custom && styles.trackingOptionSelected
                    ]}
                    onPress={() => setTrackingType(TRACKING_TYPES.custom)}
                  >
                    <Text style={[
                      styles.trackingOptionText,
                      trackingType === TRACKING_TYPES.custom && styles.trackingOptionTextSelected
                    ]}>
                      Своё значение
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.trackingDescription}>
                  {trackingType === TRACKING_TYPES.step 
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

              {/* Categories */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Категории</Text>
                <TouchableOpacity 
                  style={styles.categoriesButton}
                  onPress={() => setShowCategoriesScreen(true)}
                >
                  <View style={styles.categoriesButtonContent}>
                    {selectedCategories.length > 0 ? (
                      <View style={styles.selectedCategoriesPreview}>
                        {selectedCategories.slice(0, 2).map((categoryId) => {
                          const category = HABIT_CATEGORIES.find(c => c.id === categoryId);
                          return (
                            <View key={categoryId} style={styles.categoryPreviewItem}>
                              <IconButton
                                icon={category?.icon || 'star'}
                                iconColor={colors.text.primary}
                                size={16}
                                style={styles.categoryPreviewIcon}
                              />
                            </View>
                          );
                        })}
                        {selectedCategories.length > 2 && (
                          <Text style={styles.categoryPreviewCount}>
                            +{selectedCategories.length - 2}
                          </Text>
                        )}
                      </View>
                    ) : (
                      <Text style={styles.categoriesButtonText}>Выбрать категории</Text>
                    )}
                  </View>
                  <IconButton
                    icon="chevron-right"
                    iconColor={colors.text.primary}
                    size={20}
                  />
                </TouchableOpacity>
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
                    iconColor={colors.text.primary}
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
            {editMode ? 'Сохранить изменения' : 'Сохранить'}
          </Button>
        </View>
      </View>

      {/* Categories Screen */}
      <CategoriesScreen
        visible={showCategoriesScreen}
        onClose={() => setShowCategoriesScreen(false)}
        onSave={setSelectedCategories}
        selectedCategories={selectedCategories}
      />
    </Modal>
  );
};
