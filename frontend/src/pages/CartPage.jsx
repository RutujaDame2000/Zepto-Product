
import React from "react";
import { useCart } from "../context/cartContext";

const CartPage = () => {
  const { cart, increaseQuantity, decreaseQuantity } = useCart();
  const cartItems = Object.values(cart);

  const totalPrice = cartItems.reduce((acc, item) => {
    const numericPrice = typeof item.price === "string"
      ? parseFloat(item.price.replace(/[^\d.]/g, ""))
      : item.price;
    return acc + numericPrice * item.quantity;
  }, 0);

  const apiBase = process.env.REACT_APP_API_URL.replace("/api", "");

  return (
    <div className="container mt-5">
      <h2 className="mb-4">🛒 My Cart</h2>

      {cartItems.length === 0 ? (
        <h5>No items in cart.</h5>
      ) : (
        <>
          <div className="row">
            {cartItems.map((item) => (
              <div className="col-12 mb-4" key={item._id}>
                <div className="card p-3 shadow-sm d-flex flex-row align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <img
                      src={`${apiBase}${item.image}`}
                      alt={item.name}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "contain",
                        marginRight: "20px",
                      }}
                    />
                    <div>
                      <h5>{item.name}</h5>
                      <p className="mb-1">{item.weight}</p>
                      <p className="mb-0 fw-bold">₹{item.price}</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => decreaseQuantity(item._id)}
                    >
                      −
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      className="btn btn-outline-success btn-sm"
                      onClick={() => increaseQuantity(item._id)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-light rounded shadow-sm">
            <h4>Total: ₹{totalPrice}</h4>
            <button className="btn btn-primary mt-3">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
