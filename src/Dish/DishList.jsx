import React, { useEffect, useState } from "react";
import axios from "axios";

const AllDishList = () => {
  const [dishes, setDishes] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    ingredients: "",
    image: "",
    price: "",
  });
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      if (!token) return;
      const res = await axios.get("http://localhost:8000/api/dish", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDishes(res.data);
    } catch (err) {
      console.error("Failed to fetch dishes:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.post(
        "http://localhost:8000/api/dish",
        {
          ...formData,
          ingredients: formData.ingredients.split(",").map((item) => item.trim()),
          price: parseFloat(formData.price),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Dish added successfully!");
      setFormData({
        name: "",
        category: "",
        description: "",
        ingredients: "",
        image: "",
        price: "",
      });
      fetchDishes();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to add dish");
    }
  };

  return (
    <div className="container my-5">
      <style>{`
        .form-section {
          background: linear-gradient(to right, #fdfbfb, #ebedee);
          border-radius: 16px;
          padding: 40px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          margin-bottom: 60px;
          transition: all 0.3s ease;
        }

        .form-section:hover {
          transform: translateY(-2px);
        }

        .form-section h3 {
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 30px;
          text-align: center;
        }

        .form-label {
          font-weight: 600;
          color: #34495e;
        }

        .form-control {
          border-radius: 10px;
          padding: 10px 15px;
          font-size: 1rem;
          box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.05);
        }

        .btn-primary {
          background: #1d3557;
          border: none;
          font-weight: 600;
          padding: 12px;
          border-radius: 12px;
        }

        .btn-primary:hover {
          background-color: #457b9d;
        }

        .alert {
          border-radius: 10px;
          font-weight: 500;
        }

        .dish-card {
          background: #fff;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }

        .dish-card:hover {
          transform: scale(1.01);
        }

        .dish-card h4 {
          color: #1d3557;
        }

        .dish-card p {
          margin-bottom: 6px;
          color: #2f3640;
        }

        .dish-card img {
          max-width: 180px;
          margin-top: 10px;
          border-radius: 12px;
        }

        .btn-info,
        .btn-success {
          font-weight: 600;
          border-radius: 8px;
        }

        .btn-info {
          background-color: #00b4d8;
          border: none;
        }

        .btn-success {
          background-color: #06d6a0;
          border: none;
        }

        @media (max-width: 768px) {
          .form-section {
            padding: 25px;
          }

          .dish-card img {
            width: 100%;
            max-width: 100%;
          }
        }
      `}</style>

      <div className="form-section">
        <h3>Add New Dish 🍽️</h3>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                placeholder="Dish name"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Category</label>
              <select
                name="category"
                className="form-control"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select category</option>
                <option value="starter">Starter</option>
                <option value="main course">Main Course</option>
                <option value="dessert">Dessert</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleChange}
              placeholder="Short description"
              rows="3"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Ingredients (comma-separated)</label>
            <textarea
              name="ingredients"
              className="form-control"
              value={formData.ingredients}
              onChange={handleChange}
              placeholder="e.g. rice, spices, chicken"
              rows="2"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Image URL</label>
            <input
              type="text"
              name="image"
              className="form-control"
              value={formData.image}
              onChange={handleChange}
              placeholder="http://example.com/image.jpg"
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Price (USD)</label>
            <input
              type="number"
              name="price"
              className="form-control"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="Enter price"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Add Dish</button>
        </form>

        {message && (
          <div className={`alert mt-4 ${message.includes("success") ? "alert-success" : "alert-danger"}`}>
            {message}
          </div>
        )}
      </div>

      <h3 className="mb-4">📋 All Dishes</h3>
      {dishes.length === 0 ? (
        <p>No dishes available yet.</p>
      ) : (
        <ul className="list-unstyled">
          {dishes.map((dish) => (
            <li key={dish._id} className="dish-card mb-4">
              <h4>{dish.name}</h4>
              <p><strong>Category:</strong> {dish.category}</p>
              <p><strong>Description:</strong> {dish.description}</p>
              <p><strong>Ingredients:</strong> {dish.ingredients?.join(", ")}</p>
              <p><strong>Price:</strong> ${dish.price?.toFixed(2)}</p>
              {dish.image && (
                <img src={dish.image} alt={dish.name} className="img-fluid" />
              )}
              <div className="mt-3">
                <button type="button" className="btn btn-info me-2">Assign Task</button>
                <button type="button" className="btn btn-success">Mark as Complete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllDishList;
