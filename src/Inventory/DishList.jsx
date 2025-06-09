import React, { useEffect, useState } from "react";
import axios from "axios";
import DishCard from "./DishCard";

const DishList = () => {
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
        const res = await axios.get("http://localhost:8000/api/dish", {
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

      <h2>All Dishes</h2>
      {dishes.length === 0 ? (
        <p>No dishes available.</p>
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
              <h3>{dish.name}</h3>
              <p>
                <strong>Description:</strong> {dish.description}
              </p>
              <p>
                <strong>Ingredients:</strong> {dish.ingredients?.join(", ")}
              </p>
              {dish.image && (
                <img
                  src={dish.image}
                  alt={dish.name}
                  style={{ maxWidth: "200px", borderRadius: "5px" }}
                />
              )}
              <br/>
              <button type="button" class="btn btn-info">Assign the task</button>
              <br></br>
              <button type="button" class="btn btn-success">Mark task as complete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DishList;
