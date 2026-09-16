import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context';
import { ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';

const OrderSummary = () => {
  const { cartItems, cartTotal, cartCount, addToCart, removeFromCart, deleteFromCart, clearCart } = useCart();

  return (
    <aside className="w-full bg-[#000000] border border-[#162035]/60 xl:border-none p-5 sm:p-6 xl:p-7 2xl:p-8 pb-7 sm:pb-9 xl:pb-10 font-['Montserrat',sans-serif] shadow-2xl">
      {cartItems.length === 0 ? (
        /* Состояние пустой корзины */
        <div className="py-12 sm:py-16 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full border border-dashed border-[#FBD13E]/40 flex items-center justify-center text-[#FBD13E] mb-6 bg-[#FBD13E]/5 shadow-[0_0_20px_rgba(251,209,62,0.1)]">
            <ShoppingBag size={28} />
          </div>
          <h3 className="text-white text-lg sm:text-xl font-bold mb-3 tracking-tight">
            В корзине пока ничего нет
          </h3>
          <p className="text-[#9EA2AA] text-xs sm:text-sm max-w-[320px] leading-relaxed mb-8 sm:mb-10">
            Выберите любимые блюда из нашего меню или ароматную свежую выпечку
          </p>

          {/* Кнопки перехода, расположенные аккуратно друг под другом без сжатия текста */}
          <div className="flex flex-col gap-3.5 w-full max-w-[280px] sm:max-w-[300px] justify-center items-center">
            <Link
              to="/fresh-bakery"
              className="w-full h-11 sm:h-12 bg-[#FBD13E] text-black font-extrabold text-xs uppercase tracking-[1.2px] flex items-center justify-center hover:bg-[#ebd532] active:scale-[0.99] transition-all shadow-md"
            >
              Свежая выпечка
            </Link>
            <Link
              to="/"
              className="w-full h-11 sm:h-12 border border-white/20 text-white font-semibold text-xs uppercase tracking-[1.2px] flex items-center justify-center hover:border-white/50 hover:bg-white/5 active:scale-[0.99] transition-all"
            >
              В меню
            </Link>
          </div>
        </div>
      ) : (
        /* Список выбранных блюд */
        <div>
          {/* Заголовок списка и кнопка Очистить всё */}
          <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-white/10">
            <span className="text-xs sm:text-[13px] text-[#9EA2AA] uppercase tracking-wider font-semibold">
              Товары в заказе ({cartCount})
            </span>
            <button
              type="button"
              onClick={clearCart}
              className="text-xs sm:text-[13px] text-[#9EA2AA] hover:text-[#FBD13E] flex items-center gap-1.5 transition-colors cursor-pointer py-1"
            >
              <Trash2 size={13} />
              <span>Очистить всё</span>
            </button>
          </div>

          <div className="space-y-5 sm:space-y-6 xl:space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-3 sm:gap-3.5 xl:gap-4 group"
            >
              {/* 1. Картинка блюда */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 xl:w-[60px] xl:h-[60px] overflow-hidden shrink-0 bg-[#162035] relative rounded-none">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/hero_salmon.jpg';
                  }}
                />
              </div>

              {/* 2. Название и подзаголовок */}
              <div className="min-w-0 pr-1">
                <h4 className="text-white text-sm sm:text-[15px] xl:text-[16px] 2xl:text-[17px] font-medium leading-snug truncate">
                  {item.title}
                </h4>
                {item.subtitle && (
                  <p className="text-[#9EA2AA] text-xs sm:text-[13px] mt-0.5 font-medium leading-tight truncate">
                    {item.subtitle}
                  </p>
                )}
                {/* Кнопка быстрого удаления на мобильных / при наведении */}
                <button
                  type="button"
                  onClick={() => deleteFromCart(item.id)}
                  className="text-[#9EA2AA] hover:text-red-400 text-[10px] mt-1 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Trash2 size={11} />
                  <span>Удалить</span>
                </button>
              </div>

              {/* 3. Количество с кнопками управления */}
              <div className="flex items-center gap-1 border border-white/10 px-1 py-0.5 bg-white/5">
                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  className="w-5 h-5 flex items-center justify-center text-[#9EA2AA] hover:text-[#FBD13E] transition-colors cursor-pointer"
                  aria-label="Уменьшить количество"
                >
                  <Minus size={11} />
                </button>
                <span className="text-center text-white text-xs sm:text-[13px] font-medium min-w-[20px]">
                  {item.count}
                </span>
                <button
                  type="button"
                  onClick={() => addToCart({ id: item.id, price: item.price, title: item.title, image: item.image, subtitle: item.subtitle })}
                  className="w-5 h-5 flex items-center justify-center text-[#9EA2AA] hover:text-[#FBD13E] transition-colors cursor-pointer"
                  aria-label="Увеличить количество"
                >
                  <Plus size={11} />
                </button>
              </div>

              {/* 4. Цена (за позицию) */}
              <div className="text-right text-white font-extrabold text-base sm:text-lg xl:text-[20px] 2xl:text-[22px] whitespace-nowrap pl-1 sm:pl-2 min-w-[70px] sm:min-w-[85px]">
                {(item.price * item.count).toLocaleString('ru-RU')} ₽
              </div>
            </div>
          ))}
          </div>
        </div>
      )}

      {/* Блок ИТОГО К ОПЛАТЕ */}
      <div className="mt-8 sm:mt-10 xl:mt-12 flex items-baseline justify-end gap-4 sm:gap-6 pt-4 border-t border-white/10">
        <span className="text-xs sm:text-[13px] text-[#9EA2AA] font-medium uppercase tracking-[0.65px] whitespace-nowrap">
          ИТОГО К ОПЛАТЕ:
        </span>
        <span className="text-xl sm:text-2xl 2xl:text-[24px] font-extrabold text-white tracking-normal whitespace-nowrap">
          {cartTotal.toLocaleString('ru-RU')} ₽
        </span>
      </div>
    </aside>
  );
};

export default OrderSummary;
