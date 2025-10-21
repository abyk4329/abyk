'use client';

import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

import { ICON_STROKE } from '@/lib/constants';

const MONTH_LABELS = [
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
];

const WEEKDAY_LABELS: Array<{ short: string; long: string }> = [
  { short: 'א׳', long: 'יום ראשון' },
  { short: 'ב׳', long: 'יום שני' },
  { short: 'ג׳', long: 'יום שלישי' },
  { short: 'ד׳', long: 'יום רביעי' },
  { short: 'ה׳', long: 'יום חמישי' },
  { short: 'ו׳', long: 'יום שישי' },
  { short: 'ש׳', long: 'יום שבת' },
];

const MIN_YEAR = 1900;
const MAX_YEAR = 2100;

interface CalendarCell {
  day: number;
  date: Date;
}

interface BirthdatePickerProps {
  label?: string;
  helperText?: string;
  value: Date | null;
  onChange: (value: Date | null) => void;
}

export function BirthdatePicker({
  label,
  helperText,
  value,
  onChange,
}: BirthdatePickerProps) {
  const headingId = useId();
  const descriptionId = useId();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const effectiveLabel = label ?? 'תאריך לידה';

  const baseDate = value ?? new Date();
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState<number>(baseDate.getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(baseDate.getMonth());

  const formattedValue = useMemo(() => {
    if (!value) {
      return 'בחרו תאריך לידה';
    }

    return new Intl.DateTimeFormat('he-IL', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(value);
  }, [value]);

  const years = useMemo(() => {
    const range: number[] = [];
    for (let year = MAX_YEAR; year >= MIN_YEAR; year -= 1) {
      range.push(year);
    }
    return range;
  }, []);

  const days = useMemo(() => {
    const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay();
    const totalDays = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells: Array<CalendarCell | null> = [];

    for (let index = 0; index < firstDayIndex; index += 1) {
      cells.push(null);
    }

    for (let day = 1; day <= totalDays; day += 1) {
      cells.push({
        day,
        date: new Date(viewYear, viewMonth, day),
      });
    }

    while (cells.length % 7 !== 0) {
      cells.push(null);
    }

    return cells;
  }, [viewYear, viewMonth]);

  const today = useMemo(() => new Date(), []);

  const isSameDay = useCallback((a: Date | null, b: Date | null) => {
    if (!a || !b) {
      return false;
    }

    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }, []);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSelect = useCallback(
    (cell: CalendarCell) => {
      const next = cell.date;
      if (next.getFullYear() < MIN_YEAR || next.getFullYear() > MAX_YEAR) {
        return;
      }

      onChange(new Date(next.getFullYear(), next.getMonth(), next.getDate()));
      setOpen(false);
    },
    [onChange]
  );

  const handleMonthChange = useCallback((nextMonth: number) => {
    setViewMonth(nextMonth);
  }, []);

  const handleYearChange = useCallback((nextYear: number) => {
    setViewYear(nextYear);
  }, []);

  const goToPreviousMonth = useCallback(() => {
    let nextMonth = viewMonth - 1;
    let nextYear = viewYear;

    if (nextMonth < 0) {
      nextMonth = 11;
      nextYear -= 1;
    }

    if (nextYear < MIN_YEAR) {
      return;
    }

    setViewYear(nextYear);
    setViewMonth(nextMonth);
  }, [viewMonth, viewYear]);

  const goToNextMonth = useCallback(() => {
    let nextMonth = viewMonth + 1;
    let nextYear = viewYear;

    if (nextMonth > 11) {
      nextMonth = 0;
      nextYear += 1;
    }

    if (nextYear > MAX_YEAR) {
      return;
    }

    setViewYear(nextYear);
    setViewMonth(nextMonth);
  }, [viewMonth, viewYear]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const target = value ?? new Date();
    setViewYear(target.getFullYear());
    setViewMonth(target.getMonth());
  }, [open, value]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.body.style.setProperty('overflow', 'hidden');
    const triggerNode = triggerRef.current;
    document.addEventListener('keydown', handleKeyDown);
    window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus({ preventScroll: true });
    });

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.removeProperty('overflow');
      triggerNode?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      <div className="wealthBirthdatePickerWrapper">
        {label ? <span className="wealthBirthdateLabel">{label}</span> : null}

        <button
          type="button"
          className="wealthBirthdateTrigger"
          data-selected={value ? 'true' : 'false'}
          onClick={handleOpen}
          ref={triggerRef}
          aria-haspopup="dialog"
          aria-label={
            value ? `${effectiveLabel}: ${formattedValue}` : effectiveLabel
          }
        >
          <span className="wealthBirthdateTriggerIcon" aria-hidden="true">
            <Calendar className="h-6 w-6" strokeWidth={ICON_STROKE.default} />
          </span>
          <p className="wealthBirthdateTriggerLabel">בחרו תאריך לידה</p>
          {value ? (
            <span className="wealthBirthdateTriggerValue">
              {formattedValue}
            </span>
          ) : null}
        </button>

        {helperText ? (
          <p className="wealthBirthdateHelper">{helperText}</p>
        ) : null}
      </div>

      <div
        className="wealthBirthdateSheetOverlay"
        data-open={open ? 'true' : 'false'}
        onClick={handleClose}
      >
        <div
          className="wealthBirthdateSheet"
          role="dialog"
          aria-modal="true"
          aria-labelledby={headingId}
          aria-describedby={descriptionId}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="wealthBirthdateSheetHeader">
            <h2 id={headingId} className="sr-only">
              בחירת תאריך לידה
            </h2>
            <p id={descriptionId} className="sr-only">
              בחרו יום, חודש ושנה לעדכון תאריך הלידה
            </p>

            <button
              type="button"
              className="wealthBirthdateCloseButton"
              onClick={handleClose}
              ref={closeButtonRef}
              aria-label="סגירת חלון בחירת תאריך"
            >
              <X
                className="h-5 w-5"
                strokeWidth={ICON_STROKE.default}
                aria-hidden="true"
              />
            </button>
          </div>

          <div className="wealthBirthdateControlsRow">
            <div className="wealthBirthdateSelectGroup">
              <label className="sr-only" htmlFor={`${headingId}-month`}>
                חודש
              </label>
              <select
                id={`${headingId}-month`}
                className="wealthBirthdateSelect"
                value={viewMonth}
                onChange={(event) =>
                  handleMonthChange(Number.parseInt(event.target.value, 10))
                }
              >
                {MONTH_LABELS.map((month, index) => (
                  <option key={month} value={index}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            <div className="wealthBirthdateSelectGroup">
              <label className="sr-only" htmlFor={`${headingId}-year`}>
                שנה
              </label>
              <select
                id={`${headingId}-year`}
                className="wealthBirthdateSelect"
                value={viewYear}
                onChange={(event) =>
                  handleYearChange(Number.parseInt(event.target.value, 10))
                }
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="wealthBirthdateNavButtons" aria-hidden="true">
              <button
                type="button"
                className="wealthBirthdateNavButton"
                onClick={goToPreviousMonth}
              >
                <ChevronRight
                  className="h-4 w-4"
                  strokeWidth={ICON_STROKE.default}
                />
              </button>
              <button
                type="button"
                className="wealthBirthdateNavButton"
                onClick={goToNextMonth}
              >
                <ChevronLeft
                  className="h-4 w-4"
                  strokeWidth={ICON_STROKE.default}
                />
              </button>
            </div>
          </div>

          <div className="wealthBirthdateCalendar">
            <div className="wealthBirthdateWeekHeader">
              {WEEKDAY_LABELS.map((weekday) => (
                <span key={weekday.long} aria-label={weekday.long}>
                  {weekday.short}
                </span>
              ))}
            </div>

            <div className="wealthBirthdateDayGrid">
              {days.map((cell, index) => {
                if (!cell) {
                  return (
                    <span
                      className="wealthBirthdateDayStub"
                      key={`empty-${index}`}
                    />
                  );
                }

                const selected = isSameDay(value, cell.date);
                const isTodayCell = isSameDay(today, cell.date);

                return (
                  <button
                    key={cell.day}
                    type="button"
                    className="wealthBirthdateDayButton"
                    data-selected={selected ? 'true' : 'false'}
                    data-today={isTodayCell ? 'true' : 'false'}
                    onClick={() => handleSelect(cell)}
                    aria-current={selected ? 'date' : undefined}
                    aria-label={new Intl.DateTimeFormat('he-IL', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    }).format(cell.date)}
                  >
                    {cell.day}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
