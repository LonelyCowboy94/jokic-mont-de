import Link from "next/link";
import styles from "./OffeneStellen.module.scss";
import { getPositions, Position } from "@/lib/karriere";

export const revalidate = 0; 

export default async function OffeneStellen() {
  const rows = await getPositions();

  const positions: Position[] = rows.map((r) => ({
    id: r.id,
    title: r.title,
    description: r.description,
    created_at: r.created_at?.toISOString(),
  }));

  return (
    <section className={styles.stellen}>
      <h2 className={styles["stellen__title"]}>Aktuelle Stellenangebote</h2>

      <div className={styles["stellen__grid"]}>
        {positions.length > 0 ? (
          positions.map((p) => (
            <div className={styles["stellen__card"]} key={p.id}>
              <h3 className={styles["stellen__card-title"]}>{p.title}</h3>
              <p className={styles["stellen__card-text"]}>{p.description}</p>
              <Link className={styles["stellen__btn"]} href="/kontakt">
                Jetzt Bewerben
              </Link>
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
