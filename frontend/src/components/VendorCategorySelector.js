// src/components/VendorCategorySelector.jsx
import React from 'react';
import { Form } from 'react-bootstrap';
import categorySlugReverseMapper from '../utils/categorySlugReverseMapper';

const VendorCategorySelector = ({ onCategoryChange }) => {
  const categoryOptions = Object.keys(categorySlugReverseMapper);

  return (
    <Form.Group className="mb-3">
      <Form.Label>Category</Form.Label>
      <Form.Select onChange={(e) => onCategoryChange(e.target.value)} required>
        <option value="">Select a category</option>
        {categoryOptions.map((cat, idx) => (
          <option key={idx} value={cat}>
            {cat}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default VendorCategorySelector;
