import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './layout/header/header';
import Footer from './layout/footer/footer'; // Подключаем компонент футера из папки layout
import Catalog from './pages/Catalog';
import FreshBakery from './pages/freshbakery/FreshBakery';
import Checkout from './pages/checkout/Checkout';
import Home from './pages/Home';
import { CartProvider } from './context';

function App() {
  return (
    <CartProvider>
      {/* Обертка с flex-column и minHeight гарантирует, что футер всегда будет прижат к низу */}
      <div style={{ backgroundColor: '#050b1f', minHeight: '100vh', color: '#fff', display: 'flex', flexDirection: 'column' }}>
        <Header />

        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
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

        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;