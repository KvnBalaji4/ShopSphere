import { useNavigate } from "react-router-dom";
import "../css/admin.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-container">
      {/* HEADER */}
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <p>Manage your store from one place</p>
      </div>

      {/* DASHBOARD CARDS */}
      <div className="admin-grid">
        <div
          className="admin-card"
          onClick={() => navigate("/admin/categories")}
        >
          <span>🗂️</span>
          <h4>Categories</h4>
          <p>Create & manage product categories</p>
        </div>

        <div
          className="admin-card"
          onClick={() => navigate("/admin/products")}
        >
          <span>📦</span>
          <h4>Products</h4>
          <p>Add, update & manage products</p>
        </div>

        <div className="admin-card disabled">
          <span>📑</span>
          <h4>Orders</h4>
          <p>Coming soon</p>
        </div>

        <div className="admin-card disabled">
          <span>👥</span>
          <h4>Users</h4>
          <p>Coming soon</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
