import HeroSection from "@/components/sections/HeroSection";
import styles from "./page.module.scss";
import HandwerkOnlineSection from "@/components/sections/HandwerkOnlineSection";
import LeistungenSection from "@/components/sections/LeistungenSection";
// import OnlineTermineSection from "@/components/sections/OnlineTermineSection";
import ContactSection from "@/components/sections/ContactSection";
import dynamic from "next/dynamic";
import Footer from "@/components/layout/Footer/Footer";


const OnlineTermineSection = dynamic(() => import("@/components/sections/OnlineTermineSection"), {
  ssr: true,
});

export default function Home() {
  return (
    <main className={styles.homePage}>
      <HeroSection />
      <HandwerkOnlineSection />
      <LeistungenSection />
      <OnlineTermineSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
