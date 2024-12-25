import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import API from '../api';


import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState({ balance: 0, profilePhoto: '' });
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        navigate('/login');
        return;
      }
      try {
        const response = await API.get(`/api/users/${userId}`);
        setUser({
          ...response.data,
          balance: response.data.balance ? parseFloat(response.data.balance).toFixed(2) : '0.00',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, [userId, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="profile-info">
          <img
            src={`http://localhost:5000/uploads/${user.profilePhoto}`}
            alt="Profile"
            className="profile-circle"
            onError={(e) => (e.target.src = '/path/to/default-pic.jpg')}
          />
          <p className="balance">Balance: ${user.balance}</p>
          <div
            className={`dropdown-toggle ${showMenu ? 'active' : ''}`}
            onClick={() => setShowMenu(!showMenu)}
          >
            &#9662;
          </div>
          {showMenu && (
            <div className="dropdown-menu">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Dashboard;
