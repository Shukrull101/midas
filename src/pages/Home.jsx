import React from 'react';
import Hero from '../components/Hero';
import PopularDishes from '../components/PopularDishes';
import MenuSection from '../components/MenuSection';

const Home = () => {
  return (
    <div>
      <Hero />
      <PopularDishes />
      <MenuSection />
    </div>
  );
};

export default Home;
