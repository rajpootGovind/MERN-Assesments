import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/signin', { userId, password });
      localStorage.setItem('token', response.data.token);
      navigate('/home');
    } catch (error) {
      console.error('Login error', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="userId" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
