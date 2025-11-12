"use client";

import styles from "./AppointmentPicker.module.scss";
import Calendar from "./Calendar/Calendar";
import TimeSelector from "./TimeSelector/TimeSelector";

interface AppointmentPickerProps {
  currentMonth: Date;
  selectedSlot: { date: Date; time: string | null };
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onSelectDay: (day: number) => void;
  onSelectSlot: (time: string) => void;
}

const AppointmentPicker = ({
  currentMonth,
  selectedSlot,
  onPrevMonth,
  onNextMonth,
  onSelectDay,
  onSelectSlot,
}: AppointmentPickerProps) => {
  return (
    <section className={styles.appointmentPicker} aria-label="Termin auswählen">
      <div className={styles.appointmentPicker__calendar}>
        <div className={styles.appointmentPicker__header}>
          <button
            className={styles.appointmentPicker__monthButton}
            onClick={onPrevMonth}
          >
            &lt;
          </button>
          <h3 className={styles.appointmentPicker__monthTitle}>
            {currentMonth.toLocaleString("de-DE", { month: "long" })}{" "}
            {currentMonth.getFullYear()}
          </h3>
          <button
            className={styles.appointmentPicker__monthButton}
            onClick={onNextMonth}
          >
            &gt;
          </button>
        </div>

        <Calendar
          currentMonth={currentMonth}
          selectedSlot={selectedSlot}
          onSelectDay={onSelectDay}
        />
      </div>

      <TimeSelector selectedSlot={selectedSlot} onSelectSlot={onSelectSlot} />

      {selectedSlot?.time && (
        <div className={styles.appointmentPicker__selectionInfo}>
          <p>
            Appointment: {selectedSlot.date.getDate()}.
            {selectedSlot.date.getMonth() + 1}.{selectedSlot.date.getFullYear()}{" "}
            from {selectedSlot.time}
          </p>
        </div>
      )}
    </section>
  );
};

export default AppointmentPicker;
