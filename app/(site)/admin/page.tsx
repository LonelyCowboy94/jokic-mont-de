"use server";

import { getData, getAppointments, getNews } from "@/app/actions";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Appointment, NewsItem } from "@/types";
import Image from "next/image";
import styles from "./page.module.scss";

export default async function AdminPage() {
  const session = (await cookies()).get("session")?.value;
  if (!session) redirect("/login");

  const users = await getData();
  const appointments: Appointment[] = await getAppointments();
  const news: NewsItem[] = await getNews();

  const waiting = appointments.filter((t) => !t.confirmed);
  const confirmed = appointments.filter((t) => t.confirmed);
  const last3Waiting = waiting.slice(-3);
  const lastNews = news.slice(-1);

  return (
    <div className={styles.adminPanel}>
      {/* --- Header --- */}
      <div className={styles.adminPanel__header}>
        <h1>Welcome back {users?.[0]?.name || "User"}</h1>
        <p>Your dashboard overview</p>
      </div>

      {/* --- Dashboard cards --- */}
      <div className={styles.adminPanel__cards}>
        {/* Quick Stats */}
        <div className={styles.card}>
          <h3>Quick Stats</h3>
          <p>Total Appointments: <strong>{appointments.length}</strong></p>
          <p>Waiting: <strong>{waiting.length}</strong></p>
          <p>Confirmed: <strong>{confirmed.length}</strong></p>
        </div>

        {/* Last waiting appointments */}
        {last3Waiting.length > 0 && (
          <div className={styles.card}>
            <h3>Neue Termine</h3>
            {last3Waiting.map((t) => (
              <div key={t.id} className={styles.cardItem}>
                <p><strong>Name:</strong> {t.name}</p>
                <p><strong>Note:</strong> {t.note.slice(0, 100)}...</p>
                <p><strong>Date:</strong> {t.date.toLocaleDateString()}</p>
                <p><strong>Time:</strong> {t.time} Uhr</p>
              </div>
            ))}
            <div className="cardFooter">
              <a href="/admin/termine">View All</a>
            </div>
          </div>
        )}

        {/* Confirmed appointments */}
        <div className={styles.card}>
          <h3>Bestätigte Termine</h3>
          <p>{confirmed.length} Termine bestätigt</p>
          <div className="cardFooter">
            <a href="/admin/termine">View All</a>
          </div>
        </div>

        {/* Last News */}
        {lastNews.length > 0 && (
          <div className={styles.card}>
            <h3>Letzte Neuigkeit</h3>
            <div className={styles.cardItem}>
              <p><strong>Titel:</strong> {lastNews[0].title}</p>
              <p><strong>Inhalt:</strong> {lastNews[0].content.slice(0, 120)}...</p>
              {lastNews[0].image_url && (
                <Image
                  src={lastNews[0].image_url}
                  alt={lastNews[0].title}
                  width={290}
                  height={200}
                  style={{ borderRadius: "12px", objectFit: "cover" }}
                />
              )}
            </div>
            <div className="cardFooter">
              <a href="/admin/aktuell">View All News</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
