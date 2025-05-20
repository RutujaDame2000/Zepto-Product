import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // ✅ Auto-detect API base URL (supports both local dev & Docker)
  const API_BASE = window.location.hostname === 'localhost'
    ? 'http://localhost:5003/api'
    : `${process.env.REACT_APP_API_URL || '/api'}`;

  useEffect(() => {
    const saveOrder = async () => {
      const query = new URLSearchParams(window.location.search);
      const successParam = query.get('success');

      if (successParam === 'true' && !localStorage.getItem('orderSaved')) {
        const rawItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const storedItems = rawItems.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image || '/product.png',
          weight: item.weight || ''
        }));

        const storedTotal = Number(localStorage.getItem('cartTotal')) || 0;
        const token = localStorage.getItem('token');

        if (!token) {
          console.error('❌ No token found in localStorage!');
          setSuccessMessage('❌ You must be logged in to place an order.');
          setLoading(false);
          return;
        }

        try {
          console.log('🔁 Sending order to:', `${API_BASE}/orderRoute/save`);
          console.log('📦 Order items:', storedItems);
          console.log('💰 Total amount:', storedTotal);

          const response = await fetch(`${API_BASE}/orderRoute/save`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ items: storedItems, amount: storedTotal }),
          });

          const data = await response.json();
          if (response.ok && data.success) {
            localStorage.removeItem('cartItems');
            localStorage.removeItem('cartTotal');
            localStorage.setItem('orderSaved', 'true');
            setSuccessMessage('🎉 Your order has been placed successfully!');
          } else {
            setSuccessMessage(`❌ Order saving failed: ${data.message || 'Server error'}`);
          }
        } catch (err) {
          console.error('❌ Fetch error while saving order:', err);
          setSuccessMessage('❌ Order saving failed. Please try again.');
        }
      } else {
        setSuccessMessage('❌ Payment was not successful or already processed.');
      }

      setLoading(false);
    };

    saveOrder();

    return () => {
      localStorage.removeItem('orderSaved');
    };
  }, []);

  return (
    <div className="order-success-container">
      {loading ? (
        <h2>Saving your order...</h2>
      ) : (
        <div className="order-success-box">
          <h1>{successMessage}</h1>
          <button className="btn btn-primary mt-4" onClick={() => navigate('/orders')}>
            View My Orders
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderSuccess;
