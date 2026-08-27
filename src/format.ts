export function formatDuration(ms: number, opts?: { compact?: boolean }): string {
  if (ms < 0) {
    throw new RangeError(`formatDuration: duration must not be negative, got ${ms}`);
  }
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const tiers: Array<{ value: number; unit: string }> = [];
  if (days > 0) tiers.push({ value: days, unit: 'd' });
  if (days > 0 || hours > 0) tiers.push({ value: hours, unit: 'h' });
  tiers.push({ value: minutes, unit: 'm' });
  tiers.push({ value: seconds, unit: 's' });

  if (opts?.compact) {
    while (tiers.length > 1 && tiers[0].value === 0) {
      tiers.shift();
    }
  }

  return tiers.map((tier) => `${tier.value}${tier.unit}`).join(' ');
}

export function truncate(s: string, maxLength: number): string {
  if (s.length <= maxLength) {
    return s;
  }
  return `${s.slice(0, maxLength - 1)}…`;
}

export function pluralize(count: number, singular: string, plural?: string): string {
  if (count === 1) {
    return `${count} ${singular}`;
  }
  return `${count} ${plural ?? singular + 's'}`;
}

export function isPalindrome(s: string): boolean {
  const normalized = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  return normalized === normalized.split('').reverse().join('');
}
