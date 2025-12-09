/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.scss";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  is_top: boolean;
  image_url: string;
  published_at: string;
}

export default function AdminNewsPage() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isTop, setIsTop] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [newsList, setNewsList] = useState<NewsItem[]>([]);

  // --- fetch trenutnih vesti ---
  const fetchNews = async () => {
    try {
      const res = await fetch("/api/news", { method: "GET", cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      const combined: NewsItem[] = [];
      if (data.top) combined.push(data.top);
      if (data.others) combined.push(...data.others);
       
      combined.sort((_a, b) => 0); // ostali po redu iz baze
      setNewsList(combined);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // --- dodavanje nove vesti ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, excerpt, content, imageUrl, isTop }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Nachricht erfolgreich hinzugefügt!");
        setTitle(""); setExcerpt(""); setContent(""); setImageUrl(""); setIsTop(false);
        fetchNews();
      } else {
        setMessage("Fehler: " + data.error);
      }
    } catch (err) {
      setMessage("Fehler bei der Verbindung mit dem Server.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // --- brisanje vesti ---
  const handleDelete = async (id: string) => {
    if (!confirm("Willst du diese Nachricht wirklich löschen?")) return;

    try {
      const res = await fetch(`/api/news?id=${id}`, { method: "DELETE" });
      if (res.ok) fetchNews();
      else {
        const data = await res.json();
        alert("Fehler beim Löschen: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Fehler beim Löschen der Nachricht");
    }
  };

  // --- promena top vesti ---
  const toggleTop = async (id: string, _is_top: boolean) => {
    try {
      const res = await fetch("/api/news", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "set_top", id }),
      });
      if (res.ok) fetchNews();
      else {
        const data = await res.json();
        alert("Fehler beim Aktualisieren: " + data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Neue Nachricht hinzufügen</h1>

      {message && <div className={styles.message}>{message}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label htmlFor="title">Titel</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div>
          <label htmlFor="excerpt">Kurze Beschreibung</label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            required
            className={styles.textarea}
          />
        </div>

        <div>
          <label htmlFor="content">Inhalt</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={6}
            className={styles.textarea}
          />
        </div>

        <div>
          <label htmlFor="imageUrl">Bild-URL</label>
          <input
            id="imageUrl"
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.checkboxWrapper}>
          <input
            type="checkbox"
            checked={isTop}
            onChange={(e) => setIsTop(e.target.checked)}
            id="isTop"
          />
          <label htmlFor="isTop">Als Top-Nachricht markieren (Hero)</label>
        </div>

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Bitte warten..." : "Nachricht hinzufügen"}
        </button>
      </form>

      <h2 className={styles.subtitle}>Aktuelle Nachrichten</h2>
      <div className={styles.newsList}>
        {newsList.map((news) => (
          <div key={news.id} className={styles.newsItem}>
            <div className={styles.newsContent}>
              {news.image_url && (
                <Image
                  src={news.image_url}
                  alt={news.title}
                  width={80}
                  height={80}
                  className={styles.newsImage}
                />
              )}
              <div>
                <strong>{news.title}</strong>
                {news.is_top && <span className={styles.topBadge}>TOP</span>}
                <p>{news.excerpt}</p>
              </div>
            </div>
            <div className={styles.actions}>
              <button className={styles.topButton} onClick={() => toggleTop(news.id, news.is_top)}>
                {news.is_top ? "Top entfernen" : "Als Top setzen"}
              </button>
              <button className={styles.deleteButton} onClick={() => handleDelete(news.id)}>Löschen</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
