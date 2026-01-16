'use client';
import Link from 'next/link';
import { useConsent } from './ConsentContext';
import { useState, useEffect } from 'react';
import styles from './CookiesConsent.module.scss';

export default function CookieConsent() {
  const { consent, handleAccept, handleDecline, closing } = useConsent();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 500); 
    return () => clearTimeout(timer);
  }, []);

  if (!show || consent !== null) return null;

  return (
    <div className={`${styles.wrapper} ${closing ? styles.slideDown : ''}`}>
      <p>
        Wir verwenden Cookies, um externe Inhalte wie Google Maps anzuzeigen.
        Weitere Informationen finden Sie in unserer Datenschutzerklärung.
      </p>
      <div className={styles.buttons}>
        <button className={styles.button} type="button" onClick={handleAccept}>Akzeptieren</button>
        <button className={styles.button} type="button" onClick={handleDecline}>Ablehnen</button>
        <Link className={styles.link} href='/cookierichtlinie'>Cookie-Richtlinie</Link>
      </div>
    </div>
  );
}

