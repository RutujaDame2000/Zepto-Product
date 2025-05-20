// AdminDashboardPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Form, Container, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import './pages/AdminDashboardPage.css';

const API = 'http://localhost:5003/api'; // Or use process.env.REACT_APP_API_URL

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
      const res = await axios.get(`${API}/users/vendors`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setVendors(res.data.vendors || []);
    } catch (error) {
      console.error('Error fetching vendors', error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API}/products/admin?vendorId=${selectedVendor}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProducts(res.data.products || []);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    if (selectedVendor) fetchProducts();
  }, [selectedVendor]);

  const handleAddVendor = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API}/users/add-vendor`, newVendor, {
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
    await axios.delete(`${API}/users/delete-vendor/${vendorId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert('Vendor deleted successfully!');
    fetchVendors(); // Refresh the vendor list
  } catch (error) {
    console.error('Delete vendor error:', error.response?.data || error.message);
    alert(error.response?.data?.message || 'Failed to delete vendor');
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
              {['name', 'email', 'phone', 'password'].map(field => (
                <Form.Group className="mb-2" key={field}>
                  <Form.Control
                    type={field === 'email' ? 'email' : field === 'password' ? 'password' : 'text'}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={newVendor[field]}
                    onChange={(e) => setNewVendor({ ...newVendor, [field]: e.target.value })}
                  />
                </Form.Group>
              ))}
              <Button onClick={handleAddVendor} variant="success">Add Vendor</Button>
            </Form>
          </Card>
        </Col>

        <Col md={6}>
          <h5>Select Vendor to View Products</h5>
          <Form.Select value={selectedVendor} onChange={(e) => setSelectedVendor(e.target.value)}>
            <option value="">-- Select Vendor --</option>
            {vendors.length > 0 ? vendors.map((vendor) => (
              <option key={vendor._id} value={vendor._id}>
                {vendor.name} ({vendor.email})
              </option>
            )) : <option disabled>No vendors found</option>}
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
                <th>Stock</th>
                <th>Status</th>
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
                  <td>{p.stock === 0 ? <span className="text-danger">Out of Stock</span> : <span className="text-success">Available</span>}</td>
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
