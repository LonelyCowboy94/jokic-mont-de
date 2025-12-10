import { ReactNode } from "react";
import Sidebar from "./Sidebar"; // novi client component
import styles from "./layout.module.scss";

interface Props {
  children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
  return (
    <div className={styles.adminLayout}>
      <Sidebar />

      <main className={styles.adminLayout__main}>
        {children}
      </main>
    </div>
  );
}
