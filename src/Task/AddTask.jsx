import React, { useEffect, useState } from 'react';
import axios from "axios";
import toast from "react-hot-toast";
import TaskCard from './TaskCard';

const AddTask = () => {
  const [dishes, setDishes] = useState([]);
  const [chefs, setChefs] = useState([]);
  const [formData, setFormData] = useState({
    dishId: "",
    assignedTo: "",
    tableNo: "", // New field
    notes: "",
    scheduledAt: "",
    priority: "medium",
    status: "assigned"
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const dishRes = await axios.get("http://localhost:8000/api/dish", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const chefRes = await axios.get("http://localhost:8000/api/auth/allUsers", {
          headers: { Authorization: `Bearer ${token}` },
        });
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
      await axios.post("http://localhost:8000/api/tasks/addtask", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Task created successfully");
      setFormData({
        dishId: "",
        assignedTo: "",
        tableNo: "", // Reset field
        notes: "",
        scheduledAt: "",
        priority: "medium",
        status: "assigned"
      });
    } catch (error) {
      toast.error("Task creation failed");
    }
  };

  return (
    <div className="container py-4">
      <TaskCard />

      <div className="card my-4">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Assign Task</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Dish</label>
                <select
                  name="dishId"
                  className="form-select"
                  value={formData.dishId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a dish</option>
                  {dishes.map(dish => (
                    <option key={dish._id} value={dish._id}>{dish.name}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Chef</label>
                <select
                  name="assignedTo"
                  className="form-select"
                  value={formData.assignedTo}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a chef</option>
                  {chefs.map(chef => (
                    <option key={chef._id} value={chef._id}>{chef.name}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Table Number</label>
                <input
                  type="text"
                  name="tableNo"
                  className="form-control"
                  placeholder="Enter table number"
                  value={formData.tableNo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-12">
                <label className="form-label">Notes</label>
                <textarea
                  name="notes"
                  className="form-control"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Status</label>
                <select
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="assigned">Assigned</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label">Scheduled At</label>
                <input
                  type="datetime-local"
                  name="scheduledAt"
                  className="form-control"
                  value={formData.scheduledAt}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Priority</label>
                <select
                  name="priority"
                  className="form-select"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div className="mt-4 text-end">
              <button type="submit" className="btn btn-success">
                Create Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
