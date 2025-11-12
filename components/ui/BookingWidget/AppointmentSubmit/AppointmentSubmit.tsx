"use client";

import styles from "./AppointmentSubmit.module.scss";

interface AppointmentSubmitProps {
  formData: {
    name: string;
    lastname: string;
    email: string;
    phone: string;
    note: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      lastname: string;
      email: string;
      phone: string;
      note: string;
    }>
  >;
   sendAppointmentData: () => Promise<void>;
}



const AppointmentSubmit = ({ sendAppointmentData, formData, setFormData }: AppointmentSubmitProps) => {

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  await sendAppointmentData();
  setFormData({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    note: "",
  });
};

  return (
  <form
  id="submitForm"
  onSubmit={handleSubmit}
  className={styles.submitAppointmentForm}
  aria-label="Persönliche Informationen"
>
  <h5 className={styles.submitAppointmentForm__title}>Grundlegende Details</h5>

  <div className={styles.submitAppointmentForm__group}>
    <label htmlFor="name" className={styles.submitAppointmentForm__label}>
      Vorname:
    </label>
    <input
      id="name"
      name="name"
      type="text"
      className={styles.submitAppointmentForm__input}
      value={formData.name}
      onChange={(e) =>
        setFormData({ ...formData, name: e.target.value })
      }
      placeholder="Geben Sie Ihren Vornamen ein"
      autoFocus
      required
    />
  </div>

  <div className={styles.submitAppointmentForm__group}>
    <label htmlFor="lastname" className={styles.submitAppointmentForm__label}>
      Nachname:
    </label>
    <input
      id="lastname"
      name="lastname"
      type="text"
      className={styles.submitAppointmentForm__input}
      value={formData.lastname}
      onChange={(e) =>
        setFormData({ ...formData, lastname: e.target.value })
      }
      placeholder="Geben Sie Ihren Nachnamen ein"
      required
    />
  </div>

  <div className={styles.submitAppointmentForm__group}>
    <label htmlFor="email" className={styles.submitAppointmentForm__label}>
      E-Mail-Adresse:
    </label>
    <input
      id="email"
      name="email"
      type="email"
      className={styles.submitAppointmentForm__input}
      value={formData.email}
      onChange={(e) =>
        setFormData({ ...formData, email: e.target.value })
      }
      placeholder="Geben Sie Ihre E-Mail-Adresse ein"
      required
    />
  </div>

  <div className={styles.submitAppointmentForm__group}>
    <label htmlFor="phone" className={styles.submitAppointmentForm__label}>
      Telefonnummer:
    </label>
    <input
      id="phone"
      name="phone"
      type="tel"
      className={styles.submitAppointmentForm__input}
      value={formData.phone}
      onChange={(e) =>
        setFormData({ ...formData, phone: e.target.value })
      }
      placeholder="015123456789"
      required
    />
  </div>

  <div className={styles.submitAppointmentForm__group}>
    <label htmlFor="note" className={styles.submitAppointmentForm__label}>
      Notiz: <span className={styles.submitAppointmentForm__optional}>(optional)</span>
    </label>
    <textarea
      id="note"
      name="note"
      className={styles.submitAppointmentForm__textarea}
      value={formData.note}
      onChange={(e) =>
        setFormData({ ...formData, note: e.target.value })
      }
      placeholder="Notizdetails eingeben"
    />
  </div>
</form>


  );
};

export default AppointmentSubmit;
