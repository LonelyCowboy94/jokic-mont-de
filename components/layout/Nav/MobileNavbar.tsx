"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./MobileNavbar.module.scss";

const MobileNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <motion.div
        className={`${styles.mobileMenu} ${
          menuOpen ? styles["mobileMenu--open"] : ""
        }`}
        drag="y"
        dragConstraints={{ top: -80, bottom: 0 }}
        dragElastic={0.2}
        transition={{ type: "spring", stiffness: 250, damping: 25 }}

        onDragEnd={(event, info) => {
          if (info.offset.y > 30) {
            setMenuOpen(true);   
          } else if (info.offset.y < -30) {
            setMenuOpen(false); 
          }
        }}
      >
        {menuOpen && (
          <>
            <Link
              href="/"
              className={`${styles.mobileMenu__mobileLink} ${
                pathname === "/" ? styles["mobileMenu__mobileLink--active"] : ""
              }`}
            >
              STARTSEITE
            </Link>

            <Link
              href="/leistungen"
              className={`${styles.mobileMenu__mobileLink} ${
                pathname === "/leistungen"
                  ? styles["mobileMenu__mobileLink--active"]
                  : ""
              }`}
            >
              LEISTUNGEN
            </Link>

            <Link
              href="/kontakt"
              className={`${styles.mobileMenu__mobileLink} ${
                pathname === "/kontakt"
                  ? styles["mobileMenu__mobileLink--active"]
                  : ""
              }`}
            >
              KONTAKT
            </Link>

            <Link
              href="/karriere"
              className={`${styles.mobileMenu__mobileLink} ${
                pathname === "/karriere"
                  ? styles["mobileMenu__mobileLink--active"]
                  : ""
              }`}
            >
              KARRIERE
            </Link>

            <Link
              href="/galerie"
              className={`${styles.mobileMenu__mobileLink} ${
                pathname === "/galerie"
                  ? styles["mobileMenu__mobileLink--active"]
                  : ""
              }`}
            >
              GALERIE
            </Link>

            <Link
              href="/impressum"
              className={`${styles.mobileMenu__mobileLink} ${
                pathname === "/impressum"
                  ? styles["mobileMenu__mobileLink--active"]
                  : ""
              }`}
            >
              IMPRESSUM
            </Link>

            <Link
              href="/datenschutzerklaerung"
              className={`${styles.mobileMenu__mobileLink} ${
                pathname === "/datenschutzerklaerung"
                  ? styles["mobileMenu__mobileLink--active"]
                  : ""
              }`}
            >
              DATENSCHUTZERKLÄRUNG
            </Link>
          </>
        )}

        {/* HAMBURGER BUTTON */}
        <button
          className={`${styles.mobileMenu__hamburgerBtn} ${
            menuOpen && styles.mobileMenu__openMenuBtn
          } hamburger-icon`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
        </button>
      </motion.div>

      {/* OVERLAY */}
      <div
        className={`${styles.overlay} ${
          menuOpen ? styles["overlay--active"] : ""
        }`}
        onClick={() => setMenuOpen(false)}
      ></div>
    </>
  );
};

export default MobileNavbar;
