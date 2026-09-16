import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from "./header.module.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItemCount = 0; // Пример количества товаров в корзине

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Логотип */}
        <Link to="/" className={styles.logoLink} onClick={closeMenu}>
          <span className={styles.logoText}>MIDAS</span>
        </Link>

        {/* Навигация */}
        <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ''}`}>
          <NavLink 
            to="/catalog?category=sales" 
            className={({isActive}) => `${styles.navLink} ${isActive ? styles.active : ''}`}
            onClick={closeMenu}
          >
            <span className={styles.saleBadge}>АКЦИИ 🔥</span>
          </NavLink>
          
          <NavLink 
            to="/catalog?category=hotmeals" 
            className={({isActive}) => `${styles.navLink} ${isActive ? styles.active : ''}`}
            onClick={closeMenu}
          >
            ГОРЯЧЕЕ ▾
          </NavLink>

          <NavLink 
            to="/catalog?category=coldmeals" 
            className={({isActive}) => `${styles.navLink} ${isActive ? styles.active : ''}`}
            onClick={closeMenu}
          >
            ХОЛОДНОЕ ▾
          </NavLink>

         <NavLink 
  to="/fresh-bakery" 
  className={({isActive}) => `${styles.navLink} ${isActive ? styles.active : ''}`}
  onClick={closeMenu}
>
  СВЕЖАЯ ВЫПЕЧКА
</NavLink>
          <NavLink 
            to="/catalog?category=deserts" 
            className={({isActive}) => `${styles.navLink} ${isActive ? styles.active : ''}`}
            onClick={closeMenu}
          >
            ДЕСЕРТЫ
          </NavLink>

          <NavLink 
            to="/catalog?category=drinks" 
            className={({isActive}) => `${styles.navLink} ${isActive ? styles.active : ''}`}
            onClick={closeMenu}
          >
            НАПИТКИ
          </NavLink>
        </nav>

        {/* Правые иконки (Поиск, Профиль/Контакты, Корзина) */}
        <div className={styles.actions}>
          <button className={styles.iconBtn} aria-label="Search">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          <Link to="/contacts" className={styles.iconBtn} aria-label="Profile">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </Link>

          <Link to="/cart" className={`${styles.iconBtn} ${styles.cartWrapper}`} aria-label="Cart">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            {cartItemCount > 0 && <span className={styles.cartBadge}>{cartItemCount}</span>}
          </Link>

          {/* Гамбургер для мобильных */}
          <button className={styles.burger} onClick={toggleMenu} aria-label="Menu">
            <span style={{ transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
            <span style={{ opacity: isMenuOpen ? '0' : '1' }}></span>
            <span style={{ transform: isMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;