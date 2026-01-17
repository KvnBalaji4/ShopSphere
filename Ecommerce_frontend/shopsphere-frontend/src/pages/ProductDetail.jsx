import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import "../css/productDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.error("Failed to load product", err);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p style={{ padding: "40px" }}>Loading product...</p>;
  }

  if (!product) {
    return <p style={{ padding: "40px" }}>Product not found</p>;
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail-card">
        <div className="product-detail-img">
          <img src={product.imageUrl} alt={product.name} />
        </div>

        <div className="product-detail-info">
          <h2>{product.name}</h2>
          <p className="detail-price">₹{product.price}</p>

          <span
            className={
              product.stock > 0 ? "in-stock" : "out-stock"
            }
          >
            {product.stock > 0
              ? `In stock (${product.stock})`
              : "Out of stock"}
          </span>

          <p className="detail-desc">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
