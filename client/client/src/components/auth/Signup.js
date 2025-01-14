import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api';
import './Auth.css';

const Signup = () => {
  const [phase, setPhase] = useState(1); // Track the current phase
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    country: '',
    phone: '',
    studentStatus: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'freelancer',
    description: '',
    workVideo: null,
    workPhotos: [],
    tags: '',
    profilePhoto: null,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Update form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle file uploads
  const handleFileChange = (e) => {
    const { name } = e.target;
    const files = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'workPhotos' ? files : files[0], // Store multiple photos or single video/photo
    }));
  };

  // Handle navigation to next or previous phase
  const nextPhase = () => setPhase(phase + 1);
  const prevPhase = () => setPhase(phase - 1);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
  
    // Prepare formData to ensure strings or nulls where necessary
    const submissionData = {
      ...formData,
      workVideo: formData.workVideo ? formData.workVideo.name || null : null,
      workPhotos: formData.workPhotos.length > 0 ? formData.workPhotos.map(photo => photo.name) : [],
      profilePhoto: formData.profilePhoto ? formData.profilePhoto.name || null : null,
    };
  
    console.log('Prepared submission data:', submissionData);
  
    try {
      const res = await API.post('/api/auth/register', submissionData);
      console.log('Signup Successful:', res.data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Signup failed. Please try again.');
      console.error('Signup Error:', err);
    } finally {
      setLoading(false);
    }
  };// <-- Make sure this function is closed properly

  return (
    <div className="auth-container">
      <h2>Sign Up - Phase {phase}</h2>
      {error && <p className="error-message">{error}</p>}

      {phase === 1 && (
        <form>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
          <input type="text" name="surname" placeholder="Surname" value={formData.surname} onChange={handleChange} />
          <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
          <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
          <input type="text" name="studentStatus" placeholder="Student or Other" value={formData.studentStatus} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="freelancer">Freelancer</option>
            <option value="client">Client</option>
          </select>
          <button type="button" onClick={nextPhase}>Next</button>
        </form>
      )}

      {phase === 2 && (
        <form>
          {formData.role === 'freelancer' ? (
            <>
              <textarea name="description" placeholder="Brief Description" value={formData.description} onChange={handleChange} />
              <input type="file" name="workVideo" accept="video/*" onChange={handleFileChange} />
              <input type="file" name="workPhotos" accept="image/*" multiple onChange={handleFileChange} />
              <input type="text" name="tags" placeholder="Tags (comma-separated)" value={formData.tags} onChange={handleChange} />
            </>
          ) : (
            <>
              <input type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} />
              <input type="text" name="companyDescription" placeholder="Company Description" value={formData.companyDescription} onChange={handleChange} />
            </>
          )}
          <button type="button" onClick={prevPhase}>Previous</button>
          <button type="button" onClick={nextPhase}>Next</button>
        </form>
      )}

      {phase === 3 && (
        <form>
          <input type="file" name="profilePhoto" accept="image/*" onChange={handleFileChange} />
          <button type="button" onClick={prevPhase}>Previous</button>
          <button type="button" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Finishing...' : 'Finish'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Signup;
 
