import styles from "./AdminTable.module.scss";
import { revalidatePath } from "next/cache";
import { sql } from "@/lib/db";

// === TYPE
export type Appointment = {
  id: string;
  name: string;
  email: string;
  note: string;
  date: string;
  time: string;
  confirmed: boolean;
  created_at: string;
};

// === FETCH SERVER-SIDE
export async function getAppointments(): Promise<Appointment[]> {
  const rows = await sql`
    SELECT id, name, email, note, date, time, confirmed, created_at
    FROM appointments
    ORDER BY date ASC, time ASC
  `;

  return rows.map((a) => ({
    id: a.id,
    name: a.name,
    email: a.email,
    note: a.note || "",
    date: a.date.toISOString(),
    time: a.time,
    confirmed: a.confirmed,
    created_at: a.created_at.toISOString(),
  }));
}

// === SERVER ACTIONS
export async function confirmAppointment(formData: FormData) {
  "use server";

  const id = formData.get("id");
  if (!id || typeof id !== "string") return;

  await sql`
    UPDATE appointments
    SET confirmed = true
    WHERE id = ${id}
  `;

  revalidatePath("/admin/termine");
}

export async function rejectAppointment(formData: FormData) {
  "use server";

  const id = formData.get("id");
  if (!id || typeof id !== "string") return;

  await sql`
    DELETE FROM appointments
    WHERE id = ${id}
  `;

  revalidatePath("/admin/termine");
}

export async function deleteAppointment(formData: FormData) {
  "use server";

  const id = formData.get("id");
  if (!id || typeof id !== "string") return;

  await sql`
    DELETE FROM appointments
    WHERE id = ${id}
  `;

  revalidatePath("/admin/termine");
}

// === SERVER COMPONENT
interface AdminTableProps {
  appointments: Appointment[];
}

export default function AdminTable({ appointments }: AdminTableProps) {
  const waiting = appointments.filter((t) => !t.confirmed);
  const confirmed = appointments.filter((t) => t.confirmed);

  return (
    <div className={styles.adminTableWrapper}>
      <h2 className={styles.title}>Wartende Termine</h2>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Notiz</th>
              <th>Datum</th>
              <th>Uhrzeit</th>
              <th className={styles.action}>Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {waiting.map((t) => (
              <tr key={t.id} className={`${styles.tbodyTr} ${styles.tbodyTrHover}`}>
                <td className={styles.td}>{t.name}</td>
                <td className={styles.td}>{t.email}</td>
                <td className={styles.td}>{t.note || "(Keine Notiz)"}</td>
                <td className={styles.td}>{new Date(t.date).toLocaleDateString("de-DE")}</td>
                <td className={styles.td}>{t.time}</td>
                <td className={`${styles.td} ${styles.action}`}>
                  <div className={styles.actionBtnWrapper}>
                    <form action={confirmAppointment}>
                      <input type="hidden" name="id" value={t.id} />
                      <button className={`${styles.button} ${styles.buttonConfirm}`} type="submit">
                        Bestätigen
                      </button>
                    </form>
                    <form action={rejectAppointment}>
                      <input type="hidden" name="id" value={t.id} />
                      <button className={`${styles.button} ${styles.buttonReject}`} type="submit">
                        Ablehnen
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className={styles.title}>Bestätigte Termine</h2>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Notiz</th>
              <th>Datum</th>
              <th>Uhrzeit</th>
              <th>Löschen</th>
            </tr>
          </thead>
          <tbody>
            {confirmed.map((t) => (
              <tr key={t.id} className={`${styles.tbodyTr} ${styles.tbodyTrHover}`}>
                <td className={styles.td}>{t.name}</td>
                <td className={styles.td}>{t.email}</td>
                <td className={styles.td}>{t.note || "(Keine Notiz)"}</td>
                <td className={styles.td}>{new Date(t.date).toLocaleDateString("de-DE")}</td>
                <td className={styles.td}>{t.time}</td>
                <td className={styles.td}>
                  <form action={deleteAppointment}>
                    <input type="hidden" name="id" value={t.id} />
                    <button className={`${styles.button} ${styles.buttonDelete}`} type="submit">
                      Löschen
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
