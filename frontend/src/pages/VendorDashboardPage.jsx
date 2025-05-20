import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Container, Table, Button, Card, Badge, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './VendorDashboardPage.css';

const VendorDashboardPage = () => {
  const [vendor, setVendor] = useState(null);
  const [products, setProducts] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const navigate = useNavigate();

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5003/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p._id !== productId));
    } catch (err) {
      console.error('Error deleting product', err);
    }
  };

  useEffect(() => {
    const fetchVendorData = async () => {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));

      if (!token || user?.role !== 'vendor') {
        alert('Access denied. Only vendors can view this page.');
        navigate('/');
        return;
      }

      setVendor(user);
      console.log("✅ Vendor detected:", user.name);

      try {
        const res = await axios.get('http://localhost:5003/api/products/vendor/products', {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("✅ Vendor products fetched:", res.data.products);
        setProducts(res.data.products || []);
      } catch (err) {
        console.error('❌ Error fetching vendor products:', err.response?.data || err.message);
      }
    };

    fetchVendorData();
  }, [navigate]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return <Badge bg="secondary">Pending</Badge>;
      case 'Active':
        return <Badge bg="success">Active</Badge>;
      case 'Sold Out':
        return <Badge bg="danger">Sold Out</Badge>;
      default:
        return <Badge bg="light">Unknown</Badge>;
    }
  };

  const filteredProducts = products.filter(p => !filterStatus || p.status === filterStatus);

  return (
    <Container className="my-4">
      <h3 className="mb-4 vendor-heading">Welcome, {vendor?.name || "Vendor"}</h3>

      <Button className="mb-3" onClick={() => navigate('/vendor/add-product')}>
        Add Product
      </Button>

      <Form.Select
        className="mb-3 w-auto"
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
      >
        <option value="">All Status</option>
        <option value="Pending">Pending</option>
        <option value="Active">Active</option>
        <option value="Sold Out">Sold Out</option>
      </Form.Select>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h5 className="mb-3">Your Products</h5>
          <p className="text-muted">
            Showing {filteredProducts.length} of {products.length} products
          </p>
          {products.length === 0 ? (
            <p>No products listed yet.</p>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p) => (
                  <tr key={p._id}>
                    <td>
                      <img
                        src={
                          p.image?.startsWith('http')
                            ? p.image
                            : `http://localhost:5003${p.image}`
                        }
                        alt={p.name}
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        onError={(e) => e.target.src = "/placeholder.png"}
                      />
                    </td>
                    <td>{p.name}</td>
                    <td>{p.category}</td>
                    <td>₹{p.price}</td>
                    <td>{p.stock}</td>
                    <td>{getStatusBadge(p.status)}</td>
                    <td>
                      <Button
                        size="sm"
                        variant="warning"
                        onClick={() => navigate(`/vendor/edit-product/${p._id}`)}
                      >
                        Edit
                      </Button>{' '}
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(p._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default VendorDashboardPage;
