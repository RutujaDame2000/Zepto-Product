// ✅ OrderSuccess.jsx (with duplicate prevention)
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const saveOrder = async () => {
      const query = new URLSearchParams(window.location.search);
      const successParam = query.get('success');

      // ✅ Prevent duplicate saves
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

        try {
          const response = await fetch('/api/orderRoute/save', {
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
            localStorage.setItem('orderSaved', 'true'); // ✅ set flag
            setSuccessMessage('🎉 Your order has been placed successfully!');
          } else {
            setSuccessMessage(`❌ Order saving failed: ${data.message || 'Server error'}`);
          }
        } catch (err) {
          console.error('❌ Fetch error:', err);
          setSuccessMessage('❌ Order saving failed. Please try again.');
        }
      } else {
        setSuccessMessage('❌ Payment was not successful or already processed.');
      }

      setLoading(false);
    };

    saveOrder();

    // ✅ Cleanup on unmount
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