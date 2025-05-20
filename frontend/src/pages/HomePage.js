
// import React, { useRef, useState, useEffect } from "react";
// import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import "../components/Home.css";
// import Footer from "../components/Footer";
// import categorySlugReverseMapper from "../utils/categorySlugReverseMapper";
// import axios from "axios";
// import { useCart } from "../context/cartContext";
// import FloatingCartBar from "../components/FloatingCartBar";
// import { API, BASE_URL } from '../config/config'; // ✅ named import
//  // ✅ named import


// const topCategories = [
//   { name: "All", img: "/topCategories/shopping-bag.png" },
//   { name: "Cafe", img: "/topCategories/coffee.png" },
//   { name: "Home", img: "/topCategories/love.png" },
//   { name: "Toys", img: "/topCategories/toys.png" },
//   { name: "Fresh", img: "/topCategories/fresh.png" },
//   { name: "Electronics", img: "/topCategories/electronics_icon.png" },
//   { name: "Mobiles", img: "/topCategories/mobile_icon.png" },
//   { name: "Beauty", img: "/topCategories/beauty_icon.png" },
//   { name: "Fashion", img: "/topCategories/fashion_icon.png" },
//   { name: "Deal Zone", img: "/topCategories/dealzone_icon.png" },
//   { name: "Baby Store", img: "/topCategories/baby_icon.png" },
  
// ];

// const fruitsCategories = [
//   { name: "Fruits & Vegetables", img: "/FruitsCategories/fruits.png" },
//   { name: "Atta, Rice, Oil & Dals", img: "/FruitsCategories/aata.png" },
//   { name: "Masala & Dry Fruits", img: "/FruitsCategories/Masala.png" },
//   { name: "Zepto Cafe", img: "/FruitsCategories/cafe.png" },
//   { name: "Sweet Cravings", img: "/FruitsCategories/Sweet.png" },
//   { name: "Toys & Sports", img: "/FruitsCategories/Toys&Sports.png" },
//   { name: "Apparel & Lifestyle", img: "/FruitsCategories/Lifestyle.png" },
//   { name: "Jewellery & Accessories", img: "/FruitsCategories/jewellery.png" },
//   { name: "Frozen Food", img: "/FruitsCategories/Frozen_Food.png" },
//   { name: "Ice Creams & More", img: "/FruitsCategories/Ice-Creams.png" },
//   { name: "Packaged Food", img: "/FruitsCategories/Packaged_Food.png" },
//   { name: "Dairy", img: "/FruitsCategories/Dairy.png" },
//   { name: "Cold Drinks", img: "/FruitsCategories/Cold-Drink.png" },
//   { name: "Munchies", img: "/FruitsCategories/Munchies.png" },
//   { name: "Meat", img: "/FruitsCategories/Meat.png" },
//   { name: "Breakfast", img: "/FruitsCategories/Breakfast.png" },
//   { name: "Tea", img: "/FruitsCategories/tea.png" },
//   { name: "Biscuit", img: "/FruitsCategories/biscuits.png" },
//   { name: "Makeup", img: "/FruitsCategories/Makeup.png" },
//   { name: "SkinCare", img: "/FruitsCategories/Skincare.png" },
//   { name: "Bath & Body", img: "/FruitsCategories/Bath.png" },
//   { name: "HairCare", img: "/FruitsCategories/Hair_Care.png" },
//   { name: "Cleaning", img: "/FruitsCategories/cleaning.png" },
//   { name: "HomeNeeds", img: "/FruitsCategories/Home_Needs.png" },
//   { name: "Books", img: "/FruitsCategories/Stationery.png" },
//   { name: "Kitchen", img: "/FruitsCategories/Kitchen.png" },
//   { name: "Electronics", img: "/FruitsCategories/Electronis.png" },
//   { name: "Grooming", img: "/FruitsCategories/Fragrances.png" },
//   { name: "Hygiene", img: "/FruitsCategories/Hygiene.png" },
//   { name: "Pharmacy", img: "/FruitsCategories/Pharmacy.png" },
//   { name: "Sexual", img: "/FruitsCategories/Sexual.png" },
//   { name: "BabyCare", img: "/FruitsCategories/BabyCare.png" },
//   { name: "PetCare", img: "/FruitsCategories/PetCare.png" },
//   { name: "PaanCorner", img: "/FruitsCategories/Paan.png" },
// ];

// const buyAgainCategories = [
//   { label: "All Items", value: "All" },
//   { label: "Fruits & Vegetables", value: "Fruits & Vegetables" },
//   { label: "Dairy Products", value: "Dairy Products" },
//   { label: "Snacks & Drinks", value: "Snacks & Drinks" },
//   { label: "Grocery & Kitchen", value: "Grocery & Kitchen" },
//   { label: "Sweets & Chocolates", value: "Sweets & Chocolates" },
//   { label: "Zepto Cafe", value: "Zepto Cafe" },
//   { label: "Beauty & Personal Care", value: "Beauty & Personal Care" },
//   { label: "Household Essentials", value: "Household Essentials" }
// ];

// const HomePage = () => {
// const fruitsScrollRef = useRef(null);
//   const [activeCategory, setActiveCategory] = useState("All");

//   const handleFruitCategoryClick = (categoryName) => {
//     const slug = categorySlugReverseMapper[categoryName];
//     if (slug) navigate(`/category/${slug}`);
//   };

