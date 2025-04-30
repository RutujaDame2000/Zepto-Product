import React from "react";
import { Offcanvas, Button } from "react-bootstrap";
import { useCart } from "../context/cartContext";

const CartSidebar = ({ show, handleClose }) => {
  const { cart, addToCart, removeFromCart } = useCart();

  const cartItems = Object.values(cart);
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + parseInt(item.price.replace("₹", "")) * item.quantity,
    0
  );

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Your Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>

        {cartItems.length === 0 ? (
          <h5>Your cart is empty</h5>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item._id} className="d-flex align-items-center mb-3">
                <img
                  src={item.image}
                  alt={item.name}
                  width="50"
                  height="50"
                  style={{ objectFit: "cover", borderRadius: "8px" }}
                />
                <div className="ms-3" style={{ flex: "1" }}>
                  <h6 className="mb-1">{item.name}</h6>
                  <p className="small mb-1">{item.weight}</p>
                  <div className="d-flex align-items-center">
                    <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item._id)}>
                      -
                    </Button>
                    <span className="mx-2 fw-bold">{item.quantity}</span>
                    <Button variant="outline-success" size="sm" onClick={() => addToCart(item)}>
                      +
                    </Button>
                  </div>
                </div>
                <div className="ms-auto fw-bold">
                  ₹{parseInt(item.price.replace("₹", "")) * item.quantity}
                </div>
              </div>
            ))}
            <hr />
            <div className="text-end fw-bold">Total: ₹{totalAmount}</div>
            <Button variant="danger" className="w-100 mt-3">
              Proceed to Checkout
            </Button>
          </>
        )}

      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartSidebar;
