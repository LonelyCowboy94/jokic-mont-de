"use client";

import Image from "next/image";
import styles from "./Slider.module.scss";
import { Slide } from "./Slider";

type SliderPreviewProps = {
  slides: Slide[];
  active: number;
  isTransitioning: boolean;
  onTransitionEnd: () => void;
  slideDuration: number;
};

const SliderPreview = ({
  slides,
  active,
  isTransitioning,
  onTransitionEnd,
  slideDuration,
}: SliderPreviewProps) => {
  const extendedSlides = [...slides, ...slides, ...slides];
  const timerDuration = slideDuration / 1000 + "s";

  return (
    <div className={styles.slider__preview}>
      <div
        key={`timer-${active}`}
        className={styles.sliderTimer}
        style={{
          animation: `slideDurationTimer ${timerDuration} linear forwards`,
        }}
      ></div>
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
              <>
                <Image
                  className={styles[`slider__preview--activeImg`]}
                  key={`${index}-${active}`}
                  src={item.src}
                  alt="slider-image"
                  fill
                  draggable={false}
                  priority={true}
                  style={{ objectFit: "cover", animation: `heroMotion ${slideDuration / 1000}s linear infinite`,
    willChange: "transform", }}
                  sizes="(max-width: 375px) 375px,
          (max-width: 768px) 768px,
          (max-width: 1024px) 1024px,
          100vw"
                />
              </>
            </div>
          )}
          {item.type === "video" && (
            <>
              <video
                src={item.src}
                muted
                autoPlay
                playsInline
                loop
                preload={index === 0 ? "auto" : "metadata"}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default SliderPreview;
