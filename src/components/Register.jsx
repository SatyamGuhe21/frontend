import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChefCard from '../Chef/ChefCard';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'chef', // default role
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:8000/api/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/assigntask');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ marginTop: "80px", textAlign: "center" }}>
      <ChefCard/>
      <h2>Register Chef</h2>
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
          <label>Email:</label><br />
          <input 
            type="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange} 
            required 
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>Password:</label><br />
          <input 
            type="password" 
            name="password" 
            value={formData.password}
            onChange={handleChange} 
            required 
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>Role:</label><br />
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="chef">Chef</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" style={{ marginTop: "20px" }}>Register</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Register;