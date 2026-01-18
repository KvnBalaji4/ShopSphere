import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../css/orders.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/orders/my").then((res) => {
      setOrders(res.data);
    });
  }, []);

  if (orders.length === 0) {
    return <p className="empty">No orders yet</p>;
  }

  return (
    <div className="orders-page">
      <h2>My Orders</h2>

      {orders.map((order) => (
        <div
          key={order.id}
          className="order-card"
          onClick={() => navigate(`/orders/${order.id}`)}
        >
          <div>
            <h4>Order #{order.id}</h4>
            <p>Status: {order.status}</p>
            <p className="date">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          <strong>₹{order.totalAmount}</strong>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
