import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const pathname = usePathname();

const links = [
    { href: "/", label: "STARTSEITE" },
    { href: "/leistungen", label: "LEISTUNGEN" },
    { href: "/kontakt", label: "KONTAKT" },
    { href: "/karriere", label: "KARRIERE" },
    { href: "/galerie", label: "GALERIE" },
    { href: "/impressum", label: "IMPRESSUM" },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__content}>
        {/* NAV LOGO */}
        <Link href="/" className={styles.navbar__logo}>
          <div className={styles.navbar__logoContainer}>
            <div className={styles.navbar__logoImage}>
              <Image
                src="/images/logo-link-white.webp"
                fill
                style={{ objectFit: "contain" }}
                sizes="(max-width: 768px) 120px, (max-width: 1200px) 150px, 200px"
                alt="logo"
                loading="eager"
              />
            </div>
          </div>
        </Link>

        {/* DESKTOP NAV LINKS */}
       
        <div className={styles.navbar__links}>
          
             {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navbar__link} ${
              pathname === link.href ? styles["navbar__link--active"] : ""
            }`}
              >
                {link.label}
              </Link>
            ))}
        </div>
        <div className={styles.navbar__contactSvgs}>{/*PLACEHOLDER*/}</div>
      </div>

      <></>
    </nav>
  );
}
