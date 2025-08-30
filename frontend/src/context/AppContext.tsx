import React, { createContext, useContext, ReactNode } from 'react';
import { useHabits } from '../hooks/useHabits';
import { useAuth } from '../hooks/useAuth';
import { useGroups } from '../hooks/useGroups';
import { useNavigation, Screen } from '../hooks/useNavigation';
import { useResponsive } from '../hooks/useResponsive';
import { ViewType } from '../components/ui/ViewSelector';
import { getCurrentTheme } from '../theme/theme'; // ← ДОБАВЛЕНО: импорт функции темы

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
  theme: ReturnType<typeof getCurrentTheme>; // ← ДОБАВЛЕНО: текущая тема
  toggleTheme: () => void; // ← ДОБАВЛЕНО: функция переключения темы
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
  selectedView: ViewType;
  setSelectedView: (view: ViewType) => void;
  selectedPeriod: number;
  setSelectedPeriod: (period: number) => void;
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

  // ← ДОБАВЛЕНО: загрузка selectedPeriod из localStorage
  const loadSelectedPeriod = (): number => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const savedSettings = window.localStorage.getItem('habitTrackerSettings');
        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings);
          return parsedSettings.selectedPeriod ?? 5;
        }
      }
    } catch (error) {
      console.error('Error loading selectedPeriod:', error);
    }
    return 5; // значение по умолчанию
  };

  // ← ДОБАВЛЕНО: загрузка темы из localStorage
  const loadTheme = (): boolean => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const savedTheme = window.localStorage.getItem('habitTrackerTheme');
        return savedTheme ? JSON.parse(savedTheme) : true; // по умолчанию темная тема
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
    return true; // по умолчанию темная тема
  };

  // ← ДОБАВЛЕНО: сохранение темы в localStorage
  const saveTheme = (isDark: boolean) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('habitTrackerTheme', JSON.stringify(isDark));
      }
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  // Глобальные состояния (пока используем useState, потом можно вынести в отдельные хуки)
  const [isDark, setIsDark] = React.useState(loadTheme()); // ← ИСПРАВЛЕНО: загружаем из localStorage
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);
  const [showAddGroupModal, setShowAddGroupModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showHabitDetail, setShowHabitDetail] = React.useState(false);
  const [selectedHabit, setSelectedHabit] = React.useState<any | null>(null);
  const [expandedGroups, setExpandedGroups] = React.useState<Set<string>>(new Set());
  const [selectedView, setSelectedView] = React.useState<ViewType>('grid');
  const [selectedPeriod, setSelectedPeriod] = React.useState(loadSelectedPeriod()); // ← ИСПРАВЛЕНО: загружаем из localStorage

  // Значение контекста
  const contextValue: AppContextType = {
    habits,
    auth,
    groups,
    navigation,
    responsive,
    isDark,
    setIsDark,
    theme: getCurrentTheme(isDark), // ← ИСПРАВЛЕНО: передаем параметр
    toggleTheme: () => {
      const newTheme = !isDark;
      setIsDark(newTheme);
      saveTheme(newTheme);
    }, // ← ДОБАВЛЕНО: функция переключения темы с сохранением
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
    selectedView,
    setSelectedView,
    selectedPeriod,
    setSelectedPeriod,
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
