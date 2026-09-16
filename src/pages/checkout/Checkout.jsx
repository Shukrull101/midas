import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import OrderSummary from './OrderSummary';
import OrderSuccessModal from './OrderSuccessModal';
import { useCart } from '../../context';

const Checkout = () => {
  const [submittedOrder, setSubmittedOrder] = useState(null);
  const { clearCart } = useCart();

  const handleOrderSuccess = (data) => {
    setSubmittedOrder(data);
    clearCart();
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-[#050B1F] text-white pt-6 sm:pt-8 lg:pt-10 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 xl:px-12 font-['Montserrat',sans-serif] overflow-x-clip">
      <div className="max-w-[1360px] xl:max-w-[1440px] mx-auto">
        {/* Хлебные крошки */}
        <nav className="flex items-center gap-2.5 text-xs sm:text-[13px] text-white mb-4 sm:mb-6 font-medium">
          <Link to="/" className="hover:text-[#FBD13E] transition-colors">
            Главная
          </Link>
          <span className="text-[#9EA2AA]">/</span>
          <Link to="/cart" className="hover:text-[#FBD13E] transition-colors">
            Корзина
          </Link>
          <span className="text-[#9EA2AA]">/</span>
          <span className="text-[#9EA2AA]">Оформление заказа</span>
        </nav>

        {/* Заголовок страницы */}
        <h1 className="text-2xl sm:text-3xl lg:text-[36px] xl:text-[40px] font-bold tracking-tight mb-8 sm:mb-10 lg:mb-12 text-white">
          Оформление заказа
        </h1>

        {/* Модальное окно успешного оформления заказа */}
        <OrderSuccessModal
          isOpen={Boolean(submittedOrder)}
          onClose={() => setSubmittedOrder(null)}
          orderData={submittedOrder}
        />

        {/* 
          Основной контент:
          - На экранах < 1280px (планшеты, небольшие экраны, 1031px): 1 колонка, аккуратная центровка, нет выталкивания и горизонтального скролла.
          - На экранах >= 1280px (ПК, ноутбуки 1440px, 2880x1800): 2 сбалансированные колонки со sticky-фиксацией сводки заказа.
        */}
        <div className="flex flex-col xl:flex-row items-center xl:items-start justify-between gap-10 xl:gap-8 2xl:gap-12 relative w-full">
          {/* Левая колонка: форма */}
          <div className="w-full xl:flex-1 max-w-[620px] xl:max-w-[580px] 2xl:max-w-[640px]">
            <CheckoutForm onOrderSuccess={handleOrderSuccess} />
          </div>

          {/* Правая колонка: сводка заказа с достаточной шириной для полного отображения названий блюд */}
          <div className="w-full max-w-[620px] xl:max-w-none xl:w-[490px] 2xl:w-[540px] shrink-0 xl:sticky xl:top-[96px] self-center xl:self-start z-10">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
