import { useEffect, useRef } from 'react';
import { ReminderSettings } from '../components/modals/RemindersModal';

export const useReminders = (
  reminderSettings: ReminderSettings,
  onShowReminder: () => void
) => {
  const lastCheckedDay = useRef<string>('');
  const lastCheckedTime = useRef<string>('');

  // Получаем день недели в формате 'mon', 'tue', etc.
  const getDayOfWeek = (date: Date): string => {
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    return days[date.getDay()];
  };

  // Форматируем время в формат 'HH:MM'
  const formatTime = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // Проверяем нужно ли показать напоминание
  const checkReminder = () => {
    if (!reminderSettings.enabled) return;

    const now = new Date();
    const currentDay = getDayOfWeek(now);
    const currentTime = formatTime(now);

    // Проверяем день недели
    if (!reminderSettings.days.includes(currentDay)) return;

    // Проверяем время (с точностью до минуты)
    if (reminderSettings.time !== currentTime) return;

    // Проверяем что не показывали уже это напоминание
    if (lastCheckedDay.current === currentDay && lastCheckedTime.current === currentTime) return;

    // Показываем напоминание
    onShowReminder();
    
    // Запоминаем что показали
    lastCheckedDay.current = currentDay;
    lastCheckedTime.current = currentTime;
  };

  useEffect(() => {
    // Проверяем сразу при загрузке
    checkReminder();

    // Проверяем каждые 30 минут (1800000 мс)
    const interval = setInterval(checkReminder, 1800000);

    return () => clearInterval(interval);
  }, [reminderSettings, onShowReminder]);

  // Сбрасываем память при изменении настроек
  useEffect(() => {
    lastCheckedDay.current = '';
    lastCheckedTime.current = '';
  }, [reminderSettings]);
};
