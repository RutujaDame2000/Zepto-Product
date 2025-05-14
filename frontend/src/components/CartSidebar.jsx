


// import React, { useState } from "react";
// import { Offcanvas, Button } from "react-bootstrap";
// import { useCart } from "../context/cartContext";
// import AddressStepperModal from "./AddressStepperModal"; // ✅ NEW
// import { useNavigate } from "react-router-dom";

// const CartSidebar = ({ show, handleClose }) => {
//   const { cart, addToCart, removeFromCart } = useCart();
//   const navigate = useNavigate();

//   const [showAddressModal, setShowAddressModal] = useState(false);
//   const [addressSaved, setAddressSaved] = useState(false);
//   const [deliveryAddress, setDeliveryAddress] = useState("");

//   const cartItems = Object.values(cart);

//   const itemTotal = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   const smallCartFee = itemTotal < 99 ? 35 : 0;
//   const handlingCharge = 9.99;
//   const deliveryFee = itemTotal < 149 ? 25 : 0;
//   const gstRate = 0.05;
//   const taxAmount = (itemTotal + handlingCharge) * gstRate;
//   const toPay = itemTotal + smallCartFee + handlingCharge + deliveryFee + taxAmount;

//   return (
//     <>
//       <Offcanvas show={show} onHide={handleClose} placement="end">
//         <Offcanvas.Header closeButton>
//           <Offcanvas.Title>Your Cart</Offcanvas.Title>
//         </Offcanvas.Header>
//         <Offcanvas.Body>
//           {cartItems.length === 0 ? (
//             <h5 className="text-center text-muted mt-5">Your cart is empty 🛒</h5>
//           ) : (
//             <>
//               {cartItems.map((item) => (
//                 <div key={item._id} className="d-flex align-items-center mb-3 border-bottom pb-2">
//                   <img src={item.image} alt={item.name} width="50" height="50" className="rounded" />
//                   <div className="ms-3 flex-grow-1">
//                     <h6 className="mb-1 fw-semibold">{item.name}</h6>
//                     <p className="text-muted small mb-1">{item.weight}</p>
//                     <div className="d-flex align-items-center">
//                       <Button size="sm" variant="outline-danger" onClick={() => removeFromCart(item._id)}>-</Button>
//                       <span className="mx-2">{item.quantity}</span>
//                       <Button size="sm" variant="outline-success" onClick={() => addToCart(item)}>+</Button>
//                     </div>
//                   </div>
//                   <div className="fw-bold">₹{item.price * item.quantity}</div>
//                 </div>
//               ))}

//               {addressSaved && (
//                 <div className="bg-light p-3 rounded d-flex justify-content-between align-items-start mt-4">
//                   <div>
//                     <strong>📍 Delivering to You</strong>
//                     <p className="text-muted mb-0 small">{deliveryAddress}</p>
//                   </div>
//                   <Button
//                     variant="link"
//                     size="sm"
//                     className="text-decoration-none"
//                     onClick={() => setShowAddressModal(true)}
//                   >
//                     Change
//                   </Button>
//                 </div>
//               )}

//               <div className="bill-summary mt-4 p-3 rounded shadow-sm">
//                 <h6 className="fw-bold mb-3">Bill Summary</h6>
//                 <div className="d-flex justify-content-between mb-2"><span>Item Total</span><span>₹{itemTotal}</span></div>
//                 {smallCartFee > 0 && <div className="d-flex justify-content-between mb-2"><span>Small Cart Fee</span><span>₹{smallCartFee}</span></div>}
//                 <div className="d-flex justify-content-between mb-2"><span>Handling Charge</span><span>₹{handlingCharge}</span></div>
//                 {deliveryFee > 0 && <div className="d-flex justify-content-between mb-2"><span>Delivery Fee</span><span>₹{deliveryFee}</span></div>}
//                 <div className="d-flex justify-content-between mb-2"><span>GST (5%)</span><span>₹{taxAmount.toFixed(2)}</span></div>
//                 <hr />
//                 <div className="d-flex justify-content-between fw-bold"><span>Total To Pay</span><span>₹{toPay.toFixed(2)}</span></div>
//               </div>

//               <Button
//                 variant={addressSaved ? "success" : "danger"}
//                 className="w-100 mt-4 fw-bold"
//                 // onClick={() =>
//                 //   addressSaved ? navigate("/payment") : setShowAddressModal(true)
//                 // }

//                 onClick={async () => {
//   if (!addressSaved) {
//     setShowAddressModal(true);
//     return;
//   }

//   try {
//     const res = await fetch("http://localhost:5000/api/checkout/create-checkout-session", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         items: cartItems,
//       }),
//     });

//     const data = await res.json();
//     if (data.url) {
//       window.location.href = data.url; // ⬅️ redirect to Stripe Checkout
//     } else {
//       alert("Failed to create Stripe session.");
//     }
//   } catch (err) {
//     console.error("Stripe Checkout error:", err);
//     alert("Something went wrong while initiating payment.");
//   }
// }}

