// src/components/FloatingCartBar.jsx
import React from "react";
import { useCart } from "../context/cartContext";
import { useNavigate } from "react-router-dom";
import "./FloatingCartBar.css";

const FloatingCartBar = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const cartItems = Object.values(cart);
  const totalQty = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cartItems.length === 0) return null;

  return (
    <div className="floating-cart-bar shadow">
      <div className="cart-info">
        <span>🛒 {totalQty} items</span>
        <span className="fw-bold">₹{totalPrice}</span>
      </div>
      <button className="btn btn-primary btn-sm" onClick={() => navigate("/cart")}>
        Proceed to Checkout →
      </button>
    </div>
  );
};

export default FloatingCartBar;
