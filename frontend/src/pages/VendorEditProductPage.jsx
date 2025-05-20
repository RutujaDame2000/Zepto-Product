import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Card } from 'react-bootstrap';

const VendorEditProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5003/api/products/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.data.product) {
          alert("Product not found or unauthorized access.");
          navigate('/vendor/dashboard');
          return;
        }
        setProduct(res.data.product);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        alert("Error fetching product. Please try again.");
        navigate('/vendor/dashboard');
      }
    };

    fetchProduct();
  }, [productId, navigate]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:5003/api/products/${productId}`, product, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Product updated successfully');
      navigate('/vendor/dashboard');
    } catch (err) {
      console.error(err);
      alert('Update failed');
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <Container className="my-4">
      <Card className="p-4">
        <h3>Edit Product</h3>
        <Form onSubmit={handleUpdate}>
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={product.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select name="status" value={product.status} onChange={handleChange}>
              <option value="Pending">Pending</option>
              <option value="Active">Active</option>
            </Form.Select>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update Product
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default VendorEditProductPage;
