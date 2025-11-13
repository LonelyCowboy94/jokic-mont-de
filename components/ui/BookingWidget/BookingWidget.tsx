'use client';

import { useState } from 'react';
import StepDatePicker from './StepDatePicker';
import StepSubmit from './StepSubmit';
import StepResult from './StepResult';
import styles from './BookingWidget.module.scss';

type Step = 1 | 2 | 3;

export default function BookingWidget() {
  const [step, setStep] = useState<Step>(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [result, setResult] = useState<'success' | 'error' | null>(null);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setStep(2); 
  };

  const handleFormSubmit = async (status: 'success' | 'error') => {
    setResult(status);
    setStep(3);
  };

  const reset = () => {
    setSelectedDate(null);
    setSelectedTime('');
    setResult(null);
    setStep(1);
  };

  return (
    <div className={styles.bookingWidget}>
      {step === 1 && (
        <StepDatePicker onSelectDate={handleDateSelect} selectedDate={selectedDate} />
      )}
      {step === 2 && selectedDate && (
        <StepSubmit
          date={selectedDate}
          time={selectedTime}
          onTimeChange={setSelectedTime}
          onSubmit={handleFormSubmit}
          onBack={reset}
        />
      )}
      {step === 3 && result && (
        <StepResult status={result} onRestart={reset} />
      )}
    </div>
  );
}
