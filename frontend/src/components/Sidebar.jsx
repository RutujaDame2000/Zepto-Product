import { useNavigate } from 'react-router-dom';
import React from 'react';



const Sidebar = ({ selectedCategory, subcategories = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="category-sidebar">
      {subcategories.map((cat, idx) => (
        <div
          key={idx}
          className={`sidebar-item d-flex align-items-center mb-3 p-2 rounded ${
            selectedCategory === cat.name ? "active-category" : ""
          }`}
          onClick={() => navigate(`/category/${cat.slug}`)}
        >
          <img src={cat.img} alt={cat.name} className="sidebar-icon" />
          <span className="ms-2">{cat.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;