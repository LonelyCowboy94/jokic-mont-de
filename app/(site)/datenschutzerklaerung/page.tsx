import Footer from "@/components/layout/Footer/Footer";
import styles from "./page.module.scss";

export default function DatenschutzPage() {
return (
  <>
<main className={styles.datenschutz}>
<section className={styles.datenschutz__section}>
<h1 className={styles.datenschutz__title}>Datenschutzerklärung</h1>


<p className={styles.datenschutz__text}>
Der Schutz Ihrer personenbezogenen Daten ist uns ein besonderes
Anliegen. Diese Datenschutzerklärung informiert Sie darüber, wie wir
Ihre Daten verarbeiten, wenn Sie unsere Website besuchen,
Kontaktformulare nutzen, Termine anfragen oder mit unseren
administrativen Bereichen interagieren.
</p>


<h2 className={styles.datenschutz__subtitle}>1. Verantwortlicher</h2>
<p className={styles.datenschutz__text}>
Jokic Mont – Handwerksbetrieb<br />
Am Stein 3<br />
35444 Biebertal<br />
E-Mail: jdmw-info@jdmw.com
</p>


<h2 className={styles.datenschutz__subtitle}>
2. Hosting & technische Infrastruktur
</h2>
<p className={styles.datenschutz__text}>
Unsere Website wird über die Plattform Vercel bereitgestellt. Durch
die Nutzung des Dienstes kann es zu Übermittlungen von technischen
Daten in Länder außerhalb der Europäischen Union, insbesondere in die
USA, kommen. Vercel setzt moderne Edge-Server ein, die Anfragen
weltweit verteilen und optimieren.
</p>


<h3 className={styles.datenschutz__subsubtitle}>2.1 Edge-Funktionen</h3>
<p className={styles.datenschutz__text}>
Edge-Funktionen ermöglichen eine schnellere Auslieferung unserer
Website, indem Inhalte näher am Standort der Besucher verarbeitet
werden. Hierbei werden technische Verbindungsdaten wie IP-Adresse,
Request-Informationen oder Browserdaten temporär verarbeitet.
</p>


<h3 className={styles.datenschutz__subsubtitle}>2.2 Datenbank</h3>
<p className={styles.datenschutz__text}>
Wir verwenden die PostgreSQL-Datenbanklösung von Neon. Die Speicherung
von Daten erfolgt ausschließlich zweckgebunden, etwa zur Verwaltung
von Terminen, Nachrichten und administrativen Prozessen.
</p>


<h2 className={styles.datenschutz__subtitle}>
3. Erhebung und Verarbeitung personenbezogener Daten
</h2>


<h3 className={styles.datenschutz__subsubtitle}>3.1 Kontaktformular</h3>
<p className={styles.datenschutz__text}>
Wenn Sie uns über das Kontaktformular erreichen, verarbeiten wir die
von Ihnen angegebenen Informationen, um Ihre Anfrage zu beantworten
und gegebenenfalls Kontakt aufzunehmen. Die Übermittlung erfolgt über
einen per SMTP angebundenen Mail-Service. E-Mails werden in HTML-Form
versendet.
</p>


<h3 className={styles.datenschutz__subsubtitle}>3.2 Termin-Anfrageformular</h3>
<p className={styles.datenschutz__text}>
Bei der zweistufigen Termin-Anfrage werden die von Ihnen gemachten
Angaben ausschließlich zur Bearbeitung Ihrer Anfrage verwendet. Die
Daten werden in unserer Neon-Datenbank gespeichert.
</p>


<h3 className={styles.datenschutz__subsubtitle}>3.3 Admin-Bereich</h3>
<p className={styles.datenschutz__text}>
Der Zugang zum Admin-Panel ist ausschließlich intern. Zugriffe werden
über ein Login-System mit Session-Cookies geschützt. Diese Cookies
dienen ausschließlich der Authentifizierung und werden nicht zu
Tracking-Zwecken verwendet.
</p>


<h2 className={styles.datenschutz__subtitle}>5. Webanalyse</h2>
<p className={styles.datenschutz__text}>
Zukünftig kann Google Analytics eingesetzt werden. In diesem Fall
werden Sie vorab über ein entsprechendes Cookie-Banner informiert und
können der Verwendung zustimmen oder widersprechen, bevor Daten erfasst
werden.
</p>


<h2 className={styles.datenschutz__subtitle}>6. Aktuell-Seite & Inhalte</h2>
<p className={styles.datenschutz__text}>
Auf unserer Seite „Aktuell“ veröffentlichen wir Nachrichten und
Mitteilungen mit begleitenden Bildern. Diese Daten stammen entweder
aus unserem eigenen Bestand oder wurden mit ausdrücklicher
Zustimmung bereitgestellt.
</p>


<h2 className={styles.datenschutz__subtitle}>7. Rechte der betroffenen Personen</h2>
<ul className={styles.datenschutz__list}>
<li>Auskunft über gespeicherte personenbezogene Daten</li>
<li>Berichtigung unrichtiger oder unvollständiger Daten</li>
<li>Löschung der Daten, sofern gesetzlich zulässig</li>
<li>Einschränkung der Verarbeitung</li>
<li>Widerspruch gegen die Verarbeitung</li>
<li>Übertragbarkeit Ihrer Daten</li>
</ul>


<h2 className={styles.datenschutz__subtitle}>8. Kontakt für Datenschutzfragen</h2>
<p className={styles.datenschutz__text}>
Bei Fragen zur Datenverarbeitung oder zur Ausübung Ihrer Rechte können
Sie uns jederzeit unter jdmw-info@jdmw.com kontaktieren.
</p>
 <p className={styles["datenschutz__footer"]}>
          © {new Date().getFullYear()} Dusan Jokic – Alle Rechte vorbehalten.
        </p>
</section>
</main>
<Footer />
</>
);
}