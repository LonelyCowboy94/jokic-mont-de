"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./Gallery.module.scss";
import { CardItem } from "./types";

interface ColumnProps {
  items: CardItem[];
  direction: "up" | "down";
  speed: number; 
  setActiveCard: (card: CardItem | null) => void;
}

export default function Column({
  items,
  direction,
  speed,
  setActiveCard,
}: ColumnProps) {
  const [isPaused, setIsPaused] = useState(false);

  
 const [loopItems] = useState(() => {
  const offsets = items.map(() => Math.random() * 40 - 20); 
  return [...items, ...items, ...items].map((item, i) => ({
    ...item,
    offset: offsets[i % offsets.length],
  }));
});

  const itemHeight = 300; 
  const totalHeight = itemHeight * items.length;

  const animateY = direction === "up" ? [0, -totalHeight] : [-totalHeight, 0];

  return (
    <div
      className={styles.gallery__column}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        className={styles.gallery__columnInner}
        animate={{ y: animateY }}
        transition={{
          y: {
            repeat: Infinity,
            repeatType: "loop",
            duration: totalHeight / speed,
            ease: "linear" as const,
          },
        }}
        style={{ y: 0 }}
        {...(isPaused ? { animate: { y: animateY[0] } } : {})}
      >
        {loopItems.map((item, index) => (
          <div
            key={item.id + "-" + item.offset + index}
            className={styles.gallery__card}
            style={{ transform: `translateX(0.1px)`, marginBottom: 0 }}
            onClick={() => setActiveCard(item)}
          >
            <Image
  src={item.image}
  alt={item.title}
  fill
  style={{ objectFit: "cover" }}
  className={styles.gallery__cardImage}
  sizes="
    (max-width: 480px) 100vw,
    (max-width: 768px) 50vw,
    (max-width: 1200px) 33vw,
    25vw
  "
  loading="eager"
/>
            <h2 className={styles.gallery__cardTitle}>{item.title}</h2>
            <p className={styles.gallery__cardText}>{item.text}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
