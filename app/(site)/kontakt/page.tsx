import ContactSection from "@/components/sections/HomePage/ContactSection";
import Footer from "@/components/layout/Footer/Footer";
import OnlineTermineSection from "@/components/sections/HomePage/OnlineTermineSection";

const page = () => {
  return (
    <main>
      <ContactSection />
      <OnlineTermineSection />
      <Footer />
    </main>
  );
};

export default page;
