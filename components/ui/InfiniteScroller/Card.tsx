"use client";

import { CardItem } from "./types";
import styles from "./Gallery.module.scss";

interface CardProps {
  item: CardItem;
  setActiveCard: (card: CardItem) => void;
  style?: React.CSSProperties;
}

export default function Card({ item, setActiveCard, style }: CardProps) {
  return (
    <div
      className={styles.gallery__card}
      style={{ backgroundImage: `url(${item.image})`, ...style }}
      onClick={() => setActiveCard(item)}
    >
      <div className={styles.gallery__cardTitle}>{item.title}</div>
    </div>
  );
}
