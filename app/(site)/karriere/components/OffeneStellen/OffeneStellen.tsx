import { revalidatePath } from "next/cache";
import Link from "next/link";
import styles from "./OffeneStellen.module.scss";
import { getPositions, deletePosition, Position } from "@/lib/karriere";

// === SERVER ACTIONS
async function deletePositionAction(formData: FormData) {
  "use server";

  const id = formData.get("id");
  if (!id) return;

  await deletePosition(id.toString());

  revalidatePath("/offene-stellen"); 
}

// === SERVER COMPONENT
export default async function OffeneStellen() {
  const positions = await getPositions();

  return (
    <section className={styles.stellen}>
      <h2 className={styles["stellen__title"]}>Aktuelle Stellenangebote</h2>

      <div className={styles["stellen__grid"]}>
        {positions.length > 0 ? (
          positions.map((p: Position) => (
            <div className={styles["stellen__card"]} key={p.id}>
              <h3 className={styles["stellen__card-title"]}>{p.title}</h3>
              <p className={styles["stellen__card-text"]}>{p.description}</p>

              <form action={deletePositionAction}>
                <input type="hidden" name="id" value={p.id} />
                <button className={styles["stellen__btn-delete"]}>Löschen</button>
              </form>

              <Link className={styles["stellen__btn"]} href="/kontakt">
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
