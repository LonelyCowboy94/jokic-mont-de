"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./MobileNavbar.module.scss";

const MobileNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const closedY = -550;
  const openY = -50;

  const links = [
    { href: "/", label: "STARTSEITE" },
    { href: "/leistungen", label: "LEISTUNGEN" },
    { href: "/kontakt", label: "KONTAKT" },
    { href: "/karriere", label: "KARRIERE" },
    { href: "/aktuell", label: "AKTUELL" },
    { href: "/impressum", label: "IMPRESSUM" },
    { href: "/datenschutzerklaerung", label: "DATENSCHUTZERKLÄRUNG" },
  ];

  return (
    <>
      <motion.div
        className={`${styles.mobileMenu} ${
          menuOpen ? styles["mobileMenu--open"] : ""
        }`}
        drag="y"
        dragConstraints={{ top: closedY, bottom: openY }}
        dragElastic={0.2}
        animate={{ y: menuOpen ? openY : closedY }}
        transition={{ type: "spring", stiffness: 250, damping: 25 }}
        onDragEnd={(event, info) => {
          if (info.offset.y > 30) setMenuOpen(true);
          else if (info.offset.y < -30) setMenuOpen(false);
        }}
      >
        {menuOpen && (
          <>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.mobileMenu__mobileLink} ${
                  pathname === link.href
                    ? styles["mobileMenu__mobileLink--active"]
                    : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
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
