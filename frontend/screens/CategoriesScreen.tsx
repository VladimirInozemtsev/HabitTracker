import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Text, IconButton } from 'react-native-paper';

// Импорты из констант
import { HABIT_CATEGORIES } from '../config/goals';

// Импорт стилей
import { modalStyles as styles } from '../styles/modalStyles';

interface CategoriesScreenProps {
  visible: boolean;
  onClose: () => void;
  onSave: (selectedCategories: string[]) => void;
  selectedCategories?: string[];
}

export const CategoriesScreen: React.FC<CategoriesScreenProps> = ({
  visible,
  onClose,
  onSave,
  selectedCategories = []
}) => {
  const [selected, setSelected] = useState<string[]>(selectedCategories);

  const handleCategoryToggle = (categoryId: string) => {
    setSelected(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSave = () => {
    onSave(selected);
    onClose();
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
            iconColor={undefined}
            size={24}
            onPress={onClose}
          />
          <Text style={styles.headerTitle}>Категории</Text>
          <View style={{ width: 48 }} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.categoryDescription}>
              Выберите одну или несколько категорий, которые соответствуют вашей привычке
            </Text>
          </View>

          {/* Categories Grid */}
          <View style={styles.section}>
            <View style={styles.categoriesGrid}>
              {HABIT_CATEGORIES.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryItem,
                    selected.includes(category.id) && styles.categoryItemSelected
                  ]}
                  onPress={() => handleCategoryToggle(category.id)}
                >
                  <IconButton
                    icon={category.icon}
                    iconColor={undefined}
                    size={24}
                    style={styles.categoryIcon}
                  />
                  <Text style={[
                    styles.categoryText,
                    selected.includes(category.id) && styles.categoryTextSelected
                  ]}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
              
              {/* Create Custom Category - в центре сетки */}
              <TouchableOpacity style={styles.createCustomButton}>
                <Text style={styles.createCustomText}>Создать свою</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Save Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.saveButton, selected.length === 0 && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={selected.length === 0}
          >
            <Text style={styles.saveButtonText}>
              Сохранить ({selected.length})
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
