import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/cartContext';
import categorySidebars from '../config/categorySidebars';
import "../pages/CategoryPage.css";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState('All');
  const [sortType, setSortType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');

  const { cart, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const res = await axios.get(`/api/products/category/${categoryName}`);
        const categoryFiltered = res.data.products;

        setProducts(categoryFiltered);
        setFilteredProducts(categoryFiltered);
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };

    fetchCategoryProducts();
  }, [categoryName]);

  const handleSubCategoryClick = (subCat) => {
    setSelectedSubCategory(subCat);
  };

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    setSortType(selectedSort);

    const extractPrice = (price) =>
      parseInt(price.toString().replace(/[^\d]/g, ""));

    let sorted = [...filteredProducts];

    if (selectedSort === "priceLowHigh") {
      sorted.sort((a, b) => extractPrice(a.price) - extractPrice(b.price));
    } else if (selectedSort === "priceHighLow") {
      sorted.sort((a, b) => extractPrice(b.price) - extractPrice(a.price));
    } else if (selectedSort === "ratingHighLow") {
      sorted.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(sorted);
  };

  const handlePriceFilter = () => {
    if (minPrice === '' && maxPrice === '') return;

    const priceFiltered = products.filter(product => {
      const price = parseInt(product.price.toString().replace(/[^\d]/g, ""));
      if (minPrice && maxPrice) {
        return price >= parseInt(minPrice) && price <= parseInt(maxPrice);
      } else if (minPrice) {
        return price >= parseInt(minPrice);
      } else if (maxPrice) {
        return price <= parseInt(maxPrice);
      }
      return true;
    });

    setFilteredProducts(priceFiltered);
  };

  const handleRatingFilter = (minRating) => {
    setRatingFilter(minRating);
    const ratingFiltered = products.filter(product => product.rating >= minRating);
    setFilteredProducts(ratingFiltered);
  };

  const handleClearFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    setRatingFilter('');
    setSortType('');
    setFilteredProducts(products);
  };

  const subFilteredProducts = selectedSubCategory === "All"
    ? filteredProducts
    : filteredProducts.filter((p) => p.category === selectedSubCategory);

  return (
    <div className="container-fluid my-4">
      <div className="row">

        {/* Sidebar */}
        <div className="col-md-2 category-sidebar p-3">
          <h5 className="fw-bold mb-3">{categoryName}</h5>
          {categorySidebars[categoryName]?.map((subCat, idx) => (
            <div
              key={idx}
              className={`sidebar-item p-2 rounded mb-2 ${selectedSubCategory === subCat ? 'active-category' : ''}`}
              style={{ cursor: 'pointer' }}
              onClick={() => handleSubCategoryClick(subCat)}
            >
              {subCat}
            </div>
          ))}

          <hr />
          {/* Price Range Filter */}
          <h6 className="fw-bold mt-4">Price Range</h6>
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
          <button className="btn btn-primary btn-sm w-100 mb-2" onClick={handlePriceFilter}>
            Apply Price
          </button>

          <hr />
          {/* Rating Filter */}
          <h6 className="fw-bold mt-4">Rating</h6>
          <div className="d-grid gap-2">
            {[4, 3, 2].map((star) => (
              <button
                key={star}
                className="btn btn-outline-dark btn-sm"
                onClick={() => handleRatingFilter(star)}
              >
                {star}★ & above
              </button>
            ))}
          </div>

          <button className="btn btn-danger btn-sm w-100 mt-3" onClick={handleClearFilters}>
            Clear All Filters
          </button>
        </div>

        {/* Products */}
        <div className="col-md-10">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold mb-0">Showing: {selectedSubCategory}</h4>
            <div className="d-flex align-items-center gap-2">
              <select
                className="form-select w-auto"
                onChange={handleSortChange}
                value={sortType}
              >
                <option value="">Sort By</option>
                <option value="priceLowHigh">Price: Low to High</option>
                <option value="priceHighLow">Price: High to Low</option>
                <option value="ratingHighLow">Rating: High to Low</option>
              </select>
            </div>
          </div>

          {sortType && (
            <div className="alert alert-info py-1 px-3 mb-3" style={{ width: 'fit-content' }}>
              <small>Sorting by:
                {sortType === 'priceLowHigh' && ' Price Low to High'}
                {sortType === 'priceHighLow' && ' Price High to Low'}
                {sortType === 'ratingHighLow' && ' Rating High to Low'}
              </small>
            </div>
          )}

          <div className="row">
            {subFilteredProducts.length > 0 ? (
              subFilteredProducts.map((product) => (
                <div key={product._id} className="col-6 col-md-3 mb-4">
                  <div className="card product-card shadow-sm h-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="card-img-top"
                      style={{ height: '160px', objectFit: 'cover', borderRadius: '10px 10px 0 0' }}
                    />
                    <div className="card-body text-center p-2">
                      <h6 className="card-title fw-bold mb-2" style={{ fontSize: "15px" }}>
                        {product.name}
                      </h6>
                      <p className="text-muted mb-1" style={{ fontSize: "14px" }}>{product.weight}</p>
                      <p className="fw-bold" style={{ fontSize: "14px" }}>{product.price}</p>
                      <div style={{ fontSize: "12px", color: "gray" }}>🚚 {product.deliveryTime}</div>

                      {cart[product._id]?.quantity > 0 ? (
                        <div className="d-flex align-items-center justify-content-between mt-2">
                          <button className="btn btn-outline-danger btn-sm" onClick={() => removeFromCart(product._id)}>
                            -
                          </button>
                          <span className="mx-2 fw-bold">{cart[product._id].quantity}</span>
                          <button className="btn btn-outline-success btn-sm" onClick={() => addToCart(product)}>
                            +
                          </button>
                        </div>
                      ) : (
                        <button className="btn btn-success w-100 btn-sm mt-2" onClick={() => addToCart(product)}>
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No products found for selected filters.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
