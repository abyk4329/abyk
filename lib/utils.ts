import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes with clsx
 * Combines multiple class values and resolves conflicts using tailwind-merge
 * 
 * @example
 * cn("px-2 py-1", "px-4") // Returns "py-1 px-4"
 * cn("text-red-500", condition && "text-blue-500") // Conditionally applies classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format date to Hebrew locale
 */
export function formatDateHebrew(date: Date): string {
  return new Intl.DateTimeFormat('he-IL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

/**
 * Validate Hebrew date input
 */
export function isValidHebrewDate(day: number, month: number, year: number): boolean {
  if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > 2100) {
    return false;
  }
  
  const date = new Date(year, month - 1, day);
  return date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year;
}