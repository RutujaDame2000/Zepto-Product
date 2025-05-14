// ✅ Code snippet for Category & Subcategory dropdowns in vendor product form
import React, { useState, useEffect } from 'react';
import sidebarCategoryMapper from '../utils/sidebarCategoryMapper';

const VendorCategorySelector = ({ onCategoryChange, onSubCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState('');

  useEffect(() => {
    if (selectedCategory) {
      setSubcategories(sidebarCategoryMapper[selectedCategory] || []);
      setSelectedSubCategory('');
    }
  }, [selectedCategory]);

  return (
    <div>
      {/* Category Dropdown */}
      <label className="form-label">Category</label>
      <select
        className="form-select mb-3"
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.target.value);
          onCategoryChange(e.target.value);
        }}
      >
        <option value="">Select Category</option>
        {Object.keys(sidebarCategoryMapper).map((catKey, index) => (
          <option key={index} value={catKey}>{catKey.replace(/-/g, ' ')}</option>
        ))}
      </select>

      {/* Subcategory Dropdown */}
      <label className="form-label">Subcategory</label>
      <select
        className="form-select"
        value={selectedSubCategory}
        onChange={(e) => {
          setSelectedSubCategory(e.target.value);
          onSubCategoryChange(e.target.value);
        }}
        disabled={!selectedCategory}
      >
        <option value="">Select Subcategory</option>
        {subcategories.map((sub, idx) => (
          <option key={idx} value={sub.name}>{sub.name}</option>
        ))}
      </select>
    </div>
  );
};

export default VendorCategorySelector;
