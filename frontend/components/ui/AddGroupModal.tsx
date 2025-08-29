import React, { useState } from 'react';
import { View, Modal, TouchableOpacity } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { modalStyles as styles } from '../../styles/modalStyles';

interface AddGroupModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (groupData: { name: string; description: string; color: string }) => void;
}

export const AddGroupModal: React.FC<AddGroupModalProps> = ({
  visible,
  onClose,
  onSave
}) => {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState('#4CAF50');

  const handleSave = () => {
    if (!groupName.trim()) return;
    
    onSave({
      name: groupName.trim(),
      description: groupDescription.trim(),
      color: selectedColor
    });
    
    // Очищаем форму
    setGroupName('');
    setGroupDescription('');
    setSelectedColor('#4CAF50');
  };

  const handleCancel = () => {
    setGroupName('');
    setGroupDescription('');
    setSelectedColor('#4CAF50');
    onClose();
  };

  const colorOptions = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#4CAF50', '#FFA726', '#9C27B0', '#607D8B'];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleCancel}
    >
      <View style={styles.groupModalOverlay}>
        <View style={styles.groupModalContent}>
          <Text style={styles.groupModalTitle}>Добавить новую группу</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Название группы"
            value={groupName}
            onChangeText={setGroupName}
            maxLength={100}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Описание (необязательно)"
            value={groupDescription}
            onChangeText={setGroupDescription}
            multiline
            numberOfLines={3}
            maxLength={500}
          />
          
          <View style={styles.groupColorPicker}>
            <Text style={styles.groupColorLabel}>Цвет группы:</Text>
            <View style={styles.groupColorOptions}>
              {colorOptions.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.groupColorOption,
                    { backgroundColor: color },
                    selectedColor === color && styles.groupColorOptionSelected
                  ]}
                  onPress={() => setSelectedColor(color)}
                />
              ))}
            </View>
          </View>
          
          <View style={styles.groupModalButtons}>
            <TouchableOpacity 
              style={[styles.groupModalButton, styles.groupModalCancelButton]}
              onPress={handleCancel}
            >
              <Text style={styles.groupModalCancelButtonText}>Отмена</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.groupModalButton, styles.groupModalSaveButton]}
              onPress={handleSave}
            >
              <Text style={styles.groupModalSaveButtonText}>Добавить</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};


