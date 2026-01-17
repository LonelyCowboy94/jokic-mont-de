import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import styles from "./page.module.scss";

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

async function createStelle(formData: FormData) {
  "use server";

  const title = formData.get("title");
  const description = formData.get("description");
  if (!title || !description) return;

  const baseUrl = await getBaseUrl();

  await fetch(`${baseUrl}/api/karriere`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description }),
  });

  revalidatePath("/admin/karriere");
}

async function deleteStelle(formData: FormData) {
  "use server";

  const id = formData.get("id");
  if (!id) return;

  const baseUrl = await getBaseUrl();

  await fetch(`${baseUrl}/api/karriere?id=${id}`, {
    method: "DELETE",
  });

  revalidatePath("/admin/karriere");
}

export default async function KarriereAdminPage() {
  const stellen = await getStellen();

  return (
    <main className={styles.karriere}>
      <h1 className={styles.title}>Offene Stellen verwalten</h1>

      <form action={createStelle} className={styles.form}>
        <input
          name="title"
          placeholder="Titel"
          required
          className={styles.input}
        />
        <textarea
          name="description"
          placeholder="Beschreibung"
          required
          className={styles.textarea}
        />
        <button className={styles.button}>Stelle hinzufügen</button>
      </form>

      <ul className={styles.list}>
        {stellen.length > 0 ? (
          stellen.map((stelle) => (
            <li key={stelle.id} className={styles.item}>
              <div className={styles.itemContent}>
                <h3 className={styles.itemTitle}>{stelle.title}</h3>
                <p className={styles.itemText}>{stelle.description}</p>
              </div>

              <form action={deleteStelle}>
                <input type="hidden" name="id" value={stelle.id} />
                <button className={styles.deleteButton}>Löschen</button>
              </form>
            </li>
          ))
        ) : (
          <p>Keine Positionen gefunden.</p>
        )}
      </ul>
    </main>
  );
}
