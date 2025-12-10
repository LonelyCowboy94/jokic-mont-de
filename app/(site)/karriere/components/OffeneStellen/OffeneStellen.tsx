import Link from "next/link";
import styles from "./OffeneStellen.module.scss";

export interface Position {
  id: string;           
  title: string;       
  description: string;  
  created_at?: string;  
}

async function loadPositions() {
  const res = await fetch("http://localhost:3000/api/karriere", { cache: "no-store" });

  return res.json();
}

export default async function OffeneStellen() {
  const positions = await loadPositions();

  return (
    <section className={styles.stellen}>
      <h2 className={styles["stellen__title"]}>Aktuelle Stellenangebote</h2>

      <div className={styles["stellen__grid"]}>
  {positions && positions.length > 0 ? (
    positions.map((p: Position) => (
      <div className={styles["stellen__card"]} key={p.id}>
        <h3 className={styles["stellen__card-title"]}>{p.title}</h3>
        <p className={styles["stellen__card-text"]}>{p.description}</p>
        <Link href="/kontakt" className={styles["stellen__btn"]}>
          Jetzt Bewerben
        </Link>
      </div>
    ))
  ) : (
    <p className={styles.stellen_empty}>Zurzeit haben wir keine offenen Stellenangebote.</p>

  )}
</div>
    </section>
  );
}
