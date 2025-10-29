import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stripBase64Prefix(input?: string | null): string {
  if (!input) {
    return '';
  }

  const trimmed = input.trim();
  const prefixIndex = trimmed.indexOf(',');
  if (trimmed.startsWith('data:') && prefixIndex !== -1) {
    return trimmed.slice(prefixIndex + 1);
  }

  return trimmed;
}
