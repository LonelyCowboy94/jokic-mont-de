"use client";

import { useState } from "react";
import styles from "./BookingWidget.module.scss";
import AppointmentPicker from "./AppointmentPicker/AppointmentPicker";
import AppointmentSubmit from "./AppointmentSubmit/AppointmentSubmit";

const BookingWidget = () => {
  const today = new Date();

  const [selectedSlot, setSelectedSlot] = useState<{
    date: Date;
    time: string | null;
  }>({
    date: today,
    time: null,
  });

  const [formData, setFormData] = useState<{
    name: string;
    lastname: string;
    email: string;
    phone: string;
    note: string;
  }>({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    note: "",
  });

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [step, setStep] = useState(1);
  const [showWarning, setShowWarning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePrevMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );

  const handleNextMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );

  const handleSelectDay = (day: number) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    setSelectedSlot({ date, time: selectedSlot?.time ?? null });
  };

  const handleSelectSlot = (time: string) => {
    if (!selectedSlot) return;
    setSelectedSlot({ date: selectedSlot.date, time });
  };

  const handleNextStep = () => {
    if (step === 1 && !selectedSlot.time) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 8000);
      return;
    }

    setShowWarning(false);
    setStep((prev) => prev + 1);
  };

  const sendAppointmentData = async () => {
    if (!selectedSlot.time) return;

    setLoading(true);
    setError(null);

   try {
    const response = await fetch("/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        date: selectedSlot.date.toLocaleDateString("de-DE"),
        time: selectedSlot.time,
      }),
    });

    const data: { success: boolean; error?: string } = await response.json();

    if (!data.success) {
      setError(data.error || "Greška pri slanju termina.");
      setLoading(false);
      return;
    }

    
    setStep((prev) => prev + 1); 
    setLoading(false);
  } catch (err: unknown) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("Greška pri slanju termina.");
    }
    setLoading(false);
  }
};

  return (
    <article className={styles.bookingWidget}>
      {showWarning && step === 1 && (
        <div role="alert" aria-live="assertive" className={styles.bookingWidget__warningMessage}>
          <span>&#x2757;</span>
          <span>
            Bitte wählen Sie ein Zeitfenster aus, um mit der Buchung fortzufahren.
          </span>
        </div>
      )}

      {step === 1 && (
        <AppointmentPicker
          currentMonth={currentMonth}
          selectedSlot={selectedSlot}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onSelectDay={handleSelectDay}
          onSelectSlot={handleSelectSlot}
        />
      )}

      {step === 2 && (
        <AppointmentSubmit
          formData={formData}
          setFormData={setFormData}
          sendAppointmentData={sendAppointmentData}
        />
      )}

      {error && <div className={`${styles.bookingWidget__message} ${styles["bookingWidget__message--error"]}`}>{error}</div>}
      {loading && <div className={`${styles.bookingWidget__message} ${styles["bookingWidget__message--loading"]}`}>Senden...</div>}

      <div className={styles.bookingWidget__submitPanel}>
        {step > 1 && step !== 3 && (
          <button className={styles.bookingWidget__zuruckBtn} onClick={() => setStep((prev) => prev - 1)}>
            &larr; Zurück
          </button>
        )}

        {step === 1 && (
          <button className={styles.bookingWidget__button} onClick={handleNextStep}>
            Nächste:&nbsp;Grundlegende Details &rarr;
          </button>
        )}

        {step === 2 && (
          <button className={styles.bookingWidget__button} type="submit" form="submitForm">
            Termin bestätigen
          </button>
        )}

        {step === 3 && (
          <div className={styles.bookingWidget__appointmentSubmitedMsg}>
            <p>
              Ihre Terminanfrage wurde erfolgreich übermittelt. Sie erhalten in
              Kürze eine Bestätigung an die von Ihnen angegebene E-Mail-Adresse.
              Vielen Dank für Ihr Vertrauen.
            </p>
            <button onClick={() => setStep(1)} className={styles.bookingWidget__newAppointmentBtn}>
              Neuer Termin
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

export default BookingWidget;
