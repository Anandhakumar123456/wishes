export function formatRelativeTime(createdAt?: string, fallbackDate?: string): string {
  let targetDate: Date | null = null;

  if (createdAt) {
    const parsed = new Date(createdAt);
    if (!isNaN(parsed.getTime())) {
      targetDate = parsed;
    }
  }

  if (!targetDate && fallbackDate) {
    const parsedFallback = new Date(fallbackDate);
    if (!isNaN(parsedFallback.getTime())) {
      targetDate = parsedFallback;
    }
  }

  if (!targetDate) {
    return fallbackDate || 'Just now';
  }

  const now = new Date();
  const diffInSeconds = Math.max(0, Math.floor((now.getTime() - targetDate.getTime()) / 1000));

  if (diffInSeconds < 60) {
    return 'Just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) {
    return 'Yesterday';
  }
  if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} ${diffInWeeks === 1 ? 'week' : 'weeks'} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
}
