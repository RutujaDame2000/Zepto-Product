// // File: context/cartContext.js
// import React, { createContext, useContext, useState } from "react";

// const CartContext = createContext();
// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState({});

// const addToCart = (product) => {
//   setCart((prev) => {
//     const existingQty = prev[product._id]?.quantity || 0;

//     // Convert stock safely to number
//     const availableStock = typeof product.stock === "string"
//       ? parseInt(product.stock)
//       : product.stock ?? 0;

//     if (existingQty >= availableStock) {
//       alert("❌ Product stock limit reached. No more items can be added.");
//       return prev;
//     }

//     return {
//       ...prev,
//       [product._id]: {
//         ...product,
//         price: typeof product.price === "string"
//           ? parseFloat(product.price.replace(/[^\d.]/g, ""))
//           : product.price,
//         quantity: existingQty + 1,
//       },
//     };
//   });
// };

//   const removeFromCart = (productId) => {
//     setCart((prev) => {
//       const updated = { ...prev };
//       if (updated[productId]?.quantity > 1) {
//         updated[productId].quantity -= 1;
//       } else {
//         delete updated[productId];
//       }
//       return updated;
//     });
//   };

//   const increaseQuantity = (productId) => {
//     setCart((prev) => {
//       const item = prev[productId];
//       if (!item) return prev;

//       if (item.quantity >= item.stock) {
//         alert("❌ Product stock limit reached. No more items can be added.");
//         return prev;
//       }

//       return {
//         ...prev,
//         [productId]: {
//           ...item,
//           quantity: item.quantity + 1,
//         },
//       };
//     });
//   };

//   const decreaseQuantity = (productId) => {
//     setCart((prev) => {
//       const updated = { ...prev };
//       if (updated[productId]?.quantity > 1) {
//         updated[productId].quantity -= 1;
//       } else {
//         delete updated[productId];
//       }
//       return updated;
//     });
//   };

//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };


import React, { createContext, useContext, useState } from "react";

// Create Cart Context
const CartContext = createContext();

// Custom Hook to use Cart
export const useCart = () => useContext(CartContext);

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  // ✅ Add to Cart Logic
 const addToCart = (product) => {
  setCart((prev) => {
    const existingQty = prev[product._id]?.quantity || 0;

    // Fix: fallback to 1 if stock is undefined/null/NaN
    const stock =
      typeof product.stock === "string"
        ? parseInt(product.stock)
        : typeof product.stock === "number"
        ? product.stock
        : 1;

    if (existingQty >= stock) {
      alert("❌ Product stock limit reached. No more items can be added.");
      return prev;
    }

    return {
      ...prev,
      [product._id]: {
        ...product,
        price:
          typeof product.price === "string"
            ? parseFloat(product.price.replace(/[^\d.]/g, ""))
            : product.price,
        quantity: existingQty + 1,
      },
    };
  });
};

  // ✅ Remove from Cart Logic
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

  // ✅ Optional: Clear Cart
  const clearCart = () => {
    setCart({});
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
