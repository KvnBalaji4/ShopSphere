import { useCart } from "../context/CartContext";
import "../css/cart.css";

const Cart = () => {
  const { cart, updateQty, removeItem } = useCart();

  const total = cart.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  if (cart.length === 0) {
    return <p className="cart-empty">Your cart is empty</p>;
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cart.map((p) => (
        <div className="cart-item" key={p.id}>
          <img src={p.imageUrl} alt={p.name} />

          <div className="cart-info">
            <h4>{p.name}</h4>
            <p>₹{p.price}</p>

            <div className="cart-qty">
              <button onClick={() => updateQty(p.id, p.quantity - 1)}>
                -
              </button>
              <span>{p.quantity}</span>
              <button
                onClick={() =>
                  p.quantity < p.stock &&
                  updateQty(p.id, p.quantity + 1)
                }
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

      <h3 className="cart-total">Total: ₹{total}</h3>
    </div>
  );
};

export default Cart;
