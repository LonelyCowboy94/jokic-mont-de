"use server";

import { getData, getAppointments } from "@/app/actions";
import { getNews } from "@/app/actions";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Appointment, NewsItem } from "@/types";
import Image from "next/image";
import styles from "./page.module.scss";

export default async function AdminPage() {
  // --- proveri session ---
  const session = (await cookies()).get("session")?.value;
  if (!session) redirect("/login");

  // --- fetch podaci ---
  const users = await getData();
  const appointments: Appointment[] = await getAppointments();
  const news: NewsItem[] = await getNews();

  // --- filter waiting i confirmed ---
  const waiting = appointments.filter((t) => !t.confirmed);
  const confirmed = appointments.filter((t) => t.confirmed);

  // --- poslednja 3 waiting termina ---
  const last3Waiting = waiting
    .slice()
    // sort po nekom atributu (timestamp ili createdAt)
    // ako nema timestamp, pazi da ID nije UUID jer ne može da sortira
    // .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(-3);

  // --- poslednja aktuelnost / novost ---
 const lastNews = news.slice(-1); // poslednja novost
if (lastNews[0]) {
  console.log("Last news image url:", lastNews[0].image_url);
}
  return (
    <div className={styles.adminPanel}>
      {/* --- Header --- */}
      <div className={styles.adminPanel__header}>
        <h1>Welcome back {users?.[0]?.name || "User"}</h1>
      </div>

      {/* --- Dashboard cards container --- */}
      <div className={styles.adminPanel__cards}>
        <div className={styles.card}>
          <h3>Quick Stats</h3>
          <p>Total Appointments: {appointments.length}</p>
          <p>Waiting: {waiting.length}</p>
          <p>Confirmed: {confirmed.length}</p>
        </div>

        {last3Waiting.length > 0 && (
          <div className={styles.card}>
            <h3>Neue Termine</h3>
            {last3Waiting.map((t) => (
              <div key={t.id} className={styles.cardItem}>
                <p>
                  <strong>Name:</strong> {t.name}
                </p>
                <p>
                  <strong>Note:</strong> {t.note.slice(0, 100)} . . .
                </p>
                <p>Date: {t.date.toLocaleDateString()}</p>
                <p>{t.time} Uhr</p>
              </div>
            ))}
          </div>
        )}

        <div className={styles.card}>
          <h3>Bestätigte Termine</h3>
          <p>{confirmed.length} Termine bestätigt</p>
        </div>

       {lastNews.length > 0 && (
  <div className={styles.card}>
    <h3>Letzte Neuigkeit</h3>
    <div className={styles.cardItem}>
      <p>
        <strong>Titel:</strong> {lastNews[0].title}
      </p>
      <p><strong>Inhalt: </strong> {lastNews[0].content.slice(0,120)} . . .</p>

      {/* Render Image samo ako postoji image_url */}
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
  </div>
)}
      </div>
    </div>
  );
}
