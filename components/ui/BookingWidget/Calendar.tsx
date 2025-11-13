'use client';

import styles from './Calendar.module.scss';
import { useState, useRef } from 'react';

// Array of German weekdays for rendering the calendar header
const DAYS_GERMAN = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

// Props for Calendar component
interface CalendarProps {
  selectedSlot: { date: Date; time: string | null } | null; // currently selected date/time
  onSelectDay: (date: Date) => void; // callback when user selects a date
}

// Internal representation of a calendar cell
interface CalendarDay {
  day: number;       // numeric day of the month
  monthOffset: number; // -1 = previous month, 0 = current month, 1 = next month
}

const Calendar = ({ selectedSlot, onSelectDay }: CalendarProps) => {
  const today = new Date();

  // State for the first day of the current month being viewed
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  // Ref to track swipe start position for mobile touch gestures
  const touchStartX = useRef(0);

  // Function to navigate months by offset (negative = back, positive = forward)
  const changeMonth = (offset: number) => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
  };

  // Mobile touch start handler
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  // Mobile touch end handler, detects horizontal swipe to change month
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) changeMonth(1);  // swipe left → next month
    if (diff < -50) changeMonth(-1); // swipe right → previous month
  };

  // Extract basic month/year info
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  // Determine how many days in this month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Determine which day of the week the 1st of the month falls on
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  // How many days were in the previous month
  const prevMonthDays = new Date(year, month, 0).getDate();

  // Array of all cells to render, including previous/next month fillers
  const calendarDays: CalendarDay[] = [];

  // Fill in previous month days for leading empty cells
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    calendarDays.push({ day: prevMonthDays - i, monthOffset: -1 });
  }

  // Fill in current month days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({ day, monthOffset: 0 });
  }

  // Fill in trailing days for next month to complete last week
  const remainingCells = 7 - (calendarDays.length % 7);
  if (remainingCells < 7) {
    for (let day = 1; day <= remainingCells; day++) {
      calendarDays.push({ day, monthOffset: 1 });
    }
  }

  // Organize days into weeks (arrays of 7)
  const weeks: CalendarDay[][] = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  // Ensure 6 weeks are always rendered to maintain consistent grid layout
  while (weeks.length < 6) {
    const emptyWeek: CalendarDay[] = [];
    for (let i = 0; i < 7; i++) emptyWeek.push({ day: i + 1, monthOffset: 1 });
    weeks.push(emptyWeek);
  }

  // Helper to determine if a day is in the past (disabled)
  const isPastDay = (day: number, monthOffset: number) =>
    monthOffset === 0 &&
    year === today.getFullYear() &&
    month === today.getMonth() &&
    day < today.getDate();

  // Get the month name in German for header
  const monthName = currentMonth.toLocaleString('de-DE', { month: 'long' });

  return (
    <div
      className={styles.calendar}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Calendar Header: Month name + navigation arrows */}
      <div className={styles.calendar__header}>
        <button onClick={() => changeMonth(-1)} className={styles.calendar__arrow}>◀</button>
        <span className={styles.calendar__month}>{monthName} {year}</span>
        <button onClick={() => changeMonth(1)} className={styles.calendar__arrow}>▶</button>
      </div>

      {/* Weekday labels */}
      <div className={styles.calendar__weekdays}>
        {DAYS_GERMAN.map(d => <div key={d} className={styles.calendar__weekday}>{d}</div>)}
      </div>

      {/* Calendar body: flat map of weeks → cells */}
      <div className={styles.calendar__body}>
        {weeks.flat().map(({ day, monthOffset }, idx) => {
          const isToday =
            day === today.getDate() &&
            monthOffset === 0 &&
            month === today.getMonth() &&
            year === today.getFullYear();

          const isSelected =
            day === selectedSlot?.date.getDate() &&
            monthOffset === 0 &&
            month === selectedSlot.date.getMonth() &&
            year === selectedSlot.date.getFullYear();

          const isPast = isPastDay(day, monthOffset);
          const isEmpty = monthOffset !== 0 || isPast;
          const isSunday = idx % 7 === 0;

          // Construct BEM classes based on cell state
          const cellClasses = [
            styles.calendar__cell,
            isEmpty || isSunday ? styles['calendar__cell--empty'] : '',
            isToday ? styles['calendar__cell--today'] : '',
            isSelected ? styles['calendar__cell--selected'] : '',
          ].join(' ');

          // Click handler: only select valid current month dates
          return (
            <div
              key={idx}
              className={cellClasses}
              onClick={() => !isEmpty && onSelectDay(new Date(year, month, day))}
            >
              <span className={styles.calendar__day}>{day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
