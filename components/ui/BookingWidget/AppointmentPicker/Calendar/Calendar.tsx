import styles from './Calendar.module.scss';

const DAYS_GERMAN = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

interface CalendarProps {
  currentMonth: Date;
  selectedSlot: { date: Date; time: string | null } | null;
  onSelectDay: (day: number, monthOffset?: number) => void; 
}

interface CalendarDay {
  day: number;
  monthOffset: number;
}

const Calendar = ({ currentMonth, selectedSlot, onSelectDay }: CalendarProps) => {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const today = new Date();

  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const calendarDays: CalendarDay[] = [];

  // Prethodni mesec
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    calendarDays.push({ day: prevMonthDays - i, monthOffset: -1 });
  }

  // Trenutni mesec
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({ day, monthOffset: 0 });
  }

  // Sledeći mesec da popuni nedelje
  const remainingCells = 7 - (calendarDays.length % 7);
  if (remainingCells < 7) {
    for (let day = 1; day <= remainingCells; day++) {
      calendarDays.push({ day, monthOffset: 1 });
    }
  }

  const weeks: CalendarDay[][] = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  while (weeks.length < 6) {
    const emptyWeek: CalendarDay[] = [];
    for (let i = 0; i < 7; i++) {
      emptyWeek.push({ day: i + 1, monthOffset: 1 });
    }
    weeks.push(emptyWeek);
  }

  const isPastDay = (day: number, monthOffset: number) => {
    return monthOffset === 0 &&
      year === today.getFullYear() &&
      month === today.getMonth() &&
      day < today.getDate();
  };

  return (
    <div className={styles.calendar}>
      {/* Dani u nedelji */}
      <div className={styles.calendar__weekdays}>
        {DAYS_GERMAN.map(d => (
          <div key={d} className={styles.calendar__weekday}>{d}</div>
        ))}
      </div>

      {/* Grid sa danima */}
      <div className={styles.calendar__body}>
        {weeks.flat().map(({ day, monthOffset }, idx) => {
          const displayMonth = month + monthOffset;

          const isToday =
            day === today.getDate() &&
            displayMonth === today.getMonth() &&
            year === today.getFullYear();

          const isSelected =
            day === selectedSlot?.date.getDate() &&
            displayMonth === selectedSlot.date.getMonth() &&
            year === selectedSlot.date.getFullYear();

          const isPast = isPastDay(day, monthOffset);
          const isEmpty = monthOffset !== 0 || isPast;

          const cellClasses = [
            styles.calendar__cell,
            isEmpty ? styles["calendar__cell--empty"] : '',
            isToday ? styles["calendar__cell--today"] : '',
            isSelected ? styles["calendar__cell--selected"] : ''
          ].join(' ');

          return (
            <div
              key={idx}
              className={cellClasses}
              onClick={() => !isEmpty && onSelectDay(day, monthOffset)}
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
