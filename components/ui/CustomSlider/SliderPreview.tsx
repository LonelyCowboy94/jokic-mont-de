"use client";

import Image from "next/image";
import styles from "./Slider.module.scss";
import { Slide } from "./Slider";

type SliderPreviewProps = {
  slides: Slide[];
  active: number;
  isTransitioning: boolean;
  onTransitionEnd: () => void;
};

const SliderPreview = ({
  slides,
  active,
  isTransitioning,
  onTransitionEnd,
}: SliderPreviewProps) => {
  const extendedSlides = [...slides, ...slides, ...slides];

  return (
    <div className={styles.slider__preview}>
      {extendedSlides.map((item, index) => (
        <div
          key={index}
          className={`${styles.slider__slide} ${
            index === active ? styles.slider__activeSlide : ""
          }`}
          onTransitionEnd={onTransitionEnd}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            transition: isTransitioning ? "transform 1s ease" : "none",
            transform: `translateX(${(index - active) * 100}%)`,
          }}
        >
          {item.type === "image" && (
            <div
              style={{ position: "relative", width: "100%", height: "100%" }}
            >
              <Image
                className={styles[`slider__preview--activeImg`]}
                key={`${index}-${active}`}
                src={item.src}
                alt="slider-image"
                width={1920}
                height={1080}
                draggable={false}
                priority={index === active}
                style={{ objectFit: "cover" }}
                sizes="(max-width: 375px) 375px,
          (max-width: 768px) 768px,
          (max-width: 1024px) 1024px,
          100vw"
              />
            </div>
          )}
          {item.type === "video" && (
            <video
              src={item.src}
              muted
              autoPlay
              playsInline
              loop
              preload={index === 0 ? "auto" : "metadata"}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default SliderPreview;
