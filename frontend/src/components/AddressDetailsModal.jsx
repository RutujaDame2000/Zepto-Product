

import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddressDetailsModal = ({ show, onHide, onSave }) => {
  const [form, setForm] = useState({
    house: "",
    block: "",
    landmark: "",
    receiver: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const fullAddress = `${form.house}, ${form.block}${
      form.landmark ? ", " + form.landmark : ""
    }${form.receiver ? ", " + form.receiver : ""}`;

    if (onSave && typeof onSave === "function") {
      onSave(fullAddress);
    } else {
      console.error("❌ onSave is not a function!");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="md">
      <Modal.Header closeButton>
        <Modal.Title>Enter Address Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>House No. & Floor</Form.Label>
            <Form.Control
              type="text"
              name="house"
              value={form.house}
              onChange={handleChange}
              placeholder="e.g., 103"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Building & Block No.</Form.Label>
            <Form.Control
              type="text"
              name="block"
              value={form.block}
              onChange={handleChange}
              placeholder="e.g., B1 Tower"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Landmark (Optional)</Form.Label>
            <Form.Control
              type="text"
              name="landmark"
              value={form.landmark}
              onChange={handleChange}
              placeholder="e.g., Near HDFC Bank"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Receiver Name (Optional)</Form.Label>
            <Form.Control
              type="text"
              name="receiver"
              value={form.receiver}
              onChange={handleChange}
              placeholder="e.g., Rutuja"
            />
          </Form.Group>

          <Button
            className="w-100"
            variant="danger"
            onClick={handleSave}
            disabled={!form.house || !form.block}
          >
            Save & Continue
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddressDetailsModal;

