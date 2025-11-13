
import ContactForm from "../forms/ContactForm";
import styles from "./ContactSection.module.scss";

const ContactSection = () => {
  return (
    <section className={`${styles.contactSection} flex-wrap`}>
      <div className={styles.contactSection__mapWrapper}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5057.270200520775!2d8.569019854038142!3d50.67103527989233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bc5da0aa49a867%3A0x750306db709a6bdb!2sAm%20Stein%203%2C%2035444%20Biebertal%2C%20Germany!5e0!3m2!1sen!2srs!4v1763019327442!5m2!1sen!2srs"
          className={styles.contactSection__mapIframe}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map"
        ></iframe>
      </div>
      <div className={styles.contactSection__formWrapper}>
        <ContactForm />
        <div className={`${styles.contactSection__info} flex-wrap`}>
          <div className={styles.contactSection__contactInfo}>
            <p className='contact-links'>
              Telefon: <a href="tel:+4964469228174">+4964469228174</a>
            </p>
            <p className='contact-links'>
              Email: <a href="mailto:jdmw-info@jdmw.de">jdmw-info@jdmw.de</a>
            </p>
            <p>Addresse: Am Stein 3, Biebertal, 35444, <br /> Hessen, Deutschland</p>
          </div>
          <div className={styles.contactSection__openingHours}>
            <h3>Geschäftszeiten</h3>
            <p>
              Mo – Fr<span>07:00 am – 06:00 pm</span>
            </p>
            <p>
              Samstag<span>07:00 am – 12:30 pm</span>
            </p>
            <p>Sonntag<span>Geschlossen</span></p>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default ContactSection;
