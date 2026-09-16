import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './layout/header/header';
import Catalog from './pages/Catalog';
import FreshBakery from './pages/freshbakery/FreshBakery';
import Home from './pages/Home';

function App() {
  return (
    <div style={{ backgroundColor: '#050b1f', minHeight: '100vh', color: '#fff' }}>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/catalog" element={<Catalog />} />

          {/* Вот сюда будет приводить клик из хедера */}
          <Route path="/fresh-bakery" element={<FreshBakery />} />

          <Route path="/cart" element={
            <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
              <h1>Корзина</h1>
              <p style={{ color: '#888' }}>Ваша корзина пуста.</p>
            </div>
          } />

          <Route path="/contacts" element={
            <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
              <h1>Контакты</h1>
              <p style={{ color: '#888' }}>Свяжитесь с нами.</p>
            </div>
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App;