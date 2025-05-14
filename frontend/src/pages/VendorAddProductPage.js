
// import React, { useState } from 'react';
// import axios from 'axios';
// import { Form, Button, Container, Card } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import './VendorAddProductPage.css';
// import VendorCategorySelector from '../components/VendorCategorySelector';

// const VendorAddProductPage = () => {
//   const [product, setProduct] = useState({
//     name: '',
//     category: '',
//     subcategory: '',
//     price: '',
//     stock: '',
//     description: '',
//     image: '',
//     weight: '',
//     discount: 0,
//     deliveryTime: '10 min',
//     status: 'Pending',
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setProduct({ ...product, [e.target.name]: e.target.value });
//   };

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     const formData = new FormData();
//     formData.append('image', file);

//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.post('/api/products/vendor/upload-image', formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setProduct({ ...product, image: res.data.imageUrl });
//     } catch (err) {
//       console.error('Image upload failed:', err);
//       alert('Failed to upload image');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');
//     const user = JSON.parse(localStorage.getItem('user'));

//     if (user?.role !== 'vendor') {
//       alert('Only vendors can add products.');
//       navigate('/');
//       return;
//     }

//     try {
//       await axios.post('/api/products/vendor/add', {
//         ...product,
//         vendorId: user._id,
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       alert('Product added successfully!');
//       navigate('/vendor/dashboard');
//     } catch (err) {
//       console.error(err);
//       alert('Error adding product.');
//     }
//   };

//   return (
//     <Container className="my-4">
//       <Card className="p-4 shadow-sm">
//         <h3 className="mb-4">Add New Product</h3>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group className="mb-3">
//             <Form.Label>Product Name</Form.Label>
//             <Form.Control type="text" name="name" value={product.name} onChange={handleChange} required />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Category</Form.Label>
//             <Form.Select name="category" value={product.category} onChange={handleChange} required>
//               <option value="">Select Category</option>
//               <option value="Fruits & Vegetables">Fruits & Vegetables</option>
//               <option value="Dairy & Bakery">Dairy & Bakery</option>
//               <option value="Snacks & Branded Foods">Snacks & Branded Foods</option>
//               <option value="Beverages">Beverages</option>
//             </Form.Select>
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Subcategory</Form.Label>
//             <Form.Control type="text" name="subcategory" value={product.subcategory} onChange={handleChange} />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Price (₹)</Form.Label>
//             <Form.Control type="number" name="price" value={product.price} onChange={handleChange} required />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Stock</Form.Label>
//             <Form.Control type="number" name="stock" value={product.stock} onChange={handleChange} required />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Status</Form.Label>
//             <Form.Select name="status" value={product.status} onChange={handleChange}>
//               <option value="Pending">Pending</option>
//               <option value="Active">Active</option>
//             </Form.Select>
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Weight</Form.Label>
//             <Form.Control type="text" name="weight" value={product.weight} onChange={handleChange} />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Discount (%)</Form.Label>
//             <Form.Control type="number" name="discount" value={product.discount} onChange={handleChange} />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Delivery Time</Form.Label>
//             <Form.Control type="text" name="deliveryTime" value={product.deliveryTime} onChange={handleChange} />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Description</Form.Label>
//             <Form.Control as="textarea" rows={3} name="description" value={product.description} onChange={handleChange} />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Image URL</Form.Label>
//             <Form.Control type="text" name="image" value={product.image} onChange={handleChange} />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Upload Image</Form.Label>
//             <Form.Control type="file" onChange={handleImageUpload} />
//           </Form.Group>

//           <Button type="submit" variant="primary">Add Product</Button>
//         </Form>

//         <VendorCategorySelector
//   onCategoryChange={(cat) => setProduct(prev => ({ ...prev, category: cat }))}
//   onSubCategoryChange={(sub) => setProduct(prev => ({ ...prev, subcategory: sub }))}
//  />
//       </Card>
//     </Container>
//   );
// };

// export default VendorAddProductPage;


import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './VendorAddProductPage.css';
import VendorCategorySelector from '../components/VendorCategorySelector';

const VendorAddProductPage = () => {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    subcategory: '',
    price: '',
    stock: '',
    description: '',
    image: '',
    weight: '',
    discount: 0,
    deliveryTime: '10 min',
    status: 'Pending',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/products/vendor/upload-image', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setProduct({ ...product, image: res.data.imageUrl });
    } catch (err) {
      console.error('Image upload failed:', err);
      alert('Failed to upload image');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (user?.role !== 'vendor') {
      alert('Only vendors can add products.');
      navigate('/');
      return;
    }

    try {
      await axios.post('/api/products/vendor/add', {
        ...product,
        vendorId: user._id,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Product added successfully!');
      navigate('/vendor/dashboard');
    } catch (err) {
      console.error(err);
      alert('Error adding product.');
    }
  };

  return (
    <Container className="my-4">
      <Card className="p-4 shadow-sm">
        <h3 className="mb-4">Add New Product</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control type="text" name="name" value={product.name} onChange={handleChange} required />
          </Form.Group>

          {/* ✅ Category and Subcategory Dropdowns */}
          <VendorCategorySelector
            onCategoryChange={(cat) => setProduct(prev => ({ ...prev, category: cat }))}
            onSubCategoryChange={(sub) => setProduct(prev => ({ ...prev, subcategory: sub }))}
          />

          <Form.Group className="mb-3">
            <Form.Label>Price (₹)</Form.Label>
            <Form.Control type="number" name="price" value={product.price} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control type="number" name="stock" value={product.stock} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select name="status" value={product.status} onChange={handleChange}>
              <option value="Pending">Pending</option>
              <option value="Active">Active</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Weight</Form.Label>
            <Form.Control type="text" name="weight" value={product.weight} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Discount (%)</Form.Label>
            <Form.Control type="number" name="discount" value={product.discount} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Delivery Time</Form.Label>
            <Form.Control type="text" name="deliveryTime" value={product.deliveryTime} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={product.description} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control type="text" name="image" value={product.image} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control type="file" onChange={handleImageUpload} />
          </Form.Group>

          <Button type="submit" variant="primary">Add Product</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default VendorAddProductPage;