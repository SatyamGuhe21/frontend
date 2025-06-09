import React, { useEffect, useState } from "react";
import axios from "axios";
import DishCard from "./UserCard";

const UserList = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const token = localStorage.getItem("token"); // Assumes the token is saved in localStorage after login

        // Check if token is available
        if (!token) {
          console.log("No token found");
          return;
        }

        // Send the token in the Authorization header
        const res = await axios.get("http://localhost:8000/api/auth/allUsers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDishes(res.data);
      } catch (err) {
        console.error("Failed to fetch dishes:", err);
      }
    };

    fetchDishes();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <DishCard/>

      <h2>All Users</h2>
      {dishes.length === 0 ? (
        <p>No User available.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {dishes.map((dish) => (
            <li
              key={dish._id}
              style={{
                border: "1px solid #ccc",
                marginBottom: "15px",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <h3>Username : {dish.name}</h3>
              <p>
                <strong>Role:</strong> {dish.role}
              </p>
              <p>
                <strong>Email:</strong> {dish.email}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
