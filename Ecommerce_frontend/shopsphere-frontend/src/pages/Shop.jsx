import { useEffect, useState } from "react";
import api from "../api/axios";
import "../css/shop.css";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const navigate = useNavigate();

  // ===== STATE =====
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  // ===== INITIAL LOAD =====
  useEffect(() => {
    loadCategories();
    loadAllProducts();
  }, []);

  // ===== API CALLS =====
  const loadCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data || []);
    } catch (err) {
      console.error("Failed to load categories", err);
      setCategories([]);
    }
  };

  const loadAllProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/products");
      setProducts(res.data || []);
      setActiveCategory(null);
    } catch (err) {
      console.error("Failed to load products", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const loadByCategory = async (id) => {
    try {
      setLoading(true);
      const res = await api.get(`/products/category/${id}`);
      setProducts(res.data || []);
      setActiveCategory(id);
    } catch (err) {
      console.error("Failed to load category products", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // ===== UI =====
  return (
    <div className="shop-container">
      {/* ===== LEFT SIDEBAR ===== */}
      <aside className="shop-sidebar">
        <h3 className="sidebar-title">Categories</h3>

        <button
          className={`category-item ${!activeCategory ? "active" : ""}`}
          onClick={loadAllProducts}
        >
          All Products
        </button>

        {categories?.map((cat) => (
          <button
            key={cat.id}
            className={`category-item ${
              activeCategory === cat.id ? "active" : ""
            }`}
            onClick={() => loadByCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}

        <hr />

        <h4 className="sidebar-subtitle">Availability</h4>
        <label className="filter-item">
          <input type="checkbox" disabled /> In stock only (next phase)
        </label>

        <h4 className="sidebar-subtitle">Price</h4>
        <label className="filter-item">
          <input type="checkbox" disabled /> Under ₹20,000
        </label>
        <label className="filter-item">
          <input type="checkbox" disabled /> ₹20,000 – ₹50,000
        </label>
      </aside>

      {/* ===== PRODUCTS AREA ===== */}
      <main className="shop-content">
        <div className="shop-header">
          <h2>
            {activeCategory
              ? `Products (${products.length})`
              : `All Products (${products.length})`}
          </h2>

          <select className="sort-dropdown" disabled>
            <option>Sort by Popularity</option>
          </select>
        </div>

        {loading ? (
          <p className="loading-text">Loading products...</p>
        ) : (
          <div className="product-grid">
            {products.length === 0 ? (
              <p className="empty-state">
                No products found
              </p>
            ) : (
              products.map((p) => (
                <div
                  key={p.id}
                  className="product-card"
                  onClick={() => navigate(`/product/${p.id}`)}
                >
                  <div className="product-img">
                    <img src={p.imageUrl} alt={p.name} />
                  </div>

                  <div className="product-info">
                    <h4 className="product-name">{p.name}</h4>
                    <p className="product-price">₹{p.price}</p>

                    <span
                      className={
                        p.stock > 0
                          ? "stock in-stock"
                          : "stock out-stock"
                      }
                    >
                      {p.stock > 0
                        ? `In stock (${p.stock})`
                        : "Out of stock"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Shop;
