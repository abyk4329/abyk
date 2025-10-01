import { cn } from "@/lib/utils";

interface ComponentNameProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * תבנית בסיסית לקומפוננט חדש
 * 
 * שימוש:
 * 1. העתק את הקובץ הזה
 * 2. שנה את שם הקומפוננט (ComponentName)
 * 3. הוסף props נוספים לפי הצורך
 * 4. עדכן את ה-JSX בהתאם לעיצוב מפיגמה
 * 
 * @example
 * <ComponentName className="mt-4">
 *   תוכן פנימי
 * </ComponentName>
 */
export function ComponentName({ className, children }: ComponentNameProps) {
  return (
    <div className={cn("", className)}>
      {children}
    </div>
  );
}
