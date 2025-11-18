import Hero from "./components/Hero/Hero";
import Vorteile from "./components/Vorteile/Vorteile";
import Bewerbungsprozess from "./components/Bewerbungsprozess/Bewerbungsprozess";
import OffeneStellen from "./components/OffeneStellen/OffeneStellen";
import CTA from "./components/CTA/CTA";

export default function KarrierePage() {
  return (
    <>
      <Hero />
      <Vorteile />
      <Bewerbungsprozess />
      <OffeneStellen />
      <CTA />
    </>
  );
}
