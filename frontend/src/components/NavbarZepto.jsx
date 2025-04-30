


// import React, { useState, useEffect } from 'react';
// import { Navbar, Nav, Container, Form, FormControl, Button, Dropdown } from 'react-bootstrap';
// import { GeoAlt, Cart, PersonCircle } from 'react-bootstrap-icons';
// import ToggleSwitch from './ToggleSwitch';
// import { useNavigate } from 'react-router-dom';
// import { useCart } from '../context/cartContext';
// import axios from 'axios';
// import CartSidebar from "../components/CartSidebar";
// import './NavbarZepto.css';

// const NavbarZepto = () => {
//   const [superSaver, setSuperSaver] = useState(false);
//   const [user, setUser] = useState(null);
//   const [showCart, setShowCart] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [allProducts, setAllProducts] = useState([]);

//   const navigate = useNavigate();
//   const { cart } = useCart();
//   const totalItems = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get('/api/products');
//         setAllProducts(res.data.products);
//       } catch (error) {
//         console.error("Error fetching products for search:", error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     if (searchTerm.trim() !== '') {
//       const results = allProducts.filter(product =>
//         product.name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredProducts(results);
//     } else {
//       setFilteredProducts([]);
//     }
//   }, [searchTerm, allProducts]);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   return (
//     <>
//       <Navbar expand="lg" className="navbar-zepto shadow-sm">
//         <Container fluid className="px-4">
//           <Navbar.Brand href="/">
//             <img
//               src="/Zepto_Logo.svg"
//               width="90"
//               height="30"
//               className="d-inline-block align-top"
//               alt="Zepto Logo"
//             />
//           </Navbar.Brand>

//           <div className="ms-3 d-flex align-items-center">
//             <ToggleSwitch
//               checked={superSaver}
//               onChange={(e) => setSuperSaver(e.target.checked)}
//             />
//           </div>

//           <Dropdown className="ms-3">
//             <Dropdown.Toggle variant="link" className="text-black fw-bold location-toggle" style={{ textDecoration: 'none' }}>
//               Select Location
//             </Dropdown.Toggle>
//             <Dropdown.Menu>
//               <Dropdown.Item href="#">📍 Detect Current Location</Dropdown.Item>
//               <Dropdown.Divider />
//               <Dropdown.Item href="#">Mumbai</Dropdown.Item>
//               <Dropdown.Item href="#">Delhi</Dropdown.Item>
//               <Dropdown.Item href="#">Bangalore</Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>

//           <Navbar.Toggle aria-controls="navbarSearch" />
//           <Navbar.Collapse id="navbarSearch" className="justify-content-end">
//             <Form className="d-flex mx-auto my-2 my-lg-0" style={{ maxWidth: "500px", width: "100%" }}>
//               <FormControl
//                 type="search"
//                 placeholder="Search products..."
//                 className="me-2 rounded-pill"
//                 aria-label="Search"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <Button variant="outline-dark" className="rounded-pill">Search</Button>
//             </Form>

//             <Nav className="align-items-center">
//               {user ? (
//                 <Nav.Link
//                   onClick={() => navigate('/account')}
//                   className="text-center ms-3 text-black"
//                   style={{ cursor: 'pointer' }}
//                 >
//                   <PersonCircle size={25} />
//                   <div className="nav-icon-text"><b>Profile</b></div>
//                 </Nav.Link>
//               ) : (
//                 <Nav.Link
//                   onClick={() => navigate('/auth?tab=register')}
//                   className="text-center ms-3 text-black"
//                   style={{ cursor: 'pointer' }}
//                 >
//                   <PersonCircle size={25} />
//                   <div className="nav-icon-text"><b>Login</b></div>
//                 </Nav.Link>
//               )}

//               <Nav.Link
//                 onClick={() => setShowCart(true)}
//                 className="position-relative text-center ms-3 text-black"
//                 style={{ cursor: 'pointer' }}
//               >
//                 <Cart size={25} />
//                 <div className="nav-icon-text"><b>Cart</b></div>
//                 {totalItems > 0 && (
//                   <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
//                     {totalItems}
//                   </span>
//                 )}
//               </Nav.Link>

