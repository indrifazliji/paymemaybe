
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

// Route to get jobs by tags
router.get('/tags', async (req, res) => {
  const { tags } = req.query;
  const tagsArray = tags ? tags.split(',').map(tag => tag.trim().toLowerCase()) : [];
  try {
    const jobs = await Job.find({ tags: { $in: tagsArray } });
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs by tags:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to get jobs posted by a specific client
router.get('/client/:clientId', async (req, res) => {
  try {
    const jobs = await Job.find({ clientId: req.params.clientId });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving client jobs' });
  }
});

// Route to get a specific job's details
router.get('/:jobId', async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.status(200).json(job);
  } catch (error) {
    console.error('Error retrieving job details:', error);
    res.status(500).json({ error: 'Error retrieving job details' });
  }
});

// Route for freelancers to apply to a job
router.post('/:jobId/apply', async (req, res) => {
  try {
    const { jobId } = req.params;
    const { freelancerId, coverLetter } = req.body;

    if (!freelancerId || !coverLetter) return res.status(400).json({ message: 'Freelancer ID and cover letter are required' });

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    job.applicants.push({ freelancer: freelancerId, coverLetter });
    await job.save();

    const newNotification = new Notification({
      recipientId: freelancerId,
      message: 'Congrats! You applied for the job.',
      type: 'job_application',
    });
    await newNotification.save();
    res.status(200).json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Error applying for job:', error);
    res.status(500).json({ message: 'Error applying for job' });
  }
});

// Route to get active jobs for a client
router.get('/active/:clientId', async (req, res) => {
  try {
    const jobs = await Job.find({ client: req.params.clientId, status: 'Open' });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving active jobs' });
  }
});

// Route to get in-progress jobs for a freelancer
router.get('/in-progress/:freelancerId', async (req, res) => {
  try {
    const jobs = await Job.find({ freelancer: req.params.freelancerId, status: 'In Progress' });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving in-progress jobs' });
  }
});

module.exports = router;
