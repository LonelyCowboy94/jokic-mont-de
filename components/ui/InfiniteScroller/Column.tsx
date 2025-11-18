"use client";

import { useState, useRef, useEffect } from "react";
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
  const columnRef = useRef<HTMLDivElement>(null);
  const animationFrame = useRef<number | null>(null);
  const lastTimestamp = useRef<number | null>(null);
  const touchStartY = useRef<number>(0);

  const itemHeight = 300; 
  const totalHeight = itemHeight * items.length;


  const [loopItems] = useState(() => {
    const offsets = items.map(() => Math.random() * 40 - 20);
    return [...items, ...items, ...items].map((item, i) => ({
      ...item,
      offset: offsets[i % offsets.length],
    }));
  });

  
  const initialY = -totalHeight;
  const [manualY, setManualY] = useState<number>(initialY);
  const [isPaused, setIsPaused] = useState(false);

  const animate = (timestamp: number) => {
    if (isPaused) {
      lastTimestamp.current = timestamp;
      animationFrame.current = requestAnimationFrame(animate);
      return;
    }

    if (lastTimestamp.current != null) {
      const delta = timestamp - lastTimestamp.current;
      const deltaPx = (speed * delta) / 1000;

      setManualY((prev) => {
        let next = direction === "up" ? prev - deltaPx : prev + deltaPx;

        // Infinite loop modulo
        next = ((next % totalHeight) + totalHeight) % totalHeight - totalHeight;

        return next;
      });
    }

    lastTimestamp.current = timestamp;
    animationFrame.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    animationFrame.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Wheel scroll 
  useEffect(() => {
    const el = columnRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setIsPaused(true);

      setManualY((prev) => {
        let next = prev + e.deltaY;
        next = ((next % totalHeight) + totalHeight) % totalHeight - totalHeight;
        return next;
      });
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [totalHeight]);

  // Touch scroll 
  useEffect(() => {
    const el = columnRef.current;
    if (!el) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      setIsPaused(true);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY.current - currentY; 

      setManualY((prev) => {
        let next = prev + deltaY;
        next = ((next % totalHeight) + totalHeight) % totalHeight - totalHeight;
        return next;
      });

      touchStartY.current = currentY;
    };

    const handleTouchEnd = () => setIsPaused(false);

    el.addEventListener("touchstart", handleTouchStart, { passive: false });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    el.addEventListener("touchend", handleTouchEnd);
    el.addEventListener("touchcancel", handleTouchEnd);

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
      el.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [totalHeight]);

  return (
    <div
      ref={columnRef}
      className={styles.gallery__column}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        className={styles.gallery__columnInner}
        style={{ y: manualY }}
        transition={{ duration: 0 }}
      >
        {loopItems.map((item, index) => (
          <div
            key={item.id + "-" + item.offset + index}
            className={styles.gallery__card}
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
