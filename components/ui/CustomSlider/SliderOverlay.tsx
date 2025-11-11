'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { OverlayData } from "./Slider"; 
import styles from "./SliderOverlay.module.scss";
import "./SliderOverlay.scss";

type SliderOverlayProps = {
  active: number;
  overlays: OverlayData[];
  enterDelay?: number;  
  exitDelay?: number;   
};

const SliderOverlay = ({
  active,
  overlays,
  enterDelay = 1700,
  exitDelay = 7500,
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
      case "top": return { opacity: 0, y: -50 };
      case "left": return { opacity: 0, x: -50 };
      case "right": return { opacity: 0, x: 50 };
      case "bottom":
      default: return { opacity: 0, y: 50 };
    }
  })();

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key={active}
          className={`${slideOverlay.className} ${styles.overlay}`}  
          initial={initialPos}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={initialPos}
          transition={{ duration: 0.5 }}
          style={{
            position: "absolute",
            color: "#fff",
            zIndex: 20,
            pointerEvents: "none",
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
