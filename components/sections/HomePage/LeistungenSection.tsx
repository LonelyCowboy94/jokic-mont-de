import Image from "next/image";
import Link from "next/link";
import styles from "./LeistungenSection.module.scss";

const LeistungenSection = () => {
  return (
    <section className={styles.leistungenSection}>
      <div className={`${styles.leistungenSection__articleWrapper} flex-wrap`}>
        <article
          className={`${styles.leistungenSection__article} gradient-text`}
        >
          <h2 className={styles.leistungenSection__title}>Leistungsbereich</h2>
          <p className={styles.leistungenSection__text}>
            Wir bieten sowohl Privatkunden als auch Gewerbetreibenden
            maßgeschneiderte Lösungen.
          </p>
          <ul className={styles.leistungenSection__list}>
            <li>Innenausbau</li>
            <li>Abbrucharbeiten</li>
            <li>Garten- und Aussenanlagen</li>
            <li>Montagearbeiten</li>
            <li>Hausmeisterservice</li>
            <li>Logistik</li>
            <li>Entsorgung</li>
            <li>Beratung und Planung</li>
            <li>Montagearbeiten / SHK</li>
            <li>Montagearbeiten / Elektroinst.</li>
            <li>Montagearbeiten / Rohbau</li>
            <li>Netzwerk / Haustechnik</li>
          </ul>
          <Link href="/leistungen">Zu unseren Leistungen</Link>
        </article>
        <div className={styles.leistungenSection__imageWrapper}>
          <Image
            className={styles.leistungenSection__img}
            fill
            src="https://res.cloudinary.com/drohi7opt/image/upload/fl_preserve_transparency/v1762809785/IMG_7967_ntjba3.jpg?_s=public-apps"
            alt="Leistungsbereich-img"
            sizes="(max-width: 375px) 90vw,
         (max-width: 768px) 45vw,
         (max-width: 1024px) 30vw,
         25vw"
          />
        </div>
      </div>
    </section>
  );
};

export default LeistungenSection;
