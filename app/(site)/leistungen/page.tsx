import NetzwerkSection from "@/components/sections/LeistungenPage/NetzwerkSection";
import styles from "./page.module.scss";
import LeistungenGalery from "@/components/sections/LeistungenPage/LeistungenGalery";
import Footer from "@/components/layout/Footer/Footer";

export const metadata = {
  title: "Leistungen | Jokić Mont",
  description: "Unsere Leistungen im Bereich Bau, Renovierung und Handwerk.",
  alternates: {
    canonical: "https://www.jokic-mont.de/leistungen",
  },
};

const page = () => {
  return (
    <main className={styles.leistungen}>
      <LeistungenGalery />
      <NetzwerkSection />
      <Footer />
    </main>
  );
};

export default page;
