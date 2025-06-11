import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";

const LabourList = () => {
  const [labours, setLabours] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    position: "",
    contact: "",
    hireDate: "",
    salaryPerHour: "12",
    totalHours: "120",
    hoursWorkedWeek: "",
    hoursWorkedMonth: "",
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
      toast.success("Employee added successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        position: "",
        contact: "",
        hireDate: "",
        salaryPerHour: "12",
        totalHours: "120",
        hoursWorkedWeek: "",
        hoursWorkedMonth: "",
      });
    } catch (error) {
      toast.error("Failed to add employee.");
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
        <div className="card-header">Add New Employee</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Position</label>
                <input
                  type="text"
                  name="position"
                  className="form-control"
                  value={formData.position}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Contact No.</label>
                <input
                  type="text"
                  name="contact"
                  className="form-control"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Hire Date</label>
                <input
                  type="date"
                  name="hireDate"
                  className="form-control"
                  value={formData.hireDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Salary per Hour (£)</label>
                <input
                  type="number"
                  name="salaryPerHour"
                  className="form-control"
                  value={formData.salaryPerHour}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Total Hours Worked</label>
                <input
                  type="number"
                  name="totalHours"
                  className="form-control"
                  value={formData.totalHours}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className="col-md-2">
                <label className="form-label">Hours this Week</label>
                <input
                  type="number"
                  name="hoursWorkedWeek"
                  className="form-control"
                  value={formData.hoursWorkedWeek}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-2">
                <label className="form-label">Hours this Month</label>
                <input
                  type="number"
                  name="hoursWorkedMonth"
                  className="form-control"
                  value={formData.hoursWorkedMonth}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mt-4 text-end">
              <button type="submit" className="btn btn-success">
                Add Employee
              </button>
            </div>
          </form>
        </div>
      </div>

      <h2 className="mb-3">All Employees</h2>
      {labours.length === 0 ? (
        <div className="alert alert-warning">No employees available.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Position</th>
                <th>Contact</th>
                <th>Hire Date</th>
                <th>Weekly Hrs</th>
                <th>Monthly Hrs</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {labours.map((emp, index) => (
                <tr key={emp._id}>
                  <td>{index + 1}</td>
                  <td>{emp.firstName} {emp.lastName}</td>
                  <td>{emp.position}</td>
                  <td>{emp.contact}</td>
                  <td>{emp.hireDate?.slice(0, 10)}</td>
                  <td>{emp.hoursWorkedWeek}</td>
                  <td>{emp.hoursWorkedMonth}</td>
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
