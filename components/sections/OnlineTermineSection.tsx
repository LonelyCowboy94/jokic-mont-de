import LazyBookingWidget from "../ui/BookingWidget/LazyBookingWidget";
import styles from "./OnlineTermineSection.module.scss";

const OnlineTermineSection = () => {
  return (
    <section id='onlineTermineSection' className={`${styles.onlineTermineSection} flex-wrap`}>
      <article className={styles.onlineTermineSection__article}>
        <h2 className={styles.onlineTermineSection__title}>Online Termine</h2>
        <h3 className={styles.onlineTermineSection__subtitle}>
          Online Termine sind wieder aktiv.
        </h3>
        <p className={styles.onlineTermineSection__text}>
          Hier können Sie jederzeit und von überall Ihren Termin buchen. Unser
          Online-Kalender steht Ihnen wie gewohnt rund um die Uhr zur Verfügung.
        </p>
      </article>
      <div className={styles.onlineTermineSection__bookingWrapper}>
      <LazyBookingWidget />
      </div>
    </section>
  );
};

export default OnlineTermineSection;
