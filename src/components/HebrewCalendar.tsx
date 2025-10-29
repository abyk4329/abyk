import { useEffect, useMemo, useState, type ChangeEvent } from 'react';
import './HebrewCalendar.css';

interface HebrewCalendarProps {
  onDateSelect?: (date: Date) => void;
  onClose?: () => void;
  initialDate?: Date;
}

export default function HebrewCalendar({
  onDateSelect,
  onClose,
  initialDate,
}: HebrewCalendarProps) {
  const safeInitialDate = useMemo(() => {
    if (initialDate && !Number.isNaN(initialDate.getTime())) {
      return new Date(
        initialDate.getFullYear(),
        initialDate.getMonth(),
        initialDate.getDate()
      );
    }

    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, [initialDate]);

  const [selectedDate, setSelectedDate] = useState<Date>(safeInitialDate);
  const [viewYear, setViewYear] = useState<number>(
    safeInitialDate.getFullYear()
  );
  const [viewMonth, setViewMonth] = useState<number>(
    safeInitialDate.getMonth()
  );

  useEffect(() => {
    setSelectedDate(safeInitialDate);
    setViewYear(safeInitialDate.getFullYear());
    setViewMonth(safeInitialDate.getMonth());
  }, [safeInitialDate]);

  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  const months = useMemo(
    () => [
      'ינואר',
      'פברואר',
      'מרץ',
      'אפריל',
      'מאי',
      'יוני',
      'יולי',
      'אוגוסט',
      'ספטמבר',
      'אוקטובר',
      'נובמבר',
      'דצמבר',
    ],
    []
  );

  const weekdays = useMemo(
    () => ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳'],
    []
  );

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const startYear = 1930;
    const endYear = currentYear;
    const range: number[] = [];

    for (let year = endYear; year >= startYear; year -= 1) {
      range.push(year);
    }

    return range;
  }, []);

  const calendarDays = useMemo(() => {
    const days: Array<{ date: Date; currentMonth: boolean }> = [];
    const firstDayOfMonth = new Date(viewYear, viewMonth, 1);
    const startDay = firstDayOfMonth.getDay(); // 0 = Sunday
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

    for (let i = startDay - 1; i >= 0; i -= 1) {
      const day = daysInPrevMonth - i;
      days.push({
        date: new Date(viewYear, viewMonth - 1, day),
        currentMonth: false,
      });
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      days.push({
        date: new Date(viewYear, viewMonth, day),
        currentMonth: true,
      });
    }

    while (days.length < 42) {
      const last =
        days[days.length - 1]?.date ?? new Date(viewYear, viewMonth, 1);
      const nextDate = new Date(
        last.getFullYear(),
        last.getMonth(),
        last.getDate() + 1
      );
      days.push({
        date: nextDate,
        currentMonth:
          nextDate.getMonth() === viewMonth &&
          nextDate.getFullYear() === viewYear,
      });
    }

    return days;
  }, [viewMonth, viewYear]);

  const handleSelectDate = (date: Date) => {
    const normalized = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    setSelectedDate(normalized);
    setViewYear(normalized.getFullYear());
    setViewMonth(normalized.getMonth());
    onDateSelect?.(normalized);
  };

  const goToPreviousMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((year) => year - 1);
      return;
    }

    setViewMonth((month) => month - 1);
  };

  const goToNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((year) => year + 1);
      return;
    }

    setViewMonth((month) => month + 1);
  };

  const handleMonthChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setViewMonth(Number(event.target.value));
  };

  const handleYearChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setViewYear(Number(event.target.value));
  };

  return (
    <div className="calendar-overlay" onClick={onClose}>
      <div className="calendar-popup" onClick={(e) => e.stopPropagation()}>
        <div className="calendar-header">
          {onClose && (
            <button
              className="calendar-close"
              onClick={onClose}
              aria-label="סגור"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
          <p className="selected-date">
            {selectedDate.toLocaleDateString('he-IL', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        <div className="calendar-wrapper">
          <div className="calendar-nav-row">
            <button
              type="button"
              className="calendar-nav-button"
              onClick={goToPreviousMonth}
              aria-label="חודש קודם"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>

            <button
              type="button"
              className="calendar-nav-button"
              onClick={goToNextMonth}
              aria-label="חודש הבא"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
          </div>

          <div className="calendar-controls">
            <div className="calendar-selectors">
              <label className="sr-only" htmlFor="calendar-month">
                בחירת חודש
              </label>
              <select
                id="calendar-month"
                className="calendar-select"
                value={viewMonth}
                onChange={handleMonthChange}
              >
                {months.map((monthName, index) => (
                  <option key={monthName} value={index}>
                    {monthName}
                  </option>
                ))}
              </select>

              <label className="sr-only" htmlFor="calendar-year">
                בחירת שנה
              </label>
              <select
                id="calendar-year"
                className="calendar-select"
                value={viewYear}
                onChange={handleYearChange}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="calendar-grid-header">
            {weekdays.map((weekday) => (
              <div key={weekday} className="calendar-day-name">
                {weekday}
              </div>
            ))}
          </div>

          <div className="calendar-grid-body">
            {calendarDays.map(({ date, currentMonth }) => {
              const isSelected =
                selectedDate.getFullYear() === date.getFullYear() &&
                selectedDate.getMonth() === date.getMonth() &&
                selectedDate.getDate() === date.getDate();

              const isToday =
                today.getFullYear() === date.getFullYear() &&
                today.getMonth() === date.getMonth() &&
                today.getDate() === date.getDate();

              return (
                <div className="calendar-cell" key={date.getTime()}>
                  <button
                    type="button"
                    className="calendar-day-button"
                    onClick={() => handleSelectDate(date)}
                    data-selected={isSelected ? 'true' : undefined}
                    data-today={isToday ? 'true' : undefined}
                    data-outside-month={!currentMonth ? 'true' : undefined}
                  >
                    {date.getDate()}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
