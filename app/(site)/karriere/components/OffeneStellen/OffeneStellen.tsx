import Link from "next/link";
import styles from "./OffeneStellen.module.scss";

const positions = [
  {
    title: "Fliesenleger (m/w/d)",
    text: "Erfahrung im Bereich Boden- und Wandfliesen. Selbstständige und zuverlässige Arbeitsweise."
  },
  {
    title: "Trockenbauer (m/w/d)",
    text: "Montage von Gipskartonwänden, Decken und Akustiksystemen. Führerschein Klasse B von Vorteil."
  },
  {
    title: "Maler & Lackierer (m/w/d)",
    text: "Innen- und Außenanstriche, Spachtel- & Schleifarbeiten. Qualitätsorientierte Arbeitsweise."
  }
];

const OffeneStellen = () => {
  return (
    <section className={styles.stellen}>
      <h2 className={styles["stellen__title"]}>Aktuelle Stellenangebote</h2>

      <div className={styles["stellen__grid"]}>
        {positions.map((p, i) => (
          <div className={styles["stellen__card"]} key={i}>
            <h3 className={styles["stellen__card-title"]}>{p.title}</h3>
            <p className={styles["stellen__card-text"]}>{p.text}</p>
            <Link href='/kontakt' className={styles["stellen__btn"]}>Jetzt Bewerben</Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OffeneStellen;
