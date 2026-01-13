import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "../css/navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showProductsMenu, setShowProductsMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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

        {user && user.role === "ADMIN" && (
          <>
            <Link to="/admin">Dashboard</Link>
            <Link to="/admin/categories">Categories</Link>

            {/* 🔽 PRODUCTS DROPDOWN */}
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
                  <Link to="/admin/products/delete">Delete Product</Link>
                </div>
              )}
            </div>

            <button className="navbar-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}

        {user && user.role === "USER" && (
          <button className="navbar-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
