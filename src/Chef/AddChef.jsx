import React, { useState } from 'react';
import axios from 'axios';
import DishCard from "./ChefCard";

const AddChef = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    ingredients: '',
    image: '',
  });

  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await axios.post(
        'http://localhost:8000/api/dish',
        {
          ...formData,
          ingredients: formData.ingredients.split(',').map(item => item.trim())
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setMessage('Dish added successfully!');
      setFormData({ name: '', description: '', ingredients: '', image: '' });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to add dish');
    }
  };

  return (
    <div style={{ marginTop: "80px", textAlign: "center" }}>
      <DishCard/>
      <h2>Add Chef</h2>
      <form onSubmit={handleSubmit} style={{ display: "inline-block", textAlign: "left" }}>
        <div>
          <label>Name:</label><br />
          <input 
            type="text" 
            name="name" 
            value={formData.name}
            onChange={handleChange} 
            required 
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>Description:</label><br />
          <textarea 
            name="description" 
            value={formData.description}
            onChange={handleChange} 
            required 
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>Ingredients (comma-separated):</label><br />
          <input 
            type="text" 
            name="ingredients" 
            value={formData.ingredients}
            onChange={handleChange} 
            required 
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>Image URL:</label><br />
          <input 
            type="text" 
            name="image" 
            value={formData.image}
            onChange={handleChange} 
          />
        </div>
        <button type="submit" style={{ marginTop: "20px" }}>Add Dish</button>
        {message && <p style={{ color: message.includes('success') ? 'green' : 'red' }}>{message}</p>}
      </form>
    </div>
  );
};

export default AddChef;