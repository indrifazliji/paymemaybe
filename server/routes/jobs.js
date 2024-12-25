
const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// Route to create a new job
router.post('/create', async (req, res) => {
  try {
    const { title, description, budget, timeline, experienceLevel, milestones, clientId, tags } = req.body;

    // Normalize and save tags in lowercase
    const normalizedTags = Array.isArray(tags) ? tags.map(tag => tag.trim().toLowerCase()) : [];
    const newJob = new Job({
      title,
      description,
      budget,
      timeline,
      experienceLevel,
      milestones,
      client: clientId,
      tags: normalizedTags
    });

    await newJob.save();
    res.status(201).json({ message: 'Job created successfully', job: newJob });
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ message: 'Error creating job' });
  }
});

// Route to post a job (Client only)
router.post('/jobs', async (req, res) => {
  const { title, description, clientId, tags, requirements } = req.body;
  try {
    const tagsArray = Array.isArray(tags) ? tags.map(tag => tag.trim()) : (typeof tags === 'string' ? tags.split(',').map(tag => tag.trim()) : []);
    const job = new Job({ title, description, client: clientId, tags: tagsArray, requirements });
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ error: 'Error posting job' });
  }
});

// Route to get all jobs (for freelancers to view)
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error retrieving jobs:', error);
    res.status(500).json({ error: 'Error retrieving jobs' });
  }
});

module.exports = router;
