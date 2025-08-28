import React, { createContext, useContext, ReactNode } from 'react';
import { useHabits } from '../hooks/useHabits';
import { useAuth } from '../hooks/useAuth';
import { useGroups } from '../hooks/useGroups';
import { useNavigation, Screen } from '../hooks/useNavigation';
import { useResponsive } from '../hooks/useResponsive';

// Типы для контекста
interface AppContextType {
  // Хуки
  habits: ReturnType<typeof useHabits>;
  auth: ReturnType<typeof useAuth>;
  groups: ReturnType<typeof useGroups>;
  navigation: ReturnType<typeof useNavigation>;
  responsive: ReturnType<typeof useResponsive>;
  
  // Глобальные состояния
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
  showAddModal: boolean;
  setShowAddModal: (show: boolean) => void;
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
  showAddGroupModal: boolean;
  setShowAddGroupModal: (show: boolean) => void;
  showEditModal: boolean;
  setShowEditModal: (show: boolean) => void;
  showHabitDetail: boolean;
  setShowHabitDetail: (show: boolean) => void;
  selectedHabit: any | null;
  setSelectedHabit: (habit: any | null) => void;
  expandedGroups: Set<string>;
  setExpandedGroups: (groups: Set<string>) => void;
}

// Создаем контекст
const AppContext = createContext<AppContextType | undefined>(undefined);

// Провайдер контекста
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Инициализируем все хуки
  const habits = useHabits();
  const auth = useAuth();
  const groups = useGroups();
  const navigation = useNavigation();
  const responsive = useResponsive();

  // Глобальные состояния (пока используем useState, потом можно вынести в отдельные хуки)
  const [isDark, setIsDark] = React.useState(false);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);
  const [showAddGroupModal, setShowAddGroupModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showHabitDetail, setShowHabitDetail] = React.useState(false);
  const [selectedHabit, setSelectedHabit] = React.useState<any | null>(null);
  const [expandedGroups, setExpandedGroups] = React.useState<Set<string>>(new Set());

  // Значение контекста
  const contextValue: AppContextType = {
    habits,
    auth,
    groups,
    navigation,
    responsive,
    isDark,
    setIsDark,
    showAddModal,
    setShowAddModal,
    showSettings,
    setShowSettings,
    showAddGroupModal,
    setShowAddGroupModal,
    showEditModal,
    setShowEditModal,
    showHabitDetail,
    setShowHabitDetail,
    selectedHabit,
    setSelectedHabit,
    expandedGroups,
    setExpandedGroups,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Хук для использования контекста
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
