import React from 'react';
import styles from './ProductCard.module.css';

export default function ProductCard({ sku, nombre, precio, img_url, descripcion }) {
  return (
    <article className={styles.card}>
      <div className={styles.imageBox}>
        <img src={img_url} alt={nombre} loading="lazy" />
      </div>
      <div className={styles.content}>
        <span className={styles.sku}>{sku}</span>
        <h3 className={styles.title}>{nombre}</h3>
        <p className={styles.price}>${precio}</p>
        <button className={styles.buyBtn}>Ver Detalles</button>
      </div>
    </article>
  );
}