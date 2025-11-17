import NetzwerkSection from "@/components/sections/LeistungenPage/NetzwerkSection";
import styles from "./page.module.scss";
import LeistungenGalery from "@/components/sections/LeistungenPage/LeistungenGalery";
import Footer from "@/components/layout/Footer/Footer";

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
