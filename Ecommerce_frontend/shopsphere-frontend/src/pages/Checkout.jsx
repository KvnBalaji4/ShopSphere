import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import "../css/checkout.css";

const Checkout = () => {
  const { cart, clearCart } = useCart(); // 🔥 FIX
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ SAFE REDUCE
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    if (cart.length === 0) return;

    try {
      setLoading(true);
      setError("");

      const payload = {
        items: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      };

      const res = await api.post("/orders", payload);

      clearCart();
      navigate(`/order-success/${res.data.id}`);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to place order"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>

      <div className="checkout-grid">
        {/* LEFT */}
        <div className="checkout-left">
          {cart.map((item) => (
            <div key={item.id} className="checkout-item">
              <img src={item.imageUrl} alt={item.name} />
              <div>
                <h4>{item.name}</h4>
                <p>
                  ₹{item.price} × {item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="checkout-summary">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          {error && (
            <p className="checkout-error">{error}</p>
          )}

          <button
            className="checkout-btn"
            onClick={placeOrder}
            disabled={loading || cart.length === 0}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
