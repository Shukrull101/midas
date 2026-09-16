import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const menuCategories = [
  {
    id: 1,
    title: 'Горячие блюда',
    topImage: '/hero_salmon.jpg',
    bottomImage: '/khachapuri.jpg',
    color: 'blue'
  },
  {
    id: 2,
    title: 'Супы',
    topImage: '/hero_salmon.jpg',
    bottomImage: '/khachapuri.jpg',
    color: 'blue'
  },
  {
    id: 3,
    title: 'Хинкали',
    topImage: '/khachapuri.jpg',
    bottomImage: '/hero_salmon.jpg',
    color: 'blue'
  },
  {
    id: 4,
    title: 'Холодные закуски',
    topImage: '/hero_salmon.jpg',
    bottomImage: '/khachapuri.jpg',
    color: 'blue'
  },
  {
    id: 5,
    title: 'Салаты',
    topImage: '/hero_salmon.jpg',
    bottomImage: '/khachapuri.jpg',
    color: 'blue'
  },
  {
    id: 6,
    title: 'Десерты',
    topImage: '/khachapuri.jpg',
    bottomImage: '/hero_salmon.jpg',
    color: 'blue'
  }
];

const MenuSection = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 md:px-8 py-16 mb-20">
      <div className="flex justify-between items-center relative mb-14 px-2">
        <h2 className="text-4xl md:text-5xl font-semibold text-white md:absolute md:left-1/2 md:-translate-x-1/2">
          Меню
        </h2>

        <div className="flex gap-3 ml-auto md:absolute md:right-0">
          <button
            onClick={() => scroll('left')}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/60 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] active:scale-90 transition-all duration-300"
          >
            <ArrowLeft size={20} className="md:w-5 md:h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/60 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] active:scale-90 transition-all duration-300"
          >
            <ArrowRight size={20} className="md:w-5 md:h-5" />
          </button>
        </div>
      </div>

      {/* Scroll container wrapper for negative margins (full bleed on mobile) */}
      <div className="relative -mx-4 md:-mx-8 px-4 md:px-8">
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-auto pb-10 pt-6 snap-x snap-mandatory scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >

          {/* Promo Card */}
          <div className="flex-shrink-0 w-[180px] md:w-[210px] h-[310px] md:h-[350px] rounded-3xl bg-gradient-to-br from-red-600 via-red-700 to-red-950 flex flex-col justify-between items-center py-8 snap-start cursor-pointer hover:-translate-y-3 transition-transform duration-500 shadow-[0_10px_30px_rgba(220,38,38,0.2)] hover:shadow-[0_15px_40px_rgba(220,38,38,0.4)] relative overflow-hidden group">
            {/* Decorative background pattern */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,_white_1.5px,_transparent_1.5px)] [background-size:12px_12px]" />

            <span className="text-red-950/40 font-black text-6xl md:text-7xl tracking-tighter w-full text-center overflow-hidden leading-none relative z-10 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-500">
              30%
            </span>

            <div className="text-white font-black text-xl md:text-2xl flex flex-col items-center gap-1 relative z-10">
              АКЦИИ
              <span className="text-3xl md:text-4xl animate-bounce mt-1">🔥</span>
            </div>

            <span className="text-red-950/40 font-black text-6xl md:text-7xl tracking-tighter w-full text-center overflow-hidden leading-none relative z-10 group-hover:scale-110 group-hover:translate-y-1 transition-transform duration-500">
              20%
            </span>
          </div>

          {/* Category Cards */}
          {menuCategories.map((cat) => (
            <div
              key={cat.id}
              className={`flex-shrink-0 w-[180px] md:w-[210px] h-[310px] md:h-[350px] rounded-3xl flex flex-col justify-between items-center snap-start cursor-pointer hover:-translate-y-3 transition-all duration-500 overflow-hidden relative group shadow-lg ${cat.color === 'blue'
                  ? 'bg-[#0f172a] border border-blue-900/50 hover:border-blue-700/60 hover:shadow-[0_10px_30px_rgba(30,58,138,0.4)]'
                  : 'bg-white/[0.03] border border-white/5 hover:border-white/10 hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)]'
                }`}
            >
              {/* Top Image */}
              <div className="w-[130px] h-[130px] md:w-[160px] md:h-[160px] rounded-full overflow-hidden mt-[-3.5rem] md:mt-[-4.5rem] shadow-[0_10px_20px_rgba(0,0,0,0.5)] group-hover:shadow-[0_15px_25px_rgba(0,0,0,0.8)] transition-all duration-500 z-10 relative">
                <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500 z-20" />
                <img src={cat.topImage} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out relative z-10" />
              </div>

              <h3 className={`text-center px-4 font-semibold text-sm md:text-base z-10 leading-snug ${cat.color === 'blue' ? 'text-blue-100' : 'text-gray-200'} group-hover:text-yellow-400 group-hover:scale-105 transition-all duration-300`}>
                {cat.title}
              </h3>

              {/* Bottom Image */}
              <div className="w-[130px] h-[130px] md:w-[160px] md:h-[160px] rounded-full overflow-hidden mb-[-3.5rem] md:mb-[-4.5rem] shadow-[0_-10px_20px_rgba(0,0,0,0.5)] group-hover:shadow-[0_-15px_25px_rgba(0,0,0,0.8)] transition-all duration-500 z-10 relative">
                <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500 z-20" />
                <img src={cat.bottomImage} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out relative z-10" />
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default MenuSection;
