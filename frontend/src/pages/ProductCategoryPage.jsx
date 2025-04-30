// src/pages/ProductCategoryPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cartContext";
import { Button } from "react-bootstrap";
import "../components/ProductCategoryPage.css";

const sidebarItems = {
  "Fruits & Vegetables": [
    "All", "Fresh Vegetables", "Mangoes & Melons", "Fresh Fruits",
    "Flowers & Leaves", "Leafy, Herbs & Seasonings", "Exotics & Premium",
    "Organics & Hydroponics", "Sprouts", "Dried", "Juices", "Plant", "Salads", "Bloom"
  ],
  "Atta, Rice, Oil & Dals": [
    "Top Picks", "Oil", "Atta & Other Flours", "Ghee",
    "Dals & Pulses", "Rice & More"
  ]
};

const ProductCategoryPage = () => {
  const { categoryGroup } = useParams();
  const [products, setProducts] = useState([]);
  const [activeSubCat, setActiveSubCat] = useState("All");
  const { addToCart, removeFromCart, cart } = useCart();

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("/api/products");
      const all = res.data.products;
      const filtered = activeSubCat === "All"
        ? all.filter(p => p.categoryGroup === categoryGroup)
        : all.filter(p => p.categoryGroup === categoryGroup && p.category === activeSubCat);
      setProducts(filtered);
    };
    fetch();
  }, [categoryGroup, activeSubCat]);

  const sidebar = sidebarItems[categoryGroup] || ["All"];

  return (
    <div className="category-container">
      <div className="category-sidebar">
        {sidebar.map((cat, i) => (
          <div
            key={i}
            className={`category-item ${cat === activeSubCat ? "active" : ""}`}
            onClick={() => setActiveSubCat(cat)}
          >
            {cat}
          </div>
        ))}
      </div>

      <div className="category-content">
        <h2 className="category-title">All {categoryGroup}</h2>
        <img className="category-banner" src={`/Banner/${categoryGroup}.webp`} alt={categoryGroup} />

        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.name}>
              <div className="discount">{product.discount}% Off</div>
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <div className="delivery">⏱️ {product.deliveryTime}</div>
                <div className="product-name">{product.name}</div>
                <div className="product-weight">{product.weight}</div>
                <div className="product-price">{product.price}</div>
                {cart[product._id]?.quantity > 0 ? (
                  <div className="quantity-controller">
                    <Button size="sm" variant="danger" onClick={() => removeFromCart(product._id)}>-</Button>
                    <span>{cart[product._id].quantity}</span>
                    <Button size="sm" variant="success" onClick={() => addToCart(product)}>+</Button>
                  </div>
                ) : (
                  <Button className="w-100 mt-2" size="sm" onClick={() => addToCart(product)}>Add to Cart</Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategoryPage;
