import React, { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../context';

const popularDishes = [
  {
    id: 1,
    name: 'Хачапури по-аджарски',
    weight: '330 г',
    description: 'Хачапури "Лодочка" с начинкой из расплавленного сыра Сулугуни, яйца и масла',
    price: 470,
    oldPrice: null,
    image: '/khachapuri.jpg'
  },
  {
    id: 2,
    name: 'Хинкали традиционные (5шт)',
    weight: '330 г',
    description: 'Пряные хинкали с начинкой из ароматной баранины со специями',
    price: 495,
    oldPrice: 620,
    image: '/khachapuri.jpg'
  },
  {
    id: 3,
    name: 'Хинкали жаренные (5шт)',
    weight: '330 г',
    description: 'Пряные хинкали с начинкой из ароматной баранины со специями',
    price: 520,
    oldPrice: 650,
    image: '/khachapuri.jpg'
  },
  {
    id: 4,
    name: 'Ланч низкокалорийный',
    weight: '1430 г',
    description: 'Греческий йогурт с ягодами, 3 хинкали традиционных, салат цезарь, вареники с уткой, морс',
    price: 1148,
    oldPrice: 1435,
    image: '/khachapuri.jpg'
  },
  {
    id: 5,
    name: 'Котлета по-деревенски',
    description: 'По семейному рецепту: нежнейшая рубленая котлета из экологически чистого фермерского мяса...',
    image: '/khachapuri.jpg',
    variants: [
      { name: 'Куриная', weight: '330 г', price: 410, oldPrice: null },
      { name: 'Мясная', weight: '350 г', price: 480, oldPrice: 520 }
    ]
  },
  {
    id: 6,
    name: 'Хинкали традиционные (5шт)',
    weight: '330 г',
    description: 'Пряные хинкали с начинкой из ароматной баранины со специями',
    price: 495,
    oldPrice: 620,
    image: '/khachapuri.jpg'
  },
  {
    id: 7,
    name: 'Хачапури по-мегрельски',
    weight: '120 г',
    description: 'Невероятно ароматная лепешка с сыром сулугуни внутри и снаружи',
    price: 490,
    oldPrice: null,
    image: '/khachapuri.jpg'
  },
  {
    id: 8,
    name: 'Хачапури по-аджарски',
    weight: '330 г',
    description: 'Хачапури "Лодочка" с начинкой из расплавленного сыра Сулугуни, яйца и масла',
    price: 470,
    oldPrice: null,
    image: '/khachapuri.jpg'
  },
  {
    id: 9,
    name: 'Котлета по-деревенски',
    description: 'По семейному рецепту: нежнейшая рубленая котлета из экологически чистого фермерского мяса...',
    image: '/khachapuri.jpg',
    variants: [
      { name: 'Куриная', weight: '330 г', price: 430, oldPrice: 490 },
      { name: 'Мясная', weight: '350 г', price: 480, oldPrice: 540 }
    ]
  },
  {
    id: 10,
    name: 'Хинкали жаренные (5шт)',
    weight: '330 г',
    description: 'Пряные хинкали с начинкой из ароматной баранины со специями',
    price: 520,
    oldPrice: 650,
    image: '/khachapuri.jpg'
  }
];

const DishCard = ({ dish }) => {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();
  const hasVariants = Array.isArray(dish.variants);
  const activeData = hasVariants ? dish.variants[selectedVariant] : dish;

  const handleAdd = (e) => {
    e.stopPropagation();
    const variantSuffix = hasVariants ? ` (${activeData.name})` : '';
    addToCart({
      id: `popular-${dish.id}${hasVariants ? `-${selectedVariant}` : ''}`,
      title: `${dish.name}${variantSuffix}`,
      price: activeData.price,
      image: dish.image,
      subtitle: activeData.weight,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1000);
  };

  return (
    <div className="flex flex-col group cursor-pointer transition-all duration-300 hover:-translate-y-2 h-full bg-white/[0.03] p-4 rounded-3xl border border-white/5 hover:border-white/10 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
      <div className="w-full aspect-square bg-gray-800/50 mb-5 rounded-2xl overflow-hidden relative shadow-inner">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="flex flex-col flex-grow px-1">
        <h3 className="text-white font-medium text-[15px] mb-2.5 group-hover:text-yellow-400 transition-colors leading-snug">
          {dish.name}
        </h3>

        <div className="text-gray-400 text-[11px] mb-3 bg-white/10 w-fit px-2.5 py-1 rounded-md font-medium tracking-wide">
          {activeData.weight}
        </div>

        <p className="text-gray-400 text-xs mb-5 line-clamp-3 leading-relaxed flex-grow">
          {dish.description}
        </p>

        {hasVariants && (
          <div className="flex bg-black/40 p-1 rounded-xl mb-5 relative z-10 border border-white/5">
            <div 
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-yellow-400 rounded-lg transition-all shadow-sm"
              style={{ 
                left: selectedVariant === 0 ? '4px' : '50%',
                transitionDuration: '400ms',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            />
            {dish.variants.map((v, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedVariant(idx);
                }}
                className={`flex-1 text-[11px] font-bold py-2 rounded-lg transition-colors duration-300 relative z-20 cursor-pointer ${
                  selectedVariant === idx
                    ? 'text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {v.name}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-end justify-between mt-auto pt-4 border-t border-white/5">
          <div className="flex flex-col">
            <div className="h-[18px]"> 
              {activeData.oldPrice && (
                <span className="text-gray-500 text-[11px] line-through font-medium">
                  {activeData.oldPrice} ₽
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-white font-bold text-xl">{activeData.price} ₽</span>
            </div>
          </div>

          <button
            onClick={handleAdd}
            aria-label="Добавить в корзину"
            className={`p-3 rounded-2xl active:scale-95 transition-all duration-200 cursor-pointer ${
              isAdded
                ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                : 'bg-yellow-400 text-black hover:bg-yellow-300 shadow-[0_0_15px_rgba(251,203,43,0.15)] hover:shadow-[0_0_20px_rgba(251,203,43,0.4)] group-hover:-translate-y-1'
            }`}
          >
            {isAdded ? <Check size={18} /> : <ShoppingBag size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};

const PopularDishes = () => {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-8 py-16">
      <div className="flex justify-center relative">
        <h1 className="text-4xl md:text-5xl font-semibold text-white mb-14 text-left w-fit">
          Популярные<br />блюда
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 gap-y-10">
        {popularDishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </div>
    </section>
  );
};

export default PopularDishes;
