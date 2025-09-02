import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { createScreenStyles } from '../../theme/styles/screenStyles';
import { Modal, WeekStartSelector } from '../../components/modals';
import { useApp } from '../../context/AppContext';
import { SettingsItemCard } from '../../components/ui';

// Удален старый WeekStartModal - заменен на универсальный Modal + WeekStartSelector

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, children }) => {
  const { theme } = useApp();
  const styles = createScreenStyles(theme);
  
  return (
    <View style={styles.settingsSection}>
      <Text style={styles.settingsSectionTitle}>{title}</Text>
      {children}
    </View>
  );
};

interface GeneralSettingsScreenProps {
  onBack: () => void;
  onSettingsChange?: (settings: { highlightCurrentDay: boolean; weekStartsOn?: string; showBottomPanel?: boolean }) => void; // ← ДОБАВЛЕНО: пропс для обновления настроек
  currentSettings?: { highlightCurrentDay: boolean; weekStartsOn?: string; showBottomPanel?: boolean }; // ← ДОБАВЛЕНО: текущие настройки
}

export const GeneralSettingsScreen: React.FC<GeneralSettingsScreenProps> = ({
  onBack,
  onSettingsChange,
  currentSettings,
}) => {
  // Получаем тему из контекста
  const { theme } = useApp();
  
  // Создаем стили с текущей темой
  const styles = createScreenStyles(theme);

  // Состояние настроек (потом вынесем в хук)
  const [settings, setSettings] = React.useState({
    weekStartsMonday: true,
    highlightCurrentDay: currentSettings?.highlightCurrentDay ?? true, // ← ДОБАВЛЕНО: инициализируем переданным значением
    showBottomPanel: currentSettings?.showBottomPanel ?? true, // ← ДОБАВЛЕНО: инициализируем переданным значением
    showFilter: true,
    showSeriesCounter: false,
    showSeriesGoal: false,
    showMonthLabels: false,
    showDayLabels: false,
    showCategories: false,
    legacyMode: true,
    allowErrorAnalysis: false,
  });

  // ← ДОБАВЛЕНО: состояние для дня начала недели
  const [selectedWeekDay, setSelectedWeekDay] = React.useState(currentSettings?.weekStartsOn ?? 'monday');

  // Состояние для модального окна выбора дня недели
  const [showWeekStartModal, setShowWeekStartModal] = React.useState(false);

  // ← ДОБАВЛЕНО: синхронизируем состояние при изменении currentSettings
  React.useEffect(() => {
    if (currentSettings) {
      setSettings(prev => ({
        ...prev,
        highlightCurrentDay: currentSettings.highlightCurrentDay,
        showBottomPanel: currentSettings.showBottomPanel ?? true,
      }));
      if (currentSettings.weekStartsOn) {
        setSelectedWeekDay(currentSettings.weekStartsOn);
      }
    }
  }, [currentSettings]);

  // Получаем полное название дня для отображения
  const getWeekDayName = (dayKey: string) => {
    const dayNames: { [key: string]: string } = {
      monday: 'понедельника',
      tuesday: 'вторника',
      wednesday: 'среды',
      thursday: 'четверга',
      friday: 'пятницы',
      saturday: 'субботы',
      sunday: 'воскресенья',
    };
    return dayNames[dayKey] || 'понедельника';
  };

  const handleSettingToggle = (key: keyof typeof settings) => {
    setSettings(prev => {
      const newSettings = {
        ...prev,
        [key]: !prev[key],
      };
      
      // ← ДОБАВЛЕНО: уведомляем родительский компонент об изменении настроек
      if (onSettingsChange) {
        onSettingsChange({
          highlightCurrentDay: newSettings.highlightCurrentDay,
          showBottomPanel: newSettings.showBottomPanel,
        });
      }
      
      return newSettings;
    });
  };

  const handleWeekStartPress = () => {
    setShowWeekStartModal(true);
  };

  const handleDaySelect = (dayKey: string) => {
    setSelectedWeekDay(dayKey);
    setShowWeekStartModal(false);
    
    // ← ДОБАВЛЕНО: уведомляем родительский компонент об изменении дня недели
    if (onSettingsChange) {
      onSettingsChange({
        highlightCurrentDay: settings.highlightCurrentDay,
        weekStartsOn: dayKey,
        showBottomPanel: settings.showBottomPanel,
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Заголовок */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <IconButton
            icon="arrow-left"
            iconColor={theme.colors.text.primary}
            size={24}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Основные</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Контент */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Основные настройки */}
        <SettingsSection title="Основные">
          <SettingsItemCard
            title={`Неделя начинается с ${getWeekDayName(selectedWeekDay)}`}
            onPress={handleWeekStartPress}
            showArrow
          />
          <SettingsItemCard
            title="Подсвечивать текущий день"
            value={settings.highlightCurrentDay}
            onToggle={() => handleSettingToggle('highlightCurrentDay')}
            showSwitch
          />
        </SettingsSection>

        {/* Режимы просмотра панели */}
        <SettingsSection title="Режимы просмотра панели">
          <SettingsItemCard
            title="Показать нижнюю панель"
            value={settings.showBottomPanel}
            onToggle={() => handleSettingToggle('showBottomPanel')}
            showSwitch
          />
          <SettingsItemCard
            title="Показать фильтр"
            value={settings.showFilter}
            onToggle={() => handleSettingToggle('showFilter')}
            showSwitch
          />
        </SettingsSection>

        {/* PRO Настройка панели */}
        <SettingsSection title="PRO Настройка панели">
          <SettingsItemCard
            title="Показывать счётчик серий"
            value={settings.showSeriesCounter}
            onToggle={() => handleSettingToggle('showSeriesCounter')}
            showSwitch
          />
          <SettingsItemCard
            title="Показывать цель серии"
            value={settings.showSeriesGoal}
            onToggle={() => handleSettingToggle('showSeriesGoal')}
            showSwitch
          />
          <SettingsItemCard
            title="Показывать метки месяцев"
            value={settings.showMonthLabels}
            onToggle={() => handleSettingToggle('showMonthLabels')}
            showSwitch
          />
          <SettingsItemCard
            title="Показывать метки дней"
            value={settings.showDayLabels}
            onToggle={() => handleSettingToggle('showDayLabels')}
            showSwitch
          />
          <SettingsItemCard
            title="Показывать категории"
            value={settings.showCategories}
            onToggle={() => handleSettingToggle('showCategories')}
            showSwitch
          />
        </SettingsSection>

        {/* Home Screen Widgets */}
        <SettingsSection title="Home Screen Widgets">
          <SettingsItemCard
            title="Legacy (Performance) Mode"
            value={settings.legacyMode}
            onToggle={() => handleSettingToggle('legacyMode')}
            showSwitch
          />
        </SettingsSection>

        {/* Отладка */}
        <SettingsSection title="Отладка">
          <SettingsItemCard
            title="Разрешить анализ ошибок"
            value={settings.allowErrorAnalysis}
            onToggle={() => handleSettingToggle('allowErrorAnalysis')}
            showSwitch
          />
        </SettingsSection>
      </ScrollView>

      {/* Модальное окно выбора дня недели */}
      <Modal
        visible={showWeekStartModal}
        onClose={() => setShowWeekStartModal(false)}
        title="Начало недели"
      >
        <WeekStartSelector
          selectedDay={selectedWeekDay}
          onDaySelect={handleDaySelect}
        />
      </Modal>
    </View>
  );
};

// Стили теперь централизованы в screenStyles.ts
