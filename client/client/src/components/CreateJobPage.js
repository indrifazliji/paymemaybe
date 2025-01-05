// CreateJobPage.js
import React from 'react';
import CreateJob from './CreateJob'; // Adjust the import path if necessary
import { useNavigate } from 'react-router-dom';

const CreateJobPage = () => {
  const navigate = useNavigate();

  const handleJobCreated = () => {
    // Redirect to dashboard or wherever you want after job creation
    navigate('/dashboard'); // Assuming the dashboard route is '/'
  };

  return (
    <div className="create-job-page">
      <h1>Create a New Job</h1>
      <CreateJob onJobCreated={handleJobCreated} />
    </div>
  );
};

export default CreateJobPage;
