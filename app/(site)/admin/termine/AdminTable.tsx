"use client";

import { Appointment } from "@/types";
import { useState } from "react";
import styles from "./AdminTable.module.scss";

interface Props {
  appointments: Appointment[];
}

export default function AdminTable({ appointments }: Props) {
  const [terms, setTerms] = useState(appointments);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleConfirm = async (id: number) => {
    if (!window.confirm("Bist du sicher, dass du diesen Termin bestätigen willst?")) return;

    try {
      setLoadingId(id);
      const res = await fetch("/api/appointment/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Failed to confirm");
      setTerms(prev => prev.map(t => (t.id === id ? { ...t, confirmed: true } : t)));
    } catch (err) {
      console.error(err);
      alert("Fehler beim Bestätigen");
    } finally {
      setLoadingId(null);
    }
  };

  const handleReject = async (id: number) => {
    if (!window.confirm("Bist du sicher, dass du diesen Termin ablehnen willst?")) return;

    try {
      setLoadingId(id);
      const res = await fetch("/api/appointment/reject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Failed to reject");
      setTerms(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error(err);
      alert("Fehler beim Ablehnen");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Bist du sicher, dass du diesen Termin löschen willst?")) return;

    try {
      setLoadingId(id);
      const res = await fetch("/api/appointment/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Failed to delete");
      setTerms(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error(err);
      alert("Fehler beim Löschen");
    } finally {
      setLoadingId(null);
    }
  };

  const waiting = terms.filter(t => !t.confirmed);
  const confirmed = terms.filter(t => t.confirmed);

  return (
    <div className={styles.adminTableWrapper}>
      <h2 className={styles.title}>Wartende Termine</h2>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Notiz</th>
            <th>Datum</th>
            <th>Uhrzeit</th>
            <th>Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {waiting.map(t => (
            <tr key={t.id} className={`${styles.tbodyTr} ${styles.tbodyTrHover}`}>
              <td className={styles.td}>{t.name}</td>
              <td className={styles.td}>{t.email}</td>
              <td className={styles.td}>{t.note || "(Keine Notiz)"}</td>
              <td className={styles.td}>{new Date(t.date).toLocaleDateString("de-DE")}</td>
              <td className={styles.td}>{t.time}</td>
              <td className={styles.td}>
                <button
                  className={`${styles.button} ${styles.buttonConfirm}`}
                  onClick={() => handleConfirm(t.id)}
                  disabled={loadingId === t.id}
                >
                  {loadingId === t.id ? "..." : "Bestätigen"}
                </button>
                <button
                  className={`${styles.button} ${styles.buttonReject}`}
                  onClick={() => handleReject(t.id)}
                  disabled={loadingId === t.id}
                >
                  {loadingId === t.id ? "..." : "Ablehnen"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className={styles.title}>Bestätigte Termine</h2>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Notiz</th>
            <th>Datum</th>
            <th>Uhrzeit</th>
            <th>Löschen</th>
          </tr>
        </thead>
        <tbody>
          {confirmed.map(t => (
            <tr key={t.id}>
              <td className={styles.td}>{t.name}</td>
              <td className={styles.td}>{t.email}</td>
              <td className={styles.td}>{t.note || "(Keine Notiz)"}</td>
              <td className={styles.td}>{new Date(t.date).toLocaleDateString("de-DE")}</td>
              <td className={styles.td}>{t.time}</td>
              <td className={styles.td}>
                <button
                  className={`${styles.button} ${styles.buttonDelete}`}
                  onClick={() => handleDelete(t.id)}
                  disabled={loadingId === t.id}
                >
                  {loadingId === t.id ? "..." : "Löschen"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
