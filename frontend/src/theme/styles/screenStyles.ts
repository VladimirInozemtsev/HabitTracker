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
  loadButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  loadButtonText: {
    color: theme.colors.onPrimary,
    fontSize: 16,
    fontWeight: 'bold',
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
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    marginTop: 4,
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
    marginBottom: 24,
  },
  settingsSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: 8,
    paddingHorizontal: 16,
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
  },
  // Стили для SettingsScreen (листовые элементы)
  settingsListItem: {
    borderRadius: 12,
    marginBottom: 4,
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
});