//   const scrollRight = () => fruitsScrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
//   const scrollLeft = () => fruitsScrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
//   const handleCategoryClick = (categoryName) => {
//     setActiveCategory(categoryName);
//     if (categoryName === "All") window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const [buyAgainProducts, setBuyAgainProducts] = useState([]);
//   const [selectedBuyAgain, setSelectedBuyAgain] = useState("All");
//   const [loading, setLoading] = useState(false);
//   const { cart, addToCart, removeFromCart } = useCart();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBuyAgainProducts = async () => {
//       setLoading(true);
//       try {
//         const url =
//           selectedBuyAgain === "All"
//             ? `${API}/products`
//             : `${API}/products?category=${encodeURIComponent(selectedBuyAgain)}`;
//         const res = await axios.get(url);
//         setBuyAgainProducts(res.data.products);
//       } catch (error) {
//         console.error("Error fetching buy again products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBuyAgainProducts();
//   }, [selectedBuyAgain]);



//   return (
//     <Container className="pt-3 pb-5">




//         <div
//         className="d-flex overflow-auto p-3 bg-white shadow-sm mb-4 hide-scrollbar"
//         style={{ whiteSpace: "nowrap" }}
//       >
//         {topCategories.map((cat, idx) => (
//           <div
//             key={idx}
//             className="category-box d-flex align-items-center justify-content-center mx-3"
//             onClick={() => handleCategoryClick(cat.name)}
//             style={{ cursor: "pointer" }}
//           >
//             <img
//               src={cat.img}
//               alt={cat.name}
//               style={{ width: "25px", marginRight: "8px" }}
//             />
//             <span>{cat.name}</span>
//           </div>
//         ))}
//       </div>

//       <div
//         className="position-relative bg-white shadow-sm mb-4"
//         style={{ padding: "10px 0" }}
//       >
//         <div
//           className="d-flex overflow-auto px-3 fruits-scroll hide-scrollbar"
//           style={{ whiteSpace: "nowrap" }}
//           ref={fruitsScrollRef}
//         >
//           {fruitsCategories.map((cat, idx) => (
//             <div
//               key={idx}
//               className="text-center mx-2 fruits-category-item"
//               onClick={() => handleFruitCategoryClick(cat.name)}
//             >
//               <div className="fruits-category-card">
//                 <img
//                   src={cat.img}
//                   alt={cat.name}
//                   className="fruits-category-img"
//                 />
//                 {/* <div className="fruits-category-name">
//             {cat.name}
//           </div> */}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Left Arrow */}
//         <Button
//           variant="light"
//           className="position-absolute top-50 start-0 translate-middle-y ms-2 shadow-sm"
//           style={{
//             borderRadius: "50%",
//             width: "40px",
//             height: "40px",
//             padding: "6px",
//           }}
//           onClick={scrollLeft}
//         >
//           <img
//             src="https://cdn-icons-png.flaticon.com/128/271/271228.png"
//             alt="Left"
//             style={{
//               width: "20px",
//               height: "20px",
//               transform: "rotate(180deg)",
//             }}
//           />
//         </Button>

//         {/* Right Arrow */}
//         <Button
//           variant="light"
//           className="position-absolute top-50 end-0 translate-middle-y me-2 shadow-sm"
//           style={{
//             borderRadius: "50%",
//             width: "40px",
//             height: "40px",
//             padding: "6px",
//           }}
//           onClick={scrollRight}
//         >
//           <img
//             src="https://cdn-icons-png.flaticon.com/128/271/271228.png"
//             alt="Right"
//             style={{ width: "20px", height: "20px" }}
//           />
//         </Button>
//       </div>

//       {/* Paan Corner Banner */}
//       <div className="paan-banner my-4">
//         {/* <div className="paan-banner-content d-flex align-items-center justify-content-between p-4"> */}
//         <div>
//           <div>
//             <img
//               src="/Banner/Paan_Corner.webp"
//               alt="Paan Corner"
//               style={{ maxWidth: "2200px", height: "auto" }}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Super Sonic + Beauty Lit Section with inner slider */}
//       <Row className="my-4" style={{ padding: "20px 0" }}>
//         {/* Left Side */}
//         <Col md={6} className="mb-3">
//           <div className="deals-banner d-flex flex-column">
//             {/* Super Sonic Image */}
//             <div
//               style={{
//                 backgroundColor: "black",
//                 borderRadius: "12px 12px 0 0",
//                 overflow: "hidden",
//               }}
//             >
//               <img
//                 src="/Banner/SuperSonic.webp"
//                 alt="Super Sonic Deals"
//                 style={{ width: "100%", height: "auto", display: "block" }}
//               />
//             </div>

//             {/* Black Slider Container */}
//             <div
//               style={{
//                 backgroundColor: "black",
//                 borderRadius: "0 0 12px 12px" /* Only bottom round corners */,
//                 padding: "15px",
//                 overflowX: "auto",
//                 whiteSpace: "nowrap",
//               }}
//               className="hide-scrollbar"
//             >
//               {/* Slider Cards */}
//               <div className="deals-card d-inline-block mx-2">
//                 <img
//                   src="/Slider/deal1.png"
//                   alt="Deal 1"
//                   style={{
//                     width: "110px",
//                     height: "100px",
//                     borderRadius: "12px",
//                   }}
//                 />
//               </div>
//               <div className="deals-card d-inline-block mx-2">
//                 <img
//                   src="/Slider/deal2.png"
//                   alt="Deal 2"
//                   style={{
//                     width: "110px",
//                     height: "100px",
//                     borderRadius: "12px",
//                   }}
//                 />
//               </div>
//               <div className="deals-card d-inline-block mx-2">
//                 <img
//                   src="/Slider/deal3.png"
//                   alt="Deal 3"
//                   style={{
//                     width: "110px",
//                     height: "100px",
//                     borderRadius: "12px",
//                   }}
//                 />
//               </div>
//               <div className="deals-card d-inline-block mx-2">
//                 <img
//                   src="/Slider/deal4.png"
//                   alt="Deal 4"
//                   style={{
//                     width: "110px",
//                     height: "100px",
//                     borderRadius: "12px",
//                   }}
//                 />
//               </div>
//               <div className="deals-card d-inline-block mx-2">
//                 <img
//                   src="/Slider/deal5.png"
//                   alt="Deal 5"
//                   style={{
//                     width: "110px",
//                     height: "100px",
//                     borderRadius: "12px",
//                   }}
//                 />
//               </div>
//             </div>
//           </div>
//         </Col>

