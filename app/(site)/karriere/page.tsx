import Hero from "./components/Hero/Hero";
import Vorteile from "./components/Vorteile/Vorteile";
import Bewerbungsprozess from "./components/Bewerbungsprozess/Bewerbungsprozess";
import OffeneStellen from "./components/OffeneStellen/OffeneStellen";
import CTA from "./components/CTA/CTA";
import styles from "./page.module.scss";

export const metadata = {
  title: "Karriere | Jokić Mont",
  description: "Entdecken Sie Karrierechancen bei Jokić Mont im Bau- und Renovierungsbereich in Deutschland.",
  alternates: {
    canonical: "https://www.jokic-mont.de/karriere",
  },
};

export default function KarrierePage() {
  return (
    <main className={styles?.karriere || ""}>
      <Hero />
      <Vorteile />
      <Bewerbungsprozess />
      <OffeneStellen />
      <CTA />
    </main>
  );
}
