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

  const API = 'http://localhost:5003/api'; // Replace with REACT_APP_API_URL in real deployment

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const imageData = new FormData();
      imageData.append("image", formData.image);

      const uploadRes = await axios.post(`${API}/upload`, imageData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      const { imagePath } = uploadRes.data;

      await axios.post(`${API}/products`, {
        ...formData,
        image: imagePath,
      }, {
        headers: { Authorization: `Bearer ${token}` },
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
        {["name", "category", "price", "weight", "discount", "deliveryTime"].map((field) => (
          <div className="mb-3" key={field}>
            <input
              type="text"
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="form-control"
              value={formData[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <div className="mb-3">
          <input
            type="file"
            name="image"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Upload Product
        </button>
      </form>
    </div>
  );
};

export default AdminUploadProduct;