//         {/* Right Side - BeautyLit + Pink Slider (no space between) */}
//         <Col md={6} className="mb-3">
//           <div className="deals-banner d-flex flex-column">
//             {/* BeautyLit Image */}
//             <div
//               style={{
//                 background: "linear-gradient(to right, #ffdce0, #ffeef0)",
//                 borderRadius: "12px 12px 0 0",
//                 overflow: "hidden",
//               }}
//             >
//               <img
//                 src="/Banner/BeautyLIT.webp"
//                 alt="Beauty Lit Fest"
//                 style={{ width: "100%", height: "auto", display: "block" }}
//               />
//             </div>

//             {/* Pink Deals Slider Below */}
//             <div
//               style={{
//                 background: "linear-gradient(to right, #ffdce0, #ffeef0)",
//                 borderRadius: "0 0 12px 12px" /* Only bottom round corners */,
//                 padding: "15px",
//                 overflowX: "auto",
//                 whiteSpace: "nowrap",
//               }}
//               className="hide-scrollbar"
//             >
//               {/* Slider Cards */}
//               <div className="deals-card d-inline-block mx-2">
//                 <img
//                   src="/Slider/Beauty1.png"
//                   alt="Beauty 1"
//                   style={{
//                     width: "110px",
//                     height: "100px",
//                     borderRadius: "12px",
//                   }}
//                 />
//               </div>
//               <div className="deals-card d-inline-block mx-2">
//                 <img
//                   src="/Slider/Beauty2.png"
//                   alt="Beauty 2"
//                   style={{
//                     width: "110px",
//                     height: "100px",
//                     borderRadius: "12px",
//                   }}
//                 />
//               </div>
//               <div className="deals-card d-inline-block mx-2">
//                 <img
//                   src="/Slider/Beauty3.png"
//                   alt="Beauty 3"
//                   style={{
//                     width: "110px",
//                     height: "100px",
//                     borderRadius: "12px",
//                   }}
//                 />
//               </div>
//               <div className="deals-card d-inline-block mx-2">
//                 <img
//                   src="/Slider/Beauty4.png"
//                   alt="Beauty 4"
//                   style={{
//                     width: "110px",
//                     height: "100px",
//                     borderRadius: "12px",
//                   }}
//                 />
//               </div>
//               <div className="deals-card d-inline-block mx-2">
//                 <img
//                   src="/Slider/Beauty5.png"
//                   alt="Beauty 5"
//                   style={{
//                     width: "110px",
//                     height: "100px",
//                     borderRadius: "12px",
//                   }}
//                 />
//               </div>
//               <div className="deals-card d-inline-block mx-2">
//                 <img
//                   src="/Slider/Beauty6.png"
//                   alt="Beauty 6"
//                   style={{
//                     width: "110px",
//                     height: "100px",
//                     borderRadius: "12px",
//                   }}
//                 />
//               </div>
//             </div>
//           </div>
//         </Col>
//       </Row>

//       {/* Insurance + JioHotstar + Forex + Bank Cards Section */}
//       <Row className="my-4 g-3">
//         <Col md={3} sm={6} xs={12}>
//           <div
//             className="info-card shadow-sm rounded"
//             style={{ overflow: "hidden", background: "#f7f7f7" }}
//           >
//             <img
//               src="/Cards/LifeCover.webp"
//               alt="Life Cover"
//               style={{ width: "100%", height: "auto", display: "block" }}
//             />
//           </div>
//         </Col>

//         <Col md={3} sm={6} xs={12}>
//           <div
//             className="info-card shadow-sm rounded"
//             style={{ overflow: "hidden", background: "#f7f7f7" }}
//           >
//             <img
//               src="/Cards/JioHotstar.webp"
//               alt="JioHotstar"
//               style={{ width: "100%", height: "auto", display: "block" }}
//             />
//           </div>
//         </Col>

//         <Col md={3} sm={6} xs={12}>
//           <div
//             className="info-card shadow-sm rounded"
//             style={{ overflow: "hidden", background: "#f7f7f7" }}
//           >
//             <img
//               src="/Cards/ZeroForex.webp"
//               alt="Zero Forex"
//               style={{ width: "100%", height: "auto", display: "block" }}
//             />
//           </div>
//         </Col>

//         <Col md={3} sm={6} xs={12}>
//           <div
//             className="info-card shadow-sm rounded"
//             style={{ overflow: "hidden", background: "#f7f7f7" }}
//           >
//             <img
//               src="/Cards/SavingAcc.webp"
//               alt="Bank Savings"
//               style={{ width: "100%", height: "auto", display: "block" }}
//             />
//           </div>
//         </Col>
//       </Row>

//   <div
//         className="d-flex overflow-auto p-3 bg-white shadow-sm mb-4 hide-scrollbar"
//         style={{ whiteSpace: "nowrap" }}
//       >
//         {topCategories.map((cat, idx) => (
//           <div
//             key={idx}
//             className="category-box d-flex align-items-center justify-content-center mx-3"
//             onClick={() => handleCategoryClick(cat.name)}
//             style={{ cursor: "pointer" }}
//           >
//             <img
//               src={cat.img}
//               alt={cat.name}
//               style={{ width: "25px", marginRight: "8px" }}
//             />
//             <span>{cat.name}</span>
//           </div>
//         ))}
//       </div>

