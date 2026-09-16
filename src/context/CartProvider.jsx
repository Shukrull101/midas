import React, { useState, useEffect } from 'react';
import { CartContext } from './CartContext';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('midas_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('midas_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Ошибка сохранения корзины в localStorage:', e);
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    if (!product) return;

    const id = product.id ? String(product.id) : `item-${Date.now()}`;
    const title = product.title || product.name || 'Блюдо';
    const price = Number(product.price) || 0;
    const image = product.image || '/hero_salmon.jpg';
    const subtitle = product.subtitle || product.weight || product.category || '';

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => String(item.id) === id);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newCount = updated[existingIndex].count + quantity;
        if (newCount <= 0) {
          return updated.filter((_, idx) => idx !== existingIndex);
        }
        updated[existingIndex] = {
          ...updated[existingIndex],
          count: newCount,
        };
        return updated;
      }

      if (quantity <= 0) return prev;

      return [
        ...prev,
        {
          id,
          title,
          subtitle,
          price,
          image,
          count: quantity,
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => {
      const stringId = String(id);
      const existing = prev.find((item) => String(item.id) === stringId);
      if (!existing) return prev;
      if (existing.count <= 1) {
        return prev.filter((item) => String(item.id) !== stringId);
      }
      return prev.map((item) =>
        String(item.id) === stringId ? { ...item, count: item.count - 1 } : item
      );
    });
  };

  const deleteFromCart = (id) => {
    const stringId = String(id);
    setCartItems((prev) => prev.filter((item) => String(item.id) !== stringId));
  };

  const updateQuantity = (id, count) => {
    const stringId = String(id);
    if (count <= 0) {
      deleteFromCart(stringId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        String(item.id) === stringId ? { ...item, count } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((total, item) => total + (item.count || 0), 0);

  const cartTotal = cartItems.reduce(
    (total, item) => total + (item.price || 0) * (item.count || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        deleteFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