//               <CartSidebar show={showCart} handleClose={() => setShowCart(false)} />
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       {filteredProducts.length > 0 && (
//         <Container className="mt-4">
//           <h5>Showing results for "<strong>{searchTerm}</strong>"</h5>
//           <div className="row">
//             {filteredProducts.map((product) => (
//               <div key={product._id} className="col-6 col-md-3 mb-4">
//                 <div className="card product-card shadow-sm h-100">
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="card-img-top"
//                     style={{
//                       height: '160px',
//                       objectFit: 'cover',
//                       borderRadius: '10px 10px 0 0',
//                     }}
//                   />
//                   <div className="card-body text-center p-2">
//                     <h6 className="card-title fw-bold mb-2" style={{ fontSize: "15px" }}>
//                       {product.name}
//                     </h6>
//                     <p className="text-muted mb-1" style={{ fontSize: "14px" }}>{product.weight}</p>
//                     <p className="fw-bold" style={{ fontSize: "14px" }}>{product.price}</p>
//                     <div style={{ fontSize: "12px", color: "gray" }}>🚚 {product.deliveryTime}</div>
//                     <Button size="sm" variant="success" className="w-100 mt-2">
//                       Add to Cart
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </Container>
//       )}
//     </>
//   );
// };

// export default NavbarZepto;


import React, { useState, useEffect } from 'react';
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
  Dropdown,
} from 'react-bootstrap';
import { GeoAlt, Cart, PersonCircle } from 'react-bootstrap-icons';
import ToggleSwitch from './ToggleSwitch';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cartContext';
import axios from 'axios';
import CartSidebar from "../components/CartSidebar";
import './NavbarZepto.css';

const NavbarZepto = () => {
  const [superSaver, setSuperSaver] = useState(false);
  const [user, setUser] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const navigate = useNavigate();
  const { cart } = useCart();
  const totalItems = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);

  // 🛒 Load product list for search
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/products');
        setAllProducts(res.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // 🔍 Live search filter
  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, allProducts]);

  // 👤 Detect login on page load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 👤 Sync login/logout in other tabs
  useEffect(() => {
    const syncUser = () => {
      const updatedUser = localStorage.getItem('user');
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener('storage', syncUser);
    return () => window.removeEventListener('storage', syncUser);
  }, []);

  return (
    <>
      <Navbar expand="lg" className="navbar-zepto shadow-sm">
        <Container fluid className="px-4">
          {/* Logo */}
          <Navbar.Brand onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <img src="/Zepto_Logo.svg" width="90" height="30" alt="Zepto Logo" />
          </Navbar.Brand>

          {/* Super Saver Toggle */}
          <div className="ms-3 d-flex align-items-center">
            <ToggleSwitch
              checked={superSaver}
              onChange={(e) => setSuperSaver(e.target.checked)}
            />
          </div>

          {/* Location Dropdown */}
          <Dropdown className="ms-3">
            <Dropdown.Toggle variant="link" className="text-black fw-bold location-toggle" style={{ textDecoration: 'none' }}>
              Select Location
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>📍 Detect Current Location</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Mumbai</Dropdown.Item>
              <Dropdown.Item>Delhi</Dropdown.Item>
              <Dropdown.Item>Bangalore</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Navbar.Toggle aria-controls="navbarSearch" />
          <Navbar.Collapse id="navbarSearch" className="justify-content-end">
            {/* Search */}
            <Form className="d-flex mx-auto my-2 my-lg-0" style={{ maxWidth: "500px", width: "100%" }}>
              <FormControl
                type="search"
                placeholder="Search products..."
                className="me-2 rounded-pill"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="outline-dark" className="rounded-pill">Search</Button>
            </Form>

            {/* Icons: Profile/Login & Cart */}
            <Nav className="align-items-center">
              {user ? (
                <Dropdown align="end" className="ms-3">
                  <Dropdown.Toggle variant="link" className="text-black" style={{ textDecoration: 'none' }}>
                    <PersonCircle size={25} />
                    <div className="nav-icon-text"><b>Profile</b></div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => navigate('/account')}>
                      My Account
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={() => {
                        localStorage.clear();
                        setUser(null);
                        navigate('/');
                      }}
                      className="text-danger"
                    >
                      🚪 Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Nav.Link
                  onClick={() => navigate('/auth?tab=login')}
                  className="text-center ms-3 text-black"
                  style={{ cursor: 'pointer' }}
                >
                  <PersonCircle size={25} />
                  <div className="nav-icon-text"><b>Login</b></div>
                </Nav.Link>
              )}

              {/* Cart Icon */}
              <Nav.Link
                onClick={() => setShowCart(true)}
                className="position-relative text-center ms-3 text-black"
                style={{ cursor: 'pointer' }}
              >
                <Cart size={25} />
                <div className="nav-icon-text"><b>Cart</b></div>
                {totalItems > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalItems}
                  </span>
                )}
              </Nav.Link>

              <CartSidebar show={showCart} handleClose={() => setShowCart(false)} />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Search Result Preview */}
      {filteredProducts.length > 0 && (
        <Container className="mt-4">
          <h5>Showing results for "<strong>{searchTerm}</strong>"</h5>
          <div className="row">
            {filteredProducts.map((product) => (
              <div key={product._id} className="col-6 col-md-3 mb-4">
                <div className="card product-card shadow-sm h-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="card-img-top"
                    style={{
                      height: '160px',
                      objectFit: 'cover',
                      borderRadius: '10px 10px 0 0',
                    }}
                  />
                  <div className="card-body text-center p-2">
                    <h6 className="card-title fw-bold mb-2" style={{ fontSize: "15px" }}>
                      {product.name}
                    </h6>
                    <p className="text-muted mb-1" style={{ fontSize: "14px" }}>{product.weight}</p>
                    <p className="fw-bold" style={{ fontSize: "14px" }}>{product.price}</p>
                    <div style={{ fontSize: "12px", color: "gray" }}>🚚 {product.deliveryTime}</div>
                    <Button size="sm" variant="success" className="w-100 mt-2">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      )}
    </>
  );
};

export default NavbarZepto;

