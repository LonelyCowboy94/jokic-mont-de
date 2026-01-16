'use client';

import { useState } from 'react';
import Footer from '@/components/layout/Footer/Footer';
import styles from './page.module.scss';
import Link from 'next/link';

export default function CookiesRichtlinie() {
  const [resetDone, setResetDone] = useState(false);

  const handleResetConsent = () => {
    localStorage.removeItem('jokic-mont-cookie-consent-gmap');
    setResetDone(true);
    window.location.reload();
  };

  return (
    <>
      <main className={styles.cookiesPage}>
        <div className={styles.cookiesPage__content}>
          <h1 className={styles.cookiesPage__title}>Cookie-Richtlinie</h1>
          <p className={styles.cookiesPage__text}>
            Auf dieser Website verwenden wir Cookies, um externe Inhalte wie Google Maps anzuzeigen. 
            Ohne Ihre Zustimmung werden diese Inhalte nicht geladen. 
          </p>

          <h2 className={styles.cookiesPage__subtitle}>Verwaltung Ihrer Cookies</h2>
          <p className={styles.cookiesPage__text}>
            Sie können Ihre Zustimmung jederzeit ändern oder widerrufen. 
            Nutzen Sie dazu bitte das Cookie-Popup oder löschen Sie die gespeicherten Einstellungen 
            in Ihrem Browser.
          </p>
          
          <div className={styles.cookiesPage__buttons}>
            <Link href="/" className={styles.cookiesPage__btn}>
              Zurück zur Startseite
            </Link>
            <button
              onClick={handleResetConsent}
              className={styles.cookiesPage__btnReset}
            >
              Cookie-Zustimmung zurücksetzen
            </button>
          </div>
<div className='endl'></div>
          {resetDone && (
            <p className={styles.cookiesPage__resetInfo}>
              Die Einstellungen wurden zurückgesetzt. Bitte laden Sie die Seite erneut, um das Pop-up zu sehen.
            </p>
          )}
        </div>
        
      </main>
      
      <Footer />
    </>
  );
}
