const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  console.log('Request body:', req.body); // Log the incoming data
  const {
    name, surname, country, phone, studentStatus, email, password, confirmPassword,
    role, description, workVideo, workPhotos, tags, profilePhoto
  } = req.body;

  try {
    // Ensure required fields are present
    if (!name || !email || !password || !role) {
      return res.status(400).json({ msg: 'Please provide all required fields' });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user instance
    user = new User({
      name,
      surname,
      country,
      phone,
      studentStatus,
      email,
      password: hashedPassword,
      role,
      description: role === 'freelancer' ? description : undefined,
      workVideo: role === 'freelancer' ? workVideo : undefined,
      workPhotos: role === 'freelancer' ? workPhotos : undefined,
      tags: role === 'freelancer' ? tags : undefined,
      profilePhoto,
     
    });

    // Save user to database
    await user.save();

    // Generate a JWT token
    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (err) {
    console.error('Error in /register route:', err);
    res.status(500).json({ msg: 'Server error' });
  }
});
//arsim continue with the login API

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({
      token,
      role: user.role,
      userId: user._id // Include userId in response
    });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
// arsim's finished
