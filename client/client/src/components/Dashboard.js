import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import './Dashboard.css';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [availableJobs, setAvailableJobs] = useState([]);

  const fetchAvailableJobs = async () => {
    try {
      const response = await API.get('/api/jobs');
      const openJobs = response.data.filter((job) => job.status !== 'Accepted');
      setAvailableJobs(openJobs);
    } catch (error) {
      console.error('Error fetching available jobs:', error);
    }
  };

  useEffect(() => {
    fetchAvailableJobs();
  }, []);

  const filteredJobs = availableJobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <section className="available-jobs-section">
        <h2>Available Jobs Based on Your Skills</h2>
        <input
          type="text"
          placeholder="Search for jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        <div className="job-cards-container">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div className="job-card" key={job._id}>
                <h3 className="job-title">{job.title}</h3>
                <p className="job-description">{job.description}</p>
                <button
                  className="view-job-button"
                  onClick={() => console.log(`Navigating to job ${job._id}`)}
                >
                  View Job
                </button>
              </div>
            ))
          ) : (
            <p>No jobs found based on your search.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
// Updated the Dashboard.js file
