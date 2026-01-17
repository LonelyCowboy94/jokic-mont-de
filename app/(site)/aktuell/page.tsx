"use client"; // ovo je ključno!

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/layout/Footer/Footer";

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  is_top: boolean;
  published_at: string;
}

export default function AktuellPage() {
  const [topNews, setTopNews] = useState<NewsItem | null>(null);
  const [others, setOthers] = useState<NewsItem[]>([]);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("/api/news", { method: "GET" }); // dodaj eksplicitno GET
        if (!res.ok) {
          console.error("Fehler beim Laden der Nachrichten", res.status);
          return;
        }
        const data = await res.json();
        setTopNews(data.top ?? null);
        setOthers(data.others ?? []);
      } catch (err) {
        console.error("Fehler beim Fetch:", err);
      }
    }
    fetchNews();
  }, []);

  return (
    <>
      
        <div className={styles.container}>
          <div className={styles.container__wrapper}>
          {topNews && (
            <div className={styles.hero}>
              <Image
                src={topNews.image_url}
                alt={topNews.title}
                width={1200}
                height={500}
                className="object-cover w-full h-full"
              />
              <div className={styles.heroOverlay}>
                <h1 className={styles.heroTitle}>{topNews.title}</h1>
                <p className={styles.heroExcerpt}>{topNews.excerpt}</p>
                <Link
                  href={`/aktuell/${topNews.slug}`}
                  className={styles.cardButton}
                >
                  Mehr lesen →
                </Link>
              </div>
            </div>
          )}

          <div className={styles.newsGrid}>
            {others.map((news) => (
              <Link
                key={news.id}
                href={`/aktuell/${news.slug}`}
                className={styles.card}
              >
                <Image
                  src={news.image_url}
                  alt={news.title}
                  width={400}
                  height={180}
                  className={styles.cardImage}
                />
                <div className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>{news.title}</h2>
                  <p className={styles.cardExcerpt}>{news.excerpt}</p>
                  <span className={styles.cardButton}>Mehr lesen →</span>
                </div>
              </Link>
            ))}
          </div>
          </div>
        </div>
      
      <Footer />
    </>
  );
}
