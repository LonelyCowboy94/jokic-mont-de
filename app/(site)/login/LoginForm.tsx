"use client";
import { loginUser } from "../../actions";
import styles from "./page.module.scss";
import Image from "next/image";

export default function LoginForm() {
  return (
    <>
   
    <div className={styles.loginPage}>
      <form
        className={styles.loginPage__form}
        action={async (formData: FormData) => {
          await loginUser(formData);
        }}
      >
        <label htmlFor="email">Email</label>
        <input name="email" id="email" type="email" autoFocus required />

        <label htmlFor="password">Password</label>
        <input name="password" id="password" type="password" required />

        <button type="submit">Login</button>
      </form>

      <Image className={styles.loginPage__logo} src="/images/logo-white_v2.webp" alt="logo image" width={500} height={500} />
    </div>
    </>
  );
}
