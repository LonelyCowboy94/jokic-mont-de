import Link from "next/link";
import styles from "./OffeneStellen.module.scss";
import { getPositions } from "@/lib/karriere";

export default async function OffeneStellen() {
  const positions = await getPositions();

  return (
    <section className={styles.stellen}>
      <h2 className={styles["stellen__title"]}>Aktuelle Stellenangebote</h2>

      <div className={styles["stellen__grid"]}>
        {positions.length > 0 ? (
          positions.map((p) => (
            <div className={styles["stellen__card"]} key={p.id}>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <Link href="/kontakt">Jetzt Bewerben</Link>
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
