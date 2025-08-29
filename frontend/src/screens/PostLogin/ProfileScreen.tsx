import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { screenStyles } from '../../theme/styles/screenStyles';

interface ProfileScreenProps {
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ 
  onLogout 
}) => {
  return (
    <ScrollView 
      style={screenStyles.screenContainer}
      contentContainerStyle={screenStyles.screenContentContainer}
    >
      <Text style={screenStyles.screenTitle}>👤 Профиль</Text>
      <TouchableOpacity style={screenStyles.profileCard}>
        <Text style={screenStyles.profileTitle}>Пользователь</Text>
        <Text style={screenStyles.profileText}>demo</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={screenStyles.profileCard}>
        <Text style={screenStyles.profileTitle}>Email</Text>
        <Text style={screenStyles.profileText}>demo@example.com</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={screenStyles.profileCard}>
        <Text style={screenStyles.profileTitle}>Дата регистрации</Text>
        <Text style={screenStyles.profileText}>24 августа 2025</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[screenStyles.loadButton, { backgroundColor: '#f44336' }]} 
        onPress={onLogout}
      >
        <Text style={screenStyles.loadButtonText}>Выйти</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
