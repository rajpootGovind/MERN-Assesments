import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/signup', { name, password , userId});
      navigate('/login');
    } catch (error) {
      console.error('Registration error', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="userId" required />
      <button type="submit">Register</button>
    </form>
  );
};

export default Registration;
