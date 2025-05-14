
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  const addToCart = (product) => {
    setCart((prev) => {
      const existingQty = prev[product._id]?.quantity || 0;

      if (existingQty >= product.stock) {
        alert("❌ Product stock limit reached. No more items can be added.");
        return prev;
      }

      return {
        ...prev,
        [product._id]: {
          ...product,
          price: typeof product.price === "string"
            ? parseFloat(product.price.replace(/[^\d.]/g, ""))
            : product.price,
          quantity: existingQty + 1,
        },
      };
    });
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
