import { useEffect, useState } from "react";
import Select from "react-select";
import api from "../api/axios";
import "../css/products.css";

const AdminUpdateStock = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [stock, setStock] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProduct) {
      alert("Select a product");
      return;
    }

    if (Number(stock) < 0) {
      alert("Stock cannot be negative");
      return;
    }

    await api.patch(
      `/admin/products/${selectedProduct.id}/stock`,
      null,
      { params: { stock: Number(stock) } }
    );

    alert("✅ Stock updated successfully");

    setSelectedProduct(null);
    setStock("");
    loadProducts();
  };

  const productOptions = products.map((p) => ({
    value: p,
    label: `${p.name} (Stock: ${p.stock})`,
  }));

  return (
    <div className="admin-products">
      <form className="product-form" onSubmit={handleSubmit}>
        <h2>Update Stock</h2>

        <Select
          options={productOptions}
          placeholder="Search product"
          isSearchable
          value={
            selectedProduct
              ? {
                  value: selectedProduct,
                  label: `${selectedProduct.name} (Stock: ${selectedProduct.stock})`,
                }
              : null
          }
          onChange={(opt) => setSelectedProduct(opt.value)}
        />

        {selectedProduct && (
          <>
            <input
              type="number"
              placeholder="New stock value"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              min="0"
              required
            />

            <button type="submit">Update Stock</button>
          </>
        )}
      </form>
    </div>
  );
};

export default AdminUpdateStock;
