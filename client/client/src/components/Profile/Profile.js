// src/components/profile/Profile.js
import React, { useState, useEffect } from 'react';
import API from '../../api';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    description: '',
    tags: '',
    workPhotos: [],
    companyName: '',
    companyDescription: '',
  });
  
  const [postedJobs, setPostedJobs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const userId = localStorage.getItem('userId');
  const role = localStorage.getItem('role');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await API.get(`/api/users/${userId}`);
        setUser(response.data);

        if (role === 'client') {
          fetchPostedJobs();
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    const fetchPostedJobs = async () => {
      try {
        const response = await API.get(`/api/jobs/client/${userId}`);
        setPostedJobs(response.data);
      } catch (error) {
        console.error('Error fetching posted jobs:', error);
      }
    };

    fetchUserProfile();
  }, [userId, role]);

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      await API.put(`/api/users/${userId}`, user);
      setIsEditing(false);
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
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
          {role === 'freelancer' && (
            <>
              <textarea
                name="description"
                value={user.description}
                onChange={handleInputChange}
                placeholder="Brief Description"
              />
              <input
                type="text"
                name="tags"
                value={user.tags}
                onChange={handleInputChange}
                placeholder="Tags (comma-separated)"
              />
            </>
          )}
          {role === 'client' && (
            <>
              <input
                type="text"
                name="companyName"
                value={user.companyName}
                onChange={handleInputChange}
                placeholder="Company Name"
              />
              <textarea
                name="companyDescription"
                value={user.companyDescription}
                onChange={handleInputChange}
                placeholder="Company Description"
              />
            </>
          )}
          <button onClick={handleSaveChanges}>Save Changes</button>
        </div>
      ) : (
        <div className="profile-view">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {role === 'freelancer' && (
            <>
              <p><strong>Description:</strong> {user.description}</p>
              <p><strong>Tags:</strong> {user.tags}</p>
              <h3>Work Photos</h3>
              <div className="work-photos">
                {user.workPhotos?.map((photo, index) => (
                  <img key={index} src={photo} alt={`Work ${index + 1}`} className="work-photo" />
                ))}
              </div>
            </>
          )}
          {role === 'client' && (
            <>
              <p><strong>Company Name:</strong> {user.companyName}</p>
              <p><strong>Company Description:</strong> {user.companyDescription}</p>
            </>
          )}
          <button onClick={toggleEdit}>Edit Profile</button>
        </div>
      )}

      {/* Display client’s posted jobs if the user is a client */}
      {role === 'client' && (
        <div className="posted-jobs">
          <h3>Your Posted Jobs</h3>
          <ul>
            {postedJobs.map((job) => (
              <li key={job._id}>
                <h4>{job.title}</h4>
                <p>{job.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
// Created Profile.js file  
