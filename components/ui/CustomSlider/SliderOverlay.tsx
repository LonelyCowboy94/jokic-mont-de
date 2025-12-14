"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { OverlayData } from "./Slider";
import Link from "next/link";
import styles from "./SliderOverlay.module.scss";

type SliderOverlayProps = {
  active: number;
  enterDelay?: number;
  exitDelay?: number;
  slideDuration: number;
};

const overlays: OverlayData[] = [
  {
    text: (
      <div>
        <p>Handwerk Online</p>
        <p>Bau. Logistik. Handel. Digital Solutions.</p>
      </div>
    ),
    position: { top: "0%", right: "0%" },
    animateFrom: "right",
    className: "overlayFirst",
  },
  {
    text: (
      <div>
        <p>HANDWERK +</p>
        <p>Digital Solutions</p>
        <a href="#handwerk-plus" className={styles.thirdOverlayButton}>
        Mehr erfahren
      </a>
      </div>
    ),
    position: { top: "0%", left: "0%" },
    animateFrom: "left",
    className: "overlaySecond",
  },
  {
    text: (
  
      <div className={styles.overlayContent}>
        <p>
          Unsere Leistungen im Überblick
        </p>
        <p>Fachgerecht, Pünktlich, Sicher</p>
        <Link href="/leistungen" className={styles.thirdOverlayButton}>
        Jetzt Leistungen ansehen
      </Link>
      </div>
      
    
  ),
    position: { top: "0%", left: "0%" },
    animateFrom: "left",
    className: "overlayThird",
  },
  {
    text: (
      
        <div className={styles.overlayContent}>
          <p>
            Online-Termine rund um die Uhr
          </p>
          <p>Ihre Buchung, sofort bestätigt.</p>
          <a href="#termin-vereinbaren" className={styles.fourthOverlayButton}>
          Jetzt Termin buchen
        </a>
        </div>
        
     
    ),
    position: { top: "0%", right: "0%" },
    animateFrom: "right",
    className: "overlayFourth",
  },
  {
    text: (
 
      <div className={styles.overlayContent}>
        <p>
          Gemeinsam stark
        </p>
        <p>
          Lösungen, die Zukunft schaffen
        </p>
        <a href="#kontakt-absenden" className={styles.fifthOverlayButton}> 
        Kontakt aufnehmen
      </a>
      </div>
      
    
  ),
    position: { bottom: "0%", right: "0%" },
    animateFrom: "right",
    className: "overlayFifth",
  },
  {
    text: (
    
      <div className={styles.overlayContent}>
        <p>
          Unser Netzwerk. Ihr Vorteil.
        </p>
        <a href="/leistungen#unser-netzwerk" className={styles.sixthOverlayButton}>
        Mehr erfahren
      </a>
      </div>
      
    
  ),
    position: { top: "0%", left: "0%" },
    animateFrom: "left",
    className: "overlaySixth",
  },
  {
  text: (
    <div className={styles.overlayContent}>
      <p>Aktuell … Online Shop</p>
      <p>
        Coming soon
      </p>
      <a className={styles.seventhOverlayButton}>
        Zum Shop – Coming Soon
      </a>
    </div>
  ),
    position: { top: "0%", left: "0%" },
    animateFrom: "left",
    className: "overlaySeventh",
  },
  {
    text: (
  <div className={styles.overlayContent}>
    <p>Jokić Logistik</p>
    <p>
     Wir liefern
    </p>
    <Link href="#kontakt-absenden" className={styles.fifthOverlayButton}> 
        Kontakt aufnehmen
      </Link>
  </div>
),
    position: { top: "0%", left: "0%" },
    animateFrom: "left",
    className: "overlayEighth",
  },
];

const SliderOverlay = ({
  active,
  slideDuration,
  enterDelay = 1500,
  exitDelay = slideDuration - 1000,
}: SliderOverlayProps) => {
  const slideOverlay = overlays[active % overlays.length];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const enterTimeout = setTimeout(() => setVisible(true), enterDelay);
    const exitTimeout = setTimeout(() => setVisible(false), exitDelay);

    return () => {
      clearTimeout(enterTimeout);
      clearTimeout(exitTimeout);
    };
  }, [active, enterDelay, exitDelay]);

  const initialPos = (() => {
    switch (slideOverlay.animateFrom) {
      case "top":
        return { opacity: 0, y: -80 };
      case "left":
        return { opacity: 0, x: -80 };
      case "right":
        return { opacity: 0, x: 80 };
      case "bottom":
      default:
        return { opacity: 0, y: 80 };
    }
  })();

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key={active}
          className={`${styles.slideOverlay} ${
            styles[slideOverlay.className!]
          }`}
          initial={initialPos}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={initialPos}
          transition={{ duration: 0.8 }}
          style={{
            ...slideOverlay.position,
          }}
        >
          {slideOverlay.text}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SliderOverlay;
