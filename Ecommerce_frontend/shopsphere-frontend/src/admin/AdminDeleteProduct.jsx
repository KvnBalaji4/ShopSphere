import { useEffect, useState } from "react";
import Select from "react-select";
import api from "../api/axios";
import "../css/products.css";

const AdminDeleteProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  const handleDelete = async () => {
    if (!selectedProduct) return;

    const confirm = window.confirm(
      `Are you sure you want to delete "${selectedProduct.name}"?`
    );

    if (!confirm) return;

    await api.delete(`/admin/products/${selectedProduct.id}`);

    alert("✅ Product deleted successfully");

    setSelectedProduct(null);
    loadProducts();
  };

  const productOptions = products.map((p) => ({
    value: p,
    label: p.name,
  }));

  return (
    <div className="admin-products">
      <form className="product-form">
        <h2>Delete Product</h2>

        <Select
          options={productOptions}
          placeholder="Select product to delete"
          isSearchable
          value={
            selectedProduct
              ? { value: selectedProduct, label: selectedProduct.name }
              : null
          }
          onChange={(opt) => setSelectedProduct(opt.value)}
        />

        {selectedProduct && (
          <>
            <div
              style={{
                marginTop: "10px",
                fontSize: "14px",
                color: "#475569",
              }}
            >
              
            </div>

            <button
              type="button"
              style={{
                background: "#dc2626",
                marginTop: "14px",
              }}
              onClick={handleDelete}
            >
              Delete Product
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default AdminDeleteProduct;
