import { useEffect, useState } from "react";
import Select from "react-select";
import api from "../api/axios";
import "../css/products.css";

const AdminProducts = () => {
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",          // ✅ NEW
    imageUrl: "",
    categoryId: null,
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.categoryId) {
      alert("Please select a category");
      return;
    }

    if (Number(form.stock) < 0) {
      alert("Stock cannot be negative");
      return;
    }

    await api.post("/admin/products", {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock), // ✅ NEW
    });

    alert("✅ Product added successfully");

    setForm({
      name: "",
      description: "",
      price: "",
      stock: "",
      imageUrl: "",
      categoryId: null,
    });
  };

  const categoryOptions = categories.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  return (
    <div className="admin-products">
      <form className="product-form" onSubmit={handleSubmit}>
        <h2>Create Product</h2>

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

        {/* ✅ STOCK INPUT */}
        <input
          type="number"
          placeholder="Stock (No. of items)"
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
          placeholder="Search & select category"
          isSearchable
          isClearable
          value={
            categoryOptions.find(
              (opt) => opt.value === form.categoryId
            ) || null
          }
          onChange={(opt) =>
            setForm({
              ...form,
              categoryId: opt ? opt.value : null,
            })
          }
        />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AdminProducts;
