import { useEffect, useState } from "react";
import Select from "react-select";
import api from "../api/axios";
import "../css/adminCategories.css";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await api.get("/categories");
    setCategories(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await api.post("/admin/categories", {
        name,
        parentId,
      });

      setMessage("✅ Category created successfully");
      setName("");
      setParentId(null);
      fetchCategories();
    } catch (err) {
      setMessage(
        err.response?.data?.message || "❌ Category already exists"
      );
    }
  };

  // 🔥 Convert categories → react-select options
  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));

  return (
    <div className="admin-category-page">
      <div className="admin-category-card">
        <h2>Create Category</h2>

        {message && <p className="category-message">{message}</p>}

        <form className="category-form" onSubmit={handleSubmit}>
          <input
            className="category-input"
            placeholder="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* ✅ PROFESSIONAL DROPDOWN */}
          <Select
            classNamePrefix="react-select"
            options={categoryOptions}
            placeholder="No Parent (Root Category)"
            isClearable
            onChange={(option) =>
              setParentId(option ? option.value : null)
            }
          />

          <button type="submit" className="category-btn">
            Create Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminCategories;
