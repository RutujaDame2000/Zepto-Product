



import React, { useRef, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../components/Home.css";

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

const HomePage = () => {
  const fruitsScrollRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  const handleFruitCategoryClick = (categoryName) => {
    navigate(`/category/${categoryName}`);
  };

  const scrollRight = () => {
    fruitsScrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  const scrollLeft = () => {
    fruitsScrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
    if (categoryName === "All") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Container className="pt-3">
      {/* Your Scroll bars and Layout code same */}
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
            <img src={cat.img} alt={cat.name} style={{ width: "25px", marginRight: "8px" }} />
            <span>{cat.name}</span>
          </div>
        ))}
      </div>
{/* 
      <div
        className="d-flex overflow-auto px-3 hide-scrollbar"
        ref={fruitsScrollRef}
        style={{ whiteSpace: "nowrap" }}
      >
        {fruitsCategories.map((cat, idx) => (
          <div
            key={idx}
            className="text-center mx-2"
            style={{ minWidth: "90px", cursor: "pointer" }}
            onClick={() => handleFruitCategoryClick(cat.name)}
          >
            <img src={cat.img} alt={cat.name} style={{ width: "140px", height: "130px" }} />
          </div>
        ))}
      </div> */}



<div className="position-relative bg-white shadow-sm mb-4" style={{ padding: "10px 0" }}>
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
    style={{ borderRadius: "50%", width: "40px", height: "40px", padding: "6px" }}
    onClick={scrollLeft}
  >
    <img src="https://cdn-icons-png.flaticon.com/128/271/271228.png" alt="Left" style={{ width: "20px", height: "20px", transform: "rotate(180deg)" }} />
  </Button>

  {/* Right Arrow */}
  <Button
    variant="light"
    className="position-absolute top-50 end-0 translate-middle-y me-2 shadow-sm"
    style={{ borderRadius: "50%", width: "40px", height: "40px", padding: "6px" }}
    onClick={scrollRight}
  >
    <img src="https://cdn-icons-png.flaticon.com/128/271/271228.png" alt="Right" style={{ width: "20px", height: "20px" }} />
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
                  src="/Slider/beauty1.png"
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
                  src="/Slider/beauty2.png"
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
                  src="/Slider/beauty3.png"
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
                  src="/Slider/beauty4.png"
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
                  src="/Slider/beauty5.png"
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
                  src="/Slider/beauty6.png"
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
      {/* You can continue your Banner and Deal section */}
    </Container>
  );
};

export default HomePage;