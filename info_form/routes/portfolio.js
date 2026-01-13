const express = require('express');
const Portfolio = require('../models/Portfolio');

const router = express.Router();

// Save Portfolio
router.post('/', async (req, res) => {
  try {
    const portfolioData = req.body;
    const portfolio = new Portfolio(portfolioData);
    await portfolio.save();
    res.status(201).json({ message: 'Portfolio saved successfully!', portfolio });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save portfolio', error: error.message });
  }
});

// Get All Portfolios
router.get('/', async (req, res) => {
  try {
    const portfolios = await Portfolio.find();
    res.status(200).json(portfolios);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch portfolio data', error: error.message });
  }
});

module.exports = router;
