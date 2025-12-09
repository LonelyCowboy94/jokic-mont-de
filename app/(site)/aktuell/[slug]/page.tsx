"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.scss";

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

export default function NewsDetailPage() {
  const { slug } = useParams();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(`/api/news?slug=${slug}`);
        const data = await res.json();
        setNews(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, [slug]);

  if (loading) return <p className={styles.loading}>Lädt...</p>;
  if (!news) return <p className={styles.notFound}>Nachricht nicht gefunden</p>;

  return (
    <div className={styles.container}>
      {news.image_url && (
        <Image
          src={news.image_url || "/default-news.jpg"}
          alt={news.title}
          width={800}
          height={600}
          className={styles.image}
        />
      )}
      <h1 className={styles.title}>{news.title}</h1>
      <p className={styles.excerpt}>{news.excerpt}</p>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: news.content }}
      ></div>
    </div>
  );
}
