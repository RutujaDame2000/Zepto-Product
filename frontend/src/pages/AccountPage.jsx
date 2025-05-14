// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
// import {
//   CreditCard, Bag, Headset, Heart, GeoAlt, PersonCircle,
// } from 'react-bootstrap-icons';
// import { useCart } from '../context/cartContext';
// import '../components/AccountPage.css';

// const AccountPage = () => {
//   const [user, setUser] = useState(null);
//   const [orders, setOrders] = useState([]);
//   const [alert, setAlert] = useState(false);
//   const navigate = useNavigate();
//   const { addToCart } = useCart();

//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       if (!token) {
//         alert("Session expired. Please login again.");
//         navigate('/');
//         return;
//       }
//       try {
//         const res = await axios.get('/api/profile', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUser(res.data);
//       } catch (error) {
//         console.error('❌ Error fetching profile:', error);
//         alert("Unable to fetch profile. Please login again.");
//         navigate('/');
//       }
//     };

//     const fetchOrderHistory = async () => {
//       try {
//         const res = await axios.get('/api/orderRoute/history/me', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setOrders(res.data.reverse());
//       } catch (err) {
//         console.error("Failed to load order history", err);
//       }
//     };

//     fetchUserProfile();
//     fetchOrderHistory();
//   }, [navigate, token]);

//   const handleReorder = (order) => {
//     if (order.items && order.items.length > 0) {
//       order.items.forEach((item) => {
//         addToCart({
//           _id: item._id || item.name,
//           name: item.name,
//           price: item.price,
//           quantity: item.quantity,
//           image: item.image || '/product.png',
//           weight: item.weight || '',
//         });
//       });
//       setAlert(true);
//       setTimeout(() => setAlert(false), 3000);
//     }
//   };

//   if (!user) {
//     return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading Account Details...</div>;
//   }

//   return (
//     <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
//       <Card style={{ width: '95%', maxWidth: '1200px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)', borderRadius: '20px', overflow: 'hidden', marginTop: '20px', marginBottom: '20px' }}>
//         <Row>
//           {/* LEFT SIDEBAR */}
//           <Col md={4} className="p-4" style={{ backgroundColor: '#fafafa', borderRight: '1px solid #eee' }}>
//             <div className="text-center">
//               <img src={user.profileImage || '/Profile_image.jpg'} alt="Profile" className="rounded-circle mb-3" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
//               <h5>{user.name || 'New User'}</h5>
//               <p className="text-muted">{user.phone}</p>
//             </div>
//             <Card className="my-3 p-2" style={{ border: '1px solid #eee', backgroundColor: '#fff', borderRadius: '12px', cursor: 'pointer' }} onClick={() => navigate('/wallet')}>
//               <Card.Body className="p-2 d-flex justify-content-between align-items-center">
//                 <div className="d-flex align-items-center gap-2">
//                   <CreditCard size={20} color="purple" />
//                   <strong style={{ fontSize: '14px' }}>Zepto Cash & Gift Card</strong>
//                 </div>
//                 <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'gray' }}>➔</span>
//               </Card.Body>
//             </Card>
//             <ListGroup variant="flush" className="mt-4">
//               <ListGroup.Item action className="d-flex align-items-center gap-2"><Bag /> Orders</ListGroup.Item>
//               <ListGroup.Item action className="d-flex align-items-center gap-2"><Headset /> Customer Support</ListGroup.Item>
//               <ListGroup.Item action className="d-flex align-items-center gap-2"><Heart /> Manage Referrals</ListGroup.Item>
//               <ListGroup.Item action className="d-flex align-items-center gap-2"><GeoAlt /> Addresses</ListGroup.Item>
//               <ListGroup.Item action className="d-flex align-items-center gap-2"><PersonCircle /> Profile</ListGroup.Item>
//               <ListGroup.Item action className="text-danger text-center" onClick={() => { localStorage.clear(); navigate('/'); }}>🚪 Log Out</ListGroup.Item>
//             </ListGroup>
//           </Col>

