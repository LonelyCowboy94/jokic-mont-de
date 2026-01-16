import GoogleMap from "@/components/privacy/GoogleMap";
import LazyContactForm from "../../forms/lazyContactForm";
import styles from "./ContactSection.module.scss";

const ContactSection = () => {
  return (
    <section id='kontakt-absenden' className={`${styles.contactSection} flex-wrap`}>
     <GoogleMap />
      <div className={styles.contactSection__formWrapper}>
        <LazyContactForm />
        <div className={`${styles.contactSection__info} flex-wrap`}>
          <div className={styles.contactSection__contactInfo}>
            <p className="contact-links">
              Telefon: <a href="tel:+4964469228174">+4964469228174</a>
            </p>
            <p className="contact-links">
              Email: <a href="mailto:jdmw-info@jdmw.de">jdmw-info@jdmw.de</a>
            </p>
            <p>
              Addresse: Am Stein 3, Biebertal, 35444, <br /> Hessen, Deutschland
            </p>
          </div>
          <div className={styles.contactSection__openingHours}>
            <h3>Geschäftszeiten</h3>
            <p>
              Mo – Fr<span>07:00 am – 06:00 pm</span>
            </p>
            <p>
              Samstag<span>07:00 am – 12:30 pm</span>
            </p>
            <p>
              Sonntag<span>Geschlossen</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
