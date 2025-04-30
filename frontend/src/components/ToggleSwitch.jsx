import React from 'react';
import './ToggleSwitch.css';

const ToggleSwitch = ({ checked, onChange }) => {
  return (
    <label className="switch">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <div className="slider">
        <div className={`switch-text ${checked ? 'active' : ''}`}>
          Super<br/>Saver
        </div>
      </div>
    </label>
  );
};

export default ToggleSwitch;
