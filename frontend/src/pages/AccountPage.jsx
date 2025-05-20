
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
  const API = window.location.hostname === 'localhost'
    ? 'http://localhost:5003/api'
    : process.env.REACT_APP_API_URL || '/api';

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
        const res = await axios.get(`${API}/profile`, {
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
        const res = await axios.get(`${API}/orderRoute/history/me`, {
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
        const cartItem = {
          _id: item._id || `${item.name}-${Date.now()}`,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image || "/product.png",
          weight: item.weight || "",
        };
        addToCart(cartItem);
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
            <Card className="my-3 p-2" style={{ border: "1px solid #eee", borderRadius: "12px", backgroundColor: "#fff" }}>
              <Card.Body className="p-2 d-flex justify-content-between align-items-center" onClick={() => navigate("/wallet")}>
                <div className="d-flex align-items-center gap-2">
                  <CreditCard size={20} color="purple" />
                  <strong style={{ fontSize: "14px" }}>Zepto Cash & Gift Card</strong>
                </div>
                <span style={{ fontSize: "18px", fontWeight: "bold", color: "gray" }}>➔</span>
              </Card.Body>
            </Card>
            <ListGroup variant="flush" className="mt-4">
              <ListGroup.Item action className="d-flex align-items-center gap-2"><Bag /> Orders</ListGroup.Item>
              <ListGroup.Item action className="d-flex align-items-center gap-2"><Headset /> Customer Support</ListGroup.Item>
              <ListGroup.Item action className="d-flex align-items-center gap-2"><Heart /> Manage Referrals</ListGroup.Item>
              <ListGroup.Item action className="d-flex align-items-center gap-2"><GeoAlt /> Addresses</ListGroup.Item>
              <ListGroup.Item action className="d-flex align-items-center gap-2"><PersonCircle /> Profile</ListGroup.Item>
              <ListGroup.Item action className="text-danger text-center" onClick={() => { localStorage.clear(); navigate("/"); }}>
                🚪 Log Out
              </ListGroup.Item>
            </ListGroup>
          </Col>

          {/* RIGHT ORDERS DISPLAY */}
          <Col md={8} className="p-4" style={{ backgroundColor: "#fff" }}>
            <h4 className="mb-4">Orders</h4>
            {alert && <div className="alert alert-success">Items added to cart!</div>}
            <Row>
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <Col md={12} key={index} className="mb-3">
                    <div
                      className="p-3 rounded shadow-sm"
                      style={{
                        backgroundColor: "#f7f7f7",
                        border: "1px solid #ddd",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <div>
                        <div className="d-flex align-items-center mb-2">
                          {order.items.map((item, idx) => (
                            // <img
                            //   key={idx}
                            //   src={item.image || "/product.png"}
                            //   alt={item.name}
                            //   title={`${item.name} × ${item.quantity}`}
                            //   style={{
                            //     width: "50px",
                            //     height: "50px",
                            //     borderRadius: "8px",
                            //     marginRight: "8px",
                            //     objectFit: "cover",
                            //   }}
                            // />

                            <img
  src={item.image ? `http://localhost:5003${item.image}` : 'https://cdn-icons-png.flaticon.com/512/1524/1524855.png'}
  alt={item.name}
  className="item-image"
  style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
/>

                          ))}
                        </div>
                        <strong>
                          Order {order.status.toLowerCase()}{" "}
                          {order.status === "Cancelled" ? "❌" : "✅"}
                        </strong>
                        <p className="text-muted" style={{ fontSize: "13px" }}>
                          Placed at {new Date(order.date).toLocaleString()}
                        </p>
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
                      <div className="fw-bold fs-5">₹{order.amount}</div>
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
