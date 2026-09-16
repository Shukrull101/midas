import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './layout/header/header';
import Catalog from './pages/Catalog';
import FreshBakery from './pages/freshbakery/FreshBakery';
import Checkout from './pages/checkout/Checkout';
import Home from './pages/Home';
import { CartProvider } from './context';

function App() {
  return (
    <CartProvider>
      <div style={{ backgroundColor: '#050b1f', minHeight: '100vh', color: '#fff' }}>
        <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/catalog" element={<Catalog />} />

          {/* Вот сюда будет приводить клик из хедера */}
          <Route path="/fresh-bakery" element={<FreshBakery />} />

          <Route path="/cart" element={<Checkout />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route path="/contacts" element={
            <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
              <h1>Контакты</h1>
              <p style={{ color: '#888' }}>Свяжитесь с нами.</p>
            </div>
          } />
        </Routes>
      </main>
    </div>
  </CartProvider>
  );
}

export default App;