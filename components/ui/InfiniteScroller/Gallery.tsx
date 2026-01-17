"use client";

import { useState } from "react";
import Column from "./Column";
import Modal from "./Modal";
import { CardItem } from "./types";
import styles from "./Gallery.module.scss";

const allItems: CardItem[] = [
  { 
    id: 1, 
    image: "https://jdmw.de/wp-content/uploads/go-x/u/6c568620-e48f-47c8-949b-ceee8c9080ac/l0,t500,w1500,h1000/image-960x640.jpg", 
    title: "Innenausbau", 
    text: [
      "Trockenbau / Vorsatzschalen / GIS Systeme / Decken / Trennwände",
      "Deckenpaneele / Unterkonstruktion / Deckenleisten",
      "Fliesenlegen / Wand- und Bodenfliesen",
      "Malerarbeiten / Wand und Decke / Innen- und Aussen / Tapezierarbeiten / Spachtelarbeiten",
      "Putzarbeiten / bis ca. 30m2",
      "Maurerarbeiten / Trennwände bis ca. 30m2",
      "Bodenlegerarbeiten / Vinyl- und Laminatboden / Fußbodenleisten / Trittschalldämmung",
      "Montagearbeiten / Zimmertüren / Haustechnik / Kabelkanäle / Leerrohre / Endmontage",
      "Estricharbeiten / bis ca. 15m2",
    ] 
  },
  { 
    id: 2, 
    image: "https://jdmw.de/wp-content/uploads/go-x/u/0f111196-958c-41c4-9f29-9c83766c39bc/l0,t1001,w1500,h999/image-960x639.jpg", 
    title: "Abbrucharbeiten", 
    text: [
      "Stemmarbeiten / Beton / Putz / Mauerwerk",
      "Demontagearbeiten / Rückbau",
    ] 
  },
  { 
    id: 3, 
    image: "https://jdmw.de/wp-content/uploads/go-x/u/a6166813-9c5e-4365-a8ae-4810eaa71dfa/l0,t62,w1500,h999/image-960x639.jpg", 
    title: "Garten- und Außenanlagen", 
    text: [
      "Zaunmontage / Doppelstabmattenzaun mit Zub.",
      "Fundamente / Betonieren / Aushubarbeiten",
      "Pflasterarbeiten / Pflaster bis ca. 30m2 / Randsteine",
      "Montagearbeiten / Terrassenüberdachung / Vordach / Garagentor / Nebeneingangstür",
      "Minibaggerarbeiten",
      "Terrassen / Holz / WPC",
      "Carport Montage",
      "Montagearbeiten / Gartenhaus / Gerätehaus",
    ] 
  },
  { 
    id: 4, 
    image: "https://jdmw.de/wp-content/uploads/go-x/u/b494af90-b2c0-4f1f-b6ea-22735dd52419/l0,t500,w1500,h999/image-960x639.jpg", 
    title: "Montagearbeiten", 
    text: [
      "Küchenmontage / Gebrauchte Küchen / Umbau",
      "Möbelaufbau",
      "Weitere Montagearbeiten auf Anfrage",
    ] 
  },
  { 
    id: 5, 
    image: "https://jdmw.de/wp-content/uploads/go-x/u/4c3a0243-8fa4-4a4c-a6b4-6ebba469ac99/l0,t7,w1632,h1087/image-960x639.png", 
    title: "Hausmeisterservice", 
    text: [
      "Wartung und Instandhaltung / Haustechnik",
      "Überwachung und Kontrolle",
      "Müllentsorgung",
      "Kleintransporte",
      "Kleinreparaturen",
      "Organisation und Verwaltung",
      "Behebung von Störungen",
      "Bereitschaftsdienst",
      "Online Termine",
    ] 
  },
  { 
    id: 6, 
    image: "https://jdmw.de/wp-content/uploads/go-x/u/6b24b4a9-99b6-4af0-a42b-aa6b95a890b2/l0,t978,w1500,h999/image-960x639.jpg", 
    title: "Materialbeschaffung und Lieferung", 
    text: [
      "Bei uns finden Sie alles was Sie für Ihr Bauprojekt benötigen",
      "Schnell und Zuverlässig / Ihre Materialien, pünktlich geliefert",
    ] 
  },
  { 
    id: 7, 
    image: "https://jdmw.de/wp-content/uploads/go-x/u/94269294-e276-4934-a906-52696e1b3df8/l0,t916,w1500,h999/image-960x639.jpg", 
    title: "Entsorgung", 
    text: [
      "Umweltfreundliche Entsorgung",
      "Alles aus einer Hand / von der Abholung bis zur Entsorgung",
    ] 
  },
  { 
    id: 8, 
    image: "https://jdmw.de/wp-content/uploads/go-x/u/02d0a26a-5edc-4150-9fab-fa987aa8e86a/l0,t116,w750,h500/image.jpg", 
    title: "Beratung und Planung", 
    text: [
      "Individuelle Beratung / Wir finden die passenden Lösungen für Ihr Projekt",
      "Transparenz und Zuverlässigkeit",
      "Kostenoptimierung durch Erfahrung und Technik",
    ] 
  },
  { 
    id: 9, 
    image: "https://jdmw.de/wp-content/uploads/go-x/u/8667397c-69a6-47b2-b572-14ae106ff00e/l0,t1001,w1500,h999/image-960x639.jpg", 
    title: "Montagearbeiten / SHK", 
    text: [] 
  },
  { 
    id: 10, 
    image: "https://jdmw.de/wp-content/uploads/go-x/u/ee45c633-9b5e-42cb-9b3e-2ad04d790ca7/l0,t500,w1500,h999/image-960x639.jpg", 
    title: "Montagearbeiten / Elektroinstallationen", 
    text: [] 
  },
  { 
    id: 11, 
    image: "https://jdmw.de/wp-content/uploads/go-x/u/be088e77-6728-453b-9b89-3c9c620957d7/l0,t678,w1500,h999/image-960x639.jpg", 
    title: "Montagearbeiten / Betonbauarbeiten", 
    text: [] 
  },
  { 
    id: 12, 
    image: "https://jdmw.de/wp-content/uploads/go-x/u/ced68365-d9bd-4eaf-9ca4-63725c0d656b/l0,t384,w1500,h999/image-960x639.jpg", 
    title: "Netzwerk / NAS / Haustechnik / Webdesign", 
    text: [] 
  },
];


const col1 = allItems.slice(0, 3);
const col2 = allItems.slice(3, 6);
const col3 = allItems.slice(6, 9);
const col4 = allItems.slice(9, 12);

export default function Gallery() {
  const [activeCard, setActiveCard] = useState<CardItem | null>(null);

  return (
    <section>
    <div className={styles.gallery}>
      <Column items={col1} direction="up" speed={35} setActiveCard={setActiveCard} />
      <Column items={col2} direction="down" speed={20} setActiveCard={setActiveCard} />
      <Column items={col3} direction="up" speed={20} setActiveCard={setActiveCard} />
      <Column items={col4} direction="down" speed={35} setActiveCard={setActiveCard} />
     
      {activeCard && <Modal card={activeCard} setActiveCard={setActiveCard} />}
    
    </div>
    <div className={styles.gallerySmall}>
    <Column items={[...col1, ...col2]} direction="down" speed={30} setActiveCard={setActiveCard} />
    <Column items={[...col3, ...col4]} direction="up" speed={35} setActiveCard={setActiveCard} />
    {activeCard && <Modal card={activeCard} setActiveCard={setActiveCard} />}
    </div>
    </section>
  );
}
