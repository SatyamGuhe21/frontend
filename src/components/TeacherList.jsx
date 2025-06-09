import React, {useEffect, useState} from 'react';
import '../styles/teacherList.css';
import axios from 'axios';
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const teachers = [
  {
    name:"Abhijeet",
    duration: '2hr',
    cost: '$100',
    dish: "Pizza"
  },
  {
    name:"Akshay",
    duration: '1hr',
    cost: '$70',
    dish: "Burger"
  },
  {
    name:"Rahul",
    duration: '5hr',
    cost: '500',
    dish : "Pastry"
  }
]

const TeacherList = () => {

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/users");
        setUsers(response.data);
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    await axios
      .delete(`http://localhost:8000/api/delete/user/${userId}`)
      .then((response) => {
        setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
        toast.success(response.data.message, { position: "top-right" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className='teacher--list'>
        <div className='list--header'>
          <h2>Task list</h2>
          <select>
            <option value="English"> English</option>
            <option value="English"> Hindi</option>
          </select>
        </div>
      </div>

      <div className='list--container'>
        {users.map((teacher) => (
          <div className='list'>
            <h4>Owner : {teacher.name} </h4>
            <span>DishName {teacher.email} </span> 
            <span>Time : {teacher.address} </span> 
          </div>
        ))}

      </div>
    </div>
  )
}

export default TeacherList