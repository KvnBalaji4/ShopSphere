import { useParams, useNavigate } from "react-router-dom";
import "../css/orderSuccess.css";

const OrderSuccess = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="order-success">
      <h1>🎉 Order Placed!</h1>
      <p>Your order ID is</p>
      <strong>#{id}</strong>

      <button onClick={() => navigate("/shop")}>
        Continue Shopping
      </button>
    </div>
  );
};

export default OrderSuccess;
