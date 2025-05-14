// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Table, Form, Container, Button, Row, Col, Card } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import './AdminDashboardPage.css';

// const AdminDashboardPage = () => {
//   const [vendors, setVendors] = useState([]);
//   const [selectedVendor, setSelectedVendor] = useState('');
//   const [products, setProducts] = useState([]);
//   const [newVendor, setNewVendor] = useState({ name: '', email: '', phone: '', password: '' });
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchVendors();
//   }, []);

//   const fetchVendors = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.get('/api/users/vendors', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setVendors(res.data.vendors);
//     } catch (error) {
//       console.error('Error fetching vendors', error);
//     }
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await axios.get(`/api/products/admin?vendorId=${selectedVendor}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setProducts(res.data.products);
//       } catch (error) {
//         console.error('Error fetching products', error);
//       }
//     };

//     if (selectedVendor) fetchProducts();
//   }, [selectedVendor]);

//   const handleAddVendor = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.post('/api/users/add-vendor', newVendor, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       alert('Vendor added successfully!');
//       setNewVendor({ name: '', email: '', phone: '', password: '' });
//       fetchVendors();
//     } catch (error) {
//       alert('Failed to add vendor');
//       console.error('Add vendor error:', error);
//     }
//   };

//   const handleDeleteVendor = async (vendorId) => {
//     if (!window.confirm('Are you sure you want to delete this vendor?')) return;
//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`/api/users/vendor/${vendorId}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       alert('Vendor deleted successfully!');
//       fetchVendors();
//     } catch (error) {
//       console.error('Delete vendor error:', error);
//     }
//   };

//   return (
//     <Container className="admin-dashboard my-4">
//       <h3 className="mb-4 text-center text-danger">Admin Dashboard</h3>

//       <Row className="mb-5">
//         <Col md={6}>
//           <Card className="p-3">
//             <h5 className="mb-3">Add New Vendor</h5>
//             <Form>
//               <Form.Group className="mb-2">
//                 <Form.Control
//                   placeholder="Name"
//                   value={newVendor.name}
//                   onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
//                 />
//               </Form.Group>
//               <Form.Group className="mb-2">
//                 <Form.Control
//                   type="email"
//                   placeholder="Email"
//                   value={newVendor.email}
//                   onChange={(e) => setNewVendor({ ...newVendor, email: e.target.value })}
//                 />
//               </Form.Group>
//               <Form.Group className="mb-2">
//                 <Form.Control
//                   placeholder="Phone"
//                   value={newVendor.phone}
//                   onChange={(e) => setNewVendor({ ...newVendor, phone: e.target.value })}
//                 />
//               </Form.Group>
//               <Form.Group className="mb-2">
//                 <Form.Control
//                   type="password"
//                   placeholder="Password"
//                   value={newVendor.password}
//                   onChange={(e) => setNewVendor({ ...newVendor, password: e.target.value })}
//                 />
//               </Form.Group>
//               <Button onClick={handleAddVendor} variant="success">Add Vendor</Button>
//             </Form>
//           </Card>
//         </Col>

//         <Col md={6}>
//           <h5>Select Vendor to View Products</h5>
//           <Form.Select
//             value={selectedVendor}
//             onChange={(e) => setSelectedVendor(e.target.value)}
//           >
//             <option value="">-- Select Vendor --</option>
//             {vendors.map((vendor) => (
//               <option key={vendor._id} value={vendor._id}>
//                 {vendor.name} ({vendor.email})
//               </option>
//             ))}
//           </Form.Select>
//         </Col>
//       </Row>

//       {products.length > 0 && (
//         <Card className="p-3">
//           <h5>Vendor's Products</h5>
//           <Table striped bordered hover responsive>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Category</th>
//                 <th>Price</th>
//                 <th>Rating</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((p) => (
//                 <tr key={p._id}>
//                   <td>{p.name}</td>
//                   <td>{p.category}</td>
//                   <td>{p.price}</td>
//                   <td>{p.rating}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Card>
//       )}

//       <Card className="p-3 mt-5">
//         <h5 className="mb-3">Manage All Vendors</h5>
//         <Table striped bordered hover responsive>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {vendors.map((vendor) => (
//               <tr key={vendor._id}>
//                 <td>{vendor.name}</td>
//                 <td>{vendor.email}</td>
//                 <td>{vendor.phone}</td>
//                 <td>
//                   <Button variant="danger" size="sm" onClick={() => handleDeleteVendor(vendor._id)}>
//                     Delete
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>




//       </Card>
//     </Container>
//   );
// };

// export default AdminDashboardPage;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Form, Container, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './AdminDashboardPage.css';

const AdminDashboardPage = () => {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState('');
  const [products, setProducts] = useState([]);
  const [newVendor, setNewVendor] = useState({ name: '', email: '', phone: '', password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/users/vendors', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setVendors(res.data.vendors);
    } catch (error) {
      console.error('Error fetching vendors', error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`/api/products/admin?vendorId=${selectedVendor}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProducts(res.data.products);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    if (selectedVendor) fetchProducts();
  }, [selectedVendor]);

  const handleAddVendor = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/users/add-vendor', newVendor, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Vendor added successfully!');
      setNewVendor({ name: '', email: '', phone: '', password: '' });
      fetchVendors();
    } catch (error) {
      alert('Failed to add vendor');
      console.error('Add vendor error:', error);
    }
  };

  const handleDeleteVendor = async (vendorId) => {
    if (!window.confirm('Are you sure you want to delete this vendor?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/users/vendor/${vendorId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Vendor deleted successfully!');
      fetchVendors();
    } catch (error) {
      console.error('Delete vendor error:', error);
    }
  };

  return (
    <Container className="admin-dashboard my-4">
      <h3 className="mb-4 text-center text-danger">Admin Dashboard</h3>

      <Row className="mb-5">
        <Col md={6}>
          <Card className="p-3">
            <h5 className="mb-3">Add New Vendor</h5>
            <Form>
              <Form.Group className="mb-2">
                <Form.Control
                  placeholder="Name"
                  value={newVendor.name}
                  onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={newVendor.email}
                  onChange={(e) => setNewVendor({ ...newVendor, email: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Control
                  placeholder="Phone"
                  value={newVendor.phone}
                  onChange={(e) => setNewVendor({ ...newVendor, phone: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={newVendor.password}
                  onChange={(e) => setNewVendor({ ...newVendor, password: e.target.value })}
                />
              </Form.Group>
              <Button onClick={handleAddVendor} variant="success">Add Vendor</Button>
            </Form>
          </Card>
        </Col>

        <Col md={6}>
          <h5>Select Vendor to View Products</h5>
          <Form.Select
            value={selectedVendor}
            onChange={(e) => setSelectedVendor(e.target.value)}
          >
            <option value="">-- Select Vendor --</option>
            {vendors.map((vendor) => (
              <option key={vendor._id} value={vendor._id}>
                {vendor.name} ({vendor.email})
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {products.length > 0 && (
        <Card className="p-3">
          <h5>Vendor's Products</h5>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>    {/* ✅ New column */}
                <th>Status</th>   {/* ✅ New column */}
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>₹{p.price}</td>
                  <td>{p.stock}</td>
                  <td>
                    {p.stock === 0 ? (
                      <span style={{ color: 'red', fontWeight: 'bold' }}>Out of Stock</span>
                    ) : (
                      <span style={{ color: 'green' }}>Available</span>
                    )}
                  </td>
                  <td>{p.rating || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      )}

      <Card className="p-3 mt-5">
        <h5 className="mb-3">Manage All Vendors</h5>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor) => (
              <tr key={vendor._id}>
                <td>{vendor.name}</td>
                <td>{vendor.email}</td>
                <td>{vendor.phone}</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteVendor(vendor._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default AdminDashboardPage;
