"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import styles from "./HeroSlider.module.scss";

export default function HeroSlider() {
  return (
    <Swiper
      className={styles.slider}
      modules={[Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      fadeEffect={{ crossFade: true }}
      loop={true}
      autoplay={{
        delay: 8000,
        disableOnInteraction: false,
      }}
    >
      <SwiperSlide>
  <Image
    className={styles.slider__image}
    fill
    style={{ objectFit: "cover" }}
    src="https://images.pexels.com/photos/3946155/pexels-photo-3946155.jpeg"
    alt=""
    sizes="(max-width: 375px) 375px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, 1920px"
  />
</SwiperSlide>
<SwiperSlide>
  <Image
    className={styles.slider__image}
    fill
    style={{ objectFit: "cover" }}
    src="https://images.pexels.com/photos/268362/pexels-photo-268362.jpeg"
    alt=""
    sizes="(max-width: 375px) 375px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, 1920px"
  />
</SwiperSlide>
<SwiperSlide>
  <Image
    className={styles.slider__image}
    fill
    style={{ objectFit: "cover" }}
    src="https://images.pexels.com/photos/176342/pexels-photo-176342.jpeg"
    alt=""
    sizes="(max-width: 375px) 375px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, 1920px"
  />
</SwiperSlide>


      
    </Swiper>
  );
}
