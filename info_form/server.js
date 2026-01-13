// Polyfill for packages expecting SlowBuffer (removed in newer Node versions).
const _buffer = require('buffer');
if (!_buffer.SlowBuffer) {
  _buffer.SlowBuffer = _buffer.Buffer;
  global.SlowBuffer = _buffer.Buffer;
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const Portfolio = require('./models/Portfolio'); // Portfolio schema
const authRoutes = require('./routes/auth'); // Authentication routes

dotenv.config(); // Load environment variables

const app = express();
// Prefer configurable port; default to 5001 to avoid common conflicts.
const PORT = process.env.PORT || 5001; // Use environment variables for flexibility

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio_db'; // MongoDB URI from .env or fallback to localhost
mongoose.connect(mongoURI);

const db = mongoose.connection;
db.on('error', (err) => console.error('MongoDB connection error:', err));
db.once('open', () => console.log('Connected to MongoDB'));

// Debugging Middleware - Logs every request
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the Portfolio API!');
});

// Portfolio Routes
app.post('/api/portfolio', async (req, res) => {
  try {
    const portfolioData = req.body; // Expecting valid JSON data
    const portfolio = new Portfolio(portfolioData);
    await portfolio.save(); // Save to MongoDB
    res.status(201).json({ message: 'Portfolio saved successfully!', portfolio });
  } catch (error) {
    console.error('Error saving portfolio:', error);
    res.status(500).json({ message: 'Failed to save portfolio', error: error.message });
  }
});

app.get('/api/portfolio', async (req, res) => {
  try {
    const portfolios = await Portfolio.find(); // Fetch all portfolios from MongoDB
    res.status(200).json(portfolios);
  } catch (error) {
    console.error('Error fetching portfolios:', error);
    res.status(500).json({ message: 'Failed to fetch portfolio data', error: error.message });
  }
});

// Authentication Routes
app.use('/api/auth', authRoutes); // Delegates /api/auth to auth.js

// Start the Server
// Bind to localhost to avoid permission issues on privileged/bound interfaces.
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
