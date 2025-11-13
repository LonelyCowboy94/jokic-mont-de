import HeroSection from "@/components/sections/HeroSection";
import styles from "./page.module.scss";
import HandwerkOnlineSection from "@/components/sections/HandwerkOnlineSection";
import LeistungenSection from "@/components/sections/LeistungenSection";
import OnlineTermineSection from "@/components/sections/OnlineTermineSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main className={styles.homePage}>
      <HeroSection />
      <HandwerkOnlineSection />
      <LeistungenSection />
      <OnlineTermineSection />
      <ContactSection />
    </main>
  );
}
