// src/context/CartContext.jsx
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  const addToCart = (product) => {
    setCart((prev) => ({
      ...prev,
      [product._id]: {
        ...product,
        quantity: (prev[product._id]?.quantity || 0) + 1,
      },
    }));
  };

  const removeFromCart = (productId) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (updated[productId]?.quantity > 1) {
        updated[productId].quantity -= 1;
      } else {
        delete updated[productId];
      }
      return updated;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
