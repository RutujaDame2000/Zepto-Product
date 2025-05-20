import React, { useEffect, useState } from 'react';
import './OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  const API = window.location.hostname === 'localhost'
    ? 'http://localhost:5003/api'
    : process.env.REACT_APP_API_URL || '/api';

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) return;

      try {
        const res = await fetch(`${API}/orderRoute/history/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (res.ok && Array.isArray(data)) {
          setOrders(data.reverse());
        }
      } catch (err) {
        console.error('Failed to load order history:', err);
      }
    };

    fetchOrders();
  }, [token]);

  if (!token) return <p>Please login to view your orders.</p>;

  return (
    <div className="order-history">
      <h2>🧾 My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order, i) => (
          <div key={i} className="order-card">
            <p className="order-status">✅ {order.status || 'Confirmed'}</p>
            <p><strong>Placed:</strong> {new Date(order.date || order.createdAt).toLocaleString()}</p>
            <p><strong>Total:</strong> ₹{order.amount?.toFixed(2) || 0}</p>
            <div className="order-items">
              {order.items.map((item, idx) => (
                <div key={idx} className="item-preview">
                  {/* <img
                    src={item.image || "https://cdn-icons-png.flaticon.com/512/1524/1524855.png"}
                    alt={item.name}
                    className="item-image"
                    style={{
                      width: '60px',
                      height: '60px',
                      objectFit: 'cover',
                      borderRadius: '10px',
                      marginRight: '10px'
                    }}
                  /> */}

                  <img
  src={item.image ? `http://localhost:5003${item.image}` : 'https://cdn-icons-png.flaticon.com/512/1524/1524855.png'}
  alt={item.name}
  className="item-image"
  style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
/>

                  <span>{item.name} × {item.quantity}</span>
                </div>
              ))}
            </div>
            <p className="order-id">Order ID: {new Date(order.date).getTime()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
