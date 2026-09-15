import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  

export default App

import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItemCount = 2; // Пример количества товаров в корзине

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
            to="/catalog?category=hot" 
            className={({isActive}) => `${styles.navLink} ${isActive ? styles.active : ''}`}
            onClick={closeMenu}
          >
            ГОРЯЧЕЕ ▾
          </NavLink>

          <NavLink 
            to="/catalog?category=cold" 
            className={({isActive}) => `${styles.navLink} ${isActive ? styles.active : ''}`}
            onClick={closeMenu}
          >
            ХОЛОДНОЕ ▾
          </NavLink>

          <NavLink 
            to="/catalog?category=bakery" 
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

        {/* Правые иконки (Поиск, Профиль, Корзина) */}
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