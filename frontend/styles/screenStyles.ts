import { StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, LINE_HEIGHT } from '../constants/theme';

export const screenStyles = StyleSheet.create({
  // Основные контейнеры экранов
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  
  // Контент экранов
  content: {
    flex: 1,
    paddingHorizontal: SPACING.md,
  },
  
  // Заголовки экранов
  screenTitle: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  
  // Контейнеры для списков
  listContainer: {
    paddingVertical: SPACING.sm,
  },
  
  // Карточки привычек
  habitCard: {
    marginBottom: SPACING.md,
  },
  
  habitInfo: {
    // Стили для информации о привычке
  },
  
  habitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  
  habitText: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  
  habitName: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  
  habitDescription: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.secondary,
    lineHeight: LINE_HEIGHT.sm,
  },
  
  habitStatus: {
    // Стили для статуса привычки
  },
  
  // Статистика
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.sm,
  },
  
  statCard: {
    width: '48%',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  
  statNumber: {
    fontSize: FONT_SIZE.xxxl,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  
  statLabel: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
  
  // Кнопки
  loadButton: {
    marginTop: SPACING.lg,
  },
  
  // Группы
  groupsContainer: {
    paddingHorizontal: SPACING.sm,
  },
  
  groupCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  
  groupColor: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: SPACING.md,
  },
  
  groupInfo: {
    flex: 1,
  },
  
  groupName: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  
  groupDescription: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  
  groupCount: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.text.tertiary,
  },
  
  // Профиль
  profileCard: {
    marginBottom: SPACING.md,
  },
  
  profileTitle: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  
  profileText: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.text.primary,
  },
  
  // Appbar
  appbar: {
    backgroundColor: COLORS.surface,
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  
  appbarTitle: {
    color: COLORS.text.primary,
    fontSize: FONT_SIZE.lg,
    fontWeight: 'bold',
  },
  
  appbarSubtitle: {
    color: COLORS.text.secondary,
    fontSize: FONT_SIZE.sm,
  },
  
  // Навигация
  bottomNavigation: {
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.xs,
  },
  
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  
  navItemActive: {
    backgroundColor: COLORS.surfaceVariant,
    borderRadius: 8,
  },
  
  navIcon: {
    fontSize: 20,
    marginBottom: SPACING.xs,
    color: COLORS.text.secondary,
  },
  
  navIconActive: {
    color: COLORS.text.primary,
  },
  
  navText: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.text.secondary,
  },
  
  navTextActive: {
    color: COLORS.text.primary,
    fontWeight: 'bold',
  },
});
