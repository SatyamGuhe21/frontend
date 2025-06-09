import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TablePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orderItems, setOrderItems] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [mobile, setMobile] = useState('');

  useEffect(() => {
    const fetchTableStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get('http://localhost:8000/api/table/tableStatus', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        const tables = response.data;
        const thisTable = tables.find(t => t.table_number === parseInt(id));
        if (thisTable && thisTable.orders) {
          setOrderItems(thisTable.orders);
        }
      } catch (err) {
        console.error("Error fetching table status:", err);
      }
    };

    const fetchMenuItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/api/dish", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const dishes = response.data.map(dish => ({
          name: dish.name,
          price: dish.price,
          category: dish.category?.toLowerCase() || 'uncategorized'
        }));
        setMenuItems(dishes);
      } catch (err) {
        console.error("Failed to fetch menu items:", err);
      }
    };

    fetchTableStatus();
    fetchMenuItems();
  }, [id]);

  const handleAddItem = (item) => {
    const existingIndex = orderItems.findIndex((i) => i.name === item.name);

    let updatedOrder;
    if (existingIndex !== -1) {
      updatedOrder = [...orderItems];
      updatedOrder[existingIndex].quantity += 1;
    } else {
      updatedOrder = [...orderItems, { ...item, quantity: 1 }];
    }

    setOrderItems(updatedOrder);
  };

  const calculateTotal = () => {
    return orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const tax = +(calculateTotal() * 0.3).toFixed(2);
  const netAmount = calculateTotal() + tax;

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`http://localhost:8000/api/table/${id}/addOrder`, {
        items: orderItems,
        total: calculateTotal(),
        tax,
        netAmount,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      alert('Order saved & bill printed successfully!');
    } catch (err) {
      console.error('Failed to save order:', err);
      alert('Failed to save order. Please try again.');
    }
  };

  const handleFinalCheckout = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/api/table/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      alert(`Table ${id} checked out successfully!`);
      setOrderItems([]);
      navigate('/alltask');
    } catch (err) {
      console.error("Error during final checkout:", err);
      alert("Checkout failed. Try again.");
    }
  };

  const renderCategory = (title, category, btnClass = "btn-outline-primary") => (
    <>
      <h5 className="mt-3">{title}</h5>
      <div className="row row-cols-3 g-2">
        {menuItems
          .filter(item => item.category === category)
          .map((item, idx) => (
            <button
              key={`${category}-${idx}`}
              className={`btn ${btnClass}`}
              onClick={() => handleAddItem(item)}
            >
              {item.name}
            </button>
          ))}
      </div>
      <hr />
    </>
  );

  return (
    <div className="container-fluid mt-3">
      <div className="row">
        {/* Left Side: Menu */}
        <div className="col-md-7">
          <h4>KOT - Table {id}</h4>

          {renderCategory("Starters", "starter", "btn-outline-primary")}
          {renderCategory("Main Course", "main course", "btn-outline-success")}
          {renderCategory("Desserts", "dessert", "btn-outline-warning")}
        </div>

        {/* Right Side: Order Summary */}
        <div className="col-md-5">
          <div className="card">
            <div className="card-header">Order Summary</div>
            <div className="card-body">
              <table className="table table-bordered table-sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Qty</th>
                    <th>Rate</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((item, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>${item.price}</td>
                      <td>${item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="input-group my-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Mobile Number/Name"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
                <button className="btn btn-outline-secondary">🔍</button>
              </div>

              <p><strong>Total:</strong> ${calculateTotal()}</p>
              <p><strong>Tax (30%):</strong> ${tax}</p>
              <h5><strong>Net Amount:</strong> ${netAmount}</h5>

              <button
                className="btn btn-success w-100 mt-2"
                onClick={handleCheckout}
                disabled={orderItems.length === 0}
              >
                ➕ Add the order 
              </button>

              <button
                className="btn btn-danger w-100 mt-2"
                onClick={handleFinalCheckout}
                disabled={orderItems.length === 0}
              >
                ✅ Checkout & Clear Table
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablePage;
