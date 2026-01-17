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
        <article className={styles.cookiesPage__content}>
          <header className={styles.cookiesPage__header}>
            <h1 className={styles.cookiesPage__title}>Cookie-Richtlinie</h1>
            <p className={styles.cookiesPage__intro}>
              Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen.
            </p>
          </header>

          <section className={styles.cookiesPage__section}>
            <h2 className={styles.cookiesPage__subtitle}>Verwendung von Cookies</h2>
            <p className={styles.cookiesPage__text}>
              Diese Website verwendet ausschließlich technisch notwendige Cookies sowie lokale
              Speichermechanismen, um externe Inhalte wie <strong>Google Maps</strong> darzustellen.
              Ohne Ihre ausdrückliche Zustimmung werden diese Inhalte nicht geladen.
            </p>
          </section>

          <section className={styles.cookiesPage__section}>
            <h2 className={styles.cookiesPage__subtitle}>Ihre Einwilligung</h2>
            <p className={styles.cookiesPage__text}>
              Beim ersten Besuch unserer Website werden Sie gebeten, der Anzeige externer Inhalte
              zuzustimmen oder diese abzulehnen. Ihre Entscheidung wird lokal in Ihrem Browser
              gespeichert und kann jederzeit geändert werden.
            </p>
          </section>

          <section className={styles.cookiesPage__section}>
            <h2 className={styles.cookiesPage__subtitle}>Einwilligung verwalten</h2>
            <p className={styles.cookiesPage__text}>
              Sie haben jederzeit die Möglichkeit, Ihre Cookie-Einstellungen zurückzusetzen
              und eine neue Auswahl zu treffen.
            </p>

            <div className={styles.cookiesPage__buttons}>
              <Link href="/" className={styles.cookiesPage__btnPrimary}>
                Zurück zur Startseite
              </Link>

              <button
                type="button"
                onClick={handleResetConsent}
                className={styles.cookiesPage__btnSecondary}
              >
                Cookie-Einwilligung zurücksetzen
              </button>
            </div>

            {resetDone && (
              <p className={styles.cookiesPage__resetInfo}>
                Ihre Cookie-Einstellungen wurden erfolgreich zurückgesetzt.
                Beim nächsten Seitenaufruf erscheint das Auswahlfenster erneut.
              </p>
            )}
          </section>
        </article>
      </main>
      <hr />

      <Footer />
    </>
  );
}
