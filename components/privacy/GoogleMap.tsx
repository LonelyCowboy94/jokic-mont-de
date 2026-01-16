'use client';
import { useConsent } from './ConsentContext';
import styles from '@/components/sections/HomePage/ContactSection.module.scss';

export default function GoogleMap() {
  const { consent } = useConsent();

  const placeholderStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#c2c2c2',
    height: '100%',
    textAlign: 'center',
    padding: '1rem',
  };

  return (
    <div className={styles.contactSection__mapWrapper}>
      {consent === 'accepted' ? (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5057.270200520775!2d8.569019854038142!3d50.67103527989233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bc5da0aa49a867%3A0x750306db709a6bdb!2sAm%20Stein%203%2C%2035444%20Biebertal%2C%20Germany!5e0!3m2!1sen!2srs!4v1763019327442!5m2!1sen!2srs"
          className={styles.contactSection__mapIframe}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map"
        />
      ) : (
      
        <div className={styles.contactSection__mapIframe} style={placeholderStyle}>
          <p>Google Maps ist deaktiviert. Bitte akzeptieren Sie Cookies.</p>
           <a href="/cookierichtlinie">Cookie-Richtlinie</a>
        </div>
       
       
      )}
    </div>
  );
}
