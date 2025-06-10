import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";

const RolesManagement = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "chef",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await axios.get("http://localhost:8000/api/auth/allUsers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8000/api/auth/register", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData({ name: "", email: "", password: "", role: "chef" });
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container py-4">
      <style>{`
        .form-box {
          background: linear-gradient(to right, #fefefe, #f0f0f0);
          border-radius: 16px;
          padding: 30px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          transition: 0.3s ease;
        }

        .form-box:hover {
          transform: translateY(-2px);
        }

        .form-box h2 {
          font-weight: 700;
          color: #2c3e50;
          text-align: center;
          margin-bottom: 20px;
        }

        .form-label {
          font-weight: 600;
          color: #34495e;
        }

        .form-control,
        .form-select {
          border-radius: 10px;
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        .btn-primary {
          background-color: #1d3557;
          border: none;
          font-weight: 600;
          padding: 10px 20px;
          border-radius: 10px;
        }

        .btn-primary:hover {
          background-color: #457b9d;
        }

        .text-danger {
          font-weight: 500;
        }

        .table {
          background-color: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
        }

        .table thead th {
          background-color: #1d3557;
          color: #fff;
        }

        .table td, .table th {
          vertical-align: middle;
          text-align: center;
        }

        .btn-outline-primary {
          border-radius: 50%;
          padding: 6px 10px;
          font-size: 16px;
        }

        @media (max-width: 768px) {
          .form-box {
            padding: 20px;
          }

          .table th, .table td {
            font-size: 14px;
            padding: 8px;
          }
        }
      `}</style>

      <div className="form-box mb-5">
        <h2>Register New User</h2>
        <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "auto" }}>
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Role:</label>
            <select
              name="role"
              value={formData.role}
              className="form-select"
              onChange={handleChange}
            >
              <option value="chef">Chef</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary w-100">Register</button>
          </div>

          {error && <p className="text-danger mt-3 text-center">{error}</p>}
        </form>
      </div>

      <h2 className="my-4">All Users</h2>
      {users.length === 0 ? (
        <p>No users available.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Role</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
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

export default RolesManagement;
