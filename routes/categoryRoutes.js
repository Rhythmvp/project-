const express = require('express');
const router = express.Router();
const Category = require('../models/categoryModel');

// GET all categories
router.get('/', async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

// POST new category
router.post('/', async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
