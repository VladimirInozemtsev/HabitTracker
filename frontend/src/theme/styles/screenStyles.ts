import { StyleSheet } from 'react-native';

export const createScreenStyles = (theme: any) => StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.background,
  },
  screenContentContainer: {
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: 16,
  },
  screenSubtitle: {
    fontSize: 16,
    color: theme.colors.text.secondary,
    marginBottom: 24,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  sectionHeader: {
    backgroundColor: theme.colors.surface,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
  },
  listItemTitle: {
    fontSize: 16,
    color: theme.colors.text.primary,
  },
  listItemDescription: {
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  emptyText: {
    color: theme.colors.text.secondary,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  statCard: {
    width: '31%',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    elevation: 3,
    marginBottom: 16,
    minHeight: 100,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 14,
    fontWeight: '500',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  loadButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: 32,
  },
  loadButtonText: {
    color: theme.colors.background,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  groupsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  // Стили для GeneralSettingsScreen
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  backButton: {
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    flex: 1,
  },
  headerSpacer: {
    width: 56, // Компенсируем кнопку назад
  },
  // Стили для SettingsSection
  settingsSection: {
    marginBottom: 16,
  },
  settingsSectionFirst: {
    marginBottom: 16,
    marginTop: 16,
  },
  settingsSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: 8,
    marginLeft: 16,
  },
  settingsSectionCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    elevation: 2,
  },
  settingsItem: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  settingsItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsItemCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    elevation: 2,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  // Стили для SettingsScreen (листовые элементы)
  settingsListItem: {
    borderRadius: 12,
    marginBottom: 8,
    marginHorizontal: 16,
    elevation: 2,
    backgroundColor: theme.colors.card,
  },
  settingsListItemTitle: {
    fontSize: 16,
    color: theme.colors.text.primary,
  },
  settingsTextSecondary: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    color: theme.colors.text.secondary,
  },
  // ===== Статистика: список успешных привычек =====
  successfulHabitsSection: {
    marginTop: 24,
    width: '100%',
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: 12,
  },
  habitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  habitName: {
    fontSize: 16,
    color: theme.colors.text.primary,
    flex: 1,
    marginRight: 12,
  },
  habitPercentage: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  noDataText: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
