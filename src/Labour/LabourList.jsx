import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";

const LabourList = () => {
  const [labours, setLabours] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    hourlyRate: "",
    hoursWorked: "",
    totalEarning: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8000/api/labour/addlabour", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Task created successfully");
      setFormData({
        name: "",
        role: "",
        hourlyRate: "",
        hoursWorked: "",
        totalEarning: "",
      });
    } catch (error) {
      toast.error("Task creation failed");
    }
  };

  useEffect(() => {
    const fetchLabours = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await axios.get("http://localhost:8000/api/labour/alllabour", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLabours(res.data);
      } catch (err) {
        console.error("Failed to fetch labours:", err);
      }
    };

    fetchLabours();
  }, []);

  return (
    <div className="container py-4">
      <style>{`
        .card {
          border-radius: 14px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          background: #ffffff;
        }

        .card-header {
          background: linear-gradient(90deg, #0077b6, #00b4d8);
          color: #fff;
          font-weight: 600;
          font-size: 1.2rem;
          padding: 15px 25px;
        }

        .card-body {
          padding: 30px;
        }

        .form-label {
          font-weight: 600;
          color: #333;
        }

        .form-control,
        .form-select {
          border-radius: 8px;
          padding: 10px 12px;
        }

        .btn-success {
          padding: 10px 20px;
          border-radius: 10px;
          font-weight: 600;
          background-color: #06d6a0;
          border: none;
        }

        .btn-success:hover {
          background-color: #05b68f;
        }

        h2 {
          font-weight: 700;
          color: #1d3557;
        }

        .table {
          background-color: #fff;
          border-radius: 10px;
          overflow: hidden;
        }

        .table thead th {
          background-color: #1d3557;
          color: #fff;
          font-size: 0.95rem;
          text-transform: uppercase;
        }

        .table tbody tr:nth-child(even) {
          background-color: #f8f9fa;
        }

        .table td,
        .table th {
          vertical-align: middle;
          text-align: center;
        }

        .btn-outline-primary {
          border-radius: 50%;
          padding: 6px 10px;
          font-size: 14px;
        }

        .alert-warning {
          background: #fff3cd;
          border: 1px solid #ffeeba;
          color: #856404;
          border-radius: 10px;
          padding: 15px;
        }

        @media (max-width: 768px) {
          .card-body {
            padding: 20px;
          }

          .table th, .table td {
            font-size: 13px;
            padding: 10px;
          }
        }
      `}</style>

      <div className="card my-4">
        <div className="card-header">
          Add New Labour
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Role</label>
                <select
                  name="role"
                  className="form-select"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a Role</option>
                  <option value="Manager">Manager</option>
                  <option value="Staff">Staff</option>
                  <option value="Accountant">Accountant</option>
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label">Hourly Rate ($)</label>
                <input
                  type="number"
                  name="hourlyRate"
                  className="form-control"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Hours Worked</label>
                <input
                  type="number"
                  name="hoursWorked"
                  className="form-control"
                  value={formData.hoursWorked}
                  onChange={handleChange}
                  step="1"
                  min="0"
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Total Earned ($)</label>
                <input
                  type="number"
                  name="totalEarning"
                  className="form-control"
                  value={formData.totalEarning}
                  onChange={handleChange}
                  step="1"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="mt-4 text-end">
              <button type="submit" className="btn btn-success">
                Add Labour
              </button>
            </div>
          </form>
        </div>
      </div>

      <h2 className="mb-3">All Labour</h2>
      {labours.length === 0 ? (
        <div className="alert alert-warning">No labour available.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Role</th>
                <th>Hourly Rate</th>
                <th>Hours Worked</th>
                <th>Total Earned</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {labours.map((labour, index) => (
                <tr key={labour._id}>
                  <td>{index + 1}</td>
                  <td>{labour.name}</td>
                  <td>{labour.role}</td>
                  <td>${parseFloat(labour.hourlyRate).toFixed(2)}</td>
                  <td>{labour.hoursWorked}</td>
                  <td>${parseFloat(labour.totalEarning).toFixed(2)}</td>
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

export default LabourList;