//               >
//                 {addressSaved ? `Proceed to Pay ₹${toPay.toFixed(2)}` : "Add Address to Proceed"}
//               </Button>
//             </>
//           )}
//         </Offcanvas.Body>
//       </Offcanvas>

//       {/* Unified Stepper Modal */}
//       <AddressStepperModal
//         show={showAddressModal}
//         onHide={() => setShowAddressModal(false)}
//         onComplete={(fullAddress) => {
//           setDeliveryAddress(fullAddress);
//           setAddressSaved(true);
//         }}
//       />
//     </>
//   );
// };

// export default CartSidebar;


// ✅ CartSidebar.jsx (UPDATED with localStorage Save)
import React, { useState } from "react";
import { Offcanvas, Button } from "react-bootstrap";
import { useCart } from "../context/cartContext";
import AddressStepperModal from "./AddressStepperModal";
import { useNavigate } from "react-router-dom";

const CartSidebar = ({ show, handleClose }) => {
  const { cart, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressSaved, setAddressSaved] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState("");

  const cartItems = Object.values(cart);

  const itemTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const smallCartFee = itemTotal < 99 ? 35 : 0;
  const handlingCharge = 9.99;
  const deliveryFee = itemTotal < 149 ? 25 : 0;
  const gstRate = 0.05;
  const taxAmount = (itemTotal + handlingCharge) * gstRate;
  const toPay = itemTotal + smallCartFee + handlingCharge + deliveryFee + taxAmount;

  const handleProceedToPay = async () => {
    if (!addressSaved) {
      setShowAddressModal(true);
      return;
    }

    // ✅ Save cart to localStorage before payment
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("cartTotal", JSON.stringify(toPay));

    try {
      const res = await fetch("http://localhost:5000/api/checkout/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cartItems }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to create Stripe session.");
      }
    } catch (err) {
      console.error("Stripe Checkout error:", err);
      alert("Something went wrong while initiating payment.");
    }
  };

  return (
    <>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cartItems.length === 0 ? (
            <h5 className="text-center text-muted mt-5">Your cart is empty 🛒</h5>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item._id} className="d-flex align-items-center mb-3 border-bottom pb-2">
                  <img src={item.image} alt={item.name} width="50" height="50" className="rounded" />
                  <div className="ms-3 flex-grow-1">
                    <h6 className="mb-1 fw-semibold">{item.name}</h6>
                    <p className="text-muted small mb-1">{item.weight}</p>
                    <div className="d-flex align-items-center">
                      <Button size="sm" variant="outline-danger" onClick={() => removeFromCart(item._id)}>-</Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button size="sm" variant="outline-success" onClick={() => addToCart(item)}>+</Button>
                    </div>
                  </div>
                  <div className="fw-bold">₹{item.price * item.quantity}</div>
                </div>
              ))}

              {addressSaved && (
                <div className="bg-light p-3 rounded d-flex justify-content-between align-items-start mt-4">
                  <div>
                    <strong>📍 Delivering to You</strong>
                    <p className="text-muted mb-0 small">{deliveryAddress}</p>
                  </div>
                  <Button
                    variant="link"
                    size="sm"
                    className="text-decoration-none"
                    onClick={() => setShowAddressModal(true)}
                  >
                    Change
                  </Button>
                </div>
              )}

              <div className="bill-summary mt-4 p-3 rounded shadow-sm">
                <h6 className="fw-bold mb-3">Bill Summary</h6>
                <div className="d-flex justify-content-between mb-2"><span>Item Total</span><span>₹{itemTotal}</span></div>
                {smallCartFee > 0 && <div className="d-flex justify-content-between mb-2"><span>Small Cart Fee</span><span>₹{smallCartFee}</span></div>}
                <div className="d-flex justify-content-between mb-2"><span>Handling Charge</span><span>₹{handlingCharge}</span></div>
                {deliveryFee > 0 && <div className="d-flex justify-content-between mb-2"><span>Delivery Fee</span><span>₹{deliveryFee}</span></div>}
                <div className="d-flex justify-content-between mb-2"><span>GST (5%)</span><span>₹{taxAmount.toFixed(2)}</span></div>
                <hr />
                <div className="d-flex justify-content-between fw-bold"><span>Total To Pay</span><span>₹{toPay.toFixed(2)}</span></div>
              </div>

              <Button
                variant={addressSaved ? "success" : "danger"}
                className="w-100 mt-4 fw-bold"
                onClick={handleProceedToPay}
              >
                {addressSaved ? `Proceed to Pay ₹${toPay.toFixed(2)}` : "Add Address to Proceed"}
              </Button>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>

      <AddressStepperModal
        show={showAddressModal}
        onHide={() => setShowAddressModal(false)}
        onComplete={(fullAddress) => {
          setDeliveryAddress(fullAddress);
          setAddressSaved(true);
        }}
      />
    </>
  );
};

export default CartSidebar;
