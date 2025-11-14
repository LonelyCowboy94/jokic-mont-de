'use client';

import { useState } from 'react';
import styles from './ContactForm.module.scss';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    consent: false,
  });

  const [error, setError] = useState('');

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const target = e.target as HTMLInputElement; 
  const { name, value, type, checked } = target;

  setFormData(prev => ({
    ...prev,
    [name]: type === 'checkbox' ? checked : value,
  }));
};

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const { name, email, subject, message, consent } = formData;

  if (!name || !email || !subject || !message || !consent) {
    setError("Bitte füllen Sie alle erforderlichen Felder aus.");
    return;
  }

  setError("");

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      setError("Fehler beim Senden ❌");
      return;
    }

    const data = await res.json();

    if (!data.success) {
      setError(data.error || "Fehler beim Senden ❌");
      return;
    }

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      consent: false,
    });

  } catch (error) {
    console.log(error);
    setError(error instanceof Error ? error.message : "Unknown error");
  }
};

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit}>
      <h3 className={styles['contactForm__title']}>Kontakt</h3>

      <label htmlFor="name" className="sr-only">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className={styles['contactForm__input']}
      />

      <label htmlFor="email" className="sr-only">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className={styles['contactForm__input']}
      />

      <label htmlFor="subject" className="sr-only">Betrif</label>
      <input
        type="text"
        id="subject"
        name="subject"
        placeholder="Betrif"
        value={formData.subject}
        onChange={handleChange}
        className={styles['contactForm__input']}
      />

      <label htmlFor="message" className="sr-only">Nachricht</label>
      <textarea
        id="message"
        name="message"
        placeholder="Nachricht"
        value={formData.message}
        onChange={handleChange}
        className={styles['contactForm__textarea']}
      />

      <label className={styles['contactForm__checkboxLabel']}>
        <input
          type="checkbox"
          name="consent"
          checked={formData.consent}
          onChange={handleChange}
          className={styles['contactForm__checkbox']}
        />
        <span className={styles['contactForm__checkboxCustom']}></span>
        Ich bin damit einverstanden, dass diese Daten zum Zwecke der Kontaktaufnahme gespeichert und verarbeitet werden. Mir ist bekannt, dass ich meine Einwilligung jederzeit widerrufen kann.*
      </label>

      {error && <p className={styles['contactForm__error']}>{error}</p>}

      <button type="submit" className={styles['contactForm__submit']}>
        Senden
      </button>
    </form>
  );
};

export default ContactForm;
