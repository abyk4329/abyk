export function translateSupabaseError(message: string): string {
  const normalized = message.toLowerCase();

  if (normalized.includes('invalid login credentials')) {
    return 'פרטי ההתחברות אינם נכונים. אנא בדקו את האימייל והסיסמה.';
  }

  if (normalized.includes('email not confirmed')) {
    return 'יש לאשר את כתובת האימייל לפני ההתחברות.';
  }

  if (normalized.includes('password should be at least 6 characters')) {
    return 'הסיסמה חייבת להכיל לפחות 6 תווים.';
  }

  if (normalized.includes('user already registered')) {
    return 'החשבון כבר קיים. התחברו באמצעות האימייל והסיסמה.';
  }

  if (
    normalized.includes('rate limit') ||
    normalized.includes('too many requests')
  ) {
    return 'בוצעו יותר מדי ניסיונות בזמן קצר. אנא המתינו רגע ונסו שוב.';
  }

  return 'אירעה שגיאה בלתי צפויה. נסו שוב מאוחר יותר.';
}
