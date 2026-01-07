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

        {/* USER LOGGED IN */}
        {user && user.role === "USER" && (
          <button className="navbar-btn" onClick={handleLogout}>
            Logout
          </button>
        )}

        {/* ADMIN LOGGED IN */}
        {user && user.role === "ADMIN" && (
          <>
            <Link to="/admin" className="admin-link">
              Admin Dashboard
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
