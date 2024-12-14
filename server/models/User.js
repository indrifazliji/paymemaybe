
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  surname: String,
  country: String,
  phone: String,
  studentStatus: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['freelancer', 'client'], required: true },
  balance: {
    type: Number,
    default: 0,
  },
 
  profilePhoto: { type: String },  
  workPhotos: [{ type: String }],  
  description: { type: String },
  tags: { type: String }
});

module.exports = mongoose.model('User', UserSchema);
