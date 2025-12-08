"use server";

import { getData } from "@/app/actions";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import styles from "./page.module.scss";

export default async function AdminPage() {
  // 1. proveri session
  const session = (await cookies()).get("session")?.value;
  if (!session) {
    redirect("/login");
  }

  const users = await getData();

  return (
    <>
      <div className={styles.adminPanel}>
        <div className={styles.adminPanel__header}>
          <h1>Welcome back {users[0].name}</h1>

        </div>
        <div className={styles.adminPanel__panel}>

        </div>
      </div>
    </>
  );
}