//       <div
//         className="position-relative bg-white shadow-sm mb-4"
//         style={{ padding: "10px 0" }}
//       >
//         <div
//           className="d-flex overflow-auto px-3 fruits-scroll hide-scrollbar"
//           style={{ whiteSpace: "nowrap" }}
//           ref={fruitsScrollRef}
//         >
//           {fruitsCategories.map((cat, idx) => (
//             <div
//               key={idx}
//               className="text-center mx-2 fruits-category-item"
//               onClick={() => handleFruitCategoryClick(cat.name)}
//             >
//               <div className="fruits-category-card">
//                 <img
//                   src={cat.img}
//                   alt={cat.name}
//                   className="fruits-category-img"
//                 />
//                 {/* <div className="fruits-category-name">
//             {cat.name}
//           </div> */}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Left Arrow */}
//         <Button
//           variant="light"
//           className="position-absolute top-50 start-0 translate-middle-y ms-2 shadow-sm"
//           style={{
//             borderRadius: "50%",
//             width: "40px",
//             height: "40px",
//             padding: "6px",
//           }}
//           onClick={scrollLeft}
//         >
//           <img
//             src="https://cdn-icons-png.flaticon.com/128/271/271228.png"
//             alt="Left"
//             style={{
//               width: "20px",
//               height: "20px",
//               transform: "rotate(180deg)",
//             }}
//           />
//         </Button>

//         {/* Right Arrow */}
//         <Button
//           variant="light"
//           className="position-absolute top-50 end-0 translate-middle-y me-2 shadow-sm"
//           style={{
//             borderRadius: "50%",
//             width: "40px",
//             height: "40px",
//             padding: "6px",
//           }}
//           onClick={scrollRight}
//         >
//           <img
//             src="https://cdn-icons-png.flaticon.com/128/271/271228.png"
//             alt="Right"
//             style={{ width: "20px", height: "20px" }}
//           />
//         </Button>
//       </div>

//       {/* Paan Corner Banner */}
//       <div className="paan-banner my-4">
//         {/* <div className="paan-banner-content d-flex align-items-center justify-content-between p-4"> */}
//         <div>
//           <div>
//             <img
//               src="/Banner/Paan_Corner.webp"
//               alt="Paan Corner"
//               style={{ maxWidth: "2200px", height: "auto" }}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Super Sonic + Beauty Lit Section with inner slider */}
//       <Row className="my-4" style={{ padding: "20px 0" }}>
//         {/* Left Side */}
//         <Col md={6} className="mb-3">
//           <div className="deals-banner d-flex flex-column">
//             {/* Super Sonic Image */}
//             <div
//               style={{
//                 backgroundColor: "black",
//                 borderRadius: "12px 12px 0 0",
//                 overflow: "hidden",
//               }}
//             >
//               <img
//                 src="/Banner/SuperSonic.webp"
//                 alt="Super Sonic Deals"
//                 style={{ width: "100%", height: "auto", display: "block" }}
//               />
//             </div>

//             {/* Black Slider Container */}
//             <div
//               style={{
//                 backgroundColor: "black",
//                 borderRadius: "0 0 12px 12px" /* Only bottom round corners */,
//                 padding: "15px",
//                 overflowX: "auto",
//                 whiteSpace: "nowrap",
//               }}
//               className="hide-scrollbar"
//             >
//               {/* Slider Cards */}
//               <div className="deals-card d-inline-block mx-2">
//                 <img
//                   src="/Slider/deal1.png"
//                   alt="Deal 1"
//                   style={{
//                     width: "110px",
//                     height: "100px",
//                     borderRadius: "12px",
//                   }}
//                 />
//               </div>
//               <div className="deals-card d-inline-block mx-2">
//                 <img
//                   src="/Slider/deal2.png"
//                   alt="Deal 2"
//                   style={{
//                     width: "110px",
//                     height: "100px",
//                     borderRadius: "12px",
//                   }}
//                 />
//               </div>
//               <div className="deals-card d-inline-block mx-2">
//                 <img
//                   src="/Slider/deal3.png"
//                   alt="Deal 3"
//                   style={{
//                     width: "110px",
//                     height: "100px",
//                     borderRadius: "12px",
//                   }}
//                 />
//               </div>
//               <div className="deals-card d-inline-block mx-2">
//                 <img
//                   src="/Slider/deal4.png"
//                   alt="Deal 4"
//                   style={{
//                     width: "110px",
//                     height: "100px",
//                     borderRadius: "12px",
//                   }}
//                 />
//               </div>
//               <div className="deals-card d-inline-block mx-2">
//                 <img
//                   src="/Slider/deal5.png"
//                   alt="Deal 5"
//                   style={{
//                     width: "110px",
//                     height: "100px",
//                     borderRadius: "12px",
//                   }}
//                 />
//               </div>
//             </div>
//           </div>
//         </Col>

//         {/* Right Side - BeautyLit + Pink Slider (no space between) */}
//         <Col md={6} className="mb-3">
//           <div className="deals-banner d-flex flex-column">
//             {/* BeautyLit Image */}
//             <div
//               style={{
//                 background: "linear-gradient(to right, #ffdce0, #ffeef0)",
//                 borderRadius: "12px 12px 0 0",
//                 overflow: "hidden",
//               }}
//             >
//               <img
//                 src="/Banner/BeautyLIT.webp"
//                 alt="Beauty Lit Fest"
//                 style={{ width: "100%", height: "auto", display: "block" }}
//               />
//             </div>

