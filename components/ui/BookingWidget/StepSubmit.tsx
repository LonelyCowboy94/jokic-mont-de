
"use client";
import { useState } from "react";
import { generateTimeOptions } from "./utils/timeOptions";
import styles from "./StepSubmit.module.scss";

interface StepSubmitProps {
  date: Date;
  time: string;
  onTimeChange: (value: string) => void;
  onSubmit: (status: "success" | "error") => void;
  onBack: () => void;
}

export default function StepSubmit({ date, time, onTimeChange, onSubmit, onBack }: StepSubmitProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const timeOptions = generateTimeOptions();

  const formattedDate = date.toLocaleDateString("de-DE", {
    weekday: "long", day: "2-digit", month: "2-digit", year: "numeric",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {

      
      const formattedDate = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')}`;
const res = await fetch("/api/appointment", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
 body: JSON.stringify({
  name: form.name,
  email: form.email,
  note: form.message,
  date: formattedDate,
  time,
}),
});

const data = await res.json();  // SAMO JEDAN PUT
console.log("Received body:", data);

if (res.ok) onSubmit("success");
else {
  console.error("Backend error:", data);
  onSubmit("error");
}

    } catch (err) {
      console.error("Fetch error:", err);
      onSubmit("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className={styles.stepSubmit} onSubmit={handleSubmit}>
      <h2 className={styles.stepSubmit__title}>Termin vereinbaren</h2>

      <div className={styles.stepSubmit__selectedInfo}>
        <p>
          <strong>Datum:</strong> {formattedDate}
        </p>
        <p>
          <strong>Uhrzeit:</strong> {time && `${time} Uhr`}{" "}
        </p>
        <select
          value={time}
          onChange={(e) => onTimeChange(e.target.value)}
          required
        >
          <option value="">-- Uhrzeit wählen --</option>
          {timeOptions.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.stepSubmit__field}>
        <label htmlFor="name" className="sr-only">
          Ihr Name
        </label>
        <input
          id="name"
          className={styles.stepSubmit__input}
          type="text"
          name="name"
          placeholder="Ihr Name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.stepSubmit__field}>
        <label htmlFor="email" className="sr-only">
          Ihre E-Mail
        </label>
        <input
          id="email"
          className={styles.stepSubmit__input}
          type="email"
          name="email"
          placeholder="Ihre E-Mail"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.stepSubmit__field}>
        <label htmlFor="message" className="sr-only">
          Ihre Nachricht
        </label>
        <textarea
          id="message"
          className={styles.stepSubmit__textarea}
          name="message"
          placeholder="Ihr Anliegen kurz beschreiben, z.B. Art der Arbeiten, Adresse, besondere Wünsche… (optional)"
          value={form.message}
          onChange={handleChange}
        />
      </div>

      <button
        className={styles.stepSubmit__button}
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Senden..." : "Termin absenden"}
      </button>
      <button
        type="button"
        onClick={onBack}
        className={styles.stepSubmit__backButton}
      >
        Zurück
      </button>
    </form>
  );
}
