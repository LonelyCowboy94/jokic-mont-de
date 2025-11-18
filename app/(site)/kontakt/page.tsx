import ContactSection from "@/components/sections/HomePage/ContactSection";
import Footer from "@/components/layout/Footer/Footer";
import OnlineTermineSection from "@/components/sections/HomePage/OnlineTermineSection";
import styles from "./page.module.scss"; 

export const metadata = {
  title: "Kontakt | Jokić Mont",
  description: "Kontaktieren Sie Jokić Mont für Bau- und Renovierungsdienstleistungen in Deutschland.",
  alternates: {
    canonical: "https://www.jokic-mont.de/kontakt",
  },
};

const page = () => {
  return (
    <main className={styles?.contact || ""}>
      <ContactSection />
      <OnlineTermineSection />
      <Footer />
    </main>
  );
};

export default page;
