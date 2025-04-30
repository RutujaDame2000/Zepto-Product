// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
// import { CreditCard, Bag, Headset, Heart, GeoAlt, PersonCircle } from 'react-bootstrap-icons';
// import '../components/AccountPage.css';

// const AccountPage = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         // Don't go to /login — you don't have such route
//         navigate('/'); // or show login popup again
//         return;
//       }
//       try {
//         const response = await axios.get('/api/profile', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setUser(response.data);
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//         navigate('/'); // go back home or show popup again
//       }
//     };
    

//     fetchUserProfile();
//   }, [navigate]);

//   if (!user) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading Account Details...</div>;

//   return (
//     <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
//       <Card style={{ width: '95%', maxWidth: '1200px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)', borderRadius: '20px', overflow: 'hidden', marginTop: '20px', marginBottom: '20px' }}>
//         <Row>
//           {/* Sidebar */}
//           <Col md={4} className="p-4" style={{ backgroundColor: '#fafafa', borderRight: '1px solid #eee' }}>
//             <div className="text-center">
//               <img
//                 src={user.profileImage || '/Profile_image.jpg'}
//                 alt="Profile"
//                 className="rounded-circle mb-3"
//                 style={{ width: '80px', height: '80px', objectFit: 'cover' }}
//               />
//               <h5>{user.name || 'New User'}</h5>
//               <p className="text-muted">{user.phone}</p>
//             </div>

//             {/* Zepto Cash Card */}
//             <Card className="my-3 p-2" style={{ border: '1px solid #eee', backgroundColor: '#fff', borderRadius: '12px', cursor: 'pointer' }} onClick={() => navigate('/wallet')}>
//   <Card.Body className="p-2 d-flex justify-content-between align-items-center">
//     <div className="d-flex align-items-center gap-2">
//       <CreditCard size={20} color="purple" />
//       <strong style={{ fontSize: '14px' }}>Zepto Cash & Gift Card</strong>
//     </div>
//     <div>
//       <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'gray' }}>➔</span> {/* Right Arrow */}
//     </div>
//   </Card.Body>
// </Card>

//             {/* Menu List */}
//             <ListGroup variant="flush" className="mt-4">
//               <ListGroup.Item action className="d-flex align-items-center gap-2">
//                 <Bag /> Orders
//               </ListGroup.Item>
//               <ListGroup.Item action className="d-flex align-items-center gap-2">
//                 <Headset /> Customer Support
//               </ListGroup.Item>
//               <ListGroup.Item action className="d-flex align-items-center gap-2">
//                 <Heart /> Manage Referrals
//               </ListGroup.Item>
//               <ListGroup.Item action className="d-flex align-items-center gap-2">
//                 <GeoAlt /> Addresses
//               </ListGroup.Item>
//               <ListGroup.Item action className="d-flex align-items-center gap-2">
//                 <PersonCircle /> Profile
//               </ListGroup.Item>
//               <ListGroup.Item action className="text-danger text-center" onClick={() => {
//                 localStorage.clear();
//                 navigate('/');
//               }}>
//                 🚪 Log Out
//               </ListGroup.Item>
//             </ListGroup>
//           </Col>

//           {/* Main Content - Orders */}
//           <Col md={8} className="p-4" style={{ backgroundColor: '#fff' }}>
//             <h4 className="mb-4">Orders</h4>
//             <Row>
//               {user.orders && user.orders.length > 0 ? (
//                 user.orders.map(order => (
//                   <Col md={12} key={order._id} className="mb-3">
//                     <Card className="shadow-sm" style={{ borderRadius: '12px', backgroundColor: '#f9f9f9' }}>
//                       <Card.Body className="d-flex justify-content-between align-items-center">
//                         <div>
//                           <h6>{order.status === 'Delivered' ? 'Order delivered ✅' : 'Order cancelled ❌'}</h6>
//                           <p className="text-muted" style={{ fontSize: '12px' }}>Placed on {order.date}</p>
//                         </div>
//                         <h5>₹{order.amount}</h5>
//                       </Card.Body>
//                     </Card>
//                   </Col>
//                 ))
//               ) : (
//                 <p>No recent orders found.</p>
//               )}
//             </Row>
//           </Col>
//         </Row>
//       </Card>
//     </Container>
//   );
// };