//             {/* Pink Deals Slider Below */}
//             <div
//               style={{
//                 background: "linear-gradient(to right, #ffdce0, #ffeef0)",
//                 borderRadius: "0 0 12px 12px" /* Only bottom round corners */,
//                 padding: "15px",
//                 overflowX: "auto",
//                 whiteSpace: "nowrap",
//               }}
//               className="hide-scrollbar"
//             >
//               {/* Slider Cards */}
//               <div className="deals-card d-inline-block mx-2">
//                 <img
//                   src="/Slider/Beauty1.png"
//                   alt="Beauty 1"
//                   style={{
//                     width: "110px",
//                     height: "100px",
//                     borderRadius: "12px",
//                   }}
//                 />
//               </div>
//               <div className="deals-card d-inline-block mx-2">
//                 <img
//                   src="/Slider/Beauty2.png"
//                   alt="Beauty 2"
//                   style={{
//                     width: "110px",
//                     height: "100px",
//                     borderRadius: "12px",
//                   }}
//                 />
//               </div>
//               <div className="deals-card d-inline-block mx-2">
//                 <img
//                   src="/Slider/Beauty3.png"
//                   alt="Beauty 3"
//                   style={{
//                     width: "110px",
//                     height: "100px",
//                     borderRadius: "12px",
//                   }}
//                 />
//               </div>
//               <div className="deals-card d-inline-block mx-2">
//                 <img
//                   src="/Slider/Beauty4.png"
//                   alt="Beauty 4"
//                   style={{
//                     width: "110px",
//                     height: "100px",
//                     borderRadius: "12px",
//                   }}
//                 />
//               </div>
//               <div className="deals-card d-inline-block mx-2">
//                 <img
//                   src="/Slider/Beauty5.png"
//                   alt="Beauty 5"
//                   style={{
//                     width: "110px",
//                     height: "100px",
//                     borderRadius: "12px",
//                   }}
//                 />
//               </div>
//               <div className="deals-card d-inline-block mx-2">
//                 <img
//                   src="/Slider/Beauty6.png"
//                   alt="Beauty 6"
//                   style={{
//                     width: "110px",
//                     height: "100px",
//                     borderRadius: "12px",
//                   }}
//                 />
//               </div>
//             </div>
//           </div>
//         </Col>
//       </Row>

//       {/* Insurance + JioHotstar + Forex + Bank Cards Section */}
//       <Row className="my-4 g-3">
//         <Col md={3} sm={6} xs={12}>
//           <div
//             className="info-card shadow-sm rounded"
//             style={{ overflow: "hidden", background: "#f7f7f7" }}
//           >
//             <img
//               src="/Cards/LifeCover.webp"
//               alt="Life Cover"
//               style={{ width: "100%", height: "auto", display: "block" }}
//             />
//           </div>
//         </Col>

//         <Col md={3} sm={6} xs={12}>
//           <div
//             className="info-card shadow-sm rounded"
//             style={{ overflow: "hidden", background: "#f7f7f7" }}
//           >
//             <img
//               src="/Cards/JioHotstar.webp"
//               alt="JioHotstar"
//               style={{ width: "100%", height: "auto", display: "block" }}
//             />
//           </div>
//         </Col>

//         <Col md={3} sm={6} xs={12}>
//           <div
//             className="info-card shadow-sm rounded"
//             style={{ overflow: "hidden", background: "#f7f7f7" }}
//           >
//             <img
//               src="/Cards/ZeroForex.webp"
//               alt="Zero Forex"
//               style={{ width: "100%", height: "auto", display: "block" }}
//             />
//           </div>
//         </Col>

//         <Col md={3} sm={6} xs={12}>
//           <div
//             className="info-card shadow-sm rounded"
//             style={{ overflow: "hidden", background: "#f7f7f7" }}
//           >
//             <img
//               src="/Cards/SavingAcc.webp"
//               alt="Bank Savings"
//               style={{ width: "100%", height: "auto", display: "block" }}
//             />
//           </div>
//         </Col>
//       </Row>

//       {/* Buy Again Section */}
//       <div className="my-4 px-2">
//         <h4 className="mb-3 text-purple fw-bold">Buy <span className="text-dark">Again</span></h4>
//         <div className="d-flex overflow-auto hide-scrollbar mb-3">
//           {buyAgainCategories.map((cat, index) => (
//             <Button
//               key={index}
//               variant={selectedBuyAgain === cat.value ? "dark" : "outline-secondary"}
//               size="sm"
//               className="me-2"
//               onClick={() => setSelectedBuyAgain(cat.value)}
//             >
//               {cat.label}
//             </Button>
//           ))}
//         </div>
//         {loading ? (
//           <div className="text-center my-4"><Spinner animation="border" variant="primary" /></div>
//         ) : (
//           <Row className="g-3">
//             {buyAgainProducts.map((product) => (
//               <Col key={product._id} md={2} sm={4} xs={6}>
//                 <div
//                   className="p-2 shadow-sm bg-white rounded text-center h-100 position-relative"
//                   style={{ cursor: "pointer" }}
//                   onClick={() => navigate(`/product/${product._id}`)}
//                 >
//                   {product.discount && (
//                     <div className="position-absolute top-0 start-0 bg-purple text-white px-2 py-1 rounded-end" style={{ fontSize: "12px", fontWeight: "bold", zIndex: 1 }}>
//                       {product.discount}% Off
//                     </div>
//                   )}
// {/* <img src={`http://localhost:5003${product.image}`} alt={product.name} style={{ height: "110px", objectFit: "contain" }} className="mb-2" />                   */}
//                  <img
//   src={
//     product.image?.startsWith("http")
//       ? product.image
//       : `${BASE_URL}${product.image}`
//   }
//   alt={product.name}
//   style={{ height: "110px", objectFit: "contain" }}
//   className="mb-2"
// />



