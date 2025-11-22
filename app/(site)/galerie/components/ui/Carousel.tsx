"use client";

import "./styles.css";
import { useKeenSlider, KeenSliderPlugin } from "keen-slider/react";
import Image from "next/image";
import "keen-slider/keen-slider.min.css";
import { useState, useRef } from "react";

const carousel: KeenSliderPlugin = (slider) => {
  const z = 250;
  function rotate() {
    const deg = 360 * slider.track.details.progress;
    slider.container.style.transform = `translateZ(-${z}px) rotateY(${-deg}deg)`;
  }
  slider.on("created", () => {
    const deg = 360 / slider.slides.length;
    slider.slides.forEach((element, idx) => {
      element.style.transform = `rotateY(${deg * idx}deg) translateZ(${z}px)`;
    });
    rotate();
  });
  slider.on("detailsChanged", rotate);
};

export default function App() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      selector: ".carousel__cell",
      renderMode: "custom",
      mode: "free-snap",
    },
    [carousel]
  );

  const [showHint, setShowHint] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowHint(false);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowHint(true);
    }, 2000);
  };

  const images = [
    "https://jdmw.de/wp-content/uploads/go-x/u/0f111196-958c-41c4-9f29-9c83766c39bc/l0,t1001,w1500,h999/image-960x639.jpg",
    "https://jdmw.de/wp-content/uploads/go-x/u/6c568620-e48f-47c8-949b-ceee8c9080ac/l0,t500,w1500,h1000/image-960x640.jpg",
    "https://jdmw.de/wp-content/uploads/go-x/u/a6166813-9c5e-4365-a8ae-4810eaa71dfa/l0,t62,w1500,h999/image-960x639.jpg",
    "https://jdmw.de/wp-content/uploads/go-x/u/b494af90-b2c0-4f1f-b6ea-22735dd52419/l0,t500,w1500,h999/image-960x639.jpg",
    "https://jdmw.de/wp-content/uploads/go-x/u/4c3a0243-8fa4-4a4c-a6b4-6ebba469ac99/l0,t7,w1632,h1087/image-960x639.png",
    "https://jdmw.de/wp-content/uploads/go-x/u/6b24b4a9-99b6-4af0-a42b-aa6b95a890b2/l0,t978,w1500,h999/image-960x639.jpg",
  ];

  return (
    <div className="wrapper">
      <div
        className="scene"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseEnter} // touch sakriva hint odmah
      >
        <div className="carousel keen-slider" ref={sliderRef}>
          {images.map((img, i) => (
            <div className="carousel__cell" key={i}>
              <Image
                src={img}
                alt=""
                fill
                sizes="(max-width: 768px) 80vw,
                       (max-width: 1200px) 50vw,
                       400px"
                style={{ objectFit: "cover" }}
                className="carousel__image"
              />
            </div>
          ))}
        </div>

        <div
          className="hintOverlay"
          style={{ opacity: showHint ? 1 : 0, transition: "opacity 0.3s ease" }}
        >
          <div className="hintText">Mit der Maus oder per Wischen drehen</div>
        </div>
      </div>
    </div>
  );
}
