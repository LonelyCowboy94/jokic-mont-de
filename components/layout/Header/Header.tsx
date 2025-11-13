'use client'
import Navbar from '../Nav/Navbar';
import styles from './Header.module.scss';
import MobileNavbar from '../Nav/MobileNavbar';

const Header = () => {


  return (
    <>
    <header className={styles.header}>
      <Navbar />
      
    </header>
    <MobileNavbar />
    </>
  )
}

export default Header