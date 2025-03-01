
import { format, isToday, isTomorrow, isYesterday, parseISO } from 'date-fns';

export function formatDate(dateString?: string): string {
  if (!dateString) return '';
  
  const date = parseISO(dateString);
  
  if (isToday(date)) {
    return `Today, ${format(date, 'h:mm a')}`;
  } else if (isTomorrow(date)) {
    return `Tomorrow, ${format(date, 'h:mm a')}`;
  } else if (isYesterday(date)) {
    return `Yesterday, ${format(date, 'h:mm a')}`;
  }
  
  return format(date, 'MMM d, yyyy');
}

export function formatRelativeDate(dateString?: string): string {
  if (!dateString) return '';
  
  const date = parseISO(dateString);
  const now = new Date();
  const diffInDays = Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  if (isToday(date)) {
    return 'Today';
  } else if (isTomorrow(date)) {
    return 'Tomorrow';
  } else if (diffInDays > 0 && diffInDays < 7) {
    return `In ${diffInDays} days`;
  } else if (diffInDays < 0 && diffInDays > -7) {
    return `${Math.abs(diffInDays)} days ago`;
  }
  
  return format(date, 'MMM d, yyyy');
}

export function isDueSoon(dateString?: string): boolean {
  if (!dateString) return false;
  
  const date = parseISO(dateString);
  const now = new Date();
  const diffInHours = (date.getTime() - now.getTime()) / (1000 * 60 * 60);
  
  return diffInHours > 0 && diffInHours < 24;
}

export function isOverdue(dateString?: string): boolean {
  if (!dateString) return false;
  
  const date = parseISO(dateString);
  const now = new Date();
  
  return date < now;
}

export function formatISODate(date: Date): string {
  return date.toISOString();
}
