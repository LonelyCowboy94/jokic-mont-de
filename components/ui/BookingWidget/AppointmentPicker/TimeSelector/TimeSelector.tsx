'use client'

import styles from './TimeSelector.module.scss';

export const PERIODS = [
  { label: "Morgens", start: 7, end: 12 },
  { label: "Nachmittag", start: 12, end: 16 },
  { label: "Abends", start: 16, end: 18 },
];

interface HoursProps {
  selectedSlot: { date: Date; time: string | null };
  onSelectSlot: (time: string) => void;
}

const generateTimes = (startHour: number, endHour: number) => {
  const times: string[] = [];
  let currentMinutes = startHour * 60;
  const endMinutes = endHour * 60;

  while (currentMinutes < endMinutes) {
    const hour = Math.floor(currentMinutes / 60);
    const minute = currentMinutes % 60;

    const nextMinutes = currentMinutes + 30;
    const nextHour = Math.floor(nextMinutes / 60);
    const nextMinute = nextMinutes % 60;

    times.push(
      `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")} bis ${nextHour.toString().padStart(2, "0")}:${nextMinute
        .toString()
        .padStart(2, "0")}`
    );

    currentMinutes = nextMinutes;
  }

  return times;
};

const TimeSelector = ({ selectedSlot, onSelectSlot }: HoursProps) => {

  return (
    <div className={styles['time-selector']}>
      {PERIODS.map(period => {
        const times = generateTimes(period.start, period.end);

        const leftCol = times.filter((_, i) => i % 2 !== 0);
        const rightCol = times.filter((_, i) => i % 2 === 0);

        return (
          <div key={period.label} className={styles['time-selector__period']}>
            <h4 className={styles['time-selector__title']}>{period.label}</h4>
            <div className={styles['time-selector__slot-grid']}>
              <div className={`${styles['time-selector__column']} ${styles['time-selector__column--right']}`}>
                {rightCol.map(slot => (
                  <div
                    key={slot}
                    className={`${styles['time-selector__slot']} ${
                      selectedSlot.time === slot ? styles['time-selector__slot--selected'] : ''
                    }`}
                    onClick={() => { 
                     onSelectSlot(slot);
                    }}
                  >
                    {slot}
                  </div>
                ))}
              </div>
              <div className={`${styles['time-selector__column']} ${styles['time-selector__column--left']}`}>
                {leftCol.map(slot => (
                  <div
                    key={slot}
                    className={`${styles['time-selector__slot']} ${
                      selectedSlot.time === slot ? styles['time-selector__slot--selected'] : ''
                    }`}
                    onClick={() => onSelectSlot(slot)}
                  >
                    {slot}
                  </div>
                ))}
              </div>
            </div>
            
          </div>
          
        );
      })}
       <p>
                Ihr Termin: {selectedSlot.date.toLocaleDateString("de-DE")} um {selectedSlot.time}
              </p>
    </div>
  );
};

export default TimeSelector;
