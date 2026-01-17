import styles from "./OffeneStellen.module.scss";
import { sql } from "@/lib/db";

export type Position = {
  id: string;
  title: string;
  description: string;
};

export async function getPositions(): Promise<Position[]> {
  const rows = await sql`
    SELECT id, title, description
    FROM offene_stellen
    ORDER BY created_at DESC
  `;

  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    description: r.description,
  }));
}

export default async function OffeneStellen() {
  const positions = await getPositions();

  return (
    <section className={styles.stellen}>
      <h2 className={styles["stellen__title"]}>Aktuelle Stellenangebote</h2>

      <div className={styles["stellen__grid"]}>
        {positions.length > 0 ? (
          positions.map((p) => (
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
