const express = require('express');
const router = express.Router();
const Software = require('../models/softwareModel');

router.post('/add', async (req, res) => {
  try {
    const newSoftware = new Software(req.body);
    await newSoftware.save();
    res.status(201).json({ message: 'Software added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add software', error: err.message });
  }
});

module.exports = router;
