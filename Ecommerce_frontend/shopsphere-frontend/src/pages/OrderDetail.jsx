import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.get(`/orders/${id}`).then((res) => {
      setOrder(res.data);
    });
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <div className="order-detail">
      <h2>Order #{order.id}</h2>
      <p>Status: {order.status}</p>

      {order.items.map((item) => (
        <div key={item.productId}>
          <p>
            {item.productName} × {item.quantity} — ₹{item.price}
          </p>
        </div>
      ))}

      <h3>Total: ₹{order.totalAmount}</h3>
    </div>
  );
};

export default OrderDetail;
