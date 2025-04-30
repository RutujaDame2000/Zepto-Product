import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('/api/profile/update', { name }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        alert('Profile Updated Successfully!');
        navigate('/account');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px', background: '#fff', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <h3>Setup Your Profile</h3>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <button onClick={handleSave} style={{ width: '100%', padding: '10px', backgroundColor: 'purple', color: 'white', borderRadius: '5px', border: 'none' }}>
        Save Profile
      </button>
    </div>
  );
};

export default EditProfile;
