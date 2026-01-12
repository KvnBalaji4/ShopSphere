import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ProtectedRoute from "./auth/ProtectedRoute";
import AdminRoute from "./auth/AdminRoute";
import AdminCategories from "./admin/AdminCategories";
import Home from "./pages/Home";
import AdminProducts from "./admin/AdminProducts";
import AdminDashboard from "./admin/AdminDashboard";

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Navbar />

      <Routes>
  {/* PUBLIC */}
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  {/* ADMIN */}
  <Route
    path="/admin"
    element={
      <AdminRoute>
        <AdminDashboard />
      </AdminRoute>
    }
  />

  <Route
    path="/admin/categories"
    element={
      <AdminRoute>
        <AdminCategories />
      </AdminRoute>
    }
  />

  <Route
    path="/admin/products"
    element={
      <AdminRoute>
        <AdminProducts />
      </AdminRoute>
    }
  />
</Routes>

    </BrowserRouter>
  </AuthProvider>
);

export default App;
