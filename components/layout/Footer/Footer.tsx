import styles from "./Footer.module.scss";

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
            <a href="">LikendIn</a>
            <a href="">WhatsUp</a>
            <a href="">Facebook</a>
            <a href="">Instagram</a>
          </div>
        </div>
        <div className={styles.footerSection__wrapper}>
          <div className={styles.footerSection__article}>
            <h6>Leistungen</h6>
            <a href="#">Renovierung</a>
            <a href="#">Innenausbau</a>
            <a href="#">Außenbau</a>
            <a href="/galerie">Galerie</a>
          </div>
          <div className={styles.footerSection__article}>
           <h6>Rechtliches</h6>
            <a href="#">Impressum</a>
            <a href="#">Datenschutzerklärung</a> <a href="#">AGB</a>{" "}
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
