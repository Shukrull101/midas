import React, { useState, useEffect, useRef, useCallback } from 'react';

const OrderSuccessModal = ({ isOpen, onClose, orderData }) => {
  const [isClosing, setIsClosing] = useState(false);
  const timerRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  const triggerClose = useCallback(() => {
    setIsClosing(true);
    closeTimeoutRef.current = setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 280);
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';

    // Автоматическое закрытие через 2 секунды после появления
    timerRef.current = setTimeout(() => {
      triggerClose();
    }, 2000);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') triggerClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, [isOpen, triggerClose]);

  if (!isOpen && !isClosing) return null;

  return (
    <div
      className={`fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm ${
        isClosing ? 'animate-backdrop-out' : 'animate-backdrop-in'
      }`}
      onClick={triggerClose}
    >
      {/* Модальное окно со скруглениями */}
      <div
        className={`bg-[#070D1E] border border-[#1E2C48] p-8 sm:p-10 rounded-[24px] max-w-[420px] w-full text-center relative shadow-[0_25px_60px_rgba(0,0,0,0.9)] font-['Montserrat',sans-serif] ${
          isClosing ? 'animate-modal-hide' : 'animate-modal-pop'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Кнопка закрытия (крестик) */}
        <button
          type="button"
          onClick={triggerClose}
          className="absolute top-4 right-4 text-[#9EA2AA] hover:text-white transition-colors cursor-pointer p-2 rounded-full"
          aria-label="Закрыть"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Анимированная галочка */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 60 60" fill="none">
              {/* Фоновый легкий контур круга */}
              <circle cx="30" cy="30" r="26" stroke="#FBD13E" strokeWidth="2.5" opacity="0.15" />
              {/* Анимированный круг */}
              <circle
                cx="30"
                cy="30"
                r="26"
                stroke="#FBD13E"
                strokeWidth="3.5"
                strokeLinecap="round"
                className="animate-check-circle"
                style={{ transformOrigin: 'center', transform: 'rotate(-90deg)' }}
              />
              {/* Анимированная галочка */}
              <path
                d="M18 31L26 39L43 22"
                stroke="#FBD13E"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-check-mark"
              />
            </svg>
          </div>
        </div>

        {/* Текст "Заказ принят" */}
        <h3 className="text-2xl sm:text-[28px] font-bold text-white tracking-tight mb-3">
          Заказ принят
        </h3>

        {/* Поясняющий текст */}
        <p className="text-[#9EA2AA] text-xs sm:text-sm leading-relaxed">
          {orderData?.name ? `${orderData.name}, спасибо! ` : 'Спасибо! '}
          Мы свяжемся с вами в течение 10 минут для подтверждения.
        </p>
      </div>
    </div>
  );
};

export default OrderSuccessModal;
