// import React, { useEffect, useState } from "react";
// import { Button } from "react-bootstrap";
// import axios from "axios";
// import { useCart } from "../context/cartContext";
// import "./CategoryProducts.css";

// const CategoryProducts = () => {
//   const { addToCart, removeFromCart, cart } = useCart();
//   const [allProducts, setAllProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   const categories = [
//     { name: "All", img: "/SidebarIcons/all.webp" },
//     { name: "Fresh Vegetables", img: "/SidebarIcons/Vegetables.webp" },
//     { name: "Fresh Fruits", img: "/SidebarIcons/Fruits.webp" },
//     { name: "Mangoes & Melons", img: "/SidebarIcons/Mangoes.webp" },
//     { name: "Flowers & Leaves", img: "/SidebarIcons/Flowers.webp" },
//     { name: "Leafy, Herbs & Seasonings", img: "/SidebarIcons/Leafy.webp" },
//     { name: "Exotics & Premium", img: "/SidebarIcons/Exotics.webp" },
//     { name: "Organics & Hydroponics", img: "/SidebarIcons/Organics.webp" },
//     { name: "Sprouts", img: "/SidebarIcons/Sprouts.webp" },
//     { name: "Dried", img: "/SidebarIcons/Dried.webp" },
//     { name: "Juices", img: "/SidebarIcons/Juices.webp" },
//     { name: "Plant", img: "/SidebarIcons/Plant.webp" },
//     { name: "Salads", img: "/SidebarIcons/Salad.webp" },
//     { name: "Bloom", img: "/SidebarIcons/Bloom.webp" },
//   ];

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get(`/api/products`);
//         setAllProducts(res.data.products);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const handleCategoryClick = (catName) => {
//     setSelectedCategory(catName);
//   };

//   const filteredProducts = selectedCategory === "All"
//     ? allProducts
//     : allProducts.filter(
//         (product) => product.category === selectedCategory
//       );

//   return (
//     <div className="container-fluid mt-3">
//       <div className="row">

//         {/* Sidebar */}
//         <div className="col-md-2 category-sidebar p-3">
//           {categories.map((cat, idx) => (
//             <div
//               key={idx}
//               className={`sidebar-item d-flex align-items-center mb-3 p-2 rounded ${
//                 selectedCategory === cat.name ? "active-category" : ""
//               }`}
//               style={{ cursor: "pointer" }}
//               onClick={() => handleCategoryClick(cat.name)}
//             >
//               <img src={cat.img} alt={cat.name} className="sidebar-icon" />
//               <span className="ms-2 sidebar-text">{cat.name}</span>
//             </div>
//           ))}
//         </div>

//         {/* Products Area */}
//         <div className="col-md-10">
//           <h2 className="mb-4 fw-bold">Fresh {selectedCategory}</h2>

//           <div className="row">
//             {filteredProducts.length > 0 ? (
//               filteredProducts.map((product) => (
//                 <div className="col-6 col-md-3 mb-3" key={product._id}>
//                   <div className="card h-100 shadow-sm product-card">

//                     {/* Discount Badge */}
//                     <div className="discount-badge">{product.discount}% OFF</div>

//                     {/* Product Image */}
//                     <img
//                       src={product.image}
//                       className="card-img-top"
//                       alt={product.name}
//                       style={{
//                         height: "140px",
//                         width: "100%",
//                         objectFit: "cover", // 👈 perfect fit
//                         borderRadius: "12px 12px 0 0",
//                       }}
//                     />

//                     {/* Card Body */}
//                     <div className="card-body p-2 text-center">

//                       <h6 className="card-title fw-bold mb-1" style={{ fontSize: "15px ", fontWeight:'bold' }}>
//                         {product.name}
//                       </h6>

//                       <p className="text-muted mb-1" style={{ fontSize: "15px" }}>
//                         {product.weight}
//                       </p>

//                       <div className="mb-1" style={{ fontSize: "15px", color: "gray" }}>
//                         🚚 {product.deliveryTime}
//                       </div>

//                       <div className="fw-bold" style={{ fontSize: "15px" }}>
//                         {product.price}
//                       </div>

//                       {/* Add to Cart or Quantity */}
//                       {cart[product._id]?.quantity > 0 ? (
//                         <div className="d-flex align-items-center justify-content-between mt-2">
//                           <Button
//                             variant="outline-danger"
//                             size="sm"
//                             onClick={() => removeFromCart(product._id)}
//                           >
//                             -
//                           </Button>
//                           <span className="mx-2 fw-bold">{cart[product._id].quantity}</span>
//                           <Button
//                             variant="outline-success"
//                             size="sm"
//                             onClick={() => addToCart(product)}
//                           >
//                             +
//                           </Button>
//                         </div>
//                       ) : (
                    
