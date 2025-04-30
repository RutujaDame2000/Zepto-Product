import React from "react";
import { useNavigate } from "react-router-dom";
import "./CategoryProducts.css"; // Or separate Sidebar CSS if you want

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

const Sidebar = ({ selectedCategory, handleCategoryClick }) => {
  const navigate = useNavigate();

  return (
    <div className="category-sidebar p-3">
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
  );
};

export default Sidebar;
