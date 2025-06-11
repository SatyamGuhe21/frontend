import React, { useEffect, useState } from "react";
import axios from "axios";

const AllDishList = () => {
  const [dishes, setDishes] = useState([]);
  const [formData, setFormData] = useState({
    dishId: "",
    name: "",
    description: "",
    category: "",
    quantity: "",
    price: "",
    costPrice: "",
    prepTime: "",
    calories: "",
    inventoryAlert: "",
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
          price: parseFloat(formData.price),
          costPrice: parseFloat(formData.costPrice),
          prepTime: parseInt(formData.prepTime),
          calories: parseInt(formData.calories),
          inventoryAlert: parseInt(formData.inventoryAlert),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Dish added successfully!");
      setFormData({
        dishId: "",
        name: "",
        description: "",
        category: "",
        quantity: "",
        price: "",
        costPrice: "",
        prepTime: "",
        calories: "",
        inventoryAlert: "",
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
        }

        .form-label {
          font-weight: 600;
          color: #34495e;
        }

        .form-control {
          border-radius: 10px;
          padding: 10px 15px;
          font-size: 1rem;
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
        }

        .dish-card h4 {
          color: #1d3557;
        }

        .dish-card p {
          margin-bottom: 6px;
        }

        .btn-info,
        .btn-success {
          font-weight: 600;
          border-radius: 8px;
        }
      `}</style>

      <div className="form-section">
        <h3 className="text-center mb-4">🍽️ Add New Dish</h3>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Dish ID</label>
              <input type="text" name="dishId" className="form-control" value={formData.dishId} onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <label className="form-label">Dish Name</label>
              <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <label className="form-label">Category</label>
              <select name="category" className="form-control" value={formData.category} onChange={handleChange} required>
                <option value="">Select category</option>
                <option value="Starter">Starter</option>
                <option value="Main Course">Main Course</option>
                <option value="Dessert">Dessert</option>
                <option value="Beverage">Beverage</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Description</label>
              <textarea name="description" className="form-control" rows="2" value={formData.description} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Quantity (gm/lbs)</label>
              <input type="text" name="quantity" className="form-control" value={formData.quantity} onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <label className="form-label">Selling Price (£)</label>
              <input type="number" name="price" className="form-control" value={formData.price} onChange={handleChange} step="0.01" required />
            </div>
            <div className="col-md-4">
              <label className="form-label">Cost Price (£)</label>
              <input type="number" name="costPrice" className="form-control" value={formData.costPrice} onChange={handleChange} step="0.01" required />
            </div>
            <div className="col-md-4">
              <label className="form-label">Preparation Time (min)</label>
              <input type="number" name="prepTime" className="form-control" value={formData.prepTime} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Calories</label>
              <input type="number" name="calories" className="form-control" value={formData.calories} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Inventory Alert (Low Stock)</label>
              <input type="number" name="inventoryAlert" className="form-control" value={formData.inventoryAlert} onChange={handleChange} required />
            </div>
          </div>

          <div className="mt-4 text-center">
            <button type="submit" className="btn btn-primary px-5">Add Dish</button>
          </div>
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
              <p><strong>Dish ID:</strong> {dish.dishId}</p>
              <p><strong>Category:</strong> {dish.category}</p>
              <p><strong>Description:</strong> {dish.description}</p>
              <p><strong>Quantity:</strong> {dish.quantity}</p>
              <p><strong>Price:</strong> £{dish.price}</p>
              <p><strong>Cost:</strong> £{dish.costPrice}</p>
              <p><strong>Prep Time:</strong> {dish.prepTime} min</p>
              <p><strong>Calories:</strong> {dish.calories} kcal</p>
              <p><strong>Inventory Alert:</strong> {dish.inventoryAlert}</p>
              <div className="mt-2">
                <button className="btn btn-info me-2">Assign Task</button>
                <button className="btn btn-success">Mark Complete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllDishList;
