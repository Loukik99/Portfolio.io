const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,  // Ensure the name is required
  },
  email: {
    type: String,
    required: true,  // Ensure email is required
    unique: true,    // Enforce unique email
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],  // Email validation
  },
  phone: {
    type: String,
    required: true,  // Phone is required
  },
  skills: {
    type: [String],  // Store skills as an array of strings
    required: true,  // Make skills required
  },
  skill1: String,
  skill2: String,
  skill3: String,
  skill4: String,
  skill5: String,
  skill6: String,
  bio: {
    type: String,
    required: true,  // Bio is required
  },
  education: {
    type: String,
    required: true,  // Education is required
  },
  links: String,
  experience: String,
  roles: {
    type: [String],  // Roles can be an array of strings
    required: true,  // Make roles required
    
  },
  projects: [
    {
      name: {
        type: String,
        required: true,  // Project name is required
      },
      details: {
        type: String,
        required: true,  // Project details are required
      },
    },
  ],
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio;
