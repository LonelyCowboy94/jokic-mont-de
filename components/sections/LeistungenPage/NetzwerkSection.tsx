import styles from "./NetzwerkSection.module.scss";

const NetzwerkSection = () => {
  return (
    <section className={styles.netzwerkSection}>
  <div className={styles.netzwerkSection__textContent}>
    <h3>Unser Netzwerk. Ihr Vorteil.</h3>
    <h4>Kompetente Partner. Verlässliche Lösungen. Effiziente Abläufe.</h4>

    <p>
      <span className="indent"></span>
      Durch unser breit aufgestelltes Partner-Netzwerk bündeln wir Fachkompetenz
      aus nahezu allen relevanten Bereichen der Bau- und Handwerksbranche.
      Elektriker, Installateure, Spezialisten für Rohbau, Schalung, Beton und
      Armierung – gemeinsam sorgen wir für professionelle Ausführung und
      höchste Zuverlässigkeit, selbst bei anspruchsvollen Projekten.
    </p>

    <p>
      <span className="indent"></span>
      Dank unserer engen Zusammenarbeit mit regionalen und etablierten
      Lieferanten gewährleisten wir schnelle Materialverfügbarkeit und
      reibungslose Abläufe auf der Baustelle. Kurze Wege, klare Kommunikation
      und verbindliche Termine bilden die Grundlage für effiziente Umsetzung
      ohne unnötige Wartezeiten.
    </p>

    <p>
      <span className="indent"></span>
      Zusätzlich profitieren Sie von unserem digitalen Know-how: Professionelle
      Webentwicklung, moderne IT-Lösungen und präzises Netzwerk-Management für
      Bauunternehmen ermöglichen eine sichere, transparente und optimal
      organisierte Projektabwicklung – von der Planung bis zur Fertigstellung.
    </p>

    <p>
      <span className="indent"></span>
      Mit einem starken Netzwerk, soliden Partnerschaften und einem klaren
      Qualitätsanspruch bieten wir Ihnen ein Rundum-Paket, auf das Sie sich
      jederzeit verlassen können. Präzise geplant, sauber ausgeführt,
      termingerecht geliefert – genau so, wie man es im deutschen Handwerk
      erwartet.
    </p>
  </div>
</section>
  );
};

export default NetzwerkSection;
