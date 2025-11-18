import styles from "./CTA.module.scss";

const CTA = () => {
  return (
    <section className={styles.cta}>
      <h2 className={styles["cta__title"]}>Bereit für den nächsten Schritt?</h2>
      <p className={styles["cta__text"]}>
        Wir freuen uns auf Ihre Bewerbung und darauf, Sie kennenzulernen.
      </p>

      <a href="/kontakt" className={styles["cta__btn"]}>
        Kontakt aufnehmen
      </a>
    </section>
  );
};

export default CTA;
