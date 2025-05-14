import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";

const AddressStepperModal = ({ show, onHide, onComplete }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ house: "", block: "", landmark: "", receiver: "" });
  const [errors, setErrors] = useState({});
  const [savedAddresses, setSavedAddresses] = useState([]);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("savedAddresses")) || [];
    setSavedAddresses(local);
  }, [show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "house" && value.length > 3) return;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.house.trim()) {
      newErrors.house = "House number is required";
    } else if (!/^[0-9]{1,3}$/.test(form.house)) {
      newErrors.house = "Only digits allowed (max 3 digits)";
    }
    if (!form.block.trim()) newErrors.block = "Block or building name is required";
    return newErrors;
  };

  const handleConfirm = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const fullAddress = `${form.house}, ${form.block}${form.landmark ? ", " + form.landmark : ""}${form.receiver ? ", " + form.receiver : ""}`;
    const previous = JSON.parse(localStorage.getItem("savedAddresses")) || [];
    const newAddress = {
      label: `Address ${previous.length + 1}`,
      address: fullAddress,
    };
    localStorage.setItem("savedAddresses", JSON.stringify([...previous, newAddress]));

    onComplete(fullAddress);
    setStep(1);
    setForm({ house: "", block: "", landmark: "", receiver: "" });
    setErrors({});
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered size="md">
      <Modal.Header closeButton>
        <Modal.Title>
          {step === 1
            ? "Select Address"
            : step === 2
            ? "Pin Location"
            : "Enter Full Address"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {step === 1 && (
          <>
            <Button
              variant="outline-danger"
              className="w-100 mb-3"
              onClick={() => setStep(2)}
            >
              📍 Add New Address
            </Button>

            <h6 className="text-success">Saved Address</h6>
            {savedAddresses.length === 0 ? (
              <p className="text-muted">No saved addresses found.</p>
            ) : (
              savedAddresses.map((addr, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-between align-items-center mb-3 p-2 border rounded"
                  onClick={() => {
                    onComplete(addr.address);
                    onHide();
                    setStep(1);
                  }}
                  style={{ cursor: "pointer", background: "#f9f9f9" }}
                >
                  <div className="d-flex">
                    <FaMapMarkerAlt className="me-2 mt-1 text-danger" />
                    <div>
                      <strong>{addr.label}</strong>
                      <div className="text-muted">{addr.address}</div>
                    </div>
                  </div>
                  <FaArrowRight />
                </div>
              ))
            )}
          </>
        )}

        {step === 2 && (
          <>
            <p>📌 Simulated map. Click next to enter full address.</p>
            <Button
              variant="primary"
              className="w-100 mt-3"
              onClick={() => setStep(3)}
            >
              Next <FaArrowRight className="ms-1" />
            </Button>
          </>
        )}

        {step === 3 && (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>House No. & Floor</Form.Label>
              <Form.Control
                type="text"
                name="house"
                value={form.house}
                onChange={handleChange}
                placeholder="e.g., 103"
                isInvalid={!!errors.house}
                maxLength={3}
                pattern="^[0-9]{1,3}$"
              />
              <Form.Control.Feedback type="invalid">
                {errors.house}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Building & Block No.</Form.Label>
              <Form.Control
                type="text"
                name="block"
                value={form.block}
                onChange={handleChange}
                placeholder="e.g., B1 Tower"
                isInvalid={!!errors.block}
              />
              <Form.Control.Feedback type="invalid">
                {errors.block}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Landmark (Optional)</Form.Label>
              <Form.Control
                type="text"
                name="landmark"
                value={form.landmark}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Receiver Name (Optional)</Form.Label>
              <Form.Control
                type="text"
                name="receiver"
                value={form.receiver}
                onChange={handleChange}
              />
            </Form.Group>

            <Button className="w-100 mt-2" variant="danger" onClick={handleConfirm}>
              Save & Proceed
            </Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AddressStepperModal;
