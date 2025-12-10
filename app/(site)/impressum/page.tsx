import Footer from "@/components/layout/Footer/Footer";
import styles from "./page.module.scss";


export const metadata = {
  title: "Impressum | Jokić Mont",
  description: "Rechtliche Informationen und Kontaktdaten von Jokić Mont im Bau- und Renovierungsbereich.",
  alternates: {
    canonical: "https://www.jokic-mont.de/impressum",
  },
};

export default function ImpressumPage() {
  return (
    <>
    {/* <section className={styles.impressum}>
      <div className={styles["impressum__container"]}>
        <h1 className={styles["impressum__title"]}>Impressum</h1>

        <div className={styles["impressum__block"]}>
          <h2 className={styles["impressum__subtitle"]}>Angaben gemäß § 5 TMG</h2>
          <p className={styles["impressum__text"]}>
            Dusan Jokic <br />
            Bau- und Handwerksdienstleistungen <br />
            Am Stein 3 <br />
            35444 Biebertal <br />
            Deutschland
          </p>
        </div>

        <div className={styles["impressum__block"]}>
          <h2 className={styles["impressum__subtitle"]}>Kontakt</h2>
          <p className={styles["impressum__text"]}>
            Telefon/Fax: +49 6446 9228174 <br />
            E-Mail: jdmw-info@jdmw.de
          </p>
        </div>

        <div className={styles["impressum__block"]}>
          <h2 className={styles["impressum__subtitle"]}>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG</h2>
          <p className={styles["impressum__text"]}>DE314239422</p>
        </div>

        <div className={styles["impressum__block"]}>
          <h2 className={styles["impressum__subtitle"]}>Zuständige Aufsichtsbehörde</h2>
          <p className={styles["impressum__text"]}>
            Handwerkskammer Wiesbaden <br />
            Bierstadter Straße 45 <br />
            65189 Wiesbaden <br />
            Deutschland
          </p>
        </div>

        <div className={styles["impressum__block"]}>
          <h2 className={styles["impressum__subtitle"]}>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <p className={styles["impressum__text"]}>
            Dusan Jokic <br />
            Am Stein 3 <br />
            35444 Biebertal
          </p>
        </div>

        <div className={styles["impressum__block"]}>
          <h2 className={styles["impressum__subtitle"]}>Haftungsausschluss</h2>
          <p className={styles["impressum__text"]}>
            Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links.
            Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
          </p>
        </div>

        <div className={styles["impressum__block"]}>
          <h2 className={styles["impressum__subtitle"]}>Urheberrecht</h2>
          <p className={styles["impressum__text"]}>
            Die auf dieser Website veröffentlichten Inhalte und Werke unterliegen dem deutschen Urheberrecht.
            Jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedarf der vorherigen schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
        </div>

        <p className={styles["impressum__footer"]}>
          © {new Date().getFullYear()} Dusan Jokic – Alle Rechte vorbehalten.
        </p>
      </div>
    </section> */}
    <Footer />
    </>
  );
}
