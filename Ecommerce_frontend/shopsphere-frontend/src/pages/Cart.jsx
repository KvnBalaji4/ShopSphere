import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../css/cart.css";

const Cart = () => {
  const { cart, updateQty, removeItem } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate("/shop")}>
          Go to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      <div className="cart-list">
        {cart.map((p) => (
          <div className="cart-item" key={p.id}>
            <img src={p.imageUrl} alt={p.name} />

            <div className="cart-info">
              <h4>{p.name}</h4>
              <p className="cart-price">₹{p.price}</p>

              <div className="cart-qty">
                <button
                  onClick={() =>
                    updateQty(p.id, p.quantity - 1)
                  }
                  disabled={p.quantity <= 1}
                >
                  −
                </button>

                <span>{p.quantity}</span>

                <button
                  onClick={() =>
                    p.quantity < p.stock &&
                    updateQty(p.id, p.quantity + 1)
                  }
                  disabled={p.quantity >= p.stock}
                >
                  +
                </button>
              </div>

              <button
                className="remove-btn"
                onClick={() => removeItem(p.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ===== CHECKOUT BAR ===== */}
      <div className="cart-summary">
        <div>
          <span>Total</span>
          <strong>₹{total}</strong>
        </div>

        <button
          className="checkout-btn"
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
