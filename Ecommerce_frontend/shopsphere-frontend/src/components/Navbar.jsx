import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext"; // ✅ ADD
import "../css/navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useCart(); // ✅ ADD
  const navigate = useNavigate();
  const [showProductsMenu, setShowProductsMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // ✅ TOTAL CART COUNT
  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <nav className="navbar">
      {/* LOGO */}
      <div className="navbar-logo">
        <Link to="/">ShopSphere</Link>
      </div>

      {/* LINKS */}
      <div className="navbar-links">
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {/* ADMIN */}
        {user && user.role === "ADMIN" && (
          <>
            <Link to="/admin">Dashboard</Link>
            <Link to="/admin/categories">Categories</Link>

            {/* PRODUCTS DROPDOWN */}
            <div
              className="navbar-dropdown"
              onMouseEnter={() => setShowProductsMenu(true)}
              onMouseLeave={() => setShowProductsMenu(false)}
            >
              <span className="navbar-link">Products ▾</span>

              {showProductsMenu && (
                <div className="dropdown-menu">
                  <Link to="/admin/products">Add Product</Link>
                  <Link to="/admin/products/update">Update Product</Link>
                  <Link to="/admin/products/stock">Update Stock</Link>
                  <Link to="/admin/products/delete">Delete Product</Link>
                </div>
              )}
            </div>

            <button className="navbar-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}

        {/* USER */}
        {user && user.role === "USER" && (
          <>
            <Link to="/shop">Shop</Link>

            {/* 🛒 CART ICON WITH BADGE */}
            <Link to="/cart" className="cart-link">
              🛒
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </Link>

            <button className="navbar-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