//                   <p className="fw-bold small mb-1">{product.name}</p>
//                   <p className="small text-muted mb-1">{product.weight}</p>
//                   <p className="fw-bold">₹{product.price}</p>
//                   {cart[product._id]?.quantity > 0 ? (
//                     <div className="d-flex justify-content-between align-items-center px-3">
//                       <button className="btn btn-outline-danger btn-sm" onClick={(e) => { e.stopPropagation(); removeFromCart(product._id); }}>−</button>
//                       <span>{cart[product._id].quantity}</span>
//                       <button className="btn btn-outline-success btn-sm" onClick={(e) => { e.stopPropagation(); addToCart(product); }}>+</button>
//                     </div>
//                   ) : (
//                     <Button variant="success" size="sm" className="w-100 mt-2" onClick={(e) => { e.stopPropagation(); addToCart(product); }}>
//                       Add to Cart
//                     </Button>
//                   )}
//                 </div>
//               </Col>
//             ))}
//           </Row>
//         )}
//       </div>

//       <Footer />
//       <FloatingCartBar />
//     </Container>
//   );
// };

// export default HomePage;






import React, { useRef, useState, useEffect } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../components/Home.css";
import Footer from "../components/Footer";
import categorySlugReverseMapper from "../utils/categorySlugReverseMapper";
import axios from "axios";
import { useCart } from "../context/cartContext";
import FloatingCartBar from "../components/FloatingCartBar";
import { API, BASE_URL } from "../config/config";

const topCategories = [
  { name: "All", img: "/topCategories/shopping-bag.png" },
  { name: "Cafe", img: "/topCategories/coffee.png" },
  { name: "Home", img: "/topCategories/love.png" },
  { name: "Toys", img: "/topCategories/toys.png" },
  { name: "Fresh", img: "/topCategories/fresh.png" },
  { name: "Electronics", img: "/topCategories/electronics_icon.png" },
  { name: "Mobiles", img: "/topCategories/mobile_icon.png" },
  { name: "Beauty", img: "/topCategories/beauty_icon.png" },
  { name: "Fashion", img: "/topCategories/fashion_icon.png" },
  { name: "Deal Zone", img: "/topCategories/dealzone_icon.png" },
  { name: "Baby Store", img: "/topCategories/baby_icon.png" },
];

const fruitsCategories = [
  { name: "Fruits & Vegetables", img: "/FruitsCategories/fruits.png" },
  { name: "Atta, Rice, Oil & Dals", img: "/FruitsCategories/aata.png" },
  { name: "Masala & Dry Fruits", img: "/FruitsCategories/Masala.png" },
  { name: "Zepto Cafe", img: "/FruitsCategories/cafe.png" },
  { name: "Sweet Cravings", img: "/FruitsCategories/Sweet.png" },
  { name: "Toys & Sports", img: "/FruitsCategories/Toys&Sports.png" },
  { name: "Apparel & Lifestyle", img: "/FruitsCategories/Lifestyle.png" },
  { name: "Jewellery & Accessories", img: "/FruitsCategories/jewellery.png" },
  { name: "Frozen Food", img: "/FruitsCategories/Frozen_Food.png" },
  { name: "Ice Creams & More", img: "/FruitsCategories/Ice-Creams.png" },
  { name: "Packaged Food", img: "/FruitsCategories/Packaged_Food.png" },
  { name: "Dairy", img: "/FruitsCategories/Dairy.png" },
  { name: "Cold Drinks", img: "/FruitsCategories/Cold-Drink.png" },
  { name: "Munchies", img: "/FruitsCategories/Munchies.png" },
  { name: "Meat", img: "/FruitsCategories/Meat.png" },
  { name: "Breakfast", img: "/FruitsCategories/Breakfast.png" },
  { name: "Tea", img: "/FruitsCategories/tea.png" },
  { name: "Biscuit", img: "/FruitsCategories/biscuits.png" },
  { name: "Makeup", img: "/FruitsCategories/Makeup.png" },
  { name: "SkinCare", img: "/FruitsCategories/Skincare.png" },
  { name: "Bath & Body", img: "/FruitsCategories/Bath.png" },
  { name: "HairCare", img: "/FruitsCategories/Hair_Care.png" },
  { name: "Cleaning", img: "/FruitsCategories/cleaning.png" },
  { name: "HomeNeeds", img: "/FruitsCategories/Home_Needs.png" },
  { name: "Books", img: "/FruitsCategories/Stationery.png" },
  { name: "Kitchen", img: "/FruitsCategories/Kitchen.png" },
  { name: "Electronics", img: "/FruitsCategories/Electronis.png" },
  { name: "Grooming", img: "/FruitsCategories/Fragrances.png" },
  { name: "Hygiene", img: "/FruitsCategories/Hygiene.png" },
  { name: "Pharmacy", img: "/FruitsCategories/Pharmacy.png" },
  { name: "Sexual", img: "/FruitsCategories/Sexual.png" },
  { name: "BabyCare", img: "/FruitsCategories/BabyCare.png" },
  { name: "PetCare", img: "/FruitsCategories/PetCare.png" },
  { name: "PaanCorner", img: "/FruitsCategories/Paan.png" },
];

const buyAgainCategories = [
  { label: "All Items", value: "All" },
  { label: "Fruits & Vegetables", value: "Fruits & Vegetables" },
  { label: "Dairy Products", value: "Dairy Products" },
  { label: "Snacks & Drinks", value: "Snacks & Drinks" },
  { label: "Grocery & Kitchen", value: "Grocery & Kitchen" },
  { label: "Sweets & Chocolates", value: "Sweets & Chocolates" },
  { label: "Zepto Cafe", value: "Zepto Cafe" },
  { label: "Beauty & Personal Care", value: "Beauty & Personal Care" },
  { label: "Household Essentials", value: "Household Essentials" },
];

