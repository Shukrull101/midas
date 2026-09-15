import React from 'react';
import { useSearchParams } from 'react-router-dom';

const Catalog = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'sales';

  const categoryTitles = {
    sales: 'АКЦИИ 🔥',
    hotmeals: 'ГОРЯЧЕЕ',
    coldmeals: 'ХОЛОДНОЕ',
    freshbakery: 'СВЕЖАЯ ВЫПЕЧКА',
    deserts: 'ДЕСЕРТЫ',
    drinks: 'НАПИТКИ'
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '20px', color: '#fff' }}>
        Категория: {categoryTitles[category] || 'Товары'}
      </h1>
      <p style={{ color: '#888' }}>
        Здесь будет выводиться содержимое из папки <code style={{ color: '#fff' }}>src/pages/{category}</code>
      </p>
    </div>
  );
};

export default Catalog;