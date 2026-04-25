import React from 'react';
import styles from './InfiniteCarousel.module.css';
import ProductCard from './ProductCard';

export default function InfiniteCarousel({ items }) {
  const duplicatedItems = [...items, ...items];

  return (
    <div className={styles.viewport}>
      {/* Zonas de filtro Blur + Fade */}
      <div className={`${styles.filterZone} ${styles.leftZone}`}></div>
      <div className={`${styles.filterZone} ${styles.rightZone}`}></div>

      <div className={styles.track}>
        {duplicatedItems.map((item, index) => (
          <div key={`${item.sku}-${index}`} className={styles.itemWrapper}>
            <ProductCard {...item} />
          </div>
        ))}
      </div>
    </div>
  );
}