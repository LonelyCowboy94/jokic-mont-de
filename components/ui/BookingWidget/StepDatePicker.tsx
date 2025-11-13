'use client';

import Calendar from './Calendar';
import styles from './StepDatePicker.module.scss';

interface StepDatePickerProps {
  onSelectDate: (date: Date) => void;
  selectedDate: Date | null;
}

export default function StepDatePicker({ onSelectDate, selectedDate }: StepDatePickerProps) {
  return (
    <div className={styles.stepDatePicker}>
      <Calendar
        selectedSlot={selectedDate ? { date: selectedDate, time: null } : null}
        onSelectDay={onSelectDate}
      />
    </div>
  );
}
