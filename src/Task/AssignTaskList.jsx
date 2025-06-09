import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AssignTaskList = () => {
  const [dishes, setDishes] = useState([]);
  const [chefs, setChefs] = useState([]);
  const [formData, setFormData] = useState({
    dishId: "",
    assignedTo: "",
    notes: "",
    scheduledAt: "",
    priority: "medium"
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const dishRes = await axios.get("http://localhost:8000/api/dish", {
          headers: {
            Authorization: `Bearer ${token}`,
          }});
        const chefRes = await axios.get("http://localhost:8000/api/auth/allUsers", {
          headers: {
            Authorization: `Bearer ${token}`,
          }}); // adjust route accordingly
        setDishes(dishRes.data);
        setChefs(chefRes.data.filter(user => user.role === "chef"));
      } catch (error) {
        toast.error("Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8000/api/tasks", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success("Task created successfully");
      setFormData({
        dishId: "",
        assignedTo: "",
        notes: "",
        scheduledAt: "",
        priority: "medium"
      });
    } catch (error) {
      toast.error("Task creation failed");
    }
  };

  return (
    <div className="task-form">
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Dish:</label>
          <select name="dishId" value={formData.dishId} onChange={handleChange} required>
            <option value="">Select a dish</option>
            {dishes.map(dish => (
              <option value={dish.name}>{dish.name}</option>
              // <option key={dish._id} value={dish._id}>{dish.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Chef:</label>
          <select name="assignedTo" value={formData.assignedTo} onChange={handleChange} required>
            <option value="">Select a chef</option>
            {chefs.map(chef => (
              <option key={chef._id} value={chef._id}>{chef.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Notes:</label>
          <textarea name="notes" value={formData.notes} onChange={handleChange} />
        </div>

        <div>
          <label>Scheduled At:</label>
          <input type="datetime-local" name="scheduledAt" value={formData.scheduledAt} onChange={handleChange} />
        </div>

        <div>
          <label>Priority:</label>
          <select name="priority" value={formData.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default AssignTaskList;