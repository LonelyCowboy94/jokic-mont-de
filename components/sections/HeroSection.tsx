// import Image from "next/image";
import Slider from "../ui/CustomSlider/Slider";
import { Slide } from "../ui/CustomSlider/Slider";
import styles from "./HeroSection.module.scss";

const HeroSection = () => {
  const slides: Slide[] = [
    {
      type: "video",
      src: "https://res.cloudinary.com/drohi7opt/video/upload/v1762814652/istockphoto-1363320765-640_adpp_is_s8sa8t.mp4?_s=public-apps",
    },
    {
      type: "video",
      src: "https://res.cloudinary.com/drohi7opt/video/upload/v1762814654/istockphoto-1468230241-640_adpp_is_qdzo0r.mp4?_s=public-apps",
    },
    {
      type: "video",
      src: "https://res.cloudinary.com/drohi7opt/video/upload/v1762814653/istockphoto-2077871278-640_adpp_is_ndfr0s.mp4?_s=public-apps",
    },
    {
      type: "video",
      src: "https://res.cloudinary.com/drohi7opt/video/upload/v1762814653/istockphoto-1499485279-640_adpp_is_erb7jl.mp4?_s=public-apps",
    },

    {
      type: "image",
      src: "https://res.cloudinary.com/drohi7opt/image/upload/fl_preserve_transparency/v1762814651/istockphoto-1352130137-1024x1024_ov8j2y.jpg?_s=public-apps",
    },
    {
      type: "video",
      src: "https://res.cloudinary.com/drohi7opt/video/upload/v1762814653/istockphoto-1377336334-640_adpp_is_vayarr.mp4?_s=public-apps",
    },
  ];

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroSection__slider}>
        <Slider slides={slides} />
        {/* <h1 className={styles.heroSection__title}>
          <span className={styles.heroSection__name}>JOKIĆ</span>
          
          <Image
            src="/images/logo.webp"
            alt="logo"
            fill
            style={{ objectFit: "contain" }}
            sizes="(max-width: 375px) 120px, 350px"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            priority
            className={styles.heroSection__logo}
          />
          <span className={styles.heroSection__name}>MONT.</span>
          <span className={styles.heroSection__spacer}></span>
        </h1> */}
        {/* <div>
          <h2 className={styles.heroSection__subtitle}>
            HANDWERK <span>+</span>
          </h2>
        </div> */}
      </div>
    </section>
  );
};

export default HeroSection;