//                         <Button
//                           variant="success"
//                           size="sm"
//                           className="w-100 mt-2"
//                           onClick={() => addToCart(product)}
//                         >
//                           Add to Cart
//                         </Button>
//                       )}
//                     </div>

//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="col-12">
//                 <h5>No Products Found!</h5>
//               </div>
//             )}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default CategoryProducts;



import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useCart } from "../context/cartContext";
import "./CategoryProducts.css";

const CategoryProducts = () => {
  const { addToCart, removeFromCart, cart } = useCart();
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    { name: "All", img: "/SidebarIcons/all.webp" },
    { name: "Fresh Vegetables", img: "/SidebarIcons/Vegetables.webp" },
    { name: "Fresh Fruits", img: "/SidebarIcons/Fruits.webp" },
    { name: "Mangoes & Melons", img: "/SidebarIcons/Mangoes.webp" },
    { name: "Flowers & Leaves", img: "/SidebarIcons/Flowers.webp" },
    { name: "Leafy, Herbs & Seasonings", img: "/SidebarIcons/Leafy.webp" },
    { name: "Exotics & Premium", img: "/SidebarIcons/Exotics.webp" },
    { name: "Organics & Hydroponics", img: "/SidebarIcons/Organics.webp" },
    { name: "Sprouts", img: "/SidebarIcons/Sprouts.webp" },
    { name: "Dried", img: "/SidebarIcons/Dried.webp" },
    { name: "Juices", img: "/SidebarIcons/Juices.webp" },
    { name: "Plant", img: "/SidebarIcons/Plant.webp" },
    { name: "Salads", img: "/SidebarIcons/Salad.webp" },
    { name: "Bloom", img: "/SidebarIcons/Bloom.webp" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`/api/products`);
        setAllProducts(res.data.products);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  const handleCategoryClick = (catName) => {
    setSelectedCategory(catName);
  };

  const filteredProducts =
    selectedCategory === "All"
      ? allProducts
      : allProducts.filter((product) => product.category === selectedCategory);

  return (
    <div className="container-fluid mt-3">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-2 category-sidebar p-3">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className={`sidebar-item d-flex align-items-center mb-3 p-2 rounded ${
                selectedCategory === cat.name ? "active-category" : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => handleCategoryClick(cat.name)}
            >
              <img src={cat.img} alt={cat.name} className="sidebar-icon" />
              <span className="ms-2 sidebar-text">{cat.name}</span>
            </div>
          ))}
        </div>

        {/* Products */}
        <div className="col-md-10">
          <h2 className="mb-4 fw-bold">Fresh {selectedCategory}</h2>
          <div className="row">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div className="col-6 col-md-3 mb-3" key={product._id}>
                  <div className="card h-100 shadow-sm product-card">
                    <div className="discount-badge">{product.discount}% OFF</div>
                    <img
                      src={product.image}
                      className="card-img-top"
                      alt={product.name}
                      style={{
                        height: "140px",
                        width: "100%",
                        objectFit: "cover",
                        borderRadius: "12px 12px 0 0",
                      }}
                    />
                    <div className="card-body p-2 text-center">
                      <h6
                        className="card-title fw-bold mb-1"
                        style={{ fontSize: "15px" }}
                      >
                        {product.name}
                      </h6>
                      <p className="text-muted mb-1" style={{ fontSize: "15px" }}>
                        {product.weight}
                      </p>
                      <div
                        className="mb-1"
                        style={{ fontSize: "15px", color: "gray" }}
                      >
                        🚚 {product.deliveryTime}
                      </div>
                      <div className="fw-bold" style={{ fontSize: "15px" }}>
                        ₹{product.price}
                      </div>
                      {cart[product._id]?.quantity > 0 ? (
                        <div className="d-flex align-items-center justify-content-between mt-2">
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => removeFromCart(product._id)}
                          >
                            -
                          </Button>
                          <span className="mx-2 fw-bold">
                            {cart[product._id].quantity}
                          </span>
                          <Button
                            variant="outline-success"
                            size="sm"
                            onClick={() => addToCart(product)}
                          >
                            +
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="success"
                          size="sm"
                          className="w-100 mt-2"
                          onClick={() => addToCart(product)}
                        >
                          Add to Cart
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <h5>No Products Found!</h5>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
