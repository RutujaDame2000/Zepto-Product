// import React, { useState } from "react";
// import { Modal, Button } from "react-bootstrap";
// import { FaPlusCircle, FaMapMarkerAlt } from "react-icons/fa";
// import LocationModal from "./LocationModal"; // 👈 import it
// import './AddressModal.css';

// const AddressModal = ({ show, onHide }) => {
//   const [showLocationModal, setShowLocationModal] = useState(false);

//   const savedAddresses = [
//     {
//       label: "Home",
//       address: "Vishnu Heights, Gothivali Village, Sector 30, Ghansoli, Navi Mumbai, Maharashtra",
//     },
//   ];

//   return (
//     <>
//       <Modal show={show} onHide={onHide} centered size="md">
//         <Modal.Header closeButton>
//           <Modal.Title>Select an Address</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Button
//             variant="outline-danger"
//             className="w-100 mb-3 d-flex align-items-center justify-content-center"
//             onClick={() => setShowLocationModal(true)} // 👈 trigger 2nd popup
//           >
//             <FaPlusCircle className="me-2" /> Add Address
//           </Button>

//           <h6 className="text-success">Nearby address(es)</h6>
//           {savedAddresses.map((addr, index) => (
//             <div key={index} className="saved-address-box">
//               <FaMapMarkerAlt className="icon mt-1" />
//               <div>
//                 <strong>{addr.label}</strong>
//                 <div className="text-muted">{addr.address}</div>
//               </div>
//             </div>
//           ))}
//         </Modal.Body>
//       </Modal>

//       {/* Show location popup */}
//       <LocationModal show={showLocationModal} onHide={() => setShowLocationModal(false)} />
//     </>
//   );
// };

// export default AddressModal;


import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaPlusCircle, FaMapMarkerAlt } from "react-icons/fa";
import LocationModal from "./LocationModal";
import AddressDetailsModal from "./AddressDetailsModal"; // ✅ NEW
import './AddressModal.css';

const AddressModal = ({ show, onHide, onAddressSaved }) => {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const savedAddresses = [
    {
      label: "Home",
      address: "Vishnu Heights, Gothivali Village, Sector 30, Ghansoli, Navi Mumbai, Maharashtra",
    },
  ];

  return (
    <>
      <Modal show={show} onHide={onHide} centered size="md">
        <Modal.Header closeButton>
          <Modal.Title>Select an Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button
            variant="outline-danger"
            className="w-100 mb-3 d-flex align-items-center justify-content-center"
            onClick={() => setShowLocationModal(true)}
          >
            <FaPlusCircle className="me-2" /> Add Address
          </Button>

          <h6 className="text-success">Nearby address(es)</h6>
          {savedAddresses.map((addr, index) => (
            <div key={index} className="saved-address-box">
              <FaMapMarkerAlt className="icon mt-1" />
              <div>
                <strong>{addr.label}</strong>
                <div className="text-muted">{addr.address}</div>
              </div>
            </div>
          ))}
        </Modal.Body>
      </Modal>

      {/* Step 2: Location map modal */}
      <LocationModal
        show={showLocationModal}
        onHide={() => setShowLocationModal(false)}
        onConfirm={() => setShowDetailsModal(true)} // ✅ Show final address form
      />

      {/* Step 3: Enter full address */}
      <AddressDetailsModal
        show={showDetailsModal}
        onHide={() => {
          setShowDetailsModal(false);
          onAddressSaved(); // 👈 notify CartSidebar to show payment button
        }}
      />
    </>
  );
};

export default AddressModal;
