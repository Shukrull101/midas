import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './layout/header/header';
import Catalog from './pages/Catalog';

function App() {
  return (
    <div style={{ backgroundColor: '#050b1f', minHeight: '100vh', color: '#fff' }}>
      {/* Шапка сайта всегда на экране */}
      <Header />
      
      {/* Динамическая смена страниц в зависимости от ссылки */}
      <main>
        <Routes>
          <Route path="/" element={
            <div style={{ padding: '60px 20px', textAlign: 'center' }}>
              <h1 style={{ fontSize: '36px', marginBottom: '16px' }}>Добро пожаловать в MIDAS!</h1>
              <p style={{ color: '#aaa', fontSize: '18px' }}>
                Выберите любую категорию в шапке сайта сверху, чтобы открыть каталог.
              </p>
            </div>
          } />
          
          <Route path="/catalog" element={<Catalog />} />
          
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