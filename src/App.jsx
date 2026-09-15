import React from 'react';
import Header from './src/layout/header/Header';

function App() {
  return (
    <div className="App" style={{ backgroundColor: '#050b1f', minHeight: '100vh', color: '#fff' }}>
      <Header />
      {/* Здесь в будущем добавим HeroSection и другие блоки */}
    </div>
  );
}

export default App;