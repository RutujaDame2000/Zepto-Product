// Add this component file: LocationPopup.js
import React, { useState } from 'react';
import './LocationPopup.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { GeoAlt, House, Briefcase } from 'react-bootstrap-icons';

const LocationPopup = ({ show, handleClose, setUserLocation }) => {
  const [location, setLocation] = useState('');

  const handleSave = () => {
    if (location.trim()) {
      localStorage.setItem('userLocation', location);
      setUserLocation(location);
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="md">
      <Modal.Header closeButton>
        <Modal.Title>Your Location</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type="text"
          placeholder="Search a new address"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mb-3"
        />

        {/* <p className="text-danger fw-bold">
          <GeoAlt /> Current Location <span className="text-muted">(Using GPS)</span>
        </p> */}

        <p
  className="text-danger fw-bold"
  onClick={() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // You can use a reverse geocoding API like OpenCage or LocationIQ here
          const locationName = `Lat: ${latitude.toFixed(3)}, Long: ${longitude.toFixed(3)}`;
          localStorage.setItem('userLocation', locationName);
          setUserLocation(locationName);
          handleClose();
        },
        (error) => {
          alert('Location access denied or unavailable.');
          console.error(error);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }}
  style={{ cursor: 'pointer' }}
>
  <GeoAlt /> Current Location <span className="text-muted">(Using GPS)</span>
</p>


        <div className="border-top pt-3">
          <h6 className="fw-bold">Saved Location</h6>
          <p>
            <House className="me-2 text-primary" /> Home<br />
            <small className="text-muted">flat no 409, vishnu heights, Ghansoli...</small>
          </p>
          <p>
            <Briefcase className="me-2 text-primary" /> Work<br />
            <small className="text-muted">e34r, qw23123e, Navi Mumbai...</small>
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSave}>Save Location</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LocationPopup;