const HomePage = () => {
  const fruitsScrollRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [buyAgainProducts, setBuyAgainProducts] = useState(() => []);
  const [selectedBuyAgain, setSelectedBuyAgain] = useState("All");
  const [loading, setLoading] = useState(false);
  const { cart, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
    if (categoryName === "All") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFruitCategoryClick = (categoryName) => {
    const slug = categorySlugReverseMapper[categoryName];
    if (slug) navigate(`/category/${slug}`);
  };

  const scrollRight = () => fruitsScrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  const scrollLeft = () => fruitsScrollRef.current.scrollBy({ left: -200, behavior: "smooth" });

  useEffect(() => {
    const fetchBuyAgainProducts = async () => {
      setLoading(true);
      try {
        const url =
          selectedBuyAgain === "All"
            ? `${API}/products`
            : `${API}/products?category=${encodeURIComponent(selectedBuyAgain)}`;
        const res = await axios.get(url);
        setBuyAgainProducts(res.data.products || []);
      } catch (error) {
        console.error("Error fetching buy again products:", error);
        setBuyAgainProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBuyAgainProducts();
  }, [selectedBuyAgain]);

  return (
    <Container className="pt-3 pb-5">
      {/* ... all your category banners, sliders, and sections above remain same ... */}
        <div
        className="d-flex overflow-auto p-3 bg-white shadow-sm mb-4 hide-scrollbar"
        style={{ whiteSpace: "nowrap" }}
      >
        {topCategories.map((cat, idx) => (
          <div
            key={idx}
            className="category-box d-flex align-items-center justify-content-center mx-3"
            onClick={() => handleCategoryClick(cat.name)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={cat.img}
              alt={cat.name}
              style={{ width: "25px", marginRight: "8px" }}
            />
            <span>{cat.name}</span>
          </div>
        ))}
      </div>

      <div
        className="position-relative bg-white shadow-sm mb-4"
        style={{ padding: "10px 0" }}
      >
        <div
          className="d-flex overflow-auto px-3 fruits-scroll hide-scrollbar"
          style={{ whiteSpace: "nowrap" }}
          ref={fruitsScrollRef}
        >
          {fruitsCategories.map((cat, idx) => (
            <div
              key={idx}
              className="text-center mx-2 fruits-category-item"
              onClick={() => handleFruitCategoryClick(cat.name)}
            >
              <div className="fruits-category-card">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="fruits-category-img"
                />
                {/* <div className="fruits-category-name">
            {cat.name}
          </div> */}
              </div>
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        <Button
          variant="light"
          className="position-absolute top-50 start-0 translate-middle-y ms-2 shadow-sm"
          style={{
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            padding: "6px",
          }}
          onClick={scrollLeft}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/271/271228.png"
            alt="Left"
            style={{
              width: "20px",
              height: "20px",
              transform: "rotate(180deg)",
            }}
          />
        </Button>

        {/* Right Arrow */}
        <Button
          variant="light"
          className="position-absolute top-50 end-0 translate-middle-y me-2 shadow-sm"
          style={{
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            padding: "6px",
          }}
          onClick={scrollRight}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/271/271228.png"
            alt="Right"
            style={{ width: "20px", height: "20px" }}
          />
        </Button>
      </div>

      {/* Paan Corner Banner */}
      <div className="paan-banner my-4">
        {/* <div className="paan-banner-content d-flex align-items-center justify-content-between p-4"> */}
        <div>
          <div>
            <img
              src="/Banner/Paan_Corner.webp"
              alt="Paan Corner"
              style={{ maxWidth: "2200px", height: "auto" }}
            />
          </div>
        </div>
      </div>

      {/* Super Sonic + Beauty Lit Section with inner slider */}
      <Row className="my-4" style={{ padding: "20px 0" }}>
        {/* Left Side */}
        <Col md={6} className="mb-3">
          <div className="deals-banner d-flex flex-column">
            {/* Super Sonic Image */}
            <div
              style={{
                backgroundColor: "black",
                borderRadius: "12px 12px 0 0",
                overflow: "hidden",
              }}
            >
              <img
                src="/Banner/SuperSonic.webp"
                alt="Super Sonic Deals"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>

            {/* Black Slider Container */}
            <div
              style={{
                backgroundColor: "black",
                borderRadius: "0 0 12px 12px" /* Only bottom round corners */,
                padding: "15px",
                overflowX: "auto",
                whiteSpace: "nowrap",
              }}
              className="hide-scrollbar"
            >
              {/* Slider Cards */}
              <div className="deals-card d-inline-block mx-2">
                <img
                  src="/Slider/deal1.png"
                  alt="Deal 1"
                  style={{
                    width: "110px",
                    height: "100px",
                    borderRadius: "12px",
                  }}
                />
              </div>
              <div className="deals-card d-inline-block mx-2">
                <img
                  src="/Slider/deal2.png"
                  alt="Deal 2"
                  style={{
                    width: "110px",
                    height: "100px",
                    borderRadius: "12px",
                  }}
                />
              </div>
              <div className="deals-card d-inline-block mx-2">
                <img
                  src="/Slider/deal3.png"
                  alt="Deal 3"
                  style={{
                    width: "110px",
                    height: "100px",
                    borderRadius: "12px",
                  }}
                />
              </div>
              <div className="deals-card d-inline-block mx-2">
                <img
                  src="/Slider/deal4.png"
                  alt="Deal 4"
                  style={{
                    width: "110px",
                    height: "100px",
                    borderRadius: "12px",
                  }}
                />
              </div>
              <div className="deals-card d-inline-block mx-2">
                <img
                  src="/Slider/deal5.png"
                  alt="Deal 5"
                  style={{
                    width: "110px",
                    height: "100px",
                    borderRadius: "12px",
                  }}
                />
              </div>
            </div>
          </div>
        </Col>

        {/* Right Side - BeautyLit + Pink Slider (no space between) */}
        <Col md={6} className="mb-3">
          <div className="deals-banner d-flex flex-column">
            {/* BeautyLit Image */}
            <div
              style={{
                background: "linear-gradient(to right, #ffdce0, #ffeef0)",
                borderRadius: "12px 12px 0 0",
                overflow: "hidden",
              }}
            >
              <img
                src="/Banner/BeautyLIT.webp"
                alt="Beauty Lit Fest"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>

            {/* Pink Deals Slider Below */}
            <div
              style={{
                background: "linear-gradient(to right, #ffdce0, #ffeef0)",
                borderRadius: "0 0 12px 12px" /* Only bottom round corners */,
                padding: "15px",
                overflowX: "auto",
                whiteSpace: "nowrap",
              }}
              className="hide-scrollbar"
            >
              {/* Slider Cards */}
              <div className="deals-card d-inline-block mx-2">
                <img
                  src="/Slider/Beauty1.png"
                  alt="Beauty 1"
                  style={{
                    width: "110px",
                    height: "100px",
                    borderRadius: "12px",
                  }}
                />
              </div>
              <div className="deals-card d-inline-block mx-2">
                <img
                  src="/Slider/Beauty2.png"
                  alt="Beauty 2"
                  style={{
                    width: "110px",
                    height: "100px",
                    borderRadius: "12px",
                  }}
                />
              </div>
              <div className="deals-card d-inline-block mx-2">
                <img
                  src="/Slider/Beauty3.png"
                  alt="Beauty 3"
                  style={{
                    width: "110px",
                    height: "100px",
                    borderRadius: "12px",
                  }}
                />
              </div>
              <div className="deals-card d-inline-block mx-2">
                <img
                  src="/Slider/Beauty4.png"
                  alt="Beauty 4"
                  style={{
                    width: "110px",
                    height: "100px",
                    borderRadius: "12px",
                  }}
                />
              </div>
              <div className="deals-card d-inline-block mx-2">
                <img
                  src="/Slider/Beauty5.png"
                  alt="Beauty 5"
                  style={{
                    width: "110px",
                    height: "100px",
                    borderRadius: "12px",
                  }}
                />
              </div>
              <div className="deals-card d-inline-block mx-2">
                <img
                  src="/Slider/Beauty6.png"
                  alt="Beauty 6"
                  style={{
                    width: "110px",
                    height: "100px",
                    borderRadius: "12px",
                  }}
                />
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Insurance + JioHotstar + Forex + Bank Cards Section */}
      <Row className="my-4 g-3">
        <Col md={3} sm={6} xs={12}>
          <div
            className="info-card shadow-sm rounded"
            style={{ overflow: "hidden", background: "#f7f7f7" }}
          >
            <img
              src="/Cards/LifeCover.webp"
              alt="Life Cover"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        </Col>

        <Col md={3} sm={6} xs={12}>
          <div
            className="info-card shadow-sm rounded"
            style={{ overflow: "hidden", background: "#f7f7f7" }}
          >
            <img
              src="/Cards/JioHotstar.webp"
              alt="JioHotstar"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        </Col>

        <Col md={3} sm={6} xs={12}>
          <div
            className="info-card shadow-sm rounded"
            style={{ overflow: "hidden", background: "#f7f7f7" }}
          >
            <img
              src="/Cards/ZeroForex.webp"
              alt="Zero Forex"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        </Col>

        <Col md={3} sm={6} xs={12}>
          <div
            className="info-card shadow-sm rounded"
            style={{ overflow: "hidden", background: "#f7f7f7" }}
          >
            <img
              src="/Cards/SavingAcc.webp"
              alt="Bank Savings"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        </Col>
      </Row>

      {/* ✅ Buy Again Section */}
      <div className="my-4 px-2">
        <h4 className="mb-3 text-purple fw-bold">
          Buy <span className="text-dark">Again</span>
        </h4>
        <div className="d-flex overflow-auto hide-scrollbar mb-3">
          {buyAgainCategories.map((cat, index) => (
            <Button
              key={index}
              variant={selectedBuyAgain === cat.value ? "dark" : "outline-secondary"}
              size="sm"
              className="me-2"
              onClick={() => setSelectedBuyAgain(cat.value)}
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {loading ? (
          <div className="text-center my-4">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : Array.isArray(buyAgainProducts) && buyAgainProducts.length > 0 ? (
          <Row className="g-3">
            {buyAgainProducts.map((product) => (
              <Col key={product._id} md={2} sm={4} xs={6}>
                <div
                  className="p-2 shadow-sm bg-white rounded text-center h-100 position-relative"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  {product.discount && (
                    <div className="position-absolute top-0 start-0 bg-purple text-white px-2 py-1 rounded-end" style={{ fontSize: "12px", fontWeight: "bold", zIndex: 1 }}>
                      {product.discount}% Off
                    </div>
                  )}
                  <img
                    src={
                      product.image?.startsWith("http")
                        ? product.image
                        : `${BASE_URL}${product.image}`
                    }
                    alt={product.name}
                    style={{ height: "110px", objectFit: "contain" }}
                    className="mb-2"
                  />
                  <p className="fw-bold small mb-1">{product.name}</p>
                  <p className="small text-muted mb-1">{product.weight}</p>
                  <p className="fw-bold">₹{product.price}</p>
                  {cart[product._id]?.quantity > 0 ? (
                    <div className="d-flex justify-content-between align-items-center px-3">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromCart(product._id);
                        }}
                      >
                        −
                      </button>
                      <span>{cart[product._id].quantity}</span>
                      <button
                        className="btn btn-outline-success btn-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <Button
                      variant="success"
                      size="sm"
                      className="w-100 mt-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                    >
                      Add to Cart
                    </Button>
                  )}
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <div className="text-center text-muted py-4">No products found in this category.</div>
        )}
      </div>

      <Footer />
      <FloatingCartBar />
    </Container>
  );
};

export default HomePage;
