import React, { useState } from "react";
import axios from "axios";

const AdminUploadProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    weight: "",
    discount: "",
    deliveryTime: "",
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Upload image separately
      const imageData = new FormData();
      imageData.append("image", formData.image);

      const uploadRes = await axios.post("/api/upload", imageData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { imagePath } = uploadRes.data; // Get the saved path

      // Step 2: Save product details along with uploaded imagePath
      await axios.post("/api/products", {
        name: formData.name,
        category: formData.category,
        price: formData.price,
        weight: formData.weight,
        discount: formData.discount,
        deliveryTime: formData.deliveryTime,
        image: imagePath,  // ✅ Save uploaded image path
      });

      alert("Product uploaded successfully!");
      setFormData({
        name: "",
        category: "",
        price: "",
        weight: "",
        discount: "",
        deliveryTime: "",
        image: null,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to upload product");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Admin Product Upload</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input type="text" name="name" placeholder="Product Name" className="form-control" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <input type="text" name="category" placeholder="Category" className="form-control" value={formData.category} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <input type="text" name="price" placeholder="Price" className="form-control" value={formData.price} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <input type="text" name="weight" placeholder="Weight" className="form-control" value={formData.weight} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <input type="text" name="discount" placeholder="Discount (%)" className="form-control" value={formData.discount} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <input type="text" name="deliveryTime" placeholder="Delivery Time" className="form-control" value={formData.deliveryTime} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <input type="file" name="image" className="form-control" onChange={handleChange} required />
        </div>

        <button type="submit" className="btn btn-primary">Upload Product</button>
      </form>
    </div>
  );
};

export default AdminUploadProduct;
