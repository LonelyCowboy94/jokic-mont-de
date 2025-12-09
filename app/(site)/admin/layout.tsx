"use client"; // sidebar je client component

import Link from "next/link";
import { ReactNode } from "react";
import styles from "./layout.module.scss";
import { logoutAdmin } from "@/app/actions";

interface Props {
  children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
  return (
    <div className={styles.adminLayout} style={{ display: "flex", minHeight: "100vh", fontFamily: "sans-serif" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "220px",
          background: "#1f2937",
          color: "#fff",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <h2>Admin Panel</h2>
        <div className={styles.adminLayout__sidemenu}>
        <nav style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Link href="/admin" style={{ color: "#fff" }}>Dashboard</Link>
          <Link href="/admin/termine" style={{ color: "#fff" }}>Termine</Link>
          <Link href="/admin/calendar" style={{ color: "#fff" }}>Calendar</Link>
          <Link href="/admin/aktuell" style={{ color: "#fff" }}>Aktuell</Link>
          <Link href="/admin/analytics" style={{ color: "#fff" }}>Analitics</Link>
        </nav>
        <form action={logoutAdmin}>
            <button className={styles.adminLayout__logoutBtn} type="submit">
              Logout
            </button>
          </form>
          </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1 }}>{children}</main>
    </div>
  );
}
