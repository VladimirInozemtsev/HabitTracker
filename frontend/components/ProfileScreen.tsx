import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';

interface ProfileScreenProps {
  onLogout: () => void;
  styles: any;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onLogout,
  styles
}) => {
  return (
    <ScrollView 
      style={styles.screenContainer}
      contentContainerStyle={styles.screenContentContainer}
    >
      <Text style={styles.screenTitle}>👤 Профиль</Text>
      <TouchableOpacity style={styles.profileCard}>
        <Text style={styles.profileTitle}>Пользователь</Text>
        <Text style={styles.profileText}>demo</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.profileCard}>
        <Text style={styles.profileTitle}>Email</Text>
        <Text style={styles.profileText}>demo@example.com</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.profileCard}>
        <Text style={styles.profileTitle}>Дата регистрации</Text>
        <Text style={styles.profileText}>24 августа 2025</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.loadButton, { backgroundColor: '#f44336' }]} 
        onPress={onLogout}
      >
        <Text style={styles.loadButtonText}>Выйти</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
