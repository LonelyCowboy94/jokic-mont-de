"use client";

import { motion } from "framer-motion";
import { CardItem } from "./types";
import Image from "next/image";
import styles from "./Modal.module.scss";

interface ModalProps {
  card: CardItem;
  setActiveCard: (card: CardItem | null) => void;
}

export default function Modal({ card, setActiveCard }: ModalProps) {
  return (
    <div className={styles.modal}>
      <motion.div
        className={styles.modal__content}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.6, opacity: 0 }}
      >
        <button
          className={styles.modal__close}
          onClick={() => setActiveCard(null)}
        >
          ×
        </button>

        <div className={styles.modal__body}>
          <div className={styles.modal__imageWrapper}>
            <Image
              src={card.image}
              alt={card.title}
              fill
              style={{ objectFit: 'cover' }}
              className={styles.modal__image}
            />
          </div>

          <div className={styles.modal__textContent}>
            <h2 className={styles.modal__title}>{card.title}</h2>
            {card.text.length > 0 ? (
              <ul className={styles.modal__list}>
                {card.text.map((line, idx) => (
                  <li key={idx}>{line}</li>
                ))}
              </ul>
            ) : (
              <p className={styles.modal__text}>Keine zusätzlichen Informationen.</p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
