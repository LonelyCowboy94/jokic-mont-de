"use client";

import styles from "./Slider.module.scss";

type ButtonsProps = {
  onSelect: (direction: "left" | "right") => void;
};

const SliderButtons = ({ onSelect }: ButtonsProps) => {
  return (
    <div className={styles.slider__buttons}>
      <button
        onClick={() => onSelect("left")}
        style={{
          position: "absolute",
          top: "90%",
          transform: "translateY(-50%)",
          color: "#fff",
          border: "none",
          padding: "8px 12px",
          cursor: "pointer",
          zIndex: 10,
        }}
      >
      
      </button>

      <button
        onClick={() => onSelect("right")}
        style={{
          position: "absolute",
          top: "90%",
          transform: "translateY(-50%)",
          color: "#fff",
          border: "none",
          padding: "8px 12px",
          cursor: "pointer",
          zIndex: 10,
          
        }}
      >
      
      </button>
    </div>
  );
};

export default SliderButtons;
