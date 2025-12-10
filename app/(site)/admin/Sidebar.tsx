"use client";

import { logoutWrapper } from "./logoutAction";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./layout.module.scss";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  async function handleLogout() {
    await logoutWrapper(); // server action pozvan iz client side-a
  }

  useEffect(() => {
    function handleOutside(e: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleOutside);
      document.addEventListener("touchstart", handleOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [isOpen]);

  return (
    <>
    <aside ref={ref} className={`${styles.adminLayout__sidemenu} ${isOpen ? styles.open : ""}`}>
      <button
        className={`${styles.adminLayout__menuBtn} ${isOpen ? styles.adminLayout__openMenuBtn : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
      </button>

      <nav>
        <Link href="/admin" className={pathname === "/admin" ? styles.activeLink : ""} onClick={() => setIsOpen(false)}>Dashboard</Link>
        <Link href="/admin/aktuell" className={pathname === "/admin/aktuell" ? styles.activeLink : ""} onClick={() => setIsOpen(false)}>Aktuell</Link>
        <Link href="/admin/termine" className={pathname === "/admin/termine" ? styles.activeLink : ""} onClick={() => setIsOpen(false)}>Termine</Link>
        <Link href="/admin/karriere" className={pathname === "/admin/karriere" ? styles.activeLink : ""} onClick={() => setIsOpen(false)}>Karriere</Link>
      </nav>

      <button className={styles.adminLayout__logoutBtn} onClick={handleLogout}>
        Logout
      </button>
    </aside>
    <div className={isOpen ? styles.sidemenuOverlay : ""}></div>
    </>
  );
}
