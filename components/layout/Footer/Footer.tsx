import styles from "./Footer.module.scss";
import Link from "next/link";

const Footer = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  return (
    <footer className={styles.footerSection}>
        <div className={styles.footerSection__body}>
            <div className={styles.footerSection__wrapper}>
          <div className={styles.footerSection__article}>
            <h6>Kontakt</h6>
            <a href="mailto:jdmw-info@jdmw.de">jdmw-info@jdmw.de</a>
            <p>Am Stein 3, Biebertal, 35444</p>
            <a href="tel:+4964469228174">+4964469228174</a>
          </div>
          <div className={styles.footerSection__article}>
            <h6>Network</h6>
            <a href="https://www.linkedin.com/in/dusan-jokic-7b74b713b/?originalSubdomain=de" target="_blank">LikendIn</a>
            <a href="https://wa.me/4964469228174?text=Hallo%2C%20ich%20habe%20eine%20Frage." target="_blank">WhatsUp</a>
            <a href="https://www.facebook.com/dusan.jokic.50" target="_blank">Facebook</a>
            <a href="">Instagram</a>
          </div>
        </div>
        <div className={styles.footerSection__wrapper}>
          <div className={styles.footerSection__article}>
            <h6>Leistungen</h6>
            <a href="#">Renovierung</a>
            <a href="#">Innenausbau</a>
            <a href="#">Außenbau</a>
            <Link href="/galerie">Galerie</Link>
          </div>
          <div className={styles.footerSection__article}>
           <h6>Rechtliches</h6>
            <Link href="/impressum">Impressum</Link>
            <a href="/datenschutzerklaerung">Datenschutzerklärung</a> <a href="#">AGB</a>{" "}
            <a href="#">Cookie-Richtlinie</a>
          </div>
        </div>
      </div>
      <div className={styles.footerSection__footer}>
        <p>JOKIC MONT &copy; {currentYear}</p>
        <div className="flex-wrap" style={{flexDirection: 'column', alignItems: 'center'}}>
          <p>Proudly created with next.js 16+</p>
          <a href="#">www.jokic.dev</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
