import Image from "next/image";
import styles from "./HandwerkPlusSection.module.scss";

const LeistungenSection = () => {
  return (
    <section id='handwerk-plus' className={styles.leistungenSection}>
      <div className={`${styles.leistungenSection__articleWrapper} flex-wrap`}>
        <article
          className={`${styles.leistungenSection__article} gradient-text`}
        >
          <h2 className={styles.leistungenSection__title}>Handwerk +</h2>
          <p className={styles.leistungenSection__text}>
            Digital Solutions
          </p>
          <ul className={styles.leistungenSection__list}>
            <li>Formulare digital erstellen und bearbeiten – effizient und übersichtlich mit Next.js</li>
            <li>Stundenzettel digital erfassen– Zeit sparen und Prozesse optimieren</li>
            <li>Betriebsrelevante Dateien zentral speichern und bearbeiten – Next.js / Server</li>
            <li>Terminplanung digital umsetzen – alle Termine auf einen Blick, mobil und am Desktop</li>
            <li>Projektinformationen jederzeit abrufen und aktualisieren -- transparent und fehlerfrei</li>
            <li>Dokumentation und Nachweise digital verwalten – papierlos und nachhaltig</li>
            <li>Effiziente Team-Kommunikation</li>
            <li>Moderne Webdesign-Lösungen – ansprechende, responsive Websites für Ihr Unternehmen</li>
            <li>Alles aus einer Hand – Digital Solutions mit Next.js / React <a className={styles.jokicDevLink} href="www.jokic.dev">www.jokic.dev</a></li>
          </ul>
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
