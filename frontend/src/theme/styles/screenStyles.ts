import { StyleSheet } from 'react-native';
import { theme } from '../theme';

export const screenStyles = StyleSheet.create({
  // Стили для экранов
  screenContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.colors.background,
  },
  screenContentContainer: {
    paddingHorizontal: 0, // Убираем горизонтальные отступы полностью
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: theme.colors.text.primary,
    textAlign: 'center',
  },
  screenTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  screenTitleIcon: {
    margin: 0,
    padding: 0,
    marginRight: 8,
    alignSelf: 'center',
    marginTop: 2,
  },
  screenText: {
    fontSize: 16,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  
  // Стили для статистики
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  statCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    width: '48%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.divider,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  loadButton: {
    backgroundColor: theme.colors.surface,
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    borderWidth: 1,
    borderColor: theme.colors.divider,
    alignItems: 'center',
  },
  loadButtonText: {
    color: theme.colors.text.primary,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  // Стили для групп
  groupsContainer: {
    paddingHorizontal: 10,
  },
  groupCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.divider,
  },
  groupColor: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 12,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  groupDescription: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    marginBottom: 4,
  },
  groupCount: {
    fontSize: 12,
    color: theme.colors.text.disabled,
  },
  
  // Стили для профиля
  profileCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.divider,
  },
  profileTitle: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    marginBottom: 4,
  },
  profileText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  
  // Стили для заголовка групп
  groupsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
