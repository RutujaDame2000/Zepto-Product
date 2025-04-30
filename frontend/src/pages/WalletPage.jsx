// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
// import { CreditCard, Bag, Headset, Heart, GeoAlt, PersonCircle, Lightning, CurrencyRupee, Gift } from 'react-bootstrap-icons';

// const WalletPage = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       try {
//         setUser(JSON.parse(storedUser));
//       } catch (error) {
//         console.error('Error parsing user data:', error);
//         localStorage.removeItem('user');
//       }
//     }
//   }, []);

//   if (!user) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading Account Details...</div>;

//   return (
//     <Container className="d-flex justify-content-center align-items-start" style={{ minHeight: '90vh', marginTop: '30px' }}>
//       <Card style={{ width: '95%', maxWidth: '1200px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)', borderRadius: '20px', overflow: 'hidden' }}>
//         <Row style={{ minHeight: '80vh' }}>
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
//             <Card className="my-3 p-2" style={{ border: '1px solid #eee', backgroundColor: '#fff', borderRadius: '12px' }}>
//               <Card.Body className="p-2 d-flex justify-content-between align-items-center">
//                 <div className="d-flex align-items-center gap-2">
//                   <CreditCard size={20} color="purple" />
//                   <strong style={{ fontSize: '14px' }}>Zepto Cash & Gift Card</strong>
//                 </div>
//               </Card.Body>
//             </Card>

//             {/* Menu List */}
//             <ListGroup variant="flush" className="mt-4">
//               <ListGroup.Item action className="d-flex align-items-center gap-2" onClick={() => navigate('/account')}>
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
//                 navigate('/login');
//               }}>
//                 🚪 Log Out
//               </ListGroup.Item>
//             </ListGroup>
//           </Col>

//           {/* Wallet Section */}
//           <Col md={8} className="p-4" style={{ backgroundColor: '#fff' }}>
//             {/* Purple Balance Card */}
//             <div style={{ background: 'linear-gradient(to right, #8a2be2, #9b30ff)', borderRadius: '15px', padding: '20px', color: 'white', marginBottom: '20px' }}>
//               <h5>Available Balance</h5>
//               <h2>₹{user.cashBalance || 0}</h2>
//               <div className="d-flex justify-content-around mt-3">
//                 <div className="text-center">
//                   <Lightning size={20} />
//                   <div style={{ fontSize: '12px' }}>Easy & Fast Payments</div>
//                 </div>
//                 <div className="text-center">
//                   <CurrencyRupee size={20} />
//                   <div style={{ fontSize: '12px' }}>Instant Refunds</div>
//                 </div>
//                 <div className="text-center">
//                   <Gift size={20} />
//                   <div style={{ fontSize: '12px' }}>Exclusive Offers</div>
//                 </div>
//               </div>
//             </div>

//             {/* Add Money Section */}
//             <Card style={{ padding: '20px', borderRadius: '15px' }}>
//               <h5>Add Money to Zepto Cash</h5>
//               <input type="number" placeholder="Enter Amount" style={{ width: '100%', marginTop: '10px', marginBottom: '20px', padding: '10px', borderRadius: '10px', border: '1px solid #ccc' }} />

//               <div className="d-flex justify-content-between mb-3">
//                 <Button variant="outline-primary" className="rounded-pill">₹500</Button>
//                 <Button variant="outline-primary" className="rounded-pill" style={{ borderColor: 'purple', color: 'purple' }}>₹1000 <span style={{ fontSize: '10px', color: 'red', fontWeight: 'bold', marginLeft: '5px' }}>POPULAR</span></Button>
//                 <Button variant="outline-primary" className="rounded-pill">₹2000</Button>
//                 <Button variant="outline-primary" className="rounded-pill">₹5000</Button>
//               </div>

//               <Button variant="primary" className="rounded-pill" style={{ width: '100%', background: 'purple', border: 'none' }}>
//                 Add Balance
//               </Button>
//             </Card>
//           </Col>
//         </Row>
//       </Card>
//     </Container>
//   );
// };

// export default WalletPage;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { CreditCard, Bag, Headset, Heart, GeoAlt, PersonCircle, Lightning, CurrencyRupee, Gift, ChevronRight } from 'react-bootstrap-icons';

const WalletPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  if (!user) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading Account Details...</div>;

  return (
    <Container className="d-flex justify-content-center align-items-start" style={{ minHeight: '90vh', marginTop: '30px' }}>
      <Card style={{ width: '95%', maxWidth: '1200px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)', borderRadius: '20px', overflow: 'hidden' }}>
        <Row style={{ minHeight: '80vh' }}>
          {/* Sidebar */}
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

            {/* Zepto Cash Card */}
            <Card className="my-3 p-2" style={{ border: '1px solid #eee', backgroundColor: '#fff', borderRadius: '12px' }}>
              <Card.Body className="p-2 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <CreditCard size={20} color="purple" />
                  <strong style={{ fontSize: '14px' }}>Zepto Cash & Gift Card</strong>
                </div>
              </Card.Body>
            </Card>

            {/* Menu List */}
            <ListGroup variant="flush" className="mt-4">
              <ListGroup.Item action className="d-flex align-items-center gap-2" onClick={() => navigate('/account')}>
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
              <ListGroup.Item action className="text-danger text-center" onClick={() => {
                localStorage.clear();
                navigate('/login');
              }}>
                🚪 Log Out
              </ListGroup.Item>
            </ListGroup>
          </Col>

          {/* Right Side Wallet */}
          <Col md={8} className="p-4" style={{ backgroundColor: '#fff' }}>
            {/* Purple Balance Card */}
            <div style={{ background: 'linear-gradient(to right, #8a2be2, #9b30ff)', borderRadius: '15px', padding: '20px', color: 'white', marginBottom: '20px' }}>
              <h5>Available Balance</h5>
              <h2>₹{user.cashBalance || 0}</h2>
              <div className="d-flex justify-content-around mt-3">
                <div className="text-center">
                  <Lightning size={20} />
                  <div style={{ fontSize: '12px' }}>Easy & Fast Payments</div>
                </div>
                <div className="text-center">
                  <CurrencyRupee size={20} />
                  <div style={{ fontSize: '12px' }}>Instant Refunds</div>
                </div>
                <div className="text-center">
                  <Gift size={20} />
                  <div style={{ fontSize: '12px' }}>Exclusive Offers</div>
                </div>
              </div>
            </div>

            {/* Add Money Section */}
            <Card style={{ padding: '20px', borderRadius: '15px', marginBottom: '20px' }}>
              <h5>Add Money to Zepto Cash</h5>
              <input type="number" placeholder="Enter Amount" style={{ width: '100%', marginTop: '10px', marginBottom: '20px', padding: '10px', borderRadius: '10px', border: '1px solid #ccc' }} />

              <div className="d-flex justify-content-between mb-3">
                <Button variant="outline-primary" className="rounded-pill">₹500</Button>
                <Button variant="outline-primary" className="rounded-pill" style={{ borderColor: 'purple', color: 'purple' }}>₹1000 <span style={{ fontSize: '10px', color: 'red', fontWeight: 'bold', marginLeft: '5px' }}>POPULAR</span></Button>
                <Button variant="outline-primary" className="rounded-pill">₹2000</Button>
                <Button variant="outline-primary" className="rounded-pill">₹5000</Button>
              </div>

              <Button variant="primary" className="rounded-pill" style={{ width: '100%', background: 'purple', border: 'none' }}>
                Add Balance
              </Button>
            </Card>

            {/* Recent Transactions */}
            <Card style={{ padding: '20px', borderRadius: '15px', marginBottom: '20px' }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 style={{ textAlign: 'center', fontSize: '14px', fontWeight: 'bold', marginBottom: '20px' }}>
  Recent Transactions
</h5>
                {/* <span style={{ color: 'purple', cursor: 'pointer', fontWeight: 'bold' }}>See All <ChevronRight size={16} /></span> */}
              </div>
              <div style={{ borderTop: '1px solid #eee', paddingTop: '10px' }}>
                <div className="mb-2">
                  <strong>Free Cash Expired</strong>
                  <div style={{ fontSize: '12px', color: 'gray' }}>04/10/2024 at 02:32am</div>
                </div>
                <div style={{ fontSize: '14px', color: 'red' }}>₹-125</div>
              </div>
              <div style={{ borderTop: '1px solid #eee', paddingTop: '10px', marginTop: '10px' }}>
                <div className="mb-2">
                  <strong>Free Cash - Valid for next order only</strong>
                  <div style={{ fontSize: '12px', color: 'gray' }}>30/09/2024 at 10:56pm</div>
                </div>
                <div style={{ fontSize: '14px', color: 'green' }}>₹+125</div>
              </div>
            </Card>

            {/* FAQs */}
            <Card style={{ padding: '20px', borderRadius: '15px', marginBottom: '20px' }}>
              <ListGroup variant="flush">
                <ListGroup.Item action className="d-flex justify-content-between align-items-center">
                  How it works? <ChevronRight />
                </ListGroup.Item>
                <ListGroup.Item action className="d-flex justify-content-between align-items-center">
                  FAQs <ChevronRight />
                </ListGroup.Item>
              </ListGroup>
            </Card>

          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default WalletPage;