//           {/* RIGHT ORDERS DISPLAY */}
//           <Col md={8} className="p-4" style={{ backgroundColor: '#fff' }}>
//             <h4 className="mb-4">Orders</h4>
//             {alert && <div className="alert alert-success">Items added to cart!</div>}
//             <Row>
//               {orders.length > 0 ? (
//                 orders.map((order, index) => (
//                   <Col md={12} key={index} className="mb-3">
//                     <div className="d-flex justify-content-between align-items-center p-3 rounded shadow-sm" style={{ backgroundColor: '#f7f7f7', border: '1px solid #ddd' }}>
//                       <div className="d-flex align-items-center">
//                         <img src={order.items[0]?.image || "/product.png"} alt="Product" style={{ width: '60px', height: '60px', borderRadius: '10px', marginRight: '15px' }} />
//                         {/* <div>
//                           <strong style={{ color: order.status === 'Delivered' ? '#28a745' : '#dc3545' }}>
//                             Order {order.status.toLowerCase()} {order.status === 'Cancelled' ? '❌' : '✅'}
//                           </strong>
//                           <p className="text-muted mb-1" style={{ fontSize: '13px' }}>
//                             Placed at {new Date(order.date).toLocaleString()}
//                           </p>
//                           <Button size="sm" variant="outline-danger" onClick={() => handleReorder(order)}>Order Again</Button>
//                         </div> */}

//                         <div>
//   <strong style={{ display: "block" }}>
//     Order {order.status.toLowerCase()} {order.status === 'Cancelled' ? '❌' : '✅'}
//   </strong>
//   <p className="text-muted mb-1" style={{ fontSize: '13px' }}>
//     Placed at {new Date(order.date).toLocaleString()}
//   </p>
//   <div>
//     <Button
//   size="sm"
//   variant="outline-danger"
//   className="order-again-btn"
//   onClick={() => handleReorder(order)}
// >
//   Order Again
// </Button>

//   </div>
// </div>

//                       </div>
//                       <div className="fw-bold">₹{order.amount}</div>
//                     </div>
//                   </Col>
//                 ))
//               ) : (
//                 <p>No recent orders found.</p>
//               )}
//             </Row>
//             <div className="text-center mt-3">
//               <Button variant="outline-secondary" size="sm">↓ Load More</Button>
//             </div>
//           </Col>
//         </Row>
//       </Card>
//     </Container>
//   );
// };

// export default AccountPage;

