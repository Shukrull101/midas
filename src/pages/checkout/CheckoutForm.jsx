import React, { useState } from 'react';

const CheckoutForm = ({ onOrderSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    persons: '1',
    deliveryType: 'delivery', // 'delivery' | 'pickup'
    street: '',
    house: '',
    apartment: '',
    comment: '',
    paymentMethod: 'cards', // 'cards' | 'cash' | 'card_courier'
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Фильтрация ввода только цифр для количества персон
  const handlePersonsChange = (e) => {
    const onlyDigits = e.target.value.replace(/\D/g, '').slice(0, 2);
    handleChange('persons', onlyDigits);
  };

  // Фильтрация ввода только цифр для квартиры
  const handleApartmentChange = (e) => {
    const onlyDigits = e.target.value.replace(/\D/g, '').slice(0, 5);
    handleChange('apartment', onlyDigits);
  };

  // Маска и ввод только цифр для телефона
  const handlePhoneChange = (e) => {
    const rawDigits = e.target.value.replace(/\D/g, '');
    let formatted = '';
    const digits = rawDigits.startsWith('7') || rawDigits.startsWith('8')
      ? rawDigits.slice(1)
      : rawDigits;

    if (rawDigits.length > 0) {
      formatted = '+7 (';
      if (digits.length > 0) formatted += digits.substring(0, 3);
      if (digits.length >= 3) formatted += ') ' + digits.substring(3, 6);
      if (digits.length >= 6) formatted += '-' + digits.substring(6, 8);
      if (digits.length >= 8) formatted += '-' + digits.substring(8, 10);
    }
    handleChange('phone', formatted);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onOrderSuccess) {
      onOrderSuccess(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 w-full max-w-[620px] xl:max-w-[660px] space-y-10 sm:space-y-12 font-['Montserrat',sans-serif]">
      {/* ================= 01. КОНТАКТНЫЕ ДАННЫЕ ================= */}
      <section>
        <div className="border-b border-[#2A3448] pb-3 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-[25px] font-medium text-white tracking-normal leading-snug">
            01. Контактные данные
          </h2>
        </div>

        {/* Подсказка для авторизованных */}
        <div className="mb-6 ml-0 sm:ml-36 lg:ml-40">
          <p className="text-white text-sm sm:text-[15px] font-medium mb-1">
            Уже покупали у нас?
          </p>
          <p className="text-[#9EA2AA] text-xs sm:text-[12px] leading-relaxed font-medium">
            <button
              type="button"
              className="text-[#9EA2AA] hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
            >
              Войдите в личный кабинет
            </button>
            , и все ваши данные автоматически заполнятся
          </p>
        </div>

        <div className="space-y-4">
          {/* ИМЯ */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-6">
            <label className="sm:w-32 lg:w-36 text-xs sm:text-[13px] tracking-[0.65px] text-[#9EA2AA] font-medium sm:text-right uppercase shrink-0">
              Имя *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full sm:w-[360px] h-[42px] bg-white text-black px-3.5 text-sm rounded-none focus:outline-none focus:ring-2 focus:ring-[#FBD13E]"
            />
          </div>

          {/* ТЕЛЕФОН */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-6">
            <label className="sm:w-32 lg:w-36 text-xs sm:text-[13px] tracking-[0.65px] text-[#9EA2AA] font-medium sm:text-right uppercase shrink-0">
              Телефон *
            </label>
            <input
              type="tel"
              inputMode="tel"
              required
              placeholder="+7 (___) ___-__-__"
              value={formData.phone}
              onChange={handlePhoneChange}
              className="w-full sm:w-[360px] h-[42px] bg-white text-black px-3.5 text-sm rounded-none focus:outline-none focus:ring-2 focus:ring-[#FBD13E]"
            />
          </div>

          {/* EMAIL */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-6">
            <label className="sm:w-32 lg:w-36 text-xs sm:text-[13px] tracking-[0.65px] text-[#9EA2AA] font-medium sm:text-right uppercase shrink-0">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full sm:w-[360px] h-[42px] bg-white text-black px-3.5 text-sm rounded-none focus:outline-none focus:ring-2 focus:ring-[#FBD13E]"
            />
          </div>

          {/* КОЛ-ВО ПЕРСОН */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-6">
            <label className="sm:w-32 lg:w-36 text-xs sm:text-[13px] tracking-[0.65px] text-[#9EA2AA] font-medium sm:text-right uppercase shrink-0">
              кол-во персон
            </label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={formData.persons}
              onChange={handlePersonsChange}
              onBlur={() => {
                if (!formData.persons || parseInt(formData.persons, 10) < 1) {
                  handleChange('persons', '1');
                }
              }}
              className="w-24 sm:w-[107px] h-[42px] bg-white text-black px-3 text-sm rounded-none text-center focus:outline-none focus:ring-2 focus:ring-[#FBD13E]"
            />
          </div>
        </div>
      </section>

      {/* ================= 02. СПОСОБ ДОСТАВКИ ================= */}
      <section>
        <div className="border-b border-[#2A3448] pb-3 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-[25px] font-medium text-white tracking-normal leading-snug">
            02. Способ доставки
          </h2>
        </div>

        {/* Выбор тарифа доставки: гибкая адаптивная сетка */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-8">
          {/* Бесконтактная доставка */}
          <div
            onClick={() => handleChange('deliveryType', 'delivery')}
            className={`cursor-pointer w-full min-h-[140px] p-5 sm:p-6 transition-all flex flex-col justify-between ${
              formData.deliveryType === 'delivery'
                ? 'border-2 border-dashed border-[#FBD13E] bg-[#070D1E]'
                : 'border border-[#9EA2AA]/60 bg-[#070D1E] hover:border-[#9EA2AA]'
            }`}
          >
            <div className="flex items-baseline justify-between gap-2 mb-2">
              <span className="text-white text-sm sm:text-base font-semibold">
                Бесконтактная доставка
              </span>
              <span className="text-white font-bold text-base sm:text-lg whitespace-nowrap">
                300 ₽
              </span>
            </div>
            <p className="text-[#9EA2AA] text-[11px] sm:text-[12px] leading-[17px] sm:leading-[18px] font-medium">
              Доставка по Москве в пределах МКАД
              <br />
              Осуществляется: ежедневно с 12:00 до 00:00,
              <br />
              Диапазон времени: от 1 до 1.5 часов
            </p>
          </div>

          {/* Самовывоз */}
          <div
            onClick={() => handleChange('deliveryType', 'pickup')}
            className={`cursor-pointer w-full min-h-[140px] p-5 sm:p-6 transition-all flex flex-col justify-between ${
              formData.deliveryType === 'pickup'
                ? 'border-2 border-dashed border-[#FBD13E] bg-[#070D1E]'
                : 'border border-[#9EA2AA]/60 bg-[#070D1E] hover:border-[#9EA2AA]'
            }`}
          >
            <div className="flex items-baseline justify-between gap-2 mb-2">
              <span className="text-white text-sm sm:text-base font-semibold">
                Самовывоз
              </span>
              <span className="text-white font-bold text-base sm:text-lg whitespace-nowrap">
                +0 ₽
              </span>
            </div>
            <p className="text-[#9EA2AA] text-[11px] sm:text-[12px] leading-[17px] sm:leading-[18px] font-medium">
              Доступен с 12:00 до 00:00
              <br />
              По адресу{' '}
              <span className="text-white underline underline-offset-2">
                ул. Улофа Пальме 5с2
              </span>
            </p>
          </div>
        </div>

        {/* Адрес доставки */}
        {formData.deliveryType === 'delivery' && (
          <div className="space-y-4">
            <div className="text-xs sm:text-[13px] tracking-[0.65px] text-white font-medium mb-3 sm:ml-36 lg:ml-40">
              Адрес доставки
            </div>

            {/* УЛИЦА */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-6">
              <label className="sm:w-32 lg:w-36 text-xs sm:text-[13px] tracking-[0.65px] text-[#9EA2AA] font-medium sm:text-right uppercase shrink-0">
                Улица
              </label>
              <input
                type="text"
                required={formData.deliveryType === 'delivery'}
                value={formData.street}
                onChange={(e) => handleChange('street', e.target.value)}
                className="w-full sm:w-[360px] h-[42px] bg-white text-black px-3.5 text-sm rounded-none focus:outline-none focus:ring-2 focus:ring-[#FBD13E]"
              />
            </div>

            {/* ДОМ и КВАРТИРА */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-6">
              <label className="sm:w-32 lg:w-36 text-xs sm:text-[13px] tracking-[0.65px] text-[#9EA2AA] font-medium sm:text-right uppercase shrink-0">
                дом
              </label>
              <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-[360px]">
                <input
                  type="text"
                  required={formData.deliveryType === 'delivery'}
                  value={formData.house}
                  onChange={(e) => handleChange('house', e.target.value)}
                  className="w-full sm:w-[107px] h-[42px] bg-white text-black px-3.5 text-sm rounded-none focus:outline-none focus:ring-2 focus:ring-[#FBD13E]"
                />
                <label className="text-xs sm:text-[13px] tracking-[0.65px] text-[#9EA2AA] font-medium uppercase shrink-0">
                  квартира
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={formData.apartment}
                  onChange={handleApartmentChange}
                  className="w-full sm:w-[107px] h-[42px] bg-white text-black px-3.5 text-sm rounded-none focus:outline-none focus:ring-2 focus:ring-[#FBD13E]"
                />
              </div>
            </div>

            {/* КОММЕНТАРИЙ К ЗАКАЗУ */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-1.5 sm:gap-6 pt-1">
              <label className="sm:w-32 lg:w-36 text-xs sm:text-[13px] tracking-[0.65px] text-[#9EA2AA] font-medium sm:text-right uppercase sm:pt-2 shrink-0">
                Комментарий к заказу
              </label>
              <textarea
                rows="4"
                value={formData.comment}
                onChange={(e) => handleChange('comment', e.target.value)}
                className="w-full sm:w-[360px] h-[96px] bg-white text-black p-3 text-sm rounded-none focus:outline-none focus:ring-2 focus:ring-[#FBD13E] resize-none"
              />
            </div>
          </div>
        )}
      </section>

      {/* ================= 03. ОПЛАТА ================= */}
      <section>
        <div className="border-b border-[#2A3448] pb-3 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-[25px] font-medium text-white tracking-normal leading-snug">
            03. Оплата
          </h2>
        </div>

        <div className="space-y-4 mb-8 sm:mb-10">
          {/* Вариант 1: Карты / Электронные деньги */}
          <div
            onClick={() => handleChange('paymentMethod', 'cards')}
            className={`cursor-pointer w-full p-5 sm:p-6 transition-all flex flex-col gap-3.5 ${
              formData.paymentMethod === 'cards'
                ? 'border-2 border-dashed border-[#FBD13E] bg-[#070D1E]'
                : 'border border-[#9EA2AA]/60 bg-[#070D1E] hover:border-[#9EA2AA]'
            }`}
          >
            <div className="flex items-center gap-3.5">
              {/* Радио-кнопка */}
              <div className="w-5 h-5 rounded-full border border-[#FBD13E] flex items-center justify-center shrink-0">
                {formData.paymentMethod === 'cards' && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FBD13E]" />
                )}
              </div>
              <span className="text-white text-sm sm:text-base lg:text-[18px] font-medium leading-snug">
                Банковские карты / Электронные деньги / Другое
              </span>
            </div>

            {/* Иконки платежных систем: строго под заголовком со сдвигом, адаптивно оборачиваются без обрезания */}
            <div className="flex flex-wrap items-center gap-3 pl-8 sm:pl-9 pt-1">
              <img src="/payment/pay_mastercard.png" alt="Mastercard" className="h-5 sm:h-6 w-auto object-contain shrink-0" />
              <img src="/payment/pay_gpay.png" alt="Google Pay" className="h-5 sm:h-6 w-auto object-contain shrink-0" />
              <img src="/payment/pay_visa.png" alt="Visa" className="h-4 sm:h-5 w-auto object-contain shrink-0" />
              <img src="/payment/pay_applepay.svg" alt="Apple Pay" className="h-5 sm:h-6 w-auto object-contain shrink-0" />
              <img src="/payment/pay_mir.png" alt="Мир" className="h-4 sm:h-5 w-auto object-contain shrink-0" />
            </div>
          </div>

          {/* Вариант 2: Наличными курьеру */}
          <div
            onClick={() => handleChange('paymentMethod', 'cash')}
            className={`cursor-pointer w-full p-5 sm:p-6 transition-all flex items-center gap-3.5 ${
              formData.paymentMethod === 'cash'
                ? 'border-2 border-dashed border-[#FBD13E] bg-[#070D1E]'
                : 'border border-[#9EA2AA]/60 bg-[#070D1E] hover:border-[#9EA2AA]'
            }`}
          >
            <div className="w-5 h-5 rounded-full border border-gray-500 flex items-center justify-center shrink-0">
              {formData.paymentMethod === 'cash' && (
                <div className="w-2.5 h-2.5 rounded-full bg-[#FBD13E]" />
              )}
            </div>
            <span className="text-white text-sm sm:text-base lg:text-[18px] font-medium">
              Наличными курьеру
            </span>
          </div>

          {/* Вариант 3: Картой курьеру */}
          <div
            onClick={() => handleChange('paymentMethod', 'card_courier')}
            className={`cursor-pointer w-full p-5 sm:p-6 transition-all flex items-center gap-3.5 ${
              formData.paymentMethod === 'card_courier'
                ? 'border-2 border-dashed border-[#FBD13E] bg-[#070D1E]'
                : 'border border-[#9EA2AA]/60 bg-[#070D1E] hover:border-[#9EA2AA]'
            }`}
          >
            <div className="w-5 h-5 rounded-full border border-gray-500 flex items-center justify-center shrink-0">
              {formData.paymentMethod === 'card_courier' && (
                <div className="w-2.5 h-2.5 rounded-full bg-[#FBD13E]" />
              )}
            </div>
            <span className="text-white text-sm sm:text-base lg:text-[18px] font-medium">
              Картой курьеру
            </span>
          </div>
        </div>

        {/* Кнопка отправки */}
        <div>
          <button
            type="submit"
            className="w-full sm:w-[234px] h-[46px] sm:h-[42px] bg-[#FBD13E] text-black font-bold text-xs sm:text-[13px] tracking-[1.3px] uppercase rounded-none hover:bg-[#ebd532] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center shadow-lg"
          >
            Подтвердить заказ
          </button>
        </div>
      </section>
    </form>
  );
};

export default CheckoutForm;
