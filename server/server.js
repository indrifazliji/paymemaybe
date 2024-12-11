//modulet
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env
dotenv.config();

// Connect db
connectDB();

//express 
const app = express();

// Json passer
app.use(express.json());

// Test route
app.get('/', (req, res) => res.send('API Running'));

// Ports
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
