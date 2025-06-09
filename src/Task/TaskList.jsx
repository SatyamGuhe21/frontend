import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "./TaskCard";
import { FaEdit } from "react-icons/fa";

const TaskList = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.log("No token found");
          return;
        }

        const res = await axios.get("http://localhost:8000/api/tasks/alltask", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Sort by scheduledAt in descending order (latest first)
        const sortedData = res.data.sort(
          (a, b) => new Date(b.scheduledAt) - new Date(a.scheduledAt)
        );
        setDishes(sortedData);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      }
    };

    fetchDishes();
  }, []);

  return (
    <div className="container py-4">
      <TaskCard />

      <h2 className="mb-3">Task List</h2>
      {dishes.length === 0 ? (
        <div className="alert alert-warning">No tasks available.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Dish</th>
                <th>Chef</th>
                <th>Assigned By</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Notes</th>
                <th>Scheduled At</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {dishes.map((task, index) => (
                <tr key={task._id}>
                  <td>{index + 1}</td>
                  <td>{task.dishId?.name}</td>
                  <td>{task.assignedTo?.name}</td>
                  <td>{task.assignedBy?.name}</td>
                  <td>{task.priority}</td>
                  <td>{task.status}</td>
                  <td>{task.notes || "—"}</td>
                  <td>
                    {task.scheduledAt
                      ? new Date(task.scheduledAt).toLocaleString()
                      : "N/A"}
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary">
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TaskList;
