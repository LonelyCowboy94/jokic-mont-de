import { headers } from "next/headers";
import styles from "./OffeneStellen.module.scss";

type Stelle = {
  id: string;
  title: string;
  description: string;
};

async function getBaseUrl() {
  const h = await headers(); 
  const host = h.get("host");

  if (!host) {
    return "http://localhost:3000";
  }

  const protocol = host.includes("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
}


async function getStellen(): Promise<Stelle[]> {
  const baseUrl = await getBaseUrl();

  const res = await fetch(`${baseUrl}/api/karriere`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch stellen");
  }

  return res.json();
}

export default async function KarriereAdminPage() {
  const stellen = await getStellen();


  return (
    <section className={styles.stellen}>
      <h2 className={styles["stellen__title"]}>Aktuelle Stellenangebote</h2>

      <div className={styles["stellen__grid"]}>
         {stellen.length > 0 ? (
          stellen.map((p) => (
            <div className={styles["stellen__card"]} key={p.id}>
              <h3 className={styles["stellen__card-title"]}>{p.title}</h3>
              <p className={styles["stellen__card-text"]}>{p.description}</p>
            </div>
          ))
        ) : (
          <p className={styles.stellen_empty}>
            Zurzeit haben wir keine offenen Stellenangebote.
          </p>
        )}
      </div>
    </section>
  );
}
