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
});
