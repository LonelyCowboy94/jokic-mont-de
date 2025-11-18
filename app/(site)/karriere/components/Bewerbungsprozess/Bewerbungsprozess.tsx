import styles from "./Bewerbungsprozess.module.scss";

const steps = [
  { step: "01", text: "Kurze Kontaktaufnahme über unser Online-Formular oder telefonisch" },
  { step: "02", text: "Persönliches Gespräch & Kennenlernen" },
  { step: "03", text: "Vorstellung der Projekte & Arbeitsumgebung" },
  { step: "04", text: "Start Ihrer Karriere bei Jokić Mont" }
];

const Bewerbungsprozess = () => {
  return (
    <section className={styles.prozess}>
      <h2 className={styles["prozess__title"]}>Unser Bewerbungsprozess</h2>

      <div className={styles["prozess__steps"]}>
        {steps.map((s, i) => (
          <div key={i} className={styles["prozess__step"]}>
            <span className={styles["prozess__step-number"]}>{s.step}</span>
            <p className={styles["prozess__step-text"]}>{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Bewerbungsprozess;
