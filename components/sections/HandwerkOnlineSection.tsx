import styles from './HandwerkOnlineSection.module.scss';
import Image from 'next/image';
import landkreisGiessen from '../../public/images/landkreis-giessen.svg';
const HandwerkOnlineSection = () => {
  return (
   <section className={styles.handwerkOnlineSection}>
    
      <article className={styles.handwerkOnlineSection__article}>
        <h2 className={styles.handwerkOnlineSection__title}>
          <strong>Handwerk Online</strong>
        </h2>
        <p className={styles.handwerkOnlineSection__text}>
          Unser Unternehmen wurde 2017 gegründet und baut auf einer langjährigen
          Handwerkstradition auf, die seit 1988 in dritter Generation
          fortgeführt wird. Mit modernster Technik, professioneller Ausrüstung
          und unsere langjährige Erfahrung im nationalen und internationalen
          Bausektor unterstützen wir Sie zuverlässig bei der Umsetzung Ihrer
          Bauvorhaben.
        </p>
       
      </article>    
      <div className={styles.handwerkOnlineSection__svgWrapper}>
       <Image className={styles.handwerkOnlineSection__svg} fill sizes="(max-width: 375px) 375px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, 1920px" style={{ objectFit: 'cover' }} src={landkreisGiessen} alt='LandKreis Giessen' />
       </div>
    </section>
  )
}

export default HandwerkOnlineSection