// ✅ Updated AccountPage.jsx with improved 'Order Again' button styling
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, ListGroup, Button } from "react-bootstrap";
import {
  CreditCard,
  Bag,
  Headset,
  Heart,
  GeoAlt,
  PersonCircle,
} from "react-bootstrap-icons";
import { useCart } from "../context/cartContext";
import "../components/AccountPage.css";

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) {
        alert("Session expired. Please login again.");
        navigate("/");
        return;
      }
      try {
        const res = await axios.get("/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (error) {
        console.error("❌ Error fetching profile:", error);
        alert("Unable to fetch profile. Please login again.");
        navigate("/");
      }
    };

    const fetchOrderHistory = async () => {
      try {
        const res = await axios.get("/api/orderRoute/history/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data.reverse());
      } catch (err) {
        console.error("Failed to load order history", err);
      }
    };

    fetchUserProfile();
    fetchOrderHistory();
  }, [navigate, token]);

  const handleReorder = (order) => {
    if (order.items && order.items.length > 0) {
      order.items.forEach((item) => {
        addToCart({
          _id: item._id || item.name,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image || "/product.png",
          weight: item.weight || "",
        });
      });
      setAlert(true);
      setTimeout(() => setAlert(false), 3000);
    }
  };

  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        Loading Account Details...
      </div>
    );
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "90vh" }}
    >
      <Card
        style={{
          width: "95%",
          maxWidth: "1200px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          borderRadius: "20px",
          overflow: "hidden",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <Row>
          {/* LEFT SIDEBAR */}
          <Col
            md={4}
            className="p-4"
            style={{
              backgroundColor: "#fafafa",
              borderRight: "1px solid #eee",
            }}
          >
            <div className="text-center">
              <img
                src={user.profileImage || "/Profile_image.jpg"}
                alt="Profile"
                className="rounded-circle mb-3"
                style={{ width: "80px", height: "80px", objectFit: "cover" }}
              />
              <h5>{user.name || "New User"}</h5>
              <p className="text-muted">{user.phone}</p>
            </div>
            <Card
              className="my-3 p-2"
              style={{
                border: "1px solid #eee",
                backgroundColor: "#fff",
                borderRadius: "12px",
                cursor: "pointer",
              }}
              onClick={() => navigate("/wallet")}
            >
              <Card.Body className="p-2 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <CreditCard size={20} color="purple" />
                  <strong style={{ fontSize: "14px" }}>
                    Zepto Cash & Gift Card
                  </strong>
                </div>
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "gray",
                  }}
                >
                  ➔
                </span>
              </Card.Body>
            </Card>
            <ListGroup variant="flush" className="mt-4">
              <ListGroup.Item
                action
                className="d-flex align-items-center gap-2"
              >
                <Bag /> Orders
              </ListGroup.Item>
              <ListGroup.Item
                action
                className="d-flex align-items-center gap-2"
              >
                <Headset /> Customer Support
              </ListGroup.Item>
              <ListGroup.Item
                action
                className="d-flex align-items-center gap-2"
              >
                <Heart /> Manage Referrals
              </ListGroup.Item>
              <ListGroup.Item
                action
                className="d-flex align-items-center gap-2"
              >
                <GeoAlt /> Addresses
              </ListGroup.Item>
              <ListGroup.Item
                action
                className="d-flex align-items-center gap-2"
              >
                <PersonCircle /> Profile
              </ListGroup.Item>
              <ListGroup.Item
                action
                className="text-danger text-center"
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                }}
              >
                🚪 Log Out
              </ListGroup.Item>
            </ListGroup>
          </Col>

          {/* RIGHT ORDERS DISPLAY */}
          <Col md={8} className="p-4" style={{ backgroundColor: "#fff" }}>
            <h4 className="mb-4">Orders</h4>
            {alert && (
              <div className="alert alert-success">Items added to cart!</div>
            )}
            <Row>
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <Col md={12} key={index} className="mb-3">
                    <div
                      className="d-flex justify-content-between align-items-center p-3 rounded shadow-sm"
                      style={{
                        backgroundColor: "#f7f7f7",
                        border: "1px solid #ddd",
                      }}
                    >
                      <div className="d-flex align-items-center">
                        <img
                          src={order.items[0]?.image || "/product.png"}
                          alt="Product"
                          style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "10px",
                            marginRight: "15px",
                          }}
                        />
                        <div>
                          <strong style={{ display: "block" }}>
                            Order {order.status.toLowerCase()}{" "}
                            {order.status === "Cancelled" ? "❌" : "✅"}
                          </strong>
                          <p
                            className="text-muted mb-1"
                            style={{ fontSize: "13px" }}
                          >
                            Placed at {new Date(order.date).toLocaleString()}
                          </p>
                          <div>
                            <Button
                              size="sm"
                              variant="outline-danger"
                              style={{
                                whiteSpace: "nowrap",
                                padding: "6px 16px",
                                fontSize: "14px",
                                borderRadius: "6px",
                                minWidth: "120px",
                                textAlign: "center",
                                fontWeight: "500",
                              }}
                              onClick={() => handleReorder(order)}
                            >
                              Order Again
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="fw-bold">₹{order.amount}</div>
                    </div>
                  </Col>
                ))
              ) : (
                <p>No recent orders found.</p>
              )}
            </Row>
            <div className="text-center mt-3">
              <Button variant="outline-secondary" size="sm">
                ↓ Load More
              </Button>
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default AccountPage;
