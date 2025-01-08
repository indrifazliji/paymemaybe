// src/components/profile/Profile.js
import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <div className="profile-container">
      <h2>Profile Settings</h2>
      {isEditing ? (
        <div className="profile-edit">
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
          <button onClick={toggleEdit}>Save Changes</button>
        </div>
      ) : (
        <div className="profile-view">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={toggleEdit}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
// Created Profile.js file only 30 % 
