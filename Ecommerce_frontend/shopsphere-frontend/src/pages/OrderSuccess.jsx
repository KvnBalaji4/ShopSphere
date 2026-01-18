import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import "../css/orderSuccess.css";

const OrderSuccess = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.get(`/orders/${id}`).then((res) => {
      setOrder(res.data);
    });
  }, [id]);

  if (!order) return <p className="loading">Loading...</p>;

  return (
    <div className="order-success">
      <h1>🎉 Order Confirmed</h1>
      <p className="order-id">Order #{order.id}</p>

      <div className="order-items">
        {order.items.map((item) => (
          <div key={item.productId} className="order-item">
            <img src={item.imageUrl} alt={item.productName} />
            <div>
              <h4>{item.productName}</h4>
              <p>
                ₹{item.price} × {item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>

      <h3>Total Paid: ₹{order.totalAmount}</h3>

      <div className="order-actions">
        <Link to="/orders">My Orders</Link>
        <Link to="/shop">Continue Shopping</Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
