import { useEffect, useState } from "react";
import api from "../api/axios";
import "../css/shop.css";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchAllProducts();
  }, []);

  const fetchCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data || []);
  };

  const fetchAllProducts = async () => {
    setLoading(true);
    const res = await api.get("/products");
    setProducts(res.data || []);
    setActiveCategory(null);
    setLoading(false);
  };

  const fetchByCategory = async (category) => {
    setLoading(true);

    let res;
    if (category.children && category.children.length > 0) {
      // 🔥 Parent category (Electronics)
      res = await api.get(
        `/products/parent-category/${category.id}`
      );
    } else {
      // ✅ Child category (Mobiles, Laptops)
      res = await api.get(
        `/products/category/${category.id}`
      );
    }

    setProducts(res.data || []);
    setActiveCategory(category.id);
    setLoading(false);
  };

  return (
    <div className="shop-container">
      {/* ===== SIDEBAR ===== */}
      <aside className="shop-sidebar">
        <h3 className="sidebar-title">Categories</h3>

        <button
          className={`category-item ${!activeCategory ? "active" : ""}`}
          onClick={fetchAllProducts}
        >
          All Products
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-item ${
              activeCategory === cat.id ? "active" : ""
            }`}
            onClick={() => fetchByCategory(cat)}
          >
            {cat.name}
          </button>
        ))}
      </aside>

      {/* ===== PRODUCTS ===== */}
      <main className="shop-content">
        <div className="shop-header">
          <h2>
            {activeCategory
              ? `Products (${products.length})`
              : `All Products (${products.length})`}
          </h2>
        </div>

        {loading ? (
          <p className="loading-text">Loading products…</p>
        ) : products.length === 0 ? (
          <p className="empty-state">No products found</p>
        ) : (
          <div className="product-grid">
            {products.map((p) => (
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
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Shop;
