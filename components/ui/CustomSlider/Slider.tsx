"use client";

import { useState, useRef, useEffect } from "react";
import { ReactNode } from "react";
import styles from "./Slider.module.scss";
import SliderButtons from "./SliderButtons";
import SliderPreview from "./SliderPreview";
import SliderOverlay from "./SliderOverlay";

export type Slide = {
  type: "image" | "video";
  src: string;
};

export type OverlayData = {
  text: ReactNode;
  position: { top?: string; left?: string; right?: string; bottom?: string };
  animateFrom?: "bottom" | "top" | "left" | "right";
  className?: string;           
};

export default function Slider({ slides }: { slides: Slide[] }) {
  const [active, setActive] = useState(slides.length); // starting at middle for infinite loop
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [slideDuration] = useState(11000); //ms
  const startX = useRef(0);
  const intervalRef = useRef<number | null>(null);

  const slideCount = slides.length;

  // Navigation buttons
  const handleSlideChange = (direction: "left" | "right") => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    startAutoplay();
    setActive((prev) => (direction === "left" ? prev - 1 : prev + 1));
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const diff = startX.current - e.changedTouches[0].clientX;
    if (diff > 50) handleSlideChange("right");
    if (diff < -50) handleSlideChange("left");
  };

  // Autoplay
  const startAutoplay = () => {
    if (intervalRef.current !== null) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      setActive((prev) => prev + 1);
    }, slideDuration);
  };

  useEffect(() => {
    startAutoplay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  });

  // Loop transitions
  const handleTransitionEnd = () => {
    if (active >= slideCount * 2) {
      setIsTransitioning(false);
      setActive(slideCount);
      setTimeout(() => setIsTransitioning(true), 20);
    } else if (active < slideCount) {
      setIsTransitioning(false);
      setActive(slideCount + (active % slideCount));
      setTimeout(() => setIsTransitioning(true), 20);
    } else {
      setIsTransitioning(true);
    }
  };

  return (
    <div
      className={styles.slider}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        position: "relative",
        width: "100vw",
        aspectRatio: "16 / 9",
        overflow: "hidden",
        zIndex: 999,
      }}
    >
      <SliderPreview
        slides={slides}
        active={active}
        isTransitioning={isTransitioning}
        onTransitionEnd={handleTransitionEnd}
        slideDuration={slideDuration}
      />
      <SliderOverlay active={active} slideDuration={slideDuration} />
      <SliderButtons onSelect={handleSlideChange} />
    </div>
  );
}
