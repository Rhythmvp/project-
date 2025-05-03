require('events').EventEmitter.defaultMaxListeners = 20;

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const softwareRoutes = require('./routes/softwareRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(express.static('public')); // serves static files from 'public/' folder

// API Routes
app.use('/api/software', softwareRoutes);
app.use('/api/categories', categoryRoutes);

// Page Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'softwarelistings.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Fallback route for 404
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
