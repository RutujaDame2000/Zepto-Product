import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cartContext";
import categorySlugMapper from "../utils/categorySlugMapper";
import sidebarCategoryMapper from "../utils/sidebarCategoryMapper";
import Sidebar from "../components/Sidebar";
import { API, BASE_URL } from "../config/config";
import "../pages/CategoryProducts.css";
import "./CategoryPage.css";


const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const dbCategoryName = categorySlugMapper[categoryName] || categoryName;
  const subcategories = sidebarCategoryMapper[categoryName] || [];

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const [sortType, setSortType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const { cart, addToCart, removeFromCart } = useCart();

  const applyFilters = useCallback(() => {
    let temp = [...products];
    const subCategoryValue =
      typeof selectedSubCategory === "object"
        ? selectedSubCategory.name
        : selectedSubCategory;

    if (subCategoryValue !== "All") {
      temp = temp.filter(
        (p) => p.subcategory?.toLowerCase() === subCategoryValue.toLowerCase()
      );
    }

    if (minPrice || maxPrice) {
      temp = temp.filter((p) => {
        const price = parseInt(p.price);
        return (
          (!minPrice || price >= parseInt(minPrice)) &&
          (!maxPrice || price <= parseInt(maxPrice))
        );
      });
    }

    if (sortType) {
      temp.sort((a, b) => {
        const priceA = parseInt(a.price);
        const priceB = parseInt(b.price);
        return sortType === "priceLowHigh" ? priceA - priceB : priceB - priceA;
      });
    }

    setFilteredProducts(temp);
  }, [products, selectedSubCategory, sortType, minPrice, maxPrice]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const res = await axios.get(
          `${API}/products/category/${encodeURIComponent(dbCategoryName)}`
        );
        setProducts(res.data.products || []);
        setFilteredProducts(res.data.products || []);
        setSelectedSubCategory("All");
        setMinPrice("");
        setMaxPrice("");
        setSortType("");
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
        setFilteredProducts([]);
      }
    };

    fetchCategoryProducts();
  }, [dbCategoryName]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleClearFilters = () => {
    setSelectedSubCategory("All");
    setMinPrice("");
    setMaxPrice("");
    setSortType("");
    setFilteredProducts(products);
  };

  return (
    <div className="container-fluid my-4">
      <div className="row">
        <div className="col-md-2">
          <Sidebar
            selectedCategory={selectedSubCategory}
            subcategories={subcategories}
          />
          <div className="p-2">
            <h6 className="fw-bold">Subcategory</h6>
            <select
              className="form-select mb-2"
              value={
                typeof selectedSubCategory === "object"
                  ? selectedSubCategory.name
                  : selectedSubCategory
              }
              onChange={(e) => {
                const selected = subcategories.find(
                  (sub) => sub.name === e.target.value
                );
                setSelectedSubCategory(selected || e.target.value);
              }}
            >
              <option value="All">All</option>
              {subcategories.map((sub, index) => (
                <option key={index} value={sub.name}>
                  {sub.name}
                </option>
              ))}
            </select>

            <h6 className="fw-bold">Price Range</h6>
            <input
              type="number"
              className="form-control mb-2"
              placeholder="Min ₹"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              type="number"
              className="form-control mb-2"
              placeholder="Max ₹"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <button
              className="btn btn-primary btn-sm w-100 mb-2"
              onClick={applyFilters}
            >
              Apply
            </button>
            <button
              className="btn btn-outline-secondary btn-sm w-100"
              onClick={handleClearFilters}
            >
              Reset
            </button>
          </div>
        </div>

        <div className="col-md-10">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold mb-0">
              Showing:{" "}
              {typeof selectedSubCategory === "object"
                ? selectedSubCategory.name
                : selectedSubCategory}
            </h4>
            <select
              className="form-select w-auto"
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="priceLowHigh">Price: Low to High</option>
              <option value="priceHighLow">Price: High to Low</option>
            </select>
          </div>





<div className="row">
  {filteredProducts.length > 0 ? (
    filteredProducts.map((product) => (
      <div key={product._id} className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4">
        <div
          className="card product-card position-relative"
          onClick={() => navigate(`/product/${product._id}`)}
        >
          {product.discount && (
            <span className="discount-badge">{product.discount}% Off</span>
          )}

          <img
            src={
              product.image?.startsWith("http")
                ? product.image
                : `${BASE_URL}${product.image}`
            }
            alt={product.name}
            className="card-img-top"
          />

          <div className="card-body text-center">
            <h6 className="fw-bold">{product.name}</h6>
            <p className="text-muted">{product.weight}</p>
            <p className="fw-bold">
              ₹{product.price}
              {product.originalPrice && (
                <span className="text-muted text-decoration-line-through ms-2" style={{ fontSize: '13px' }}>
                  ₹{product.originalPrice}
                </span>
              )}
            </p>
            <small className="text-muted">🚚 {product.deliveryTime || "7 Mins"}</small>

            {cart[product._id]?.quantity > 0 ? (
              <div className="d-flex justify-content-between mt-2">
                <button className="btn btn-outline-danger btn-sm" onClick={(e) => { e.stopPropagation(); removeFromCart(product._id); }}>−</button>
                <span>{cart[product._id].quantity}</span>
                <button className="btn btn-outline-success btn-sm" onClick={(e) => { e.stopPropagation(); addToCart(product); }}>+</button>
              </div>
            ) : (
              <button
                className="btn btn-outline-primary btn-sm w-100 mt-2"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    ))
  ) : (
    <p>No products found.</p>
  )}
</div>





        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
