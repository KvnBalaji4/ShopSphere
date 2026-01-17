import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Login from "./auth/Login";
import Register from "./auth/Register";
import AdminRoute from "./auth/AdminRoute";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";

import AdminDashboard from "./admin/AdminDashboard";
import AdminCategories from "./admin/AdminCategories";
import AdminProducts from "./admin/AdminProducts";
import AdminUpdateProduct from "./admin/AdminUpdateProduct";
import AdminDeleteProduct from "./admin/AdminDeleteProduct";
import AdminUpdateStock from "./admin/AdminUpdateStock";

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* ===== PUBLIC ===== */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ===== SHOP (USER) ===== */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* ===== ADMIN ===== */}
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

        <Route
          path="/admin/products/update"
          element={
            <AdminRoute>
              <AdminUpdateProduct />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/products/delete"
          element={
            <AdminRoute>
              <AdminDeleteProduct />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/products/stock"
          element={
            <AdminRoute>
              <AdminUpdateStock />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
