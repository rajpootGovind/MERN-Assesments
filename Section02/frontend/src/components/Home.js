import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/userSlice';
import axios from 'axios';

const Home = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/user/${id}`);
      dispatch(fetchUsers());
    } catch (error) {
      console.error('Delete error', error);
    }
  };

  return (
    <div>
      <h1>User List</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'succeeded' && (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.name} - {user.email}
              <button onClick={() => handleDelete(user._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      {status === 'failed' && <p>{error}</p>}
    </div>
  );
};

export default Home;
