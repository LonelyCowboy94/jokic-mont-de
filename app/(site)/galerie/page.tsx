import App from "./components/ui/Carousel";
import styles from "./page.module.scss";

const page = () => {
  return (
    <main>
    <section className={styles.heroSection}>
      <App />
    </section>
    </main>
  )
}

export default page