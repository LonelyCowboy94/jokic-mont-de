import { SiFacebook, SiInstagram, SiWhatsapp, SiLinkedin } from "react-icons/si";
import { FiPhone, FiMail } from "react-icons/fi";
import { AiOutlineCalendar } from "react-icons/ai";
import { MdComputer } from "react-icons/md";


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
            <a className="flex-center" href="mailto:jdmw-info@jdmw.de">jdmw-info@jdmw.de &nbsp; <FiMail /></a>
            <p>Am Stein 3, Biebertal, 35444</p>
            <a className="flex-center" href="tel:+4964469228174">+4964469228174 &nbsp; <FiPhone /></a>
            <Link className="flex-center" href="/#kontakt-absenden">Kontakt From&nbsp;<MdComputer /></Link>
          </div>
          <div className={styles.footerSection__article}>
            <h6>Social Network</h6>
           <a className="flex-center" href="https://www.linkedin.com/in/dusan-jokic-7b74b713b/?originalSubdomain=de" target="_blank">
  LinkedIn &nbsp; <SiLinkedin />
</a>

<a className="flex-center" href="https://wa.me/4964469228174?text=Hallo%2C%20ich%20habe%20eine%20Frage." target="_blank">
  WhatsApp &nbsp; <SiWhatsapp />
</a>

<a className="flex-center" href="https://www.facebook.com/dusan.jokic.50" target="_blank">
  Facebook &nbsp; <SiFacebook />
</a>

<a className="flex-center" href="#" target="_blank">
  Instagram &nbsp; <SiInstagram />
</a>

          </div>
        </div>
        <div className={styles.footerSection__wrapper}>
          <div className={styles.footerSection__article}>
            <h6>Navigation</h6>
            <Link href="/aktuell">Aktuell</Link>
            <Link href="/karriere">Karriere</Link>
            <Link href="/leistungen">Leistungen</Link>
            <Link className="flex-center" href="/#termin-vereinbaren">Online Termine &nbsp; <AiOutlineCalendar /></Link>
          </div>
          <div className={styles.footerSection__article}>
           <h6>Rechtliches</h6>
            <Link href="/impressum">Impressum</Link>
            <a href="/datenschutzerklaerung">Datenschutzerklärung</a> <a href="#">AGB</a>{" "}
            <a href="/cookierichtlinie">Cookie-Richtlinie</a>
          </div>
        </div>
      </div>
      <div className={styles.footerSection__footer}>
        <p className="flex-center">
JOKIC MONT &copy; {currentYear}</p>
        <div className="flex-wrap" style={{flexDirection: 'column', alignItems: 'center'}}>
          <p>Proudly created with next.js 16+</p>
          <a href="#">www.jokic.dev</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
