import React from 'react';
import { Link } from 'react-router-dom';
import styles from './footer.module.css'; // Убедись, что имя файла стилей совпадает

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <div className={styles.logoSection}>
            <span className={styles.logoText}>MIDAS</span>
          </div>

          <nav className={styles.navLinks}>
            <Link to="/contacts">Обратная связь</Link>
            {/* Доставка и Оплата ведут на страницу оформления заказа / чекаута */}
            <Link to="/checkout">Доставка</Link>
            <Link to="/checkout">Оплата</Link>
            <Link to="/contacts">Контакты</Link>
          </nav>

          <div className={styles.contactsSection}>
            <a href="tel:+74998416729" className={styles.phone}>+7 (499) 841-67-29</a>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottomRow}>
          <p className={styles.copyright}>© MIDAS, официальный сайт</p>
        </div>
      </div>
    </footer>
  );
}