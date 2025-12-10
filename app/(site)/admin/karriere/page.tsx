"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.scss";

type Stelle = {
  id: string;
  title: string;
  description: string;
};

export default function KarriereAdminPage() {
  const [stellen, setStellen] = useState<Stelle[]>([]);
  const [title, setTitle] = useState("");
  const [descr, setDescr] = useState("");
  const [showForm, setShowForm] = useState(false);

  // učitavanje podataka
  async function load() {
    const res = await fetch("/api/karriere");
    const data = await res.json();
    setStellen(data);
  }

  // kreiranje nove pozicije
  async function create() {
    if (!title || !descr) return;

    await fetch("/api/karriere", {
      method: "POST",
      body: JSON.stringify({ title, description: descr }),
    });

    setTitle("");
    setDescr("");
    setShowForm(false);
    load();
  }

  // brisanje pozicije
  async function remove(id: string) {
    await fetch(`/api/karriere?id=${id}`, { method: "DELETE" });
    load();
  }

 useEffect(() => { async function fetchStellen() { const res = await fetch("/api/karriere"); const data = await res.json(); setStellen(data);} fetchStellen(); }, []);

  return (
    <main className={styles.karriere}>
      {/* Header i statistika */}
      <header className={styles.karriere__header}>
        <h1 className={styles.karriere__title}>Offene Stellen verwalten</h1>
        <div className={styles.karriere__stats}>
          <span className={styles.karriere__stat}>
            📝 Total: {stellen.length} Positionen
          </span>
          <button className={styles.karriere__btn} onClick={load}>
            Aktualisieren
          </button>
        </div>
      </header>

      {/* Forma za dodavanje pozicije */}
      <section className={styles["karriere__form-section"]}>
        <button
          className={styles["karriere__toggle-form"]}
          onClick={() => setShowForm((prev) => !prev)}
        >
          {showForm ? "Formular ausblenden" : "Neue Stelle hinzufügen"}
        </button>

        {showForm && (
          <div className={styles.karriere__form}>
            <input
              className={styles.karriere__input}
              placeholder="Titel"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className={styles.karriere__textarea}
              placeholder="Beschreibung"
              value={descr}
              onChange={(e) => setDescr(e.target.value)}
            />
            <button className={styles.karriere__btn} onClick={create}>
              Stelle hinzufügen
            </button>
          </div>
        )}
      </section>

      {/* Lista pozicija */}
      <ul className={styles.karriere__list}>
        {stellen.length > 0 ? (
          stellen.map((s) => (
            <li key={s.id} className={styles.karriere__item}>
              <div className={styles.karriere__content}>
                <strong className={styles["karriere__item-title"]}>
                  {s.title}
                </strong>
                <p className={styles["karriere__item-text"]}>{s.description}</p>
              </div>
              <div className={styles.karriere__actions}>
                {/* Edit dugme može biti kasnije implementirano */}
                <button
                  className={styles["karriere__delete"]}
                  onClick={() => remove(s.id)}
                >
                  Löschen
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className={styles.karriere__empty}>Keine Positionen gefunden.</p>
        )}
      </ul>
    </main>
  );
}