// export default AccountPage;



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import {
  CreditCard, Bag, Headset, Heart, GeoAlt, PersonCircle,
} from 'react-bootstrap-icons';
import '../components/AccountPage.css'; // Custom styles

const AccountPage = () => {
  const [user, setUser] = useState(null); // Store logged-in user data
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        // 🔒 No token = not logged in
        alert("Session expired. Please login again.");
        navigate('/');
        return;
      }

      try {
        // ✅ Fetch user profile using token
        const response = await axios.get('/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // ✅ Set user details
        setUser(response.data);
      } catch (error) {
        console.error('❌ Error fetching profile:', error);
        alert("Unable to fetch profile. Please login again.");
        navigate('/');
      }
    };

    fetchUserProfile();
  }, [navigate]);

  // ⏳ Show loading message while fetching user data
  if (!user) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        Loading Account Details...
      </div>
    );
  }

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
      <Card
        style={{
          width: '95%',
          maxWidth: '1200px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
          borderRadius: '20px',
          overflow: 'hidden',
          marginTop: '20px',
          marginBottom: '20px',
        }}
      >
        <Row>
          {/* 📌 Sidebar Panel */}
          <Col md={4} className="p-4" style={{ backgroundColor: '#fafafa', borderRight: '1px solid #eee' }}>
            <div className="text-center">
              <img
                src={user.profileImage || '/Profile_image.jpg'}
                alt="Profile"
                className="rounded-circle mb-3"
                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
              />
              <h5>{user.name || 'New User'}</h5>
              <p className="text-muted">{user.phone}</p>
            </div>

            {/* 💰 Zepto Cash Card */}
            <Card
              className="my-3 p-2"
              style={{
                border: '1px solid #eee',
                backgroundColor: '#fff',
                borderRadius: '12px',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/wallet')}
            >
              <Card.Body className="p-2 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <CreditCard size={20} color="purple" />
                  <strong style={{ fontSize: '14px' }}>Zepto Cash & Gift Card</strong>
                </div>
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'gray' }}>➔</span>
              </Card.Body>
            </Card>

            {/* 📋 Menu Items */}
            <ListGroup variant="flush" className="mt-4">
              <ListGroup.Item action className="d-flex align-items-center gap-2">
                <Bag /> Orders
              </ListGroup.Item>
              <ListGroup.Item action className="d-flex align-items-center gap-2">
                <Headset /> Customer Support
              </ListGroup.Item>
              <ListGroup.Item action className="d-flex align-items-center gap-2">
                <Heart /> Manage Referrals
              </ListGroup.Item>
              <ListGroup.Item action className="d-flex align-items-center gap-2">
                <GeoAlt /> Addresses
              </ListGroup.Item>
              <ListGroup.Item action className="d-flex align-items-center gap-2">
                <PersonCircle /> Profile
              </ListGroup.Item>

              {/* 🚪 Logout */}
              <ListGroup.Item
                action
                className="text-danger text-center"
                onClick={() => {
                  localStorage.clear();
                  navigate('/');
                }}
              >
                🚪 Log Out
              </ListGroup.Item>
            </ListGroup>
          </Col>

          {/* 📦 Orders Section */}
          <Col md={8} className="p-4" style={{ backgroundColor: '#fff' }}>
            <h4 className="mb-4">Orders</h4>
            <Row>
              {user.orders && user.orders.length > 0 ? (
                user.orders.map((order) => (
                  <Col md={12} key={order._id} className="mb-3">
                    <Card className="shadow-sm" style={{ borderRadius: '12px', backgroundColor: '#f9f9f9' }}>
                      <Card.Body className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6>
                            {order.status === 'Delivered'
                              ? 'Order delivered ✅'
                              : 'Order cancelled ❌'}
                          </h6>
                          <p className="text-muted" style={{ fontSize: '12px' }}>
                            Placed on {order.date}
                          </p>
                        </div>
                        <h5>₹{order.amount}</h5>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <p>No recent orders found.</p>
              )}
            </Row>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default AccountPage;
