import React, { useState } from 'react';
import axios from 'axios';

const CreateJob = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('Beginner');
  const [milestones, setMilestones] = useState([{ title: '', description: '', dueDate: '', amount: '' }]);

  const addMilestone = () => {
    setMilestones([...milestones, { title: '', description: '', dueDate: '', amount: '' }]);
  };

  const handleMilestoneChange = (index, field, value) => {
    const updatedMilestones = [...milestones];
    updatedMilestones[index][field] = value;
    setMilestones(updatedMilestones);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/jobs/create', {
        title,
        description,
        budget,
        timeline,
        experienceLevel,
        milestones
      });
      alert('Job created successfully');
    } catch (error) {
      console.error(error);
      alert('Error creating job');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a New Job</h2>

      <label>Job Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

      <label>Job Description:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

      <label>Budget:</label>
      <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} required />

      <label>Timeline:</label>
      <input type="text" value={timeline} onChange={(e) => setTimeline(e.target.value)} required />

      <label>Experience Level:</label>
      <select value={experienceLevel} onChange={(e) => setExperienceLevel(e.target.value)}>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Expert">Expert</option>
      </select>

      <h3>Milestones</h3>
      {milestones.map((milestone, index) => (
        <div key={index}>
          <label>Milestone Title:</label>
          <input
            type="text"
            value={milestone.title}
            onChange={(e) => handleMilestoneChange(index, 'title', e.target.value)}
          />

          <label>Milestone Description:</label>
          <input
            type="text"
            value={milestone.description}
            onChange={(e) => handleMilestoneChange(index, 'description', e.target.value)}
          />

          <label>Due Date:</label>
          <input
            type="date"
            value={milestone.dueDate}
            onChange={(e) => handleMilestoneChange(index, 'dueDate', e.target.value)}
          />

          <label>Amount:</label>
          <input
            type="number"
            value={milestone.amount}
            onChange={(e) => handleMilestoneChange(index, 'amount', e.target.value)}
          />
        </div>
      ))}
      <button type="button" onClick={addMilestone}>Add Milestone</button>

      <button type="submit">Create Job</button>
    </form>
  );
};

export default CreateJob;
