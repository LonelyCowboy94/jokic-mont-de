import styles from "./Hero.module.scss";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles["hero__content"]}>
        <h1 className={styles["hero__title"]}>Karriere bei Jokić Mont</h1>
        <p className={styles["hero__subtitle"]}>
          Werden Sie Teil eines starken Teams in einem modernen, digitalisierten Bauunternehmen.
        </p>
      </div>
    </section>
  );
};

export default Hero;
