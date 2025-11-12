"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

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
          <Link
            href="/"
            className={`${styles.navbar__link} ${
              pathname === "/" ? styles["navbar__link--active"] : ""
            }`}
          >
            STARTSEITE
          </Link>
          <Link
            href="/leistungen"
            className={`${styles.navbar__link} ${
              pathname === "/leistungen" ? styles["navbar__link--active"] : ""
            }`}
          >
            LEISTUNGEN
          </Link>

          <Link href="/kontakt" className={`${styles.navbar__link} ${
              pathname === "/kontakt" ? styles["navbar__link--active"] : ""
            }`}>
            KONTAKT
          </Link>

          <Link
            href="/karriere"
            className={`${styles.navbar__link} ${
              pathname === "/karriere" ? styles["navbar__link--active"] : ""
            }`}
          >
            KARRIERE
          </Link>

          <Link
            href="/galerie"
            className={`${styles.navbar__link} ${
              pathname === "/galerie" ? styles["navbar__link--active"] : ""
            }`}
          >
            GALERIE
          </Link>

          <Link
            href="/impressum"
            className={`${styles.navbar__link} ${
              pathname === "/impressum" ? styles["navbar__link--active"] : ""
            }`}
          >
            IMPRESSUM
          </Link>
          <Link
              href="/datenschutzerklaerung"
              className={`${styles.navbar__link} ${
              pathname === "/datenschutzerklaerung" ? styles["navbar__link--active"] : ""
            }`}
            >
              DATENSCHUTZERKLÄRUNG
            </Link>
        </div>
        <div className={styles.navbar__contactSvgs}>{/*PLACEHOLDER*/}</div>
        
        {/* HAMBURGER ICON */}
        <button
          className={styles.navbar__hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {!menuOpen && <Menu size={32} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <>
          <div className={styles.navbar__overlay}></div>

          <div
            className={styles.navbar__mobileMenu}
            onClick={() => setMenuOpen(false)}
          >
            <button
              className={styles.navbar__closeBtn}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <X size={28} />
            </button>

            <Link href="/" className={styles.navbar__mobileLink}>
              Startseite
            </Link>

            <Link href="/leistungen" className={styles.navbar__mobileLink}>
              Leistungen
            </Link>

            <Link href="/kontakt" className={styles.navbar__mobileLink}>
              Kontakt
            </Link>

            <Link href="/karriere" className={styles.navbar__mobileLink}>
              Karriere
            </Link>

            <Link href="/galerie" className={styles.navbar__mobileLink}>
              Galerie
            </Link>

            <Link href="/impressum" className={styles.navbar__mobileLink}>
              Impressum
            </Link>

            <Link
              href="/datenschutzerklaerung"
              className={styles.navbar__mobileLink}
            >
              Datenschutzerklärung
            </Link>
          </div>
        </>
      )}
    </nav>
  );
}
