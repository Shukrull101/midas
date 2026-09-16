import React, { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import InteractiveDots from './InteractiveDots';
import { useCart } from '../context';

const Hero = () => {
  const { addToCart } = useCart();
  const [tiramisuAdded, setTiramisuAdded] = useState(false);
  const [salmonAdded, setSalmonAdded] = useState(false);

  const handleAddTiramisu = (e) => {
    e.stopPropagation();
    addToCart({
      id: 'hero-tiramisu',
      title: 'Тирамису',
      price: 370,
      image: '/tiramisu_dessert.jpg',
      subtitle: '150 г',
    });
    setTiramisuAdded(true);
    setTimeout(() => setTiramisuAdded(false), 1000);
  };

  const handleAddSalmon = (e) => {
    e.stopPropagation();
    addToCart({
      id: 'hero-salmon',
      title: 'Стейк из лосося с овощами',
      price: 1200,
      image: '/hero_salmon.jpg',
      subtitle: '240 г',
    });
    setSalmonAdded(true);
    setTimeout(() => setSalmonAdded(false), 1000);
  };

  return (
    <section className="relative w-full max-w-[1400px] mx-auto px-8 pt-10 pb-10">
      <div className="flex flex-col lg:flex-row justify-between items-start">
        {/* Left Content */}
        <div className="w-full lg:w-1/3 pt-6 relative z-10 flex flex-col">
          <h1 className="text-xl md:text-2xl font-medium leading-snug text-white mb-8 max-w-[280px]" style={{ fontSize: '42px' }}>
            Доставка готовой еды из фермерских продуктов!
          </h1>

          {/* Decorative dots pattern */}
          <div className="absolute left-[-4rem] top-20 z-0">
            <InteractiveDots cols={8} rows={12} />
          </div>

          <div className="flex flex-col gap-1.5 mb-16 content-center">
            <a href="tel:+74998416729" className="text-lg font-bold text-white hover:text-gray-300 transition-colors">
              +7 (499) 841-67-29
            </a>
            <a href="mailto:delivery@midas.rest" className="text-sm font-medium text-gray-400 border-b border-gray-600 w-fit pb-0.5 hover:text-white transition-colors">
              delivery@midas.rest
            </a>
          </div>

          {/* Small Card */}
          <div className="group bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 w-48 shadow-2xl hover:border-white/30 hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div className="w-full h-32 overflow-hidden bg-gray-800 mb-4 rounded-xl">
              <img src="/tiramisu_dessert.jpg" alt="Тирамису" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <h3 className="text-white font-medium text-sm mb-1 group-hover:text-yellow-400 transition-colors">Тирамису</h3>
            <div className="text-gray-400 text-xs mb-3 bg-white/10 w-fit px-2 py-0.5 rounded-md">150 г</div>
            <div className="flex items-center justify-between">
              <span className="text-white font-bold text-lg">370 ₽</span>
              <button
                onClick={handleAddTiramisu}
                aria-label="Добавить Тирамису в корзину"
                className={`p-2 rounded-xl active:scale-95 transition-all duration-200 cursor-pointer ${
                  tiramisuAdded
                    ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                    : 'bg-yellow-400 text-black hover:bg-yellow-300 shadow-[0_0_15px_rgba(251,203,43,0.3)] hover:shadow-[0_0_20px_rgba(251,203,43,0.5)]'
                }`}
              >
                {tiramisuAdded ? <Check size={16} /> : <ShoppingBag size={16} />}
              </button>
            </div>
          </div>


        </div>

        {/* Right Content - Main Hero Image */}
        <div className="w-full lg:w-2/3 relative mt-10 lg:mt-0">
          <div className="relative w-full aspect-[16/10] overflow-hidden rounded-sm shadow-2xl">
            <img
              src="/hero_salmon.jpg"
              alt="Стейк из лосося с овощами"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Red Info Card overlapping image */}
          <div
            className="absolute -bottom-10 left-10 md:left-12 text-white p-10 pt-12 pb-14 w-[340px] drop-shadow-2xl z-20 bg-no-repeat bg-cover bg-center flex flex-col justify-center"
            style={{ backgroundImage: "url('/red_brush.png')" }}
          >
            <div className="px-2">
              <h2 className="text-2xl font-bold mb-3">Стейк из лосося с овощами</h2>
              <div className="bg-white/20 w-fit px-2 py-0.5 rounded-md text-xs font-semibold mb-3">240 г</div>
              <p className="text-xs text-white/90 leading-relaxed mb-6 font-medium">
                Нежный стейк дикого лосося, пропитанный соком и ароматом слегка обжаренных фермерских овощей
              </p>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold">1 200 ₽</span>
                <button
                  onClick={handleAddSalmon}
                  aria-label="Добавить Стейк из лосося в корзину"
                  className={`p-2.5 rounded-xl active:scale-95 transition-all duration-200 cursor-pointer ${
                    salmonAdded
                      ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                      : 'bg-yellow-400 text-black hover:bg-yellow-300 shadow-[0_0_15px_rgba(251,203,43,0.3)] hover:shadow-[0_0_20px_rgba(251,203,43,0.6)]'
                  }`}
                >
                  {salmonAdded ? <Check size={20} /> : <ShoppingBag size={20} />}
                </button>
              </div>
            </div>
          </div>

          {/* Decorative dots pattern right */}
          <div className="absolute right-0 md:-right-8 -bottom-65 z-0">
            <InteractiveDots cols={16} rows={16} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
