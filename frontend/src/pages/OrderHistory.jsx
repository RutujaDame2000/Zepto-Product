import React, { useEffect, useState } from 'react';
import './OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orderRoute/history/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (res.ok) setOrders(data.reverse());
      } catch (err) {
        console.error('Failed to load order history:', err);
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <div className="order-history">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order, i) => (
          <div key={i} className="order-card">
            <p className="order-status">🛒 {order.status}</p>
            <p><strong>Placed:</strong> {new Date(order.date).toLocaleString()}</p>
            <p><strong>Total:</strong> ₹{order.amount.toFixed(2)}</p>
            <div className="order-items">
              {order.items.map((item, idx) => (
                <div key={idx} className="item-preview">
                  <img
                    src={item.image || "/default-product.png"}
                    alt={item.name}
                    className="item-image"
                  />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
            <button className="reorder-btn">Order Again</button>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
