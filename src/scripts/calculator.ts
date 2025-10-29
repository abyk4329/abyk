/**
 * Wealth Code Calculator - Pure logic module
 * מחשבון קוד העושר - מודול לוגיקה טהורה
 */

export interface DateInput {
  day: number;
  month: number;
  year: number;
}

export interface WealthCodeResult {
  code: string;
  digits: number[];
  type: 'master' | 'repeating' | 'diverse';
}

/**
 * מצמצם מספר לספרה בודדת (1-9)
 * Reduces a number to a single digit (1-9)
 */
export function reduceToSingleDigit(value: number): number {
  if (value < 1) {
    throw new Error('Value must be positive');
  }

  while (value > 9) {
    value = value
      .toString()
      .split('')
      .map(Number)
      .reduce((sum, digit) => sum + digit, 0);
  }

  return value;
}

/**
 * מזהה את סוג הקוד: master, repeating, או diverse
 * Identifies the code type: master, repeating, or diverse
 */
export function identifyCodeType(
  code: string
): 'master' | 'repeating' | 'diverse' {
  if (code.length !== 4) {
    throw new Error('Code must be 4 digits');
  }

  const digits = code.split('');
  const uniqueDigits = new Set(digits);

  // כל הספרות זהות - master
  if (uniqueDigits.size === 1) {
    return 'master';
  }

  // כל הספרות שונות - diverse
  if (uniqueDigits.size === 4) {
    return 'diverse';
  }

  // יש חזרות אבל לא הכול זהה - repeating
  return 'repeating';
}

/**
 * מחשב את קוד העושר מתאריך לידה
 * Calculates the wealth code from a birth date
 */
export function calculateWealthCode(input: DateInput): WealthCodeResult {
  const { day, month, year } = input;

  // Validation
  if (day < 1 || day > 31) {
    throw new Error('Day must be between 1 and 31');
  }
  if (month < 1 || month > 12) {
    throw new Error('Month must be between 1 and 12');
  }
  if (year < 1900 || year > 2100) {
    throw new Error('Year must be between 1900 and 2100');
  }

  // צמצום כל רכיב לספרה בודדת
  const digit1 = reduceToSingleDigit(day);
  const digit2 = reduceToSingleDigit(month);
  const digit3 = reduceToSingleDigit(year);

  // הספרה הרביעית היא סכום של שלוש הראשונות
  const digit4 = reduceToSingleDigit(digit1 + digit2 + digit3);

  const digits = [digit1, digit2, digit3, digit4];
  const code = digits.join('');
  const type = identifyCodeType(code);

  return {
    code,
    digits,
    type,
  };
}
