import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";

const InventoryList = () => {
  const [activePage, setActivePage] = useState("inventory");
  const [inventory, setInventory] = useState([]);
  const [restaurantInventory, setRestaurantInventory] = useState([]);
  const [barInventory, setBarInventory] = useState([]);

  const [inventoryForm, setInventoryForm] = useState({
    itemName: "",
    itemCategory: "",
    itemQuantity: "",
    unitPrice: "",
    totalValue: "",
  });

  const [barForm, setBarForm] = useState({
    drinkName: "",
    drinkType: "",
    quantity: "",
    unitCost: "",
    totalCost: "",
  });

  const handleInventoryChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...inventoryForm, [name]: value };
    if (name === "itemQuantity" || name === "unitPrice") {
      const quantity = parseFloat(name === "itemQuantity" ? value : updated.itemQuantity);
      const price = parseFloat(name === "unitPrice" ? value : updated.unitPrice);
      if (!isNaN(quantity) && !isNaN(price)) {
        updated.totalValue = (quantity * price).toFixed(2);
      }
    }
    setInventoryForm(updated);
  };

  const handleBarChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...barForm, [name]: value };
    if (name === "quantity" || name === "unitCost") {
      const quantity = parseFloat(name === "quantity" ? value : updated.quantity);
      const price = parseFloat(name === "unitCost" ? value : updated.unitCost);
      if (!isNaN(quantity) && !isNaN(price)) {
        updated.totalCost = (quantity * price).toFixed(2);
      }
    }
    setBarForm(updated);
  };

  const handleInventorySubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8000/api/inventory/addInventory",
        inventoryForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Inventory item added");
      setInventoryForm({
        itemName: "",
        itemCategory: "",
        itemQuantity: "",
        unitPrice: "",
        totalValue: "",
      });
      fetchInventory();
    } catch (error) {
      toast.error("Failed to add inventory item");
    }
  };

  const handleBarSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const barPayload = {
        itemName: barForm.drinkName,
        itemCategory: "bar",
        itemQuantity: barForm.quantity,
        unitPrice: barForm.unitCost,
        totalValue: barForm.totalCost,
      };

      await axios.post(
        "http://localhost:8000/api/inventory/addInventory",
        barPayload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Bar item added");
      setBarForm({
        drinkName: "",
        drinkType: "",
        quantity: "",
        unitCost: "",
        totalCost: "",
      });
      fetchInventory();
    } catch (err) {
      toast.error("Failed to add bar item");
    }
  };

  const fetchInventory = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8000/api/inventory/allInventory", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInventory(res.data);
      const barItems = res.data.filter((item) => item.itemCategory.toLowerCase() === "bar");
      const restaurantItems = res.data.filter((item) => item.itemCategory.toLowerCase() !== "bar");
      setBarInventory(barItems);
      setRestaurantInventory(restaurantItems);
    } catch (err) {
      console.error("Fetch inventory failed:", err);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const renderSwitchButtons = () => (
    <div className="mb-3 text-start">
      <button
        className={`btn btn-lg me-2 ${activePage === "inventory" ? "btn-primary" : "btn-outline-primary"}`}
        onClick={() => setActivePage("inventory")}
      >
        Restaurant Inventory
      </button>
      <button
        className={`btn btn-lg ${activePage === "bar" ? "btn-primary" : "btn-outline-primary"}`}
        onClick={() => setActivePage("bar")}
      >
        Bar Inventory
      </button>
    </div>
  );

  const renderTable = (items) => (
    <div className="table-responsive">
      <table className="table table-bordered table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Item Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total Value</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.itemName}</td>
              <td>{item.itemCategory}</td>
              <td>{item.itemQuantity}</td>
              <td>${parseFloat(item.unitPrice).toFixed(2)}</td>
              <td>${parseFloat(item.totalValue).toFixed(2)}</td>
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
  );

  return (
    <div className="container py-4">
      <style>{`
        .card {
          border-radius: 14px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          background: #ffffff;
          overflow: hidden;
        }

        .card-header {
          background: linear-gradient(90deg, #0077b6, #00b4d8);
          color: #fff;
          font-weight: 600;
          font-size: 1.1rem;
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
          border-radius: 10px;
          padding: 10px 14px;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .btn-success {
          background-color: #06d6a0;
          border: none;
          padding: 10px 20px;
          font-weight: 600;
          border-radius: 10px;
        }

        .btn-success:hover {
          background-color: #05b68f;
        }

        .btn-lg {
          font-size: 1rem;
          padding: 8px 20px;
          border-radius: 10px;
          font-weight: 600;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .table {
          background-color: #fff;
          border-radius: 10px;
          overflow: hidden;
        }

        .table thead th {
          background-color: #1d3557;
          color: #fff;
          text-transform: uppercase;
          font-size: 0.9rem;
        }

        .table tbody tr:nth-child(even) {
          background-color: #f8f9fa;
        }

        .table td, .table th {
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

        h2 {
          font-weight: 700;
          color: #1d3557;
        }

        @media (max-width: 768px) {
          .card-body {
            padding: 20px;
          }

          .btn-lg {
            width: 100%;
            margin-bottom: 10px;
          }

          .table th, .table td {
            font-size: 13px;
            padding: 10px;
          }
        }
      `}</style>

      {renderSwitchButtons()}

      {activePage === "inventory" && (
        <>
          <div className="card my-4">
            <div className="card-header">Add Inventory Item</div>
            <div className="card-body">
              <form onSubmit={handleInventorySubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Item Name</label>
                    <input
                      type="text"
                      name="itemName"
                      className="form-control"
                      value={inventoryForm.itemName}
                      onChange={handleInventoryChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Category</label>
                    <input
                      type="text"
                      name="itemCategory"
                      className="form-control"
                      value={inventoryForm.itemCategory}
                      onChange={handleInventoryChange}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Quantity</label>
                    <input
                      type="number"
                      name="itemQuantity"
                      className="form-control"
                      value={inventoryForm.itemQuantity}
                      onChange={handleInventoryChange}
                      min="0"
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Unit Price ($)</label>
                    <input
                      type="number"
                      name="unitPrice"
                      className="form-control"
                      value={inventoryForm.unitPrice}
                      onChange={handleInventoryChange}
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Total Value ($)</label>
                    <input
                      type="number"
                      name="totalValue"
                      className="form-control"
                      value={inventoryForm.totalValue}
                      readOnly
                    />
                  </div>
                </div>
                <div className="mt-4 text-end">
                  <button type="submit" className="btn btn-success">
                    Add Inventory Item
                  </button>
                </div>
              </form>
            </div>
          </div>

          <h2 className="mb-3">Restaurant Inventory</h2>
          {restaurantInventory.length === 0 ? (
            <div className="alert alert-warning">No inventory available.</div>
          ) : (
            renderTable(restaurantInventory)
          )}
        </>
      )}

      {activePage === "bar" && (
        <>
          <div className="card my-4">
            <div className="card-header">Add Bar Item</div>
            <div className="card-body">
              <form onSubmit={handleBarSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Drink Name</label>
                    <input
                      type="text"
                      name="drinkName"
                      className="form-control"
                      value={barForm.drinkName}
                      onChange={handleBarChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Inventory</label>
                    <input
                      type="text"
                      className="form-control"
                      value="Bar"
                      readOnly
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      className="form-control"
                      value={barForm.quantity}
                      onChange={handleBarChange}
                      min="0"
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Unit Cost ($)</label>
                    <input
                      type="number"
                      name="unitCost"
                      className="form-control"
                      value={barForm.unitCost}
                      onChange={handleBarChange}
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Total Cost ($)</label>
                    <input
                      type="number"
                      name="totalCost"
                      className="form-control"
                      value={barForm.totalCost}
                      readOnly
                    />
                  </div>
                </div>
                <div className="mt-4 text-end">
                  <button type="submit" className="btn btn-success">
                    Add Bar Item
                  </button>
                </div>
              </form>
            </div>
          </div>

          <h2 className="mb-3">Bar Inventory</h2>
          {barInventory.length === 0 ? (
            <div className="alert alert-warning">No bar inventory available.</div>
          ) : (
            renderTable(barInventory)
          )}
        </>
      )}
    </div>
  );
};

export default InventoryList;
