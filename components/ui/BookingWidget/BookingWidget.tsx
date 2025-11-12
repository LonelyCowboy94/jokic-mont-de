"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./BookingWidget.module.scss";
import AppointmentPicker from "./AppointmentPicker/AppointmentPicker";
import AppointmentSubmit from "./AppointmentSubmit/AppointmentSubmit";
import TimeSelector from "./AppointmentPicker/TimeSelector/TimeSelector";

const BookingWidget = () => {
  const today = new Date();

  // --- State ---
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

  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (panelRef.current) {
      panelRef.current.scrollTop = 0; 
    }
  }, [step]);

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
    setSelectedSlot({ date: selectedSlot.date, time });
  };

  const handleNextStep = () => {
    setShowWarning(false);
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const sendAppointmentData = async () => {
    if (!selectedSlot.time) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          date: selectedSlot.date.toLocaleDateString("de-DE"),
          time: selectedSlot.time,
        }),
      });

      const data: { success: boolean; error?: string } = await response.json();

      if (!data.success) {
        setError(data.error || "Fehler beim Senden des Termins.");
        setLoading(false);
        setStep(4); 
        return;
      }

      setStep(4); 
      setLoading(false);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Fehler beim Senden des Termins.");
      setLoading(false);
      setStep(4);
    }
  };

  return (
    <article className={styles.bookingWidget}>
      {/* Warning */}
      {showWarning && step === 1 && (
        <div role="alert" aria-live="assertive" className={styles.bookingWidget__warningMessage}>
          <span>&#x2757;</span>
          <span>Bitte wählen Sie ein Zeitfenster aus, um mit der Buchung fortzufahren.</span>
        </div>
      )}

      {/* Scrollable panel */}
      <div ref={panelRef} className={styles.bookingWidget__panel}>
        {/* Step 1: Calendar */}
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

        {/* Step 2: Time selector */}
        {step === 2 && (
          <>
            <div className={styles.bookingWidget__timeSection}>
             
              <TimeSelector selectedSlot={selectedSlot} onSelectSlot={handleSelectSlot} />
            </div>
          </>
        )}

        {/* Step 3: Form */}
        {step === 3 && (
          <AppointmentSubmit
            formData={formData}
            setFormData={setFormData}
            sendAppointmentData={sendAppointmentData}
          />
        )}

        {/* Step 4: Confirmation / Error */}
        {step === 4 && (
          <div className={styles.bookingWidget__appointmentSubmitedMsg}>
            {error ? (
              <p>{error}</p>
            ) : (
              <p>
                Ihre Terminanfrage wurde erfolgreich übermittelt. Sie erhalten in Kürze eine Bestätigung an die von Ihnen
                angegebene E-Mail-Adresse. Vielen Dank für Ihr Vertrauen.
              </p>
            )}
            <button onClick={() => setStep(1)} className={styles.bookingWidget__newAppointmentBtn}>
              Neuer Termin
            </button>
          </div>
        )}
      </div>

      {/* Control panel */}
      <div className={styles.bookingWidget__submitPanel}>
        {step > 1 && step < 4 && (
          <button className={styles.bookingWidget__zuruckBtn} onClick={handlePrevStep}>
            &larr; Zurück
          </button>
        )}

        {step === 1 && (
          <button className={styles.bookingWidget__button} onClick={handleNextStep}>
            Nächste &rarr;
          </button>
        )}

        {step === 2 && (
          <button className={styles.bookingWidget__button} onClick={handleNextStep}>
            Nächste &rarr;
          </button>
        )}

        {step === 3 && (
          <button className={styles.bookingWidget__button} type="submit" form="submitForm">
            Termin bestätigen
          </button>
        )}
      </div>

      {/* Loading / Error message */}
      {loading && (
        <div className={`${styles.bookingWidget__message} ${styles["bookingWidget__message--loading"]}`}>
          Senden...
        </div>
      )}
    </article>
  );
};

export default BookingWidget;
