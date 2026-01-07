import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../css/navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

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
        {/* NOT LOGGED IN */}
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
            <Link to="/admin/products">Products</Link>

            <button className="navbar-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}

        {/* USER (future-proof) */}
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
