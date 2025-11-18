import styles from "./Vorteile.module.scss";

const Vorteile = () => {
  const items = [
    "Modern digitalisierte Abläufe & interne Systeme",
    "Langjährige Erfahrung seit 1988",
    "Abwechslungsreiche Projekte im Ausbau & Renovierung",
    "Starkes Team & familiäre Arbeitsatmosphäre",
    "Entwicklungsmöglichkeiten & Weiterbildung"
  ];

  return (
    <section className={styles.vorteile}>
      <h2 className={styles["vorteile__title"]}>Ihre Vorteile bei uns</h2>

      <ul className={styles["vorteile__list"]}>
        {items.map((item, index) => (
          <li key={index} className={styles["vorteile__item"]}>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Vorteile;
