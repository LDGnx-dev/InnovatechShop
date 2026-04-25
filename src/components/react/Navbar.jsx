import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    // Buscamos el contenedor que tiene el scroll
    const scrollContainer = document.querySelector('.snap-container');

    const handleScroll = () => {
      if (scrollContainer) {
        const offset = scrollContainer.scrollTop; // Usamos scrollTop del div, no window.scrollY
        
        // Si bajamos más de 300px (saliendo del Hero)
        if (offset > 300) {
          setShowNav(true);
        } else {
          setShowNav(false);
        }
      }
    };

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <nav className={`${styles.navbar} ${showNav ? styles.visible : styles.hidden}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <a href="#home">INNOVA<span style={{ color: 'var(--primary)' }}>TECH</span></a>
        </div>
        <div className={styles.links}>
          <a href="#home" className={styles.navLink}>Inicio</a>
          <a href="#store" className={styles.navLink}>Tienda</a>
          <a href="#contact" className={styles.navLink}>Contacto</a>
        </div>
      </div>
    </nav>
  );
}