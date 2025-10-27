import { format, parseISO } from 'date-fns';
const formatDateForAPI = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'yyyy-MM-dd');
};
const formatTimeForAPI = (time: Date | string): string => {
  if (typeof time === 'string') {
    if (/^\d{2}:\d{2}$/.test(time)) {
      return time;
    }
    time = parseISO(time);
  }
  return format(time, 'HH:mm');
};