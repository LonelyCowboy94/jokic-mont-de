import LazyBookingWidget from "../../ui/BookingWidget/LazyBookingWidget";
import styles from "./OnlineTermineSection.module.scss";

const OnlineTermineSection = () => {
  return (
    <section id='termin-vereinbaren'
      className={`${styles.onlineTermineSection} flex-wrap`}
    >
      <article className={styles.onlineTermineSection__article}>
        <h2 className={styles.onlineTermineSection__title}>Online Termine</h2>
<h3 className={styles.onlineTermineSection__subtitle}>
  Terminbuchung – jederzeit verfügbar.
</h3>
<p className={styles.onlineTermineSection__text}>
  Unser Online-Kalender steht Ihnen rund um die Uhr zur Verfügung und ermöglicht 
  eine einfache, schnelle und transparente Buchung Ihres Wunschtermins – egal ob 
  vom Computer, Tablet oder Smartphone.  
  <br /><br />
  Sie erhalten sofortige Bestätigung, volle Übersicht über verfügbare Zeiten und 
  maximale Flexibilität bei der Planung. Der gesamte Prozess ist klar strukturiert, 
  intuitiv gestaltet und für alle Nutzer problemlos zugänglich – ganz ohne 
  überflüssige Schritte.
</p>
      </article>
      <div className={styles.onlineTermineSection__bookingWrapper}>
        <LazyBookingWidget />
      </div>
    </section>
  );
};

export default OnlineTermineSection;
