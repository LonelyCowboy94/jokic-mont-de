import styles from "./NetzwerkSection.module.scss";
import Image from "next/image";

const NetzwerkSection = () => {
  return (
    <section className={styles.netzwerkSection}>
        <div className={styles.netzwerkSection__textContent}>
            <h3>Unser Netzwerk. Ihr Vorteil.</h3>
      <h4>
        Ein starkes Partner-Netzwerk und exzellente Lieferantenbeziehungen
      </h4>
      <p>
        <span className="indent"></span>-Unser Fachnetzwerk ermöglicht uns, auch komplexe und unvorhergesehene
        Herausforderungen schnell zu lösen
      </p>
      <p><span className="indent"></span>-Durch regionale und etablierte
        Lieferanten sichern wir eine schnelle Materialverfügbarkeit</p>
        </div>
      
      <div className={styles.netzwerkSection__imageWrapper}>
        <Image
  src="https://jdmw.de/wp-content/uploads/go-x/u/23eff32b-1377-4c1c-b531-2d6e27fbac72/l0,t0,w960,h960/image-320x320.jpg"
  alt="Director-img"
  fill
  style={{ objectFit: "cover" }}
  sizes="
    (max-width: 480px) 50px,
    (max-width: 768px) 80px,
    (max-width: 1200px) 120px,
    150px
  "
/>
      </div>
    </section>
  );
};

export default NetzwerkSection;
