
const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: Date,
  amount: Number,
  status: { type: String, enum: ['Pending', 'Completed', 'In Progress'], default: 'Pending' },
  workSubmitted: { type: String, default: null }  // URL or path to submitted work
});

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  budget: { type: Number, required: true },
  applicants: [
    {
      freelancer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      coverLetter: String,
      status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' }
    }
  ],
  timeline: { type: String, required: true },
  experienceLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Expert'], required: true },
  milestones: [milestoneSchema],
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  freelancer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  status: { type: String, enum: ['Open', 'In Progress', 'Completed'], default: 'Open' },
  tags: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);

