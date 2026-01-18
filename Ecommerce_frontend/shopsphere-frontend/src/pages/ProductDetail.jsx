import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../css/productDetail.css";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false); // ✅ NEW

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.error("Failed to load product", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product);

    // ✅ SHOW CONFIRMATION
    setShowToast(true);

    // auto hide after 2.5s
    setTimeout(() => setShowToast(false), 2500);
  };

  if (loading) return <p className="pd-loading">Loading product…</p>;
  if (!product) return <p className="pd-error">Product not found</p>;

  return (
    <div className="pd-container">
      {/* ===== CARD ===== */}
      <div className="pd-card">
        <div className="pd-image">
          <img src={product.imageUrl} alt={product.name} />
        </div>

        <div className="pd-info">
          <h1 className="pd-name">{product.name}</h1>
          <p className="pd-price">₹{product.price}</p>

          <span
            className={
              product.stock > 0
                ? "pd-stock in-stock"
                : "pd-stock out-stock"
            }
          >
            {product.stock > 0
              ? `In stock (${product.stock})`
              : "Out of stock"}
          </span>

          <p className="pd-desc">{product.description}</p>

          <button
            className="pd-btn"
            disabled={product.stock <= 0}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* ===== TOAST CONFIRMATION ===== */}
      {showToast && (
        <div className="cart-toast">
          <span>✅ Added to cart</span>
          <button onClick={() => navigate("/cart")}>
            View Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
