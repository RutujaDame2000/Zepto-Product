import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cartContext";
import { toast } from "react-toastify";
import "./ProductDetailsPage.css";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { cart, addToCart, removeFromCart } = useCart();
  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API}/products/${productId}`);
        setProduct(res.data.product);
      } catch (err) {
        console.error("Error fetching product:", err);
        toast.error("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, API]);

  if (loading) return <div className="text-center p-5">Loading product details...</div>;
  if (!product || !product._id) return <div className="text-center p-5 text-danger">Product not found.</div>;

  const imageUrl = product.image?.startsWith("http")
    ? product.image
    : `${process.env.REACT_APP_API_URL.replace('/api', '')}${product.image.startsWith("/") ? "" : "/"}${product.image}`;

  return (
    <div className="container mt-4 product-detail-container">
      <div className="row">
        {/* LEFT COLUMN */}
        <div className="col-md-5">
          <div className="main-image mb-3">
            <img src={imageUrl} alt={product.name} className="img-fluid rounded" />
          </div>
          <div className="d-flex gap-2 flex-wrap">
            {[...Array(4)].map((_, idx) => (
              <img
                key={idx}
                src={imageUrl}
                alt="Thumbnail"
                className="img-thumbnail small-thumb"
              />
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-md-7">
          <h5>{product.name}</h5>
          <p className="text-muted">Net Qty: {product.weight}</p>
          <div className="mb-2">
            <span className="badge bg-success me-2">{product.rating || 4.5} ★</span>
            <small className="text-muted">(924 ratings)</small>
          </div>
          <p className="text-success fw-semibold">⚡ Get in {product.deliveryTime || "7 Mins"}</p>
          <h4>
            ₹{product.price}{" "}
            {product.originalPrice && (
              <span className="text-muted text-decoration-line-through fs-6">
                ₹{product.originalPrice}
              </span>
            )}{" "}
            {product.discount && (
              <span className="text-danger fs-6">({product.discount}% Off)</span>
            )}
          </h4>

          <hr />

          <div className="mb-3">
            {cart[product._id]?.quantity > 0 ? (
              <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-outline-danger"
                  onClick={() => removeFromCart(product._id)}
                >
                  -
                </button>
                <span>{cart[product._id].quantity}</span>
                <button
                  className="btn btn-outline-success"
                  onClick={() => addToCart(product)}
                >
                  +
                </button>
              </div>
            ) : (
              <button
                className="btn btn-danger w-100"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            )}
          </div>

          <h6 className="mt-4 fw-bold">Coupons & Offers</h6>
          <ul className="list-unstyled">
            <li>🏡 Get assured rewards with CRED</li>
            <li>💸 ₹25 off with BHIM UPI</li>
            <li>🏦 Upto ₹200 cashback on 4 orders</li>
            <li>💰 ₹50 cashback above ₹399</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
