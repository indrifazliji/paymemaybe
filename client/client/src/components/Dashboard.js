import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState({ balance: 0, profilePhoto: '', role: '', tags: [] });
  const userId = localStorage.getItem('userId');
  const [searchTerm, setSearchTerm] = useState('');
  const [availableJobs, setAvailableJobs] = useState([]);

  const fetchAvailableJobs = async () => {
    try {
      const response = await API.get('/api/jobs');
      // Filter out jobs that have been accepted
      let openJobs = response.data.filter((job) => job.status !== 'Accepted');

      // If user is a freelancer, filter jobs by matching tags
      if (user.role === 'freelancer') {
        const userTags = user.tags.map((tag) => tag.toLowerCase());
        openJobs = openJobs.filter((job) =>
          job.tags?.some((tag) => userTags.includes(tag.toLowerCase()))
        );
      }
 setAvailableJobs(openJobs);
    } catch (error) {
      console.error('Error fetching available jobs:', error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        navigate('/login');
        return;
      }
      try {
        const response = await API.get(/api/users/${userId});
        setUser({
          ...response.data,
          balance: response.data.balance
            ? parseFloat(response.data.balance).toFixed(2)
            : '0.00',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
fetchUserData();
  }, [userId, navigate]);

  useEffect(() => {
    // Once user is fetched, then fetch available jobs
    if (user.role) {
      fetchAvailableJobs();
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // Filter jobs based on search term
  const filteredJobs = availableJobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="profile-info">
          <img
            src={http://localhost:5000/uploads/${user.profilePhoto}}
            alt="Profile"
            className="profile-circle"
            onError={(e) => (e.target.src = '/path/to/default-pic.jpg')}
          />
          <p className="balance">Balance: ${user.balance}</p>
          <div
            className={dropdown-toggle ${showMenu ? 'active' : ''}}
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

{user.role === 'client' && (
        <div className="create-job-container">
          <button onClick={() => navigate('/create-job')}>
            Create a New Job
          </button>
        </div>
      )}

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
                  onClick={() => console.log(Navigating to job ${job._id})}
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

export default Dashboard;
