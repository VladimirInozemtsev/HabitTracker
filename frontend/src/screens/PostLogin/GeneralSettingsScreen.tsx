import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, IconButton, Switch, Card } from 'react-native-paper';
import { createScreenStyles } from '../../theme/styles/screenStyles';
import { MaterialIcons } from '@expo/vector-icons';
import { Modal, WeekStartSelector } from '../../components/ui';
import { useApp } from '../../context/AppContext'; // ← ДОБАВЛЕНО: импорт контекста

// Удален старый WeekStartModal - заменен на универсальный Modal + WeekStartSelector

interface SettingsItemProps {
  title: string;
  subtitle?: string;
  value?: boolean;
  onToggle?: (value: boolean) => void;
  onPress?: () => void;
  showArrow?: boolean;
  showSwitch?: boolean;
}

const SettingsItem: React.FC<SettingsItemProps> = ({
  title,
  subtitle,
  value,
  onToggle,
  onPress,
  showArrow = false,
  showSwitch = false,
}) => {
  const { theme } = useApp();
  
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress && !onToggle}
      style={{
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.divider,
      }}
    >
      <View style={{
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        justifyContent: 'space-between' as const,
        paddingVertical: 16,
        paddingHorizontal: 16,
      }}>
        <View style={{
          flex: 1,
          marginRight: 16,
        }}>
          <Text style={{
            fontSize: 16,
            color: theme.colors.text.primary,
            marginBottom: 2,
          }}>{title}</Text>
          {subtitle && (
            <Text style={{
              fontSize: 14,
              color: theme.colors.text.secondary,
            }}>{subtitle}</Text>
          )}
        </View>
        <View style={{
          flexDirection: 'row' as const,
          alignItems: 'center' as const,
        }}>
          {showSwitch && (
            <Switch
              value={value}
              onValueChange={onToggle}
              color={theme.colors.icons.purple}
              trackColor={{
                false: theme.colors.divider,
                true: theme.colors.divider,
              }}
            />
          )}
          {showArrow && (
            <MaterialIcons
              name="chevron-right"
              size={20}
              color={theme.colors.text.secondary}
              style={{ marginLeft: 8 }}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, children }) => {
  const { theme } = useApp();
  
  return (
    <View style={{
      marginBottom: 24,
    }}>
      <Text style={{
        fontSize: 16,
        fontWeight: '600' as const,
        color: theme.colors.text.primary,
        marginBottom: 8,
        paddingHorizontal: 4,
      }}>{title}</Text>
      <Card style={{
        backgroundColor: theme.colors.surface,
        borderRadius: 12,
        elevation: 2,
      }}>
        {children}
      </Card>
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
  const { theme, isDark, toggleTheme } = useApp();
  
  // Создаем стили с текущей темой
  const styles = createStyles(theme);

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
          <SettingsItem
            title={`Неделя начинается с ${getWeekDayName(selectedWeekDay)}`}
            onPress={handleWeekStartPress}
            showArrow={true}
          />
          <SettingsItem
            title="Подсвечивать текущий день"
            value={settings.highlightCurrentDay}
            onToggle={() => handleSettingToggle('highlightCurrentDay')}
            showSwitch={true}
          />
        </SettingsSection>

        {/* Режимы просмотра панели */}
        <SettingsSection title="Режимы просмотра панели">
          <SettingsItem
            title="Показать нижнюю панель"
            value={settings.showBottomPanel}
            onToggle={() => handleSettingToggle('showBottomPanel')}
            showSwitch={true}
          />
          <SettingsItem
            title="Показать фильтр"
            value={settings.showFilter}
            onToggle={() => handleSettingToggle('showFilter')}
            showSwitch={true}
          />
        </SettingsSection>

        {/* PRO Настройка панели */}
        <SettingsSection title="PRO Настройка панели">
          <SettingsItem
            title="Показывать счётчик серий"
            value={settings.showSeriesCounter}
            onToggle={() => handleSettingToggle('showSeriesCounter')}
            showSwitch={true}
          />
          <SettingsItem
            title="Показывать цель серии"
            value={settings.showSeriesGoal}
            onToggle={() => handleSettingToggle('showSeriesGoal')}
            showSwitch={true}
          />
          <SettingsItem
            title="Показывать метки месяцев"
            value={settings.showMonthLabels}
            onToggle={() => handleSettingToggle('showMonthLabels')}
            showSwitch={true}
          />
          <SettingsItem
            title="Показывать метки дней"
            value={settings.showDayLabels}
            onToggle={() => handleSettingToggle('showDayLabels')}
            showSwitch={true}
          />
          <SettingsItem
            title="Показывать категории"
            value={settings.showCategories}
            onToggle={() => handleSettingToggle('showCategories')}
            showSwitch={true}
          />
        </SettingsSection>

        {/* Home Screen Widgets */}
        <SettingsSection title="Home Screen Widgets">
          <SettingsItem
            title="Legacy (Performance) Mode"
            value={settings.legacyMode}
            onToggle={() => handleSettingToggle('legacyMode')}
            showSwitch={true}
          />
        </SettingsSection>

        {/* Отладка */}
        <SettingsSection title="Отладка">
          <SettingsItem
            title="Разрешить анализ ошибок"
            value={settings.allowErrorAnalysis}
            onToggle={() => handleSettingToggle('allowErrorAnalysis')}
            showSwitch={true}
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

const createStyles = (theme: any) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 16,
    paddingTop: 5,        // ← ИЗМЕНЕНО: было 16, стало 5 (уменьшена высота сверху)
    paddingBottom: 5,     // ← ИЗМЕНЕНО: было 16, стало 5 (уменьшена высота снизу)
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  backButton: {
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: theme.colors.text.primary,
    flex: 1,
  },
  headerSpacer: {
    width: 56, // Компенсируем кнопку назад
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  settingsSection: {
    marginBottom: 24,
  },
  settingsSectionTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: theme.colors.text.primary,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  settingsSectionCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    elevation: 2,
  },
  settingsItem: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  settingsItemContent: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  settingsItemText: {
    flex: 1,
    marginRight: 16,
  },
  settingsItemTitle: {
    fontSize: 16,
    color: theme.colors.text.primary,
    marginBottom: 2,
  },
  settingsItemSubtitle: {
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  settingsItemControl: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
});

// Старые стили модала удалены - теперь используется универсальный Modal
