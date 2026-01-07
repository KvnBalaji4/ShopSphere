import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user?.role === "ADMIN" ? children : <Navigate to="/" />;
};

export default AdminRoute;
