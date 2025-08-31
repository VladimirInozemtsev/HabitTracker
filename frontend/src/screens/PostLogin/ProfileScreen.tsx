import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { createScreenStyles } from '../../theme/styles/screenStyles';
import { useApp } from '../../context/AppContext';

interface ProfileScreenProps {
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ 
  onLogout 
}) => {
  // Получаем тему из контекста
  const { theme } = useApp();
  const styles = createScreenStyles(theme);

  return (
    <ScrollView 
      style={[styles.screenContainer, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.screenContentContainer}
    >
      <Text style={[styles.screenTitle, { color: theme.colors.text.primary }]}>👤 Профиль</Text>
      <TouchableOpacity style={[styles.profileCard, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.profileTitle, { color: theme.colors.text.primary }]}>Пользователь</Text>
        <Text style={[styles.profileText, { color: theme.colors.text.secondary }]}>demo</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.profileCard, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.profileTitle, { color: theme.colors.text.primary }]}>Email</Text>
        <Text style={[styles.profileText, { color: theme.colors.text.secondary }]}>demo@example.com</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.profileCard, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.profileTitle, { color: theme.colors.text.primary }]}>Дата регистрации</Text>
        <Text style={[styles.profileText, { color: theme.colors.text.secondary }]}>24 августа 2025</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.loadButton, { backgroundColor: theme.colors.error }]} 
        onPress={onLogout}
      >
        <Text style={[styles.loadButtonText, { color: theme.colors.background }]}>Выйти</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
