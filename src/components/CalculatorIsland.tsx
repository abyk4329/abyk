import { useMemo, useState } from 'react';
import { calculateWealthCode, type DateInput } from '../scripts/calculator';
import HebrewCalendar from './HebrewCalendar';

export default function CalculatorIsland() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateSelect = (date: Date) => {
    setDay(date.getDate().toString());
    setMonth((date.getMonth() + 1).toString());
    setYear(date.getFullYear().toString());
    setShowCalendar(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!day || !month || !year) {
      setError('יש למלא את כל השדות');
      return;
    }

    const dayNum = parseInt(day, 10);
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);

    if (isNaN(dayNum) || isNaN(monthNum) || isNaN(yearNum)) {
      setError('יש להזין מספרים בלבד');
      return;
    }

    try {
      const input: DateInput = {
        day: dayNum,
        month: monthNum,
        year: yearNum,
      };

      const result = calculateWealthCode(input);
      const targetUrl = new URL(
        '/tools/wealth-code/result',
        window.location.origin
      );
      targetUrl.searchParams.set('code', result.code);

      window.location.assign(targetUrl.toString());
      return;
    } catch (err) {
      console.error('Error calculating code:', err);
      setError((err as Error).message || 'שגיאה בחישוב. נא לבדוק את הנתונים.');
    }
  };

  const handleReset = () => {
    setDay('');
    setMonth('');
    setYear('');
    setError('');
  };

  const calendarInitialDate = useMemo(() => {
    const dayNum = parseInt(day, 10);
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);

    if (
      Number.isNaN(dayNum) ||
      Number.isNaN(monthNum) ||
      Number.isNaN(yearNum) ||
      !day ||
      !month ||
      !year
    ) {
      return undefined;
    }

    return new Date(yearNum, monthNum - 1, dayNum);
  }, [day, month, year]);

  const selectedDateText = useMemo(() => {
    const dayNum = parseInt(day, 10);
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);

    if (
      Number.isNaN(dayNum) ||
      Number.isNaN(monthNum) ||
      Number.isNaN(yearNum) ||
      !day ||
      !month ||
      !year
    ) {
      return '';
    }

    const formatted = new Date(
      yearNum,
      monthNum - 1,
      dayNum
    ).toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return formatted;
  }, [day, month, year]);

  return (
    <div className="card-surface max-w-md mx-auto" dir="rtl">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Calendar Button */}
        <button
          type="button"
          onClick={() => setShowCalendar(true)}
          className="btn btn-inset w-full justify-center ButtonSecondaryText"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          בחרו תאריך לידה שלכם
        </button>

        {selectedDateText && (
          <p className="text-base text-center text-[rgb(var(--color-text)/0.75)]">
            {selectedDateText}
          </p>
        )}

        {error && (
          <div
            role="alert"
            className="p-3 rounded-md text-sm text-center bg-transparent text-error"
          >
            {error}
          </div>
        )}

        <div className="flex justify-center gap-4 pt-2 flex-wrap">
          <button
            type="submit"
            className="btn btn-primary flex-1 ButtonSecondaryText"
          >
            חשב
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-secondary flex-1 ButtonSecondaryText"
          >
            אפס
          </button>
        </div>
      </form>

      {/* Hebrew Calendar Popup */}
      {showCalendar && (
        <HebrewCalendar
          onDateSelect={handleDateSelect}
          onClose={() => setShowCalendar(false)}
          initialDate={calendarInitialDate}
        />
      )}
    </div>
  );
}
