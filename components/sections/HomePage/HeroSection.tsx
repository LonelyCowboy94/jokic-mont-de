import Slider from "../../ui/CustomSlider/Slider";
import { Slide } from "../../ui/CustomSlider/Slider";
import styles from "./HeroSection.module.scss";

const HeroSection = () => {
  const slides: Slide[] = [
    {
      type: "image",
      src: "https://res.cloudinary.com/drohi7opt/image/upload/fl_preserve_transparency/v1762814653/istockphoto-1491056226-2048x2048_i7tzol.jpg?_s=public-apps",
    },
    {
      type: "video",
      src: "https://res.cloudinary.com/drohi7opt/video/upload/v1762814654/istockphoto-1468230241-640_adpp_is_qdzo0r.mp4?_s=public-apps",
    },
    {
      type: "video",
      src: "https://res.cloudinary.com/drohi7opt/video/upload/v1762814652/istockphoto-1363320765-640_adpp_is_s8sa8t.mp4?_s=public-apps",
    },
    {
      type: "video",
      src: "https://res.cloudinary.com/drohi7opt/video/upload/v1762814653/istockphoto-2077871278-640_adpp_is_ndfr0s.mp4?_s=public-apps",
    },
    {
      type: "video",
      src: "https://res.cloudinary.com/drohi7opt/video/upload/v1762981948/istockphoto-493319011-640_adpp_is_eabvhx.mp4?_s=public-apps",
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
      src: "https://res.cloudinary.com/drohi7opt/video/upload/v1762981999/istockphoto-1176798372-640_adpp_is_syhfcg.mp4?_s=public-apps",
    },
  ];

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroSection__slider}>
        <Slider slides={slides} />
      </div>
    </section>
  );
};

export default HeroSection;
