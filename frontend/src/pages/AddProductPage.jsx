// src/pages/AddProductPage.jsx
import React, { useState } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProductPage = () => {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    image: ''
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('/api/products', product, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Product added successfully!');
      setTimeout(() => navigate('/vendor/dashboard'), 1500);
    } catch (err) {
      console.error('Add product failed', err);
      setMessage('Failed to add product.');
    }
  };

  return (
    <Container className="my-4">
      <Card className="p-4 shadow-sm">
        <h3 className="mb-3">Add New Product</h3>
        {message && <Alert variant="info">{message}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control placeholder="Ex: Amul Butter" type="text" name="name" value={product.name} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control placeholder="Ex: Dairy Products" type="text" name="category" value={product.category} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price (in ₹)</Form.Label>
            <Form.Control type="number" name="price" value={product.price} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Stock Quantity</Form.Label>
            <Form.Control type="number" name="stock" value={product.stock} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control placeholder="https://image.url" type="text" name="image" value={product.image} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={product.description} onChange={handleChange} />
          </Form.Group>
          <Button type="submit" variant="success">➕ Add Product</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AddProductPage;
