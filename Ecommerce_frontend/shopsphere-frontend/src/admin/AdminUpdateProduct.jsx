import { useEffect, useState } from "react";
import Select from "react-select";
import api from "../api/axios";
import "../css/products.css";

const AdminUpdateProduct = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
    categoryId: null,
  });

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  const loadCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data);
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);

    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      imageUrl: product.imageUrl,
      categoryId: product.categoryId,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.put(`/admin/products/${selectedProduct.id}`, {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    });

    alert("✅ Product updated successfully");
  };

  const productOptions = products.map((p) => ({
    value: p,
    label: p.name,
  }));

  const categoryOptions = categories.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  return (
    <div className="admin-products">
      <form className="product-form" onSubmit={handleSubmit}>
        <h2>Update Product</h2>

        {/* SELECT PRODUCT */}
        <Select
          options={productOptions}
          placeholder="Select product"
          isSearchable
          onChange={(opt) => handleProductSelect(opt.value)}
        />

        {selectedProduct && (
          <>
            <input
              placeholder="Product Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              required
            />

            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
            />

            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
              required
            />

            <input
              type="number"
              placeholder="Stock"
              value={form.stock}
              onChange={(e) =>
                setForm({ ...form, stock: e.target.value })
              }
              min="0"
              required
            />

            <input
              placeholder="Image URL"
              value={form.imageUrl}
              onChange={(e) =>
                setForm({ ...form, imageUrl: e.target.value })
              }
              required
            />

            <Select
              className="category-select"
              classNamePrefix="select"
              options={categoryOptions}
              placeholder="Select category"
              value={
                categoryOptions.find(
                  (c) => c.value === form.categoryId
                ) || null
              }
              onChange={(opt) =>
                setForm({
                  ...form,
                  categoryId: opt.value,
                })
              }
            />

            <button type="submit">Update Product</button>
          </>
        )}
      </form>
    </div>
  );
};

export default AdminUpdateProduct